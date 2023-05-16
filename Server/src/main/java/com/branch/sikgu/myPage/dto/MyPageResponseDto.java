package com.branch.sikgu.myPage.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MyPageResponseDto {
    private Long myPageId;
    private String nickname;
    private String image;
    private String introduce;
    private Long likes;
    private Long followerCount;
    private String review;
}