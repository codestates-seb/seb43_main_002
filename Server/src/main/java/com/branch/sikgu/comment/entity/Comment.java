package com.branch.sikgu.comment.entity;

import com.branch.sikgu.board.entity.Board;
import com.branch.sikgu.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "COMMENT")
@Getter
@Setter
@NoArgsConstructor
@Component
@EnableJpaAuditing
public class Comment {
    // 댓글 식별자
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    // 댓글 내용
    @Column(nullable = false, columnDefinition = "TEXT")
    private String body;

    // 작성 시기
    @Column(name = "CREATED_AT", nullable = false)
    LocalDateTime createdAt;

    // 수정 시기
    @Column(name = "UPDATED_AT")
    LocalDateTime updatedAt;

    // 댓글 상태
    @Enumerated(EnumType.STRING)
    private CommentStatus commentStatus = CommentStatus.ACTIVE_COMMENT;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Member member;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Board board;

    // 댓글 상태 ENUM
    @AllArgsConstructor
    public enum CommentStatus {
        ACTIVE_COMMENT("활성화된 댓글"),
        INACTIVE_COMMENT("비활성화된 댓글"),
        DELETED_COMMENT("삭제된 댓글");

        @Getter
        private final String commentStatus;
    }

    // 엔티티가 영속화되기 전 필드 업데이트
    @CreatedDate
    @PrePersist
    public void prePersist() {
        LocalDateTime now = LocalDateTime.now();

        createdAt = now;
        updatedAt = now;
    }

    @LastModifiedDate
    @PreUpdate
    public void preUpdate() {
        updatedAt = LocalDateTime.now();
    }

}
