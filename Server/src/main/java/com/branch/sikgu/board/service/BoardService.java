package com.branch.sikgu.board.service;

import com.branch.sikgu.auth.jwt.JwtTokenizer;
import com.branch.sikgu.exception.BusinessLogicException;
import com.branch.sikgu.exception.ExceptionCode;
import com.branch.sikgu.exception.HttpStatus;
import com.branch.sikgu.member.entity.Member;
import com.branch.sikgu.member.service.MemberService;
import com.branch.sikgu.board.entity.Board;
import com.branch.sikgu.board.mapper.BoardMapper;
import com.branch.sikgu.board.repository.BoardRepository;
import com.branch.sikgu.board.dto.BoardDto;
import org.springframework.stereotype.Service;
import org.apache.commons.lang3.StringUtils;

import java.util.List;

@Service
public class BoardService {

    private final BoardRepository boardRepository;
    private final BoardMapper boardMapper;
    private final JwtTokenizer jwtTokenizer;
    private final MemberService memberService;

    public BoardService(BoardRepository boardRepository, BoardMapper boardMapper, JwtTokenizer jwtTokenizer, MemberService memberService) {
        this.boardRepository = boardRepository;
        this.boardMapper = boardMapper;
        this.jwtTokenizer = jwtTokenizer;
        this.memberService = memberService;
    }

    // 게시물 등록
    public BoardDto.Response createBoard(BoardDto.Post postDto, String authentication) {
        Member member = memberService.findMember(authentication);
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
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.INACTIVE_BOARD, HttpStatus.NOT_FOUND));

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
        List<Board> boards = boardRepository.findAll();

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
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.DELETED_BOARD, HttpStatus.NO_CONTENT));
    }

    // 게시물 ID와 작성한 멤버 ID 확인
    private Board getBoardByIdAndMember(Long boardId, Long memberId) {
        return boardRepository.findByBoardIdAndMemberMemberId(boardId, memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_MISMATCHED, HttpStatus.BAD_REQUEST));
    }

    // 삭제된 게시물인지 확인
    private static void checkIfDeleted(Board findBoard) {
        if (findBoard.getBoardStatus().equals(Board.BoardStatus.DELETED_BOARD)) {
            throw new BusinessLogicException(ExceptionCode.DELETED_BOARD, HttpStatus.NO_CONTENT);
        }
    }

    private void verifiedRequest(long memberId, long answerMemberId) {
        if (memberId != answerMemberId) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_MISMATCHED, HttpStatus.BAD_REQUEST);
        }
    }
}