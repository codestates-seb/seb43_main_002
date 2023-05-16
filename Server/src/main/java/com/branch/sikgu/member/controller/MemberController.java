package com.branch.sikgu.member.controller;

import com.branch.sikgu.member.dto.*;

import com.branch.sikgu.member.entity.Member;
import com.branch.sikgu.member.mapper.MemberMapper;
import com.branch.sikgu.member.repository.MemberRepository;
import com.branch.sikgu.member.service.MemberService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;


@RestController
@RequestMapping(path = "/members")
@AllArgsConstructor
public class MemberController {
    private MemberService memberService;

    private MemberRepository memberRepository;

    private MemberMapper memberMapper;

    // 회원가입
    @PostMapping("/signup")
    public ResponseEntity<MemberSignUpResponseDto> signUp(@Validated
            @RequestBody MemberSignUpRequestDto memberSignUpRequestDto) {
        MemberSignUpResponseDto memberSignUpResponseDto = memberService.signUp(memberSignUpRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(memberSignUpResponseDto);
    }

    // 이메일 중복 검사 버튼
    @PostMapping("signup/checkduplicateemail")
    public ResponseEntity<Boolean> checkEmail(@RequestBody EmailCheckRequestDto requestDTO) {
        boolean isDuplicateEmail = memberService.checkDuplicateEmail(requestDTO.getEmail());
        if (isDuplicateEmail) {
            return ResponseEntity.ok(true); // 409 status code
        }
        return ResponseEntity.ok(false); // 200 status code
    }

    // 닉네임 중복 검사 버튼
    @PostMapping("signup/checkduplicatenickname")
    public ResponseEntity<Boolean> checkNickname(@RequestBody NicknameCheckRequestDto requestDTO) {
        boolean isDuplicateNickname = memberService.checkDuplicateNickname(requestDTO.getNickname());
        if (isDuplicateNickname) {
            return ResponseEntity.ok(true); // 409 status code
        }
        return ResponseEntity.ok(false); // 200 status code
    }

    // 회원정보조회 (로그인된 사용자 본인의 정보만 조회할 수 있게 수정)
    @GetMapping("/me")
    public ResponseEntity<MemberResponseDto> getMember(Authentication authentication) {
        MemberResponseDto memberResponseDto = memberService.findMember(authentication);
        return ResponseEntity.status(HttpStatus.OK).body(memberResponseDto);
    }


    // 회원정보수정
    @PatchMapping("/editprofile")
    public ResponseEntity<MemberResponseDto> patchMember(Authentication authentication,
                                                         @Validated @RequestBody MemberUpdateRequestDto memberUpdateRequestDto) {
        MemberResponseDto memberResponseDto = memberService.updateMember(authentication, memberUpdateRequestDto);
        return ResponseEntity.status(HttpStatus.OK).body(memberResponseDto);
    }

    // 회원 탈퇴 -> DB에서 삭제는 하지 않고 status만 변경
    @DeleteMapping("/delete")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteMember(Authentication authentication) {
        memberService.deleteMember(authentication);
    }

    @GetMapping("/all")
    public ResponseEntity<List<MemberResponseDto>> getAllMembers() {
        List<Member> members = memberService.findAll();
        List<MemberResponseDto> responseDtos = memberMapper.membersToMemberResponseDtos(members);

        return ResponseEntity.ok().body(responseDtos);
    }
}
