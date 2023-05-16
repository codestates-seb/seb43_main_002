package com.branch.sikgu.myPage.repository;

import com.branch.sikgu.myPage.entity.MyPage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MyPageRepository extends JpaRepository<MyPage, Long> {
    MyPage findByMember_MemberId(Long memberId);
}
