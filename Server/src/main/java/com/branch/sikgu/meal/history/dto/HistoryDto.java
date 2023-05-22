package com.branch.sikgu.meal.history.dto;

import com.branch.sikgu.board.dto.BoardDto;
import com.branch.sikgu.board.entity.Board;
import com.branch.sikgu.member.dto.MemberResponseDto;
import com.branch.sikgu.member.entity.Member;
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
        private Board board;
        private List<Member> members;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Post {
        private Long boardId;
        private List<Member> members;
    }
}