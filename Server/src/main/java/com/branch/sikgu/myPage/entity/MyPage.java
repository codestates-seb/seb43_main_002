package com.branch.sikgu.myPage.entity;

import com.branch.sikgu.group.entity.Group;
import com.branch.sikgu.member.entity.Member;
import com.branch.sikgu.post.entity.Post;
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

    @Column(name = "introduce")
    private String introduce;

    @Column(name = "likes")
    private Long likes = 0L;

    @Column(name = "follower_count")
    private Long followerCount = 0L;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Board> recentPost = new ArrayList<>();

    @Column(name = "review", columnDefinition = "TEXT")
    private String review;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "GroupId")
//    private Group group;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "member_id")
    private Member member;
    public void setMember(Member member) {
        this.member = member;
    }
}