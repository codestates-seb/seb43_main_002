package com.branch.sikgu.member.service;

import com.branch.sikgu.auth.jwt.JwtTokenizer;
import com.branch.sikgu.exception.BusinessLogicException;
import com.branch.sikgu.exception.ExceptionCode;
import com.branch.sikgu.exception.HttpStatus;
import com.branch.sikgu.member.dto.*;
import com.branch.sikgu.member.entity.Member;
import com.branch.sikgu.member.mapper.MemberMapper;
import com.branch.sikgu.member.repository.MemberRepository;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.Check;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    public boolean checkDuplicateNickname(String nickname) {
        return memberRepository.existsByNickname(nickname);
    }

    // img 경로 저장



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
                .ifPresent(member::setNickname);
        Optional.ofNullable(memberUpdateRequestDto.getBirthday())
                .ifPresent(member::setBirthday);
        Optional.ofNullable(memberUpdateRequestDto.getGender())
                .ifPresent(member::setGender);
        memberRepository.save(member);

        // 회원정보를 수정해도 현재 가지고 있는 Authentication은 로그인 시점의 회원정보를 담고 있어서 회원정보 수정 이후 서비스 이용이 불가
        // 그래서 Authentication의 회원정보를 수정해 줘야 하는데 일반적으로 Principal 속성이 읽기 전용이기 때문에 직접 변경이 불가
        // 결국 새로운 회원정보를 담고있는 Authentication을 만들어서 SecurityContextHolder의 기존 Authentication을 새로운 Authentication로 덮어씌워야 하는 것 같다.
        UsernamePasswordAuthenticationToken newAuthentication = new UsernamePasswordAuthenticationToken(member, authentication.getCredentials(), authentication.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(newAuthentication);
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
            Optional<Member> memberOptional = memberRepository.findByEmail(username);
            if (memberOptional.isPresent()) {
                return memberOptional.get().getMemberId();
            } else {
                throw new IllegalStateException("Cannot find member with email: " + username);
            }
        } else {
            throw new IllegalStateException("Unknown principal type: " + principal.getClass());
        }
    } // 우리 코드에서는 무조건 Object principal = authentication.getPrincipal();가 String 객체 인것 같아요
    // 그래서 email을 변경하면 db에 변경된 email이 들어가지만 현재 가지고있는 authentication 은 변경전의 email정보를 가지고 있어서
    // email을 수정하고 나면 무조건 재 로그인을 해야합니다. - 수정 완료 - updateMember에 로직과 설명 추가했습니다.

    // 나중에 이 메서드를 사용하고 싶어서 추가해놨어요 - 수정 완료 - 사용할 수 있게 수정했습니다.
    public Member findMember(String token) {

        long memberId = jwtTokenizer.getMemberId(token);

        Member findMember = findVerifiedMember(memberId);

        if(findMember.getStatus().equals(Member.MemberStatus.MEMBER_QUIT)) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        return findMember;
    }

    // 나중에 이 메서드를 사용하고 싶어서 추가해놨어요
    private Member findVerifiedMember(Long memberId) {
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
