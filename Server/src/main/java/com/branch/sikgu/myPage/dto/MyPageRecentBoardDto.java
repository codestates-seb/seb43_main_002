package com.branch.sikgu.myPage.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
public class MyPageRecentBoardDto {
    private Long boardId;
    private String title;
    private String type;
    private LocalDate createdAt;
    private String profileImage;
}
