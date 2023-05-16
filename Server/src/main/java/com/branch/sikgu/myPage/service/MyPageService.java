package com.branch.sikgu.myPage.service;

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
        return myPageMapper.MyPageToMyPageResponseDto(myPage);
    }


    // 마이페이지 수정
    public MyPageResponseDto updateMyPage(Long memberId, MyPageRequestDto myPageRequestDto, Authentication authentication) {
        Member member = memberService.findVerifiedMember(memberService.getCurrentMemberId(authentication));
        MyPage myPage = member.getMyPage();

        Optional.ofNullable(myPageRequestDto.getIntroduce())
                .ifPresent(myPage::setIntroduce);

        MyPage updatedMyPage = myPageRepository.save(myPage);
        return myPageMapper.MyPageToMyPageResponseDto(updatedMyPage);
    }

    //
}
