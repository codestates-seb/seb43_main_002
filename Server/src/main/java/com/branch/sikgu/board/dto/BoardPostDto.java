package com.branch.sikgu.post.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class BoardPostDto {
    @Getter
    @AllArgsConstructor
    public static class Request {
        @NotBlank
        private String title;
        @NotBlank
        private String body;

        private int total;
        private com.branch.sikgu.post.entity.Post.PassedGender passedGender;
        private LocalDateTime mealTime;
    }
}
