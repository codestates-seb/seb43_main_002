package com.branch.sikgu.meal.history.entity;

import com.branch.sikgu.board.entity.Board;
import com.branch.sikgu.member.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "HISTORY")
@Getter
@Setter
@NoArgsConstructor
@Component
//@EnableJpaAuditing
public class History {

    // 식사이력 식별자
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long historyId;

    @OneToOne
    @JoinColumn(nullable = false)
    private Board board;

    @ManyToMany
    @JoinTable(
            name = "MEAL_HISTORY_MEMBER",
            joinColumns = @JoinColumn(name = "HISTORY_ID"),
            inverseJoinColumns = @JoinColumn(name = "MEMBER_ID")
    )
    private List<Member> members;
}
