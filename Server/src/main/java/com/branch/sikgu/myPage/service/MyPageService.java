package com.branch.sikgu.myPage.service;

import com.branch.sikgu.board.entity.Board;
import com.branch.sikgu.exception.BusinessLogicException;
import com.branch.sikgu.exception.ExceptionCode;
import com.branch.sikgu.exception.HttpStatus;
import com.branch.sikgu.image.Entity.Image;
import com.branch.sikgu.image.Service.ImageService;
import com.branch.sikgu.member.entity.Member;
import com.branch.sikgu.member.repository.MemberRepository;
import com.branch.sikgu.member.service.MemberService;
import com.branch.sikgu.myPage.dto.FollowingDto;
import com.branch.sikgu.myPage.dto.MyPageRecentBoardDto;
import com.branch.sikgu.myPage.dto.MyPageRequestDto;
import com.branch.sikgu.myPage.dto.MyPageResponseDto;
import com.branch.sikgu.myPage.entity.MyPage;
import com.branch.sikgu.myPage.mapper.MyPageMapper;
import com.branch.sikgu.myPage.repository.MyPageRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationAdapter;
import org.springframework.transaction.support.TransactionSynchronizationManager;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
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

    // 마이페이지 조회
    public MyPageResponseDto getMyPage(Long memberId) {
        MyPage myPage = myPageRepository.findByMember_MemberId(memberId);
        MyPageResponseDto myPageResponseDto = myPageMapper.MyPageToMyPageResponseDto(myPage);

        // Member의 nickname을 가져와서 MyPageResponseDto에 설정
        String nickname = myPage.getMember().getNickname();
        myPageResponseDto.setNickname(nickname);

        // 최근 작성한 게시물 2개를 가져와서 MyPageResponseDto에 설정
        List<Board> recentBoards = myPage.getRecentPost();
        recentBoards.sort(Comparator.comparing(Board::getCreatedAt).reversed());

        List<MyPageRecentBoardDto> recentBoardList = recentBoards.stream()
                .limit(2)
                .map(Board -> {
                    MyPageRecentBoardDto myPageRecentBoardDto = new MyPageRecentBoardDto();
                    myPageRecentBoardDto.setBoardId(Board.getBoardId());
                    myPageRecentBoardDto.setTitle(Board.getTitle());
                    myPageRecentBoardDto.setBody(Board.getBody());
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
        myPageResponseDto.setFollowings(followingList);
        myPageResponseDto.setFollowingCount(myPage.getFollowingCount());
        return myPageResponseDto;
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
    public MyPageResponseDto updateMyPage(Long memberId, MyPageRequestDto myPageRequestDto, Authentication authentication) {
        // 현재 인증된 회원의 정보를 가져옴
        Member currentMember = memberService.findVerifiedMember(memberService.getCurrentMemberId(authentication));

        // memberId와 현재 인증된 회원의 식별자를 비교하여 일치하는 경우에만 업데이트 수행
        if (memberId.equals(currentMember.getMemberId())) {
            MyPage myPage = currentMember.getMyPage();

            Optional.ofNullable(myPageRequestDto.getIntroduce())
                    .ifPresent(myPage::setIntroduce);
            Optional.ofNullable(myPageRequestDto.getImagePath())
                    .ifPresent(myPage::setImagePath);


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

            MyPage updatedMyPage = myPageRepository.save(myPage);
            memberRepository.save(currentMember);
            return myPageMapper.MyPageToMyPageResponseDto(updatedMyPage);
        } else {
            // 권한이 없는 경우 예외처리
            throw new BusinessLogicException(ExceptionCode.MEMBER_FORBIDDEN, HttpStatus.FORBIDDEN);
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
}