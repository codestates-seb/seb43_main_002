package com.branch.sikgu.myPage.service;

import com.branch.sikgu.meal.board.entity.Board;
import com.branch.sikgu.exception.BusinessLogicException;
import com.branch.sikgu.exception.ExceptionCode;
import com.branch.sikgu.exception.HttpStatus;
import com.branch.sikgu.image.Entity.Image;
import com.branch.sikgu.image.Repository.ImageRepository;
import com.branch.sikgu.image.Service.ImageService;
import com.branch.sikgu.member.entity.Member;
import com.branch.sikgu.member.repository.MemberRepository;
import com.branch.sikgu.member.service.MemberService;
import com.branch.sikgu.myPage.dto.*;
import com.branch.sikgu.myPage.entity.MyPage;
import com.branch.sikgu.myPage.mapper.MyPageMapper;
import com.branch.sikgu.myPage.repository.MyPageRepository;
import com.branch.sikgu.review.entity.Review;
import com.branch.sikgu.review.repository.ReviewRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.stream.ImageOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.awt.image.BufferedImage;
import java.io.*;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class MyPageService {
    private final MyPageRepository myPageRepository;
    private final MyPageMapper myPageMapper;
    private final MemberService memberService;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final ImageService imageService;
    private final ImageRepository imageRepository;
    private final ReviewRepository reviewRepository;

    // 마이페이지 조회
    public MyPageResponseDto getMyPage(Long memberId, Authentication authentication) {
        MyPage myPage = myPageRepository.findByMember_MemberId(memberId);
        MyPageResponseDto myPageResponseDto = myPageMapper.MyPageToMyPageResponseDto(myPage);

        Long currentMemberId = memberService.getCurrentMemberId(authentication);
        boolean isCurrentUserFollowing = isFollowingUser(currentMemberId, memberId);
        myPageResponseDto.setFollowingCurrentUser(isCurrentUserFollowing);

        // Member의 nickname을 가져와서 MyPageResponseDto에 설정
        String nickname = myPage.getMember().getNickname();
        myPageResponseDto.setNickname(nickname);
        myPageResponseDto.setBirthday(myPage.getMember().getBirthday());
        myPageResponseDto.setName(myPage.getMember().getName());
        myPageResponseDto.setGender(myPage.getMember().getGender());
        myPageResponseDto.setEmail(myPage.getMember().getEmail());

        // 최근 작성한 게시물 2개를 가져와서 MyPageResponseDto에 설정
        List<Board> recentBoards = myPage.getRecentPost().stream()
                .filter(board -> board.getBoardStatus() != Board.BoardStatus.DELETED_BOARD)
                .sorted(Comparator.comparing(Board::getCreatedAt).reversed())
                .limit(2)
                .collect(Collectors.toList());

        List<MyPageRecentBoardDto> recentBoardList = recentBoards.stream()
                .map(board -> {
                    MyPageRecentBoardDto myPageRecentBoardDto = new MyPageRecentBoardDto();
                    myPageRecentBoardDto.setBoardId(board.getBoardId());
                    myPageRecentBoardDto.setTitle(board.getTitle());
                    myPageRecentBoardDto.setCreatedAt(board.getCreatedAt().toLocalDate());
                    myPageRecentBoardDto.setType("식구");
                    return myPageRecentBoardDto;
                })
                .collect(Collectors.toList());

        myPageResponseDto.setRecentBoard(recentBoardList);

        List<FollowingDto> followingList = myPage.getFollowings().stream()
                .map(following -> {
                    FollowingDto followingDto = new FollowingDto();
                    followingDto.setFollowingId(following.getMyPageId());
                    followingDto.setFollowingName(following.getMember().getNickname());
                    return followingDto;
                })
                .collect(Collectors.toList());
        // 리뷰 설정
        List<Review> recentReviews = reviewRepository.findByTargetMember_MemberIdOrderByCreatedAtDesc(myPage.getMyPageId());
        List<MyPageRecentReviewDto> recentReviewList = recentReviews.stream()
                .map(review -> {
                    MyPageRecentReviewDto reviewDto = new MyPageRecentReviewDto();
                    reviewDto.setReviewerId(review.getReviewer().getMemberId());
                    reviewDto.setReviewerNickName(review.getReviewer().getNickname());
                    reviewDto.setLiked(review.isLiked());
                    reviewDto.setReviewContent(review.getContent());
                    return reviewDto;
                })
                .collect(Collectors.toList());
        // 리뷰 좋아요 수 카운트
        Long totalLikes = recentReviews.stream()
                .filter(Review::isLiked)
                .count();
        myPageResponseDto.setLikes(totalLikes);
        myPageResponseDto.setRecentReview(recentReviewList);
        myPageResponseDto.setFollowings(followingList);
        myPageResponseDto.setFollowingCount(myPage.getFollowingCount());
        return myPageResponseDto;
    }

    // 팔로워 목록 조회
    public List<MyPageFollowerDto> getMyFollower(Long myPageId) {
        MyPage myPage = myPageRepository.findById(myPageId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND, HttpStatus.NOT_FOUND));

        List<MyPage> followerList = myPage.getFollowers();
        List<MyPageFollowerDto> followerDtoList = new ArrayList<>();

        for (MyPage follower : followerList) {
            MyPageFollowerDto followerDto = new MyPageFollowerDto();
            followerDto.setMyPageId(follower.getMyPageId());
            followerDto.setNickName(follower.getMember().getNickname());
            followerDtoList.add(followerDto);
        }

        return followerDtoList;
    }

    public String uploadMyPageImage(Long myPageId, MultipartFile file, Authentication authentication) throws IOException {
        // 해당 마이페이지의 소유자인지 확인
        Member currentMember = memberService.findVerifiedMember(memberService.getCurrentMemberId(authentication));
        MyPage myPage = myPageRepository.findById(myPageId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND, HttpStatus.NOT_FOUND));
        if (!myPage.getMember().equals(currentMember)) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_FORBIDDEN, HttpStatus.FORBIDDEN);
        }
        // 이미지 업로드 처리

        String imagePath = "C:\\Users\\SYJ\\Desktop\\seb43_main_002\\Server\\src\\main\\resources\\static\\images";
        Image image = new Image(file.getOriginalFilename(), file.getContentType());
        Long fileId = imageService.addImage(image);
        String fileName = image.getName();
        File f = new File(Paths.get(imagePath, fileId + fileName).toString());
        file.transferTo(f);
        // 해당 마이페이지의 이미지 경로 업데이트
//        myPage.setImagePath(imagePath + fileId + fileName);
//        myPageRepository.save(myPage);
//        return myPage.getImagePath();
        return imagePath + fileId + fileName;
    }

    // 마이페이지 수정
    public void updateMyPage(Long memberId, MyPageRequestDto myPageRequestDto, Authentication authentication, MultipartFile file) throws IOException {
        // 현재 인증된 회원의 정보를 가져옴
        Member currentMember = memberService.findVerifiedMember(memberService.getCurrentMemberId(authentication));

        // memberId와 현재 인증된 회원의 식별자를 비교하여 일치하는 경우에만 업데이트 수행
        if (memberId.equals(currentMember.getMemberId())) {
            MyPage myPage = currentMember.getMyPage();

            Optional.ofNullable(myPageRequestDto.getIntroduce())
                    .ifPresent(myPage::setIntroduce);


                Optional.ofNullable(file)
                        .ifPresent(updatedFile -> {
//                            String imagePath = "C:\\Users\\SYJ\\Desktop\\seb43_main_002\\Server\\src\\main\\resources\\static\\images";
                        String imagePath = "/home/ssm-user/sikgu/seb43_main_002/Server/src/main/resources/static/images/";

                            Image image = myPage.getImage();
                            String imageName = image.getName();
                            String previousName = image.getOriginalFileName();

                            String newFileName = generateUniqueFileName(updatedFile.getOriginalFilename());

                            image.setName(image.getImageId() + newFileName);
                            image.setOriginalFileName(updatedFile.getOriginalFilename());
                            image.setType(updatedFile.getContentType());

                            String filePath = Paths.get(imagePath, image.getImageId() + newFileName).toString();
                            File f = new File(filePath);
                            try {
                                updatedFile.transferTo(f);
                            } catch (IOException e) {
                                throw new RuntimeException(e);
                            }
                            if(!previousName.equals("기본이미지")) {
                            deletePreviousFile(imagePath, imageName);
                            }
                        });

            Optional.ofNullable(myPageRequestDto.getNickname())
                    .ifPresent(nickname -> {
                        if (!currentMember.getNickname().equals(nickname) && memberRepository.existsByNickname(nickname)) {
                            throw new BusinessLogicException(ExceptionCode.DUPLICATE_NICKNAME, HttpStatus.CONFLICT);
                        }
                        currentMember.setNickname(nickname);
                    });
            Optional.ofNullable(myPageRequestDto.getPassword())
                    .ifPresent(password -> currentMember.setPassword(passwordEncoder.encode(password)));
            Optional.ofNullable(myPageRequestDto.getName())
                    .ifPresent(currentMember::setName);
            Optional.ofNullable(myPageRequestDto.getBirthday())
                    .ifPresent(currentMember::setBirthday);
            Optional.ofNullable(myPageRequestDto.getGender())
                    .ifPresent(currentMember::setGender);

            myPageRepository.save(myPage);
            memberRepository.save(currentMember);
        } else {
            // 권한이 없는 경우 예외처리
            throw new BusinessLogicException(ExceptionCode.MEMBER_FORBIDDEN, HttpStatus.FORBIDDEN);
        }
    }

    public void downloadImage(Long myPageId, HttpServletResponse response) {
        BufferedInputStream bin = null;
        try {
                response.setContentType("image/jpeg");
                Image image = imageRepository.findImageByMyPageId(myPageId);

                File file;
                if (image != null && image.getName() != null) {
//                file = new File("C:\\Users\\SYJ\\Desktop\\seb43_main_002\\Server\\src\\main\\resources\\static\\images\\" + image.getName());
                    file = new File("/home/ssm-user/sikgu/seb43_main_002/Server/src/main/resources/static/images/" + image.getName());
                } else {
//                file = new File("C:\\Users\\SYJ\\Desktop\\seb43_main_002\\Server\\src\\main\\resources\\static\\images\\image.jpg");
                    file = new File("/home/ssm-user/sikgu/seb43_main_002/Server/src/main/resources/static/images/" + "4.jpeg");
                }
                bin = new BufferedInputStream(new FileInputStream(file));

            // 이미지 읽기
            BufferedImage bufferedImage = ImageIO.read(bin);

            // 압축 설정
            float compressionQuality = 0.1f; // 압축률 설정 (0.0f부터 1.0f까지의 범위)
            // 이미지를 압축하여 바이트 배열로 변환
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageWriter writer = ImageIO.getImageWritersByFormatName("jpeg").next();
            ImageOutputStream ios = ImageIO.createImageOutputStream(baos);
            writer.setOutput(ios);

            // 압축 옵션 설정
            ImageWriteParam param = writer.getDefaultWriteParam();
            param.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
            param.setCompressionQuality(compressionQuality);

            // 이미지 압축
            writer.write(null, new IIOImage(bufferedImage, null, null), param);

            // 압축된 이미지를 클라이언트로 전송
            response.getOutputStream().write(baos.toByteArray());
            response.getOutputStream().flush();
////  구버전...압축 없음
//                byte[] dataBytes = new byte[8192];
//                int nread = 0;
//                while ((nread = bin.read(dataBytes)) != -1) {
//                    response.getOutputStream().write(dataBytes, 0, nread);
//                }
//                response.getOutputStream().flush();
        } catch (Exception e) {
            // 예외 처리 로직 추가
        } finally {
            try {
                if (bin != null) bin.close();
            } catch (Exception e) {
                // 예외 처리 로직 추가
            }
        }
    }
    public void followMyPage(Long myPageId, Authentication authentication) {
        Long followingId = memberService.getCurrentMemberId(authentication);
        // 팔로우할 마이페이지 (보고있는 마이페이지)
        MyPage myPage = myPageRepository.findById(myPageId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND, HttpStatus.NOT_FOUND));
        // 팔로우할 마이페이지 (보고 있는 마이페이지)가 자기 자신인 경우 예외 처리
        if (myPageId.equals(followingId)) {
            throw new BusinessLogicException(ExceptionCode.INVALID_REQUEST, HttpStatus.BAD_REQUEST);
        }
        MyPage following = myPageRepository.findById(followingId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND, HttpStatus.NOT_FOUND));
        if (following.getFollowings().contains(myPage)) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS, HttpStatus.CONFLICT);
        }

        following.getFollowings().add(myPage);
        following.setFollowingCount(following.getFollowingCount() + 1);
        myPageRepository.save(following);

        myPage.setFollowerCount(myPage.getFollowerCount() + 1);
        myPageRepository.save(myPage);
    }

    public void unfollowMyPage(Long myPageId, Authentication authentication) {
        Long followingId = memberService.getCurrentMemberId(authentication);
        // 팔로우할 마이페이지 (보고있는 마이페이지)
        MyPage myPage = myPageRepository.findById(myPageId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND, HttpStatus.NOT_FOUND));
        if (myPageId.equals(followingId)) {
            throw new BusinessLogicException(ExceptionCode.INVALID_REQUEST, HttpStatus.BAD_REQUEST);
        }
        MyPage following = myPageRepository.findById(followingId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND, HttpStatus.NOT_FOUND));
        if (!following.getFollowings().contains(myPage)) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        following.getFollowings().remove(myPage);
        following.setFollowingCount(following.getFollowingCount() - 1);
        myPageRepository.save(following);

        myPage.setFollowerCount(myPage.getFollowerCount() - 1);
        myPageRepository.save(myPage);
    }

    private void deletePreviousFile(String imagePath, String previousImageName) {
        if (previousImageName != null) {
            String previousFilePath = Paths.get(imagePath, previousImageName).toString();
            File previousFile = new File(previousFilePath);
            if (previousFile.exists()) {
                if (previousFile.delete()) {
                    // 파일 삭제 성공
                } else {
                    // 파일 삭제 실패
                    throw new RuntimeException("이전 파일 삭제 실패!: " + previousFilePath);
                }
            }
        }
    }

    // 고유한 파일명 생성 메서드
    private String generateUniqueFileName(String originalFilename) {
        // 고유한 식별자 생성 로직을 구현하여 파일명 충돌을 방지
        // 예시로 현재 시간과 랜덤한 문자열을 조합하여 파일명을 생성
        String timestamp = String.valueOf(System.currentTimeMillis());
        String randomString = UUID.randomUUID().toString().substring(0, 8);
        String extension = getExtension(originalFilename);
        return timestamp + "_" + randomString + extension;
    }

    // 파일 확장자 추출 메서드
    private String getExtension(String filename) {
        int dotIndex = filename.lastIndexOf(".");
        if (dotIndex > 0 && dotIndex < filename.length() - 1) {
            return filename.substring(dotIndex);
        }
        return "";
    }

    public boolean isFollowingUser(Long currentMemberId, Long memberId) {
        // Retrieve the current user's MyPage entity
        MyPage currentUserMyPage = myPageRepository.findByMember_MemberId(currentMemberId);
        if (currentUserMyPage == null) {
            // Handle the case if the current user does not have a MyPage
            throw new RuntimeException("MyPage not found for the current user");
        }

        // Check if the currentUserMyPage's followings contain the specified memberId
        List<MyPage> followings = currentUserMyPage.getFollowings();
        for (MyPage following : followings) {
            if (following.getMyPageId().equals(memberId)) {
                return true; // The current user is following the specified member
            }
        }
        return false; // The current user is not following the specified member
    }
}