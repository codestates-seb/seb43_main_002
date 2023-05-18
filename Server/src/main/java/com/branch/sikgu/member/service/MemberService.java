package com.branch.sikgu.member.service;

import com.branch.sikgu.auth.jwt.JwtTokenizer;
import com.branch.sikgu.exception.BusinessLogicException;
import com.branch.sikgu.exception.ExceptionCode;
import com.branch.sikgu.exception.HttpStatus;
import com.branch.sikgu.member.dto.*;
import com.branch.sikgu.member.entity.Member;
import com.branch.sikgu.member.mapper.MemberMapper;
import com.branch.sikgu.member.repository.MemberRepository;
import com.branch.sikgu.myPage.entity.MyPage;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.Check;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final MemberMapper memberMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenizer jwtTokenizer;


    // 회원가입 (매퍼를 어느 계층에서 호출하는 게 좋을까요...?)
    public MemberSignUpResponseDto signUp(MemberSignUpRequestDto memberSignUpRequestDto) {
        if (memberRepository.existsByEmail(memberSignUpRequestDto.getEmail())) {
            throw new BusinessLogicException(ExceptionCode.DUPLICATE_EMAIL, HttpStatus.CONFLICT);
        }
        if (memberRepository.existsByNickname(memberSignUpRequestDto.getNickname())) {
            throw new BusinessLogicException(ExceptionCode.DUPLICATE_NICKNAME, HttpStatus.CONFLICT);
        }

        String encodedPassword = passwordEncoder.encode(memberSignUpRequestDto.getPassword());
        memberSignUpRequestDto.setPassword(encodedPassword);

        Member member = memberMapper.memberSignUpRequestDtoToMember(memberSignUpRequestDto);
        memberRepository.save(member);
        return memberMapper.memberToMemberSignUpResponseDto(member);
    }

    // 회원가입시 이메일 중복 체크를 위해 작성했습니다. (AJAX?)
    public boolean checkDuplicateEmail(String email) {
        return memberRepository.existsByEmail(email);
    }

    // 회원가입시 닉네임 중복 체크를 위해 작성했습니다.
    public boolean checkDuplicateNickname(String nickname) {
        return memberRepository.existsByNickname(nickname);
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
                .ifPresent(member::setName);
        Optional.ofNullable(memberUpdateRequestDto.getEmail())
                .ifPresent(email -> {
                    if (!member.getEmail().equals(email) && memberRepository.existsByEmail(email)) {
                        throw new BusinessLogicException(ExceptionCode.DUPLICATE_EMAIL, HttpStatus.CONFLICT);
                    }
                    member.setEmail(email);
                });
        Optional.ofNullable(memberUpdateRequestDto.getPassword())
                .ifPresent(password -> member.setPassword(passwordEncoder.encode(password)));
        Optional.ofNullable(memberUpdateRequestDto.getNickname())
                .ifPresent(nickname -> {
                    if (!member.getNickname().equals(nickname) && memberRepository.existsByNickname(nickname)) {
                        throw new BusinessLogicException(ExceptionCode.DUPLICATE_NICKNAME, HttpStatus.CONFLICT);
                    }
                    member.setNickname(nickname);
                });
        Optional.ofNullable(memberUpdateRequestDto.getBirthday())
                .ifPresent(member::setBirthday);
        Optional.ofNullable(memberUpdateRequestDto.getGender())
                .ifPresent(member::setGender);

        member.setUpdatedAt(LocalDateTime.now());
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
        if (principal instanceof String) {
            String email = (String) principal;
            Optional<Member> memberOptional = memberRepository.findByEmail(email);
            if (memberOptional.isPresent()) {
                return memberOptional.get().getMemberId();
            } else {
                throw new IllegalStateException("해당하는 이메일의 멤버를 찾을 수 없습니다.: " + email);
            }
        } else {
            throw new IllegalStateException("Unknown principal type: " + principal.getClass());
        }
    }

    public Member findMember(String token) {

        long memberId = jwtTokenizer.getMemberId(token);

        Member findMember = findVerifiedMember(memberId);

        if(findMember.getStatus().equals(Member.MemberStatus.MEMBER_QUIT)) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        return findMember;
    }

    // 나중에 이 메서드를 사용하고 싶어서 추가해놨어요
    public Member findVerifiedMember(Long memberId) {
        Optional<Member> optionalMember =
                memberRepository.findById(memberId)
                        .filter(member -> member.getStatus() != Member.MemberStatus.MEMBER_QUIT);
        return optionalMember.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND, HttpStatus.NOT_FOUND));
    }


    @Transactional(readOnly = true)
    public Member findMember(long memberId) {
        return findVerifiedMember(memberId);
    }

    public List<Member> findAll() {
        List<Member> members = memberRepository.findAll();
        if (members.isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        return members;
    }


}
