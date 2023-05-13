package com.branch.sikgu.board.dto;

import com.branch.sikgu.board.entity.Board;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

public class BoardResponseDto {
    @Getter
    @AllArgsConstructor
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