package com.branch.sickgu.member.service;

import com.branch.sickgu.member.dto.MemberPostDto;
import com.branch.sickgu.member.entity.Member;
import com.branch.sickgu.member.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;

    public Member signUp(MemberPostDto memberPostDto) {
        // 이메일 중복 체크
        if (memberRepository.existsByEmail(memberPostDto.getEmail())) {
            throw new DuplicateEmailException("중복된 이메일입니다.");
        }

        // 비밀번호 암호화
        String encryptedPassword = PasswordEncoder.encode(memberDto.getPassword());

        // Member 엔티티 생성
        Member member = new Member();
        member.setName(memberPostDto.getName());
        member.setEmail(memberPostDto.getEmail());
        member.setPassword(encryptedPassword);
        member.setStatus("ACTIVE");
        member.setCreatedAt(LocalDateTime.now());
        member.setGender(memberPostDto.isGender());
        member.setAgeRange(memberPostDto.getAgeRange());

        // Member 저장
        return memberRepository.save(member);
    }
}
