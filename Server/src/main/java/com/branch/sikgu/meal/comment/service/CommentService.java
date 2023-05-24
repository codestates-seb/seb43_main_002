package com.branch.sikgu.meal.comment.service;

import com.branch.sikgu.meal.board.entity.Board;
import com.branch.sikgu.meal.board.service.BoardService;
import com.branch.sikgu.meal.comment.entity.Comment;
import com.branch.sikgu.meal.comment.repository.CommentRepository;
import com.branch.sikgu.exception.BusinessLogicException;
import com.branch.sikgu.exception.ExceptionCode;
import com.branch.sikgu.exception.HttpStatus;
import com.branch.sikgu.member.entity.Member;
import com.branch.sikgu.member.service.MemberService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
@Slf4j
public class CommentService {

    private final CommentRepository commentRepository;
    private final MemberService memberService;
    private final BoardService boardService;
    private final Comment comment;

    // 댓글 작성
    public Comment createComment(Comment comment, long boardId, String authentication) {
        // 본인의 게시물에는 식사 신청을 할 수 없는 로직 (필요에 따라 사용)
//        Comment findComment = findVerificationComment(comment.getCommentId());
//        Member findMember = findComment.getMember();
//        if (findMember.getMemberId().equals(memberService.findMember(authentication).getMemberId())) {
//            throw new BusinessLogicException(ExceptionCode.CAN_NOT_WRITE, HttpStatus.FORBIDDEN);
//        }

        Member member = memberService.findMember(authentication);
        Board board = boardService.getBoardById(boardId);

        comment.setMember(member);
        comment.setBoard(board);

        return commentRepository.save(comment);
    }

    // 댓글 수정
    public Comment updateComment(Comment comment, String authentication) {
        Comment findComment = findVerificationComment(comment.getCommentId());
        Member findmember = findComment.getMember();

        // 토큰에서 가져온 멤버와 댓글 작성자인 멤버가 다른지 확인하고 다르면 예외 발생
        if (!findmember.getMemberId().equals(memberService.findMember(authentication).getMemberId())) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_FORBIDDEN, HttpStatus.FORBIDDEN);
        }
        // Body가 Null이 아닌 경우에만 Body 업데이트
        Optional.ofNullable(comment.getBody()).ifPresent(findComment::setBody);

        return commentRepository.save(findComment);
    }

    // 댓글 조회
    public List<Comment> findComments(long boardId) { // 보드 Id로 comment를 가져옴.....
        Board board = boardService.getBoardById(boardId);

        return commentRepository.findByBoardId(board.getBoardId());
    }

    // 댓글 삭제
    public void deleteComment(long commentId, String authentication) {
        Comment findComment = findComment(commentId);
        Member findmember = findComment.getMember();

        // 작성자와 삭제하려는 멤버가 다른 경우 예외 발생
        if (!findmember.getMemberId().equals(memberService.findMember(authentication).getMemberId())) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_FORBIDDEN, HttpStatus.FORBIDDEN);
        }
        comment.setStatus(Comment.CommentStatus.DELETED_COMMENT);

        commentRepository.delete(findComment);
    }


    // 댓글이 있는지 확인
    public Comment findComment(long commentId) {
        return findVerificationComment(commentId);
    }

    private Comment findVerificationComment(long commentId) {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        // 댓글이 비활성화되어 못찾는 경우
        Comment findComment = optionalComment.orElseThrow(() -> new BusinessLogicException(
                ExceptionCode.COMMENT_NOT_FOUND, HttpStatus.NOT_FOUND
        ));

        // 댓글이 삭제되어 못찾는 경우
        Comment comment = optionalComment.get();
        if (comment.getStatus().equals(Comment.CommentStatus.DELETED_COMMENT)) {
            throw new BusinessLogicException(ExceptionCode.DELETED_COMMENT, HttpStatus.NO_CONTENT);
        }

        return findComment;
    }
}
