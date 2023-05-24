package com.branch.sikgu.myPage.controller;

import com.branch.sikgu.image.Repository.ImageRepository;
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


@RestController
@CrossOrigin(origins = "http://sik-gu.com.s3-website.ap-northeast-2.amazonaws.com")
@RequestMapping("/api/mypages")
@AllArgsConstructor
public class MyPageController {

    private MyPageService myPageService;
    private ImageRepository imageRepository;

    // 마이페이지 조회
    @GetMapping("/{memberId}")
    public ResponseEntity<MyPageResponseDto> showMyPage(
            @PathVariable Long memberId, Authentication authentication) {
        MyPageResponseDto myPageResponseDto = myPageService.getMyPage(memberId, authentication);
        return ResponseEntity.ok(myPageResponseDto);
    }

    @GetMapping("/{myPageId}/image")
    public void downloadImage(@PathVariable Long myPageId, HttpServletResponse response) {
        myPageService.downloadImage(myPageId, response);
    }

    // 마이페이지 수정
    @PatchMapping("/{memberId}")
    public ResponseEntity<Void> updateMyPage(
            @PathVariable Long memberId,
            @RequestPart("myPageRequestDto") MyPageRequestDto myPageRequestDto,
            @RequestPart("file") MultipartFile file,
            Authentication authentication) throws IOException {
            myPageService.updateMyPage(memberId, myPageRequestDto, authentication, file);
            return ResponseEntity.ok().build();
    }

    @GetMapping("/test")
    public String test() {
        System.out.println("@@@");
        return "hello";
    }

    @PostMapping("/{myPageId}/follow")
    public ResponseEntity<Void> followMyPage(
            @PathVariable("myPageId") Long myPageId,
            Authentication authentication) {

        myPageService.followMyPage(myPageId, authentication);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/{myPageId}/unfollow")
    public ResponseEntity<Void> unfollowMyPage(
            @PathVariable("myPageId") Long myPageId,
            Authentication authentication) {

        myPageService.unfollowMyPage(myPageId, authentication);

        return ResponseEntity.ok().build();
    }
}
