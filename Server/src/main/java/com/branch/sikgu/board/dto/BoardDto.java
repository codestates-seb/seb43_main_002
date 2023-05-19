package com.branch.sikgu.board.dto;

import com.branch.sikgu.board.entity.Board;
import lombok.*;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

public class BoardDto {
    @Setter
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Post {
        @NotBlank
        private String title;
        @NotBlank
        private String body;

        private int total;
        private Board.PassedGender passedGender;
        private LocalDateTime mealTime;
        private List<String> tags;
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Setter
    @EqualsAndHashCode
    public static class Patch {
        @Setter
        private Long boardId;
        @NotBlank
        private String title;
        @NotBlank
        private String body;

        private int total;
        private Board.PassedGender passedGender;
        private LocalDateTime mealTime;
        private List<String> tags;
    }

    @Getter
    @AllArgsConstructor
    @Setter
    public static class Response{
        private Long memberId;
        private String nickname;
        private String imagePath;
        private Long boardId;
        private Long memberId;
        private String nickName;
        private String imagePath;

        private String title;
        private String body;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        private int total;
        private Board.PassedGender passedGender;
        private LocalDateTime mealTime;
        private List<String> tags;
    }
}
