package com.branch.sikgu.post.repository;

import com.branch.sikgu.post.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}
