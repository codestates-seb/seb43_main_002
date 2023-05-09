package com.branch.sikgu.member.controller;

import com.branch.sikgu.member.dto.MemberResponseDto;
import com.branch.sikgu.member.dto.MemberSignUpRequestDto;
import com.branch.sikgu.member.dto.MemberSignUpResponseDto;

import com.branch.sikgu.member.mapper.MemberMapper;
import com.branch.sikgu.member.service.MemberService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(path = "/members")
@AllArgsConstructor
public class MemberController {
    private MemberService memberService;
    private MemberMapper memberMapper;

    // 회원가입
    @PostMapping("/signup")
    public ResponseEntity<MemberSignUpResponseDto> signUp(@Validated
            @RequestBody MemberSignUpRequestDto memberSignUpRequestDto) {
        MemberSignUpResponseDto memberSignUpResponseDto = memberService.signUp(memberSignUpRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(memberSignUpResponseDto);
    }

    // 회원정보조회 (로그인된 사용자 본인의 정보만 조회할 수 있게 수정)
    @GetMapping("/me")
    public MemberResponseDto getMemberById(Authentication authentication) {
        Long memberId = memberService.getCurrentMemberId();
        return memberService.getMemberById(memberId);
    }
}
