package com.branch.sickgu.member.controller;

import com.branch.sickgu.member.entity.Member;
import com.branch.sickgu.member.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/members")
public class MemberController {
    @Autowired
    private MemberService memberService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {
        try {
            // SignupRequest를 Member로 변환
            Member member = new Member(request.getName(), request.getEmail(), request.getPassword(), request.getGender(), request.getAgeRange());

            // 회원가입 처리
            memberService.signup(member);

            // HTTP 상태코드 201 Created와 함께 회원가입 성공 메시지 반환
            return ResponseEntity.status(HttpStatus.CREATED).body("회원가입이 완료되었습니다.");
        } catch (Exception e) {
            // HTTP 상태코드 400 Bad Request와 함께 실패 메시지 반환
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
