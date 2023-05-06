package com.branch.sickgu.member.controller;

import com.branch.sickgu.member.dto.MemberResponseDto;
import com.branch.sickgu.member.dto.MemberSignUpRequestDto;
import com.branch.sickgu.member.dto.MemberSignUpResponseDto;

import com.branch.sickgu.member.mapper.MemberMapper;
import com.branch.sickgu.member.service.MemberService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/{memberId}")
    public ResponseEntity<MemberResponseDto> getMember(@PathVariable Long memberId) {
        MemberResponseDto member = memberService.getMemberById(memberId);
        return ResponseEntity.ok(member);
    }
}
