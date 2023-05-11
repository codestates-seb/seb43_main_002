package com.branch.sikgu.post.dto;

import com.branch.sikgu.post.entity.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

public class PostResponseDto {
    @Getter
    @AllArgsConstructor
    public static class Response{
        private long memberId;
        private long postId;
        private String title;
        private String body;
        private LocalDateTime createdAt;

        private int total;
        private Post.PassedGender passedGender;
        private LocalDateTime mealTime;
    }
}
