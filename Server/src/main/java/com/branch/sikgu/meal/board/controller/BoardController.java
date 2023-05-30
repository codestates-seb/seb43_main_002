package com.branch.sikgu.meal.board.controller;

import com.branch.sikgu.meal.board.service.BoardService;
import com.branch.sikgu.meal.board.dto.BoardDto;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/api/boards")
@Validated
@AllArgsConstructor
@Slf4j
public class BoardController {
    private BoardService boardService;

    // 게시물 등록 API
    @PostMapping
    public ResponseEntity<BoardDto.Response> createBoard(
            @RequestBody @Valid BoardDto.Post postDto,
            Authentication authentication) {
        BoardDto.Response responseDto = boardService.createBoard(postDto, authentication);

        return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
    }

    // 게시물 수정 API
    @PatchMapping("/{board-id}")
    public ResponseEntity<BoardDto.Response> updateBoard(
            @PathVariable("board-id") @Positive Long boardId,
            @RequestBody @Valid BoardDto.Patch patchDto,
            @RequestHeader(name = "Authorization") String authentication) {
        BoardDto.Response responseDto = boardService.updateBoard(boardId, patchDto, authentication);
        return ResponseEntity.ok(responseDto);
    }

    // 게시물 삭제 API
    @DeleteMapping("/{board-id}")
    public ResponseEntity<Void> deleteBoard(
            @PathVariable("board-id") @Positive Long boardId,
            @RequestHeader("Authorization") String authentication) {
        boardService.deleteBoard(boardId, authentication);
        return ResponseEntity.noContent().build();
    }

    // 내 게시물 목록 조회 API -> 마이페이지에서 구현행할 듯
    @GetMapping("/myBoard")
    public ResponseEntity<List<BoardDto.Response>> getBoardsByMember(
            @RequestHeader(name = "Authorization") String authentication) {
        List<BoardDto.Response> responseDtoList = boardService.getBoardsByMember(authentication);
        return ResponseEntity.ok(responseDtoList);
    }

    // 게시물 전체 조회 API
    @GetMapping
    public ResponseEntity<List<BoardDto.Response>> getBoards() {
        List<BoardDto.Response> responseDtoLists = boardService.getAllBoards();
        return ResponseEntity.ok(responseDtoLists);
    }

    // 게시물 조회 API
    @GetMapping("/{board-id}")
    public ResponseEntity<BoardDto.Response> getBoardById(
            @PathVariable("board-id") @Positive Long boardId) {
        BoardDto.Response responseDto = boardService.getBoardResponseById(boardId);
        return ResponseEntity.ok(responseDto);
    }

    // 참가 신청 수락 버튼
    @PatchMapping("/{boardId}/comments/{commentId}/select")
    public ResponseEntity<String> selectCommentAndIncreaseCurrentCount(
            @PathVariable Long boardId,
            @PathVariable Long commentId, Authentication authentication
    ) {
        boardService.selectCommentAndIncreaseCurrentCount(boardId, commentId, authentication);
        return ResponseEntity.ok("참가 신청 수락!");
    }

    // 참가 신청 거절 버튼
    @PatchMapping("/{boardId}/comments/{commentId}/refuse")
    public ResponseEntity<String> refuseCommentAndDecreaseCurrentCount(
            @PathVariable Long boardId,
            @PathVariable Long commentId, Authentication authentication
    ) {
        boardService.refuseCommentAndDecreaseCurrentCount(boardId, commentId, authentication);
        return ResponseEntity.ok("참가 신청 거절!");
    }

    // 참가 모집 완료 버튼
    @PostMapping("/{boardId}/complete")
    public ResponseEntity<String> completeBoard(
            @PathVariable Long boardId,
            Authentication authentication) {
        boardService.completeBoard(boardId, authentication);
        return ResponseEntity.ok("모집 완료");
    }
}
