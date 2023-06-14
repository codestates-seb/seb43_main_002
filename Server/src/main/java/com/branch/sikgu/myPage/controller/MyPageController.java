package com.branch.sikgu.myPage.controller;

import com.branch.sikgu.myPage.dto.MyPageFollowerDto;
import com.branch.sikgu.myPage.dto.MyPageRequestDto;
import com.branch.sikgu.myPage.dto.MyPageResponseDto;
import com.branch.sikgu.myPage.service.MyPageService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;


@RestController
@RequestMapping("/api/mypages")
@AllArgsConstructor
public class MyPageController {

    private MyPageService myPageService;

    // 마이페이지 조회
    @GetMapping("/{memberId}")
    public ResponseEntity<MyPageResponseDto> showMyPage(
            @PathVariable Long memberId, Authentication authentication) {
        MyPageResponseDto myPageResponseDto = myPageService.getMyPage(memberId, authentication);
        return ResponseEntity.ok(myPageResponseDto);
    }

    // 프로필이미지 보여주기
    @GetMapping("/{myPageId}/image")
    public void downloadImage(@PathVariable Long myPageId, HttpServletResponse response) {
        myPageService.downloadImage(myPageId, response);
    }

    // 자신을 팔로우하고 있는 멤버들의 목록 보여주기
    @GetMapping("/{myPageId}/follower")
    public ResponseEntity<List<MyPageFollowerDto>> myFollower(@PathVariable Long myPageId) {
        List<MyPageFollowerDto> myPageFollowerDtoList = myPageService.getMyFollower(myPageId);
        return ResponseEntity.ok(myPageFollowerDtoList);
    }

    // 마이페이지 수정
    @PatchMapping("/{memberId}")
    public ResponseEntity<Void> updateMyPage(
            @PathVariable Long memberId,
            @RequestPart(name = "myPageRequestDto") MyPageRequestDto myPageRequestDto,
            @RequestPart(required = false, name = "file") MultipartFile file,
            Authentication authentication) throws IOException {
            myPageService.updateMyPage(memberId, myPageRequestDto, authentication, file);
            return ResponseEntity.ok().build();
    }

    // 테스트용
    @GetMapping("/test")
    public String test() {

        return "/HELLO/";
    }

    // 팔로우 하기
    @PostMapping("/{myPageId}/follow")
    public ResponseEntity<Void> followMyPage(
            @PathVariable("myPageId") Long myPageId,
            Authentication authentication) {

        myPageService.followMyPage(myPageId, authentication);

        return ResponseEntity.ok().build();
    }

    // 언팔로우 하기
    @PostMapping("/{myPageId}/unfollow")
    public ResponseEntity<Void> unfollowMyPage(
            @PathVariable("myPageId") Long myPageId,
            Authentication authentication) {

        myPageService.unfollowMyPage(myPageId, authentication);

        return ResponseEntity.ok().build();
    }
}
