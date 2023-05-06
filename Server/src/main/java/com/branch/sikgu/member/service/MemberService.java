package com.branch.sikgu.member.service;

import com.branch.sikgu.exception.BusinessLogicException;
import com.branch.sikgu.exception.ExceptionCode;
import com.branch.sikgu.exception.HttpStatus;
import com.branch.sikgu.member.dto.MemberResponseDto;
import com.branch.sikgu.member.dto.MemberSignUpRequestDto;
import com.branch.sikgu.member.dto.MemberSignUpResponseDto;
import com.branch.sikgu.member.entity.Member;
import com.branch.sikgu.member.mapper.MemberMapper;
import com.branch.sikgu.member.repository.MemberRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Service
@Transactional
@AllArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final MemberMapper memberMapper;

    // 회원가입 (매퍼를 어느 계층에서 호출하는 게 좋을까요...?)
    public MemberSignUpResponseDto signUp(MemberSignUpRequestDto memberSignUpRequestDto) {
        Member member = memberMapper.memberSignUpRequestDtoToMember(memberSignUpRequestDto);
        memberRepository.save(member);
        return memberMapper.memberToMemberSignUpResponseDto(member);
    }

    // 회원정보조회
    public MemberResponseDto getMemberById(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND, HttpStatus.NOT_FOUND));
        return memberMapper.memberToMemberResponseDto(member);
    }
}
