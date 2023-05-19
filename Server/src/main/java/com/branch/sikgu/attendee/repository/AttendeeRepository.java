package com.branch.sikgu.attendee.repository;

import com.branch.sikgu.attendee.entity.Attendee;
import com.branch.sikgu.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AttendeeRepository extends JpaRepository<Attendee, Long> {
}
