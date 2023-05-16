package com.branch.sikgu.board.dto;

import com.branch.sikgu.board.entity.Board;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

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
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Setter
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
    }

    @Getter
    @AllArgsConstructor
    @Setter
    public static class Response{
        private Long memberId;
        private Long boardId;
        private String title;
        private String body;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        private int total;
        private Board.PassedGender passedGender;
        private LocalDateTime mealTime;
    }
}
