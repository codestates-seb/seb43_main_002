package com.branch.sikgu.board.entity;

import com.branch.sikgu.meal.history.entity.History;
import com.branch.sikgu.member.entity.Member;
import com.branch.sikgu.myPage.entity.MyPage;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Table(name = "BOARD")
@Entity
@AllArgsConstructor
public class Board {
    // 게시물 ID
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardId;

    // 제목
    @Column(nullable = false, length = 25)
    private String title;

    // 본문
    @Column(nullable = false, columnDefinition = "TEXT")
    private String body;

    // 식사 인원수
    @Column
    private int total;

    @Column
    private int count = 1;

    // 생성 일자
    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    // 수정 일자
    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    // 식사 시간
    @Column(name = "meal_time")
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime mealTime;

    // 허용된 성별
    @Column(name = "passed_gender")
    private PassedGender passedGender = PassedGender.ANY;

    // 게시물 상태
    @Column(name = "STATUS")
    private BoardStatus boardStatus = BoardStatus.ACTIVE_BOARD;


    public enum BoardStatus {
        ACTIVE_BOARD("활성화된 게시물"),
        INACTIVE_BOARD("비활성화된 게시물"),
        DELETED_BOARD("삭제된 게시물");

        @Getter
        private final String boardStatus;

        BoardStatus(String boardStatus) {
            this.boardStatus = boardStatus;
        }
    }

    public enum PassedGender {
        MALE("남성만 참여가능"),
        FEMALE("여성만 참여가능"),
        ANY("누구나 참여가능");

        @Getter
        private final String passedGender;

        PassedGender(String passedGender) {
            this.passedGender = passedGender;
        }
    }
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "BOARD_TAGS", joinColumns = @JoinColumn(name = "board_id"))
    @Column(name = "tag")
    @org.hibernate.annotations.OrderBy(clause = "tag asc")
    @OrderColumn(name = "index")
    private Set<String> tags = new LinkedHashSet<>();

    // Board 엔티티
    @OneToOne(mappedBy = "board", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private History history;

    public Board() {
        this.history = new History();
        this.history.setBoard(this);
    }

    public void setTags(Set<String> tags) {
        this.tags = tags;
    }
}