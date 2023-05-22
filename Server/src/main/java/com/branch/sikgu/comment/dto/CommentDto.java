package com.branch.sikgu.comment.dto;

import com.branch.sikgu.comment.entity.Comment;
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
        private Long imageId;
        private String body;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
        private Comment.SelectionStatus selectionStatus;
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
