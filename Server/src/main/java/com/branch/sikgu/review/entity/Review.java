package com.branch.sikgu.review.entity;

import com.branch.sikgu.meal.history.entity.History;
import com.branch.sikgu.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "MEAL_ATTENDEE_REVIEW")
@Getter
@Setter
@NoArgsConstructor
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "REVIEW_ID")
    private Long reviewId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "history_id")
    private History history;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reviewer_id")
    private Member reviewer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "target_member_id")
    private Member targetMember;

    @Column(name = "content")
    private String content;

    @Column(name = "liked")
    private boolean liked = false;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private ReviewStatus status = ReviewStatus.REVIEW_PENDING;

    public enum ReviewStatus {
        REVIEW_PENDING("리뷰 제출 전"),
        REVIEW_SUBMITTED("리뷰 제출 완료");

        @Getter
        private String status;

        ReviewStatus(String status) {
            this.status = status;
        }
    }

    // 추가적인 필드들...
}