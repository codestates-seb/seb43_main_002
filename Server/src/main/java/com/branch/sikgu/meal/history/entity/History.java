package com.branch.sikgu.meal.history.entity;

import com.branch.sikgu.meal.board.entity.Board;
import com.branch.sikgu.member.entity.Member;
import com.branch.sikgu.review.entity.Review;
import com.branch.sikgu.review.repository.ReviewRepository;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "MEAL_HISTORY")
@Getter
@Setter
@NoArgsConstructor
@Component
//@EnableJpaAuditing
public class History {
    // 식사이력 식별자
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "HISTORY_ID")
    private Long historyId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SCHEDULE_ID", nullable = false)
    private Board board;

    @ManyToMany
    @JoinTable(
            name = "MEAL_ATTENDEE",
            joinColumns = @JoinColumn(name = "HISTORY_ID"),
            inverseJoinColumns = @JoinColumn(name = "MEMBER_ID")
    )
    private List<Member> members;

    @OneToMany(mappedBy = "history", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviews = new ArrayList<>();

    @Column(name = "status")
    private boolean status = false;



//    @Column(name = "status")
//    @Enumerated(EnumType.STRING)
//    private HistoryStatus historyStatus = HistoryStatus.BEFORE_OVER_MEAL;

//    public enum HistoryStatus {
//        BEFORE_OVER_MEAL("식사시간이 지나지 않은 식사"),
//        OVER_MEALTIME("식사시간이 지난 식사 이력"),
//        END_REVIEW_HISTORY("평가가 종료된 식사 이력");
//
//        @Getter
//        private final String historyStatus;
//
//        HistoryStatus(String historyStatus) {
//            this.historyStatus = historyStatus;
//        }
//    }
}
