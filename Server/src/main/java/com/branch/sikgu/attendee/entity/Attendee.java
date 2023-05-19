package com.branch.sikgu.attendee.entity;

import com.branch.sikgu.board.entity.Board;
import com.branch.sikgu.member.entity.Member;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "ATTENDEE")
public class Attendee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long AttendeeId;

    @OneToOne
    @JoinColumn(nullable = false)
    private Board board;

    @OneToMany
    @JoinColumn(nullable = false)
    private List<Member> member;

}
