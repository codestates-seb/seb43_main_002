package com.branch.sikgu.meal.history.dto;

import com.branch.sikgu.meal.board.entity.Board;
import com.branch.sikgu.member.entity.Member;
import com.branch.sikgu.myPage.entity.MyPage;
import lombok.*;

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