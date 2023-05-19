package com.branch.sikgu.comment.dto;

import lombok.*;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class CommentDto {
    @Getter
    @AllArgsConstructor
    public static class Response {
        private long commentId;
        private long memberId;
        private String nickName;
        private String body;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Post {
        @NotBlank
        private String body;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Patch {
        @Setter
        private long commentId;
        @NotBlank
        private String body;
        private LocalDateTime updatedAt;
    }
}
