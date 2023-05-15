package com.branch.sikgu.board.dto;

import com.branch.sikgu.board.entity.Board;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class BoardPostDto {
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
}
