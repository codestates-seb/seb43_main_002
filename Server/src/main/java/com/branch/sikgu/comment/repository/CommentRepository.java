package com.branch.sikgu.comment.repository;

import com.branch.sikgu.comment.dto.CommentDto;
import com.branch.sikgu.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.stream.Collectors;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    // 해당 게시물에서 댓글 가져오기
    @Query(value = "SELECT c FROM Comment c WHERE c.board.boardId = :boardId")
    List<Comment> findByBoardId (long boardId);



    // 해당 멤버가 작성한 댓글 가져오기
//    @Query(value = "SELECT c FROM Comment c WHERE c.member.memberId = :memberId")
//    List<Comment> findByMemberId (long memberId);
}
