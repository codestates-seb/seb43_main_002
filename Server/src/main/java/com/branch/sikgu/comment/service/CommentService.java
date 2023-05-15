package com.branch.sikgu.comment.service;

import com.branch.sikgu.auth.jwt.JwtTokenizer;
import com.branch.sikgu.board.entity.Board;
import com.branch.sikgu.board.service.BoardService;
import com.branch.sikgu.comment.entity.Comment;
import com.branch.sikgu.comment.mapper.CommentMapper;
import com.branch.sikgu.comment.repository.CommentRepository;
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
    private final CommentService commentService;
    private final Comment comment;
    private final JwtTokenizer jwtTokenizer;

    // 댓글 작성
    public Comment createComment(Comment comment, String authentication) {
        Member member = memberService.findMember(authentication);
        comment.setMember(member);

        return commentRepository.save(comment);
    }

    // 댓글 수정
    public Comment updateComment(Comment comment, String authentication) {
        Comment findComment = findComment(comment.getCommentId());
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
    public List<Comment> findComments(long boardId) {
        Board board = boardService.getBoardById(boardId);

        return commentRepository.findByBoardId(board.getBoardId());
    }

    // 댓글 삭제
    public void deleteComment(long commentId, String authentication) {
        Comment findComment = findComment(commentId);
        Member findmember = findComment.getMember();

        if (!findmember.getMemberId().equals(memberService.findMember(authentication).getMemberId())) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_FORBIDDEN, HttpStatus.FORBIDDEN);
        }
        comment.setCommentStatus(Comment.CommentStatus.DELETED_COMMENT);
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
        if (comment.getCommentStatus().equals(Comment.CommentStatus.DELETED_COMMENT)) {
            throw new BusinessLogicException(ExceptionCode.DELETED_COMMENT, HttpStatus.NO_CONTENT);
        }

        return findComment;
    }
}
