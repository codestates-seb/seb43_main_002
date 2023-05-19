package com.branch.sikgu.board.controller;

import com.branch.sikgu.board.service.BoardService;
import com.branch.sikgu.board.dto.BoardDto;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "X-AUTH-TOKEN")
@RestController
@RequestMapping("/boards")
@Validated
@AllArgsConstructor
@Slf4j
public class BoardController {
    private BoardService boardService;

    // 게시물 등록 API
    @PostMapping
    public ResponseEntity<BoardDto.Response> createBoard(
            @RequestBody @Valid BoardDto.Post postDto,
            @RequestHeader(name = "Authorization") String authentication) {
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
}