package com.branch.sikgu.myPage.dto;

import com.branch.sikgu.myPage.entity.MyPage;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class MyPageResponseDto {
    private Long myPageId;
    private String name;
    private String email;
    private boolean gender;
    private LocalDate birthday;
    private String nickname;
    private String introduce;
    private Long likes;
    private Long followingCount;
    private List<FollowingDto> followings;
    private Long followerCount;
    private boolean followingCurrentUser;
    private List<MyPageRecentBoardDto> recentBoard;
    private List<MyPageRecentReviewDto> recentReview;
}