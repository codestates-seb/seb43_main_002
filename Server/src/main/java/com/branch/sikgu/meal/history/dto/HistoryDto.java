package com.branch.sikgu.meal.history.dto;

import com.branch.sikgu.meal.board.dto.BoardDto;
import com.branch.sikgu.meal.board.entity.Board;
import com.branch.sikgu.meal.history.entity.History;
import com.branch.sikgu.member.dto.MemberResponseDto;
import com.branch.sikgu.member.entity.Member;
import com.branch.sikgu.myPage.entity.MyPage;
import lombok.*;

import java.util.List;

public class HistoryDto {

    @Getter
    @AllArgsConstructor
    public static class Response {
        private Long historyId;
        private History.HistoryStatus status;
        private BoardDto.BoardMemberResponse board;
        private List<MemberResponseDto.HistoryMemberResponse> members;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Post {
        private Long boardId;
        private List<MemberResponseDto> members;
    }
}