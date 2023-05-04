package com.branch.sickgu.member.repository;

import com.branch.sickgu.member.entity.Member;
import org.springframework.data.repository.CrudRepository;

public interface MemberRepository extends CrudRepository<Member, Long> {
    boolean existsByEmail(String email);
}