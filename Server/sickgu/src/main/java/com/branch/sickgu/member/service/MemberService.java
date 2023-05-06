package com.branch.sickgu.member.service;

import com.branch.sickgu.member.dto.MemberSignUpRequestDto;
import com.branch.sickgu.member.dto.MemberSignUpResponseDto;
import com.branch.sickgu.member.entity.Member;
import com.branch.sickgu.member.mapper.MemberMapper;
import com.branch.sickgu.member.repository.MemberRepository;
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
}