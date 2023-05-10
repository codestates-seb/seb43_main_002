package com.branch.sikgu.member.service;

import com.branch.sikgu.exception.BusinessLogicException;
import com.branch.sikgu.exception.ExceptionCode;
import com.branch.sikgu.exception.HttpStatus;
import com.branch.sikgu.member.dto.MemberResponseDto;
import com.branch.sikgu.member.dto.MemberSignUpRequestDto;
import com.branch.sikgu.member.dto.MemberSignUpResponseDto;
import com.branch.sikgu.member.dto.MemberUpdateRequestDto;
import com.branch.sikgu.member.entity.Member;
import com.branch.sikgu.member.mapper.MemberMapper;
import com.branch.sikgu.member.repository.MemberRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public MemberResponseDto findMember(Authentication authentication) {
        return memberMapper.memberToMemberResponseDto(findVerifiedMember(getCurrentMemberId(authentication)));
    }

    // 회원정보수정
    public MemberResponseDto updateMember(Authentication authentication, MemberUpdateRequestDto memberUpdateRequestDto) {
        Long memberId = getCurrentMemberId(authentication);
        Member member = findVerifiedMember(memberId);

        Optional.ofNullable(memberUpdateRequestDto.getName())
                .ifPresent(name -> member.setName(name));

        Optional.ofNullable(memberUpdateRequestDto.getEmail())
                .ifPresent(email -> {
                    if (memberRepository.existsByEmail(email)) {
                        throw new BusinessLogicException(ExceptionCode.DUPLICATE_EMAIL, HttpStatus.CONFLICT);
                    }
                    member.setEmail(email);
                });

        Optional.ofNullable(memberUpdateRequestDto.getPassword())
                .ifPresent(password -> member.setPassword(passwordEncoder.encode(password)));

        Optional.ofNullable(memberUpdateRequestDto.getNickname())
                .ifPresent(nickname -> member.setNickname(nickname));

        Optional.ofNullable(memberUpdateRequestDto.getAge())
                .ifPresent(age -> member.setAge(age));

        Optional.ofNullable(memberUpdateRequestDto.getGender())
                .ifPresent(gender -> member.setGender(gender));

        memberRepository.save(member);
        return memberMapper.memberToMemberResponseDto(member);
    }

    // 회원탈퇴
    public void deleteMember(Authentication authentication) {

        Member findMember = findVerifiedMember(getCurrentMemberId(authentication));

        findMember.setStatus(Member.MemberStatus.MEMBER_QUIT);

        memberRepository.save(findMember);
    }

    public Long getCurrentMemberId(Authentication authentication) {

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
        // Remember Me 기능을 사용하지 않는다면 String 객체의 예외처리 부분은 지워도 상관 없을 것 같아요
    }

    // 나중에 이 메서드를 사용하고 싶어서 추가해놨어요
    private Member findVerifiedMember(Long memberId) {
        Optional<Member> optionalMember =
                memberRepository.findById(memberId)
                        .filter(member -> member.getStatus() != Member.MemberStatus.MEMBER_QUIT);
        return optionalMember.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND, HttpStatus.NOT_FOUND));
    }
}
