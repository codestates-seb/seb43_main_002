package com.branch.sikgu.myPage.entity;

import com.branch.sikgu.board.entity.Board;
import com.branch.sikgu.member.entity.Member;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "MYPAGES")
public class MyPage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "my_page_id")
    private Long myPageId;

    @Column(name = "image")
    private String imagePath;
    @Column(name = "introduce")
    private String introduce;

    @Column(name = "likes")
    private Long likes = 0L;

    @Column(name = "follower_count")
    private Long followerCount = 0L;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Board> recentPost = new ArrayList<>();


    // 나중에 식사한 인원의 평가들을 담을 필드 연관관계 매핑 후 수정 예정
    @Column(name = "review", columnDefinition = "TEXT")
    private String review;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "GroupId")
//    private Group group;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "member_id")
    private Member member;
}