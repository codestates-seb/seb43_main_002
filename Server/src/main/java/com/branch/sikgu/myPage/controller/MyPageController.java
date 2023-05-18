package com.branch.sikgu.myPage.controller;

import com.branch.sikgu.image.Service.ImageService;
import com.branch.sikgu.myPage.dto.MyPageRequestDto;
import com.branch.sikgu.myPage.dto.MyPageResponseDto;
import com.branch.sikgu.myPage.service.MyPageService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/mypages")
@AllArgsConstructor
public class MyPageController {

    private MyPageService myPageService;
    private final ImageService imageService;

    // 마이페이지 조회
    @GetMapping("/{memberId}")
    public ResponseEntity<MyPageResponseDto> showMyPage(
            @PathVariable Long memberId) {
        MyPageResponseDto myPageResponseDto = myPageService.getMyPage(memberId);
        return ResponseEntity.ok(myPageResponseDto);
    }

    @PostMapping("/{myPageId}/image")
    public ResponseEntity<String> uploadImage(
            @PathVariable Long myPageId,
            @RequestPart("file") MultipartFile file,
            Authentication authentication) {
        try {
            // 이미지 업로드 및 마이페이지 이미지 경로 업데이트
            String imagePath = myPageService.uploadMyPageImage(myPageId, file, authentication);
            // 업로드된 이미지 경로를 클라이언트에 반환
            return ResponseEntity.ok(imagePath);
        } catch (Exception e) {
            // 업로드 실패 시 예외 처리
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("이미지 업로드에 실패했습니다.");
        }
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

    @PostMapping("/{myPageId}/follow")
    public ResponseEntity<String> followMyPage(
            @PathVariable("myPageId") Long myPageId,
            Authentication authentication) {

        myPageService.followMyPage(myPageId, authentication);

        return ResponseEntity.ok("유저를 팔로우 했습니다.");
    }

    @PostMapping("/{myPageId}/unfollow")
    public ResponseEntity<String> unfollowMyPage(
            @PathVariable("myPageId") Long myPageId,
            Authentication authentication) {

        myPageService.unfollowMyPage(myPageId, authentication);

        return ResponseEntity.ok("유저를 언팔로우 했습니다.");
    }
}
