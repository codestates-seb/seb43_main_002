package com.branch.sikgu.myPage.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MyPageRecentReviewDto {
    private Long reviewerId;
    private String reviewerNickName;
    private boolean liked;
    private String reviewContent;
}
