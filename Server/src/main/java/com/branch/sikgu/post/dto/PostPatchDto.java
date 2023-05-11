package com.branch.sikgu.post.dto;

import com.branch.sikgu.post.entity.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class PostPatchDto {
    @Getter
    @AllArgsConstructor
    public static class Patch {
        @NotBlank
        private String title;
        @NotBlank
        private String body;

        private int total;
        private Post.PassedGender passedGender;
        private LocalDateTime mealTime;

    }
}