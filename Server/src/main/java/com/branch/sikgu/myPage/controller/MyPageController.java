package com.branch.sikgu.myPage.controller;

import com.branch.sikgu.myPage.dto.MyPageRequestDto;
import com.branch.sikgu.myPage.dto.MyPageResponseDto;
import com.branch.sikgu.myPage.mapper.MyPageMapper;
import com.branch.sikgu.myPage.service.MyPageService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/mypages")
@AllArgsConstructor
public class MyPageController {

    private MyPageService myPageService;

    // 마이페이지 조회
    @GetMapping("/{memberId}")
    public ResponseEntity<MyPageResponseDto> showMyPage(
            @PathVariable Long memberId) {
        MyPageResponseDto myPageResponseDto = myPageService.getMyPage(memberId);
        return ResponseEntity.ok(myPageResponseDto);
    }

    // 마이페이지 수정
    @PatchMapping("/{memberId}")
    public ResponseEntity<MyPageResponseDto> updateMyPage(
            @PathVariable Long memberId,
            @RequestBody MyPageRequestDto myPageRequestDto,
            Authentication authentication) {
        MyPageResponseDto myPageResponseDto = myPageService.updateMyPage(memberId, myPageRequestDto, authentication);
        return ResponseEntity.ok(myPageResponseDto);
    }

    @PostMapping("/{myPageId}/follow/{followingId}")
    public ResponseEntity<String> followMyPage(
            @PathVariable("myPageId") Long myPageId,
            @PathVariable("followingId") Long followingId) {

        myPageService.followMyPage(myPageId, followingId);

        return ResponseEntity.ok("유저를 팔로우 했습니다.");
    }

    @PostMapping("/{myPageId}/unfollow/{followingId}")
    public ResponseEntity<String> unfollowMyPage(
            @PathVariable("myPageId") Long myPageId,
            @PathVariable("followingId") Long followingId) {

        myPageService.unfollowMyPage(myPageId, followingId);

        return ResponseEntity.ok("유저를 언팔로우 했습니다.");
    }
}
