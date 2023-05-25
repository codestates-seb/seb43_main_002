package com.branch.sikgu.review.controller;


import com.branch.sikgu.review.dto.ReviewDto;
import com.branch.sikgu.review.service.ReviewService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/mypages")
@AllArgsConstructor
public class ReviewController {

    private ReviewService reviewService;

    @PostMapping("/{memberId}/review")
    public ResponseEntity addReview(@PathVariable Long memberId,
                                    @RequestBody ReviewDto.Post requestDto,
                                    Authentication authentication) {

        reviewService.addReviewAndLikeToMember(requestDto.getHistoryId(), memberId, requestDto, authentication);

        return ResponseEntity.ok("리뷰가 등록되었습니다.");
    }
}