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
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.Jwts;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final MemberMapper memberMapper;
    private final PasswordEncoder passwordEncoder;


    // 회원가입 (매퍼를 어느 계층에서 호출하는 게 좋을까요...?)
    public MemberSignUpResponseDto signUp(MemberSignUpRequestDto memberSignUpRequestDto) {
        if (memberRepository.existsByEmail(memberSignUpRequestDto.getEmail())) {
            throw new BusinessLogicException(ExceptionCode.DUPLICATE_EMAIL, HttpStatus.CONFLICT);
        }

        String encodedPassword = passwordEncoder.encode(memberSignUpRequestDto.getPassword());
        memberSignUpRequestDto.setPassword(encodedPassword);

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
    public Long getCurrentMemberId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        if (principal instanceof Member) {
            Member member = (Member) principal;
            return member.getMemberId();
        } else if (principal instanceof String) {
            String username = (String) principal;
            Optional<Member> member = memberRepository.findByEmail(username);
            return member.get().getMemberId();
        } else {
            throw new IllegalStateException("Unknown principal type: " + principal.getClass());
        }
    }

    // 나중에 이 메서드를 사용하고 싶어서 추가해놨어요
    @Transactional(readOnly = true)
    public Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember =
                memberRepository.findById(memberId);
        Member findMember =
                optionalMember.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND, HttpStatus.NOT_FOUND));
        return findMember;
    }


}
