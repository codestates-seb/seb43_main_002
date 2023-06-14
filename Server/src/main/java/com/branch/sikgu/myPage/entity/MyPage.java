package com.branch.sikgu.myPage.entity;

import com.branch.sikgu.meal.board.entity.Board;
import com.branch.sikgu.image.Entity.Image;
import com.branch.sikgu.member.entity.Member;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "MEMBER_PROFILE")
public class MyPage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PROFILE_ID")
    private Long myPageId;
    @Column(name = "introduce")
    private String introduce;
    @Column(name = "likes")
    private Long likes = 0L;
    @Column(name = "following_count")
    private Long followingCount = 0L;
    @Column(name = "follower_count")
    private Long followerCount = 0L;
    // 팔로잉 관계 설정
    @ManyToMany
    @JoinTable(
            name = "member_following",
            joinColumns = @JoinColumn(name = "follower_id"),
            inverseJoinColumns = @JoinColumn(name = "following_id")
    )
    private List<MyPage> followings = new ArrayList<>();

    // 나를 팔로우한 마이페이지 목록
    @ManyToMany(mappedBy = "followings")
    private List<MyPage> followers = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Board> recentPost = new ArrayList<>();
    // 나중에 식사한 인원의 평가들을 담을 필드 연관관계 매핑 후 수정 예정
    @Column(name = "review", columnDefinition = "TEXT")
    private String review;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "PROFILE_IMAGE_ID")
    private Image image;
    public MyPage() {
        this.image = new Image();
        this.image.setMyPage(this);
    }
    private Long likeCount;
}
