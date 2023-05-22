package com.branch.sikgu.board.service;

import com.branch.sikgu.auth.jwt.JwtTokenizer;
import com.branch.sikgu.comment.entity.Comment;
import com.branch.sikgu.comment.repository.CommentRepository;
import com.branch.sikgu.exception.BusinessLogicException;
import com.branch.sikgu.exception.ExceptionCode;
import com.branch.sikgu.exception.HttpStatus;
import com.branch.sikgu.meal.history.entity.History;
import com.branch.sikgu.meal.history.repository.HistoryRepository;
import com.branch.sikgu.member.entity.Member;
import com.branch.sikgu.member.service.MemberService;
import com.branch.sikgu.board.entity.Board;
import com.branch.sikgu.board.mapper.BoardMapper;
import com.branch.sikgu.board.repository.BoardRepository;
import com.branch.sikgu.board.dto.BoardDto;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.apache.commons.lang3.StringUtils;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BoardService {

    private final BoardRepository boardRepository;
    private final BoardMapper boardMapper;
    private final JwtTokenizer jwtTokenizer;
    private final MemberService memberService;
    private final CommentRepository commentRepository;
    private final HistoryRepository historyRepository;

    public BoardService(BoardRepository boardRepository, BoardMapper boardMapper, JwtTokenizer jwtTokenizer, MemberService memberService, CommentRepository commentRepository, HistoryRepository historyRepository) {
        this.boardRepository = boardRepository;
        this.boardMapper = boardMapper;
        this.jwtTokenizer = jwtTokenizer;
        this.memberService = memberService;
        this.commentRepository = commentRepository;
        this.historyRepository = historyRepository;
    }

    // 게시물 등록
    public BoardDto.Response createBoard(BoardDto.Post postDto, Authentication authentication) {
        Member member = memberService.findVerifiedMember(memberService.getCurrentMemberId(authentication));
        Board board = boardMapper.toEntity(postDto);
        board.setMember(member);
        Board savedBoard = boardRepository.save(board);

        return boardMapper.toResponseDto(savedBoard);
    }

    // 게시물 수정
    public BoardDto.Response updateBoard(Long boardId, BoardDto.Patch patchDto, String authentication) {
        Board board = getBoardById(boardId);
        Member member = memberService.findMember(authentication);

        // 작성자만 수정 가능하도록 확인
        if (!board.getMember().equals(member)) {
            throw new BusinessLogicException(ExceptionCode.INVALID_TOKEN, HttpStatus.NOT_FOUND);
        }

        // 비활성화된 게시물인지 확인
        Board existingBoard = boardRepository.findById(boardId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.INACTIVED_BOARD, HttpStatus.NOT_FOUND));

        boardMapper.updateEntity(existingBoard, patchDto);
        Board updatedBoard = boardRepository.save(existingBoard);

        BoardDto.Response responseDto = boardMapper.toResponseDto(updatedBoard);
        return responseDto;
    }

    //게시물 삭제
    public void deleteBoard(Long boardId, String authentication) {
        Long memberId = getMemberIdFromAuthentication(authentication);

        Member member = memberService.findMember(authentication);

        Board findBoard = getBoardById(boardId);

        checkIfDeleted(findBoard);

        verifiedRequest(member.getMemberId(), findBoard.getMember().getMemberId());

        findBoard.setBoardStatus(Board.BoardStatus.DELETED_BOARD);

//        Board existingBoard = getBoardByIdAndMember(boardId, memberId);
//        boardRepository.delete(existingBoard);
        boardRepository.save(findBoard);
    }

    // 전체 게시물 조회
    public List<BoardDto.Response> getAllBoards() {
        List<Board> boards = boardRepository.findAllByBoardStatus(Board.BoardStatus.ACTIVE_BOARD);

        return boardMapper.toResponseDtoList(boards);
    }

    // 내 게시물 조회
    public List<BoardDto.Response> getBoardsByMember(String authentication) {
        Member member = memberService.findMember(authentication);
        List<Board> boards = boardRepository.findByMemberMemberId(member.getMemberId());
        return boardMapper.toResponseDtoList(boards);
    }

    public BoardDto.Response getBoardResponseById(Long boardId) {
        Board board = getBoardById(boardId);
        return boardMapper.toResponseDto(board);
    }

    // 토큰에서 멤버 ID 가져오기
    private Long getMemberIdFromAuthentication(String authentication) {
        if (StringUtils.isBlank(authentication)) {
            throw new IllegalArgumentException("Authentication token is required.");
        }

        Long memberId = jwtTokenizer.getMemberId(authentication);
        if (memberId == null) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        return memberId;
    }

    // 게시물 가져오기
    public Board getBoardById(Long boardId) {
        return boardRepository.findById(boardId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.INACTIVED_BOARD, HttpStatus.NO_CONTENT));
    }

    public void selectCommentAndIncreaseCurrentCount(Long boardId, Long commentId, Authentication authentication) {
        Board board = boardRepository.findById(boardId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND, HttpStatus.NOT_FOUND));
        if (board.getBoardStatus() != Board.BoardStatus.ACTIVE_BOARD) {
            throw new BusinessLogicException(ExceptionCode.INACTIVED_BOARD, HttpStatus.BAD_REQUEST);
        }
        // 작성자와 인증된 사용자의 아이디를 비교하여 일치하는지 검증합니다.
        Long memberId = memberService.getCurrentMemberId(authentication);
        if (!board.getMember().getMemberId().equals(memberId)) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_UNAUTHORIZED, HttpStatus.FORBIDDEN);
        }
        Comment comment = commentRepository.findById(commentId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND, HttpStatus.NOT_FOUND));
        if (comment.getCommentStatus() != Comment.CommentStatus.ACTIVE_COMMENT) {
            throw new BusinessLogicException(ExceptionCode.DELETED_COMMENT, HttpStatus.BAD_REQUEST);
        }
        if (!comment.getBoard().equals(board)) {
            throw new BusinessLogicException(ExceptionCode.INVALID_REQUEST, HttpStatus.BAD_REQUEST);
        }
        if (comment.getSelectionStatus() == Comment.SelectionStatus.SELECTION) {
            throw new BusinessLogicException(ExceptionCode.ALREADY_SELECTED_COMMENT, HttpStatus.BAD_REQUEST);
        }

        // 선택된 코멘트의 상태를 변경합니다.
        comment.setSelectionStatus(Comment.SelectionStatus.SELECTION);

        // 보드의 현재 인원수를 1 증가시킵니다.
        if (board.getCount() < board.getTotal()) {
            board.setCount(board.getCount() + 1);
        } else {
            throw new BusinessLogicException(ExceptionCode.MAX_CAPACITY_REACHED, HttpStatus.FORBIDDEN);
        }

        // 변경된 상태를 저장합니다.
        commentRepository.save(comment);
        boardRepository.save(board);
    }

    // 게시물 ID와 작성한 멤버 ID 확인
    private Board getBoardByIdAndMember(Long boardId, Long memberId) {
        return boardRepository.findByBoardIdAndMemberMemberId(boardId, memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_MISMATCHED, HttpStatus.BAD_REQUEST));
    }

    // 삭제된 게시물인지 확인
    private static void checkIfDeleted(Board findBoard) {
        if (findBoard.getBoardStatus().equals(Board.BoardStatus.DELETED_BOARD)) {
            throw new BusinessLogicException(ExceptionCode.INACTIVED_BOARD, HttpStatus.NO_CONTENT);
        }
    }

    private void verifiedRequest(long memberId, long answerMemberId) {
        if (memberId != answerMemberId) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_MISMATCHED, HttpStatus.BAD_REQUEST);
        }
    }

    // 모집 완료 버튼
    public void completeBoard(Long boardId, Authentication authentication) {
        Long memberId = memberService.getCurrentMemberId(authentication);
        Board board = boardRepository.findByBoardId(boardId);
        checkIfDeleted(board);
        if (!board.getMember().getMemberId().equals(memberId)) {
            throw new BusinessLogicException(ExceptionCode.INVALID_REQUEST, HttpStatus.FORBIDDEN);
        }
        board.setBoardStatus(Board.BoardStatus.INACTIVE_BOARD);
        // TODO 모집완료 후 해당 보드의 작성자와 선택된 코멘트들의 작성자들을 History 객체로 생성 후 저장해야한다.

        // History 가져오기 또는 생성하기
        History history = board.getHistory();
        if (history == null) {
            history = new History();
        }
        history.setBoard(board);

        List<Member> members = commentRepository.findByBoardId(board.getBoardId())
                .stream()
                .filter(comment -> comment.getSelectionStatus() == Comment.SelectionStatus.SELECTION)
                .map(Comment::getMember)
                .collect(Collectors.toList());

        history.setMembers(members);
        board.setHistory(history);

        boardRepository.save(board);
    }
}