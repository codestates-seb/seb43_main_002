package com.branch.sikgu.myPage.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class MyPageRecentBoardDto {
    private Long boardId;
    private String title;
    private String type;
    private LocalDateTime createdAt;
    private String profileImage;
}
