package com.branch.sikgu.meal.history.entity;

import com.branch.sikgu.meal.board.entity.Board;
import com.branch.sikgu.member.entity.Member;
import com.branch.sikgu.review.entity.Review;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
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

}
