package com.branch.sikgu.post.repository;

import com.branch.sikgu.post.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    // 멤버Id와 PostId로 Post를 찾는 건데, 필요한지 모르겠음
    Optional<Post> findByIdAndMemberMemberId(Long postId, Long memberId);

    // 멤버 아이디로 Post 검색
    List<Post> findByMemberMemberId(Long memberId);
}
