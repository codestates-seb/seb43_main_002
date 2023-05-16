package com.branch.sikgu.myPage.service;

import com.branch.sikgu.exception.BusinessLogicException;
import com.branch.sikgu.exception.ExceptionCode;
import com.branch.sikgu.exception.HttpStatus;
import com.branch.sikgu.member.entity.Member;
import com.branch.sikgu.member.service.MemberService;
import com.branch.sikgu.myPage.dto.MyPageRequestDto;
import com.branch.sikgu.myPage.dto.MyPageResponseDto;
import com.branch.sikgu.myPage.entity.MyPage;
import com.branch.sikgu.myPage.mapper.MyPageMapper;
import com.branch.sikgu.myPage.repository.MyPageRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class MyPageService {
    private final MyPageRepository myPageRepository;
    private final MyPageMapper myPageMapper;
    private final MemberService memberService;

    // 마이페이지 조회
    public MyPageResponseDto getMyPage(Long memberId) {
        MyPage myPage = myPageRepository.findByMember_MemberId(memberId);
        MyPageResponseDto myPageResponseDto = myPageMapper.MyPageToMyPageResponseDto(myPage);

        // Member의 nickname을 가져와서 MyPageResponseDto에 설정
        String nickname = myPage.getMember().getNickname();
        myPageResponseDto.setNickname(nickname);

        return myPageResponseDto;
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

            MyPage updatedMyPage = myPageRepository.save(myPage);
            return myPageMapper.MyPageToMyPageResponseDto(updatedMyPage);
        } else {
            // 권한이 없는 경우 예외처리
            throw new BusinessLogicException(ExceptionCode.MEMBER_FORBIDDEN, HttpStatus.FORBIDDEN);
        }
    }

}
