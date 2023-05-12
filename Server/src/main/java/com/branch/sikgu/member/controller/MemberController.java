package com.branch.sikgu.member.controller;

import com.branch.sikgu.member.dto.MemberResponseDto;
import com.branch.sikgu.member.dto.MemberSignUpRequestDto;
import com.branch.sikgu.member.dto.MemberSignUpResponseDto;

import com.branch.sikgu.member.dto.MemberUpdateRequestDto;
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

    // 회원가입
    @PostMapping("/signup")
    public ResponseEntity<MemberSignUpResponseDto> signUp(@Validated
            @RequestBody MemberSignUpRequestDto memberSignUpRequestDto) {
        MemberSignUpResponseDto memberSignUpResponseDto = memberService.signUp(memberSignUpRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(memberSignUpResponseDto);
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
    @DeleteMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteMember(Authentication authentication) {
        memberService.deleteMember(authentication);
    }
}
