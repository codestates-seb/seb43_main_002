package com.branch.sikgu.board.entity;

import com.branch.sikgu.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@NoArgsConstructor
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
    @Column
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
        MALE("남자만"),
        FEMALE("여자만"),
        ANY("모두");

        @Getter
        private final String passedGender;

        PassedGender(String passedGender) {
            this.passedGender = passedGender;
        }
    }
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
}