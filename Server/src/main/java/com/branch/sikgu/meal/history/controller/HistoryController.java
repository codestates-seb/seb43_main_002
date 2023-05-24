package com.branch.sikgu.meal.history.controller;

import com.branch.sikgu.meal.history.dto.HistoryDto;
import com.branch.sikgu.meal.history.mapper.HistoryMapper;
import com.branch.sikgu.meal.history.entity.History;
import com.branch.sikgu.meal.history.service.HistoryService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "X-AUTH-TOKEN")
@RestController
@Validated
@RequestMapping("/api/meal")
@AllArgsConstructor
@Slf4j
public class HistoryController {
    private HistoryMapper historyMapper;
    private HistoryService historyService;

    @PostMapping("/histories")
    public ResponseEntity postHistory(@RequestParam Long boardId) {
        History history = historyService.createHistory(boardId);
        HistoryDto.Response historyDto = historyMapper.toResponseDto(history);

        return new ResponseEntity<>(historyDto, HttpStatus.CREATED);
    }

    // 본인의 참석이력 리스트 가져오기
    @GetMapping("/my-histories")
    public ResponseEntity<List<HistoryDto.Response>> showMyHistory(Authentication authentication) {
        List<HistoryDto.Response> response = historyService.getMyHistory(authentication);
        return ResponseEntity.ok(response);
    }
}