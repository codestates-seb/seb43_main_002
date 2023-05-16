package com.branch.sikgu.member.repository;

import com.branch.sikgu.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    boolean existsByEmail(String email);
    boolean existsByNickname(String nickname);
    Optional<Member> findByEmail(String email);

    List<Member> findAll();
}