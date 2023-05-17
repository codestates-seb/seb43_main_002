package com.branch.sikgu.myPage.dto;

import com.branch.sikgu.myPage.entity.MyPage;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class MyPageResponseDto {
    private Long myPageId;
    private String nickname;
    private String image;
    private String introduce;
    private Long likes;
    private Long followingCount;
    private List<FollowingDto> followings;
    private Long followerCount;
    private String review;
}