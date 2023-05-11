package com.branch.sikgu.post.controller;

import com.branch.sikgu.post.dto.PostPatchDto;
import com.branch.sikgu.post.dto.PostRequestDto;
import com.branch.sikgu.post.dto.PostResponseDto;
import com.branch.sikgu.post.service.PostService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/posts")
@Validated
@AllArgsConstructor
@Slf4j
public class PostController {
    private PostService postService;

    // 게시물 등록 API
    @PostMapping
    public ResponseEntity<PostResponseDto.Response> createPost(
            @RequestBody @Valid PostRequestDto.Request requestDto,
            @RequestHeader(name = "Authorization") String authentication) {
        PostResponseDto.Response responseDto = postService.createPost(requestDto, authentication);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
    }

    // 게시물 수정 API
    @PatchMapping("/{post-id}")
    public ResponseEntity<PostResponseDto.Response> updatePost(
            @PathVariable("post-id") @Positive Long postId,
            @RequestBody @Valid PostPatchDto.Patch patchDto,
            @RequestHeader(name = "Authorization") String authentication
    ) {
        PostResponseDto.Response responseDto = postService.updatePost(postId, patchDto, authentication);
        return ResponseEntity.ok(responseDto);
    }

    // 게시물 삭제 API
    @DeleteMapping("/{post-id}")
    public ResponseEntity<Void> deletePost(
            @PathVariable("post-id") @Positive Long postId,
            @RequestHeader("Authorization") String authentication
    ) {
        postService.deletePost(postId, authentication);
        return ResponseEntity.noContent().build();
    }

    // 특정 멤버의 게시물 목록 조회 API
    @GetMapping("/{member-id}")
    public ResponseEntity<List<PostResponseDto.Response>> getPostsByMember(
            @PathVariable("member-id") @Positive Long memberId,
            @RequestHeader(name = "Authorization") String authentication
    ) {
        List<PostResponseDto.Response> responseDtoList = postService.getPostsByMember(authentication);
        return ResponseEntity.ok(responseDtoList);
    }

    // 게시물 조회 API
    @GetMapping("/{post-id}")
    public ResponseEntity<PostResponseDto.Response> getPostById(
            @PathVariable("post-id") @Positive Long postId
    ) {
        PostResponseDto.Response responseDto = postService.getPostResponseById(postId);
        return ResponseEntity.ok(responseDto);
    }
}