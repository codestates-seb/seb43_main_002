package com.branch.sikgu.meal.history.dto;

import com.branch.sikgu.board.dto.BoardDto;
import com.branch.sikgu.member.dto.MemberResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

public class HistoryDto {

    @Getter
    @AllArgsConstructor
    public static class Response {
        private Long historyId;
        private BoardDto.Response board;
        private List<MemberResponseDto> members;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Post {
        private Long boardId;
    }
}