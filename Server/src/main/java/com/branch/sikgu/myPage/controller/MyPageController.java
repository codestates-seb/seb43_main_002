package com.branch.sikgu.myPage.controller;

import com.branch.sikgu.myPage.dto.MyPageResponseDto;
import com.branch.sikgu.myPage.mapper.MyPageMapper;
import com.branch.sikgu.myPage.service.MyPageService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/mypages")
@AllArgsConstructor
public class MyPageController {

    private MyPageService myPageService;

    @GetMapping("/{memberId}")
    public ResponseEntity<MyPageResponseDto> showMyPage(@PathVariable Long memberId) {


        MyPageResponseDto myPageResponseDto = myPageService.getMyPage(memberId);
        return ResponseEntity.ok(myPageResponseDto);
    }
}
