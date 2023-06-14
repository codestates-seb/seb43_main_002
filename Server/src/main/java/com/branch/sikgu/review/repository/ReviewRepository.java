package com.branch.sikgu.review.repository;

import com.branch.sikgu.meal.history.entity.History;
import com.branch.sikgu.member.entity.Member;
import com.branch.sikgu.review.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByTargetMember_MemberIdOrderByCreatedAtDesc(Long myPageId);

    Review findByReviewerAndTargetMemberAndHistory(Member currentUser, Member targetMember, History history);
}