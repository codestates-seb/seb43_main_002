package com.branch.sikgu.meal.history.controller;

import com.branch.sikgu.meal.history.dto.HistoryDto;
import com.branch.sikgu.meal.history.dto.HistoryMemberDto;
import com.branch.sikgu.meal.history.mapper.HistoryMapper;
import com.branch.sikgu.meal.history.entity.History;
import com.branch.sikgu.meal.history.repository.HistoryRepository;
import com.branch.sikgu.meal.history.service.HistoryService;
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

    @GetMapping("/my-histories/{historyId}")
    public ResponseEntity<List<HistoryMemberDto>> getHistoryMembers(@PathVariable Long historyId) {
        List<HistoryMemberDto> historyMembers = historyService.getHistoryMembers(historyId);
        return ResponseEntity.ok(historyMembers);
    }

    // 프론트엔드에서 히스토리 상태를 리뷰완료/종료된 히스토리로 바꾸기 위한 API
    @PatchMapping("/histories/{history-id}")
    public ResponseEntity<HistoryDto.Response> patchHistory(@PathVariable("history-id") @Positive long historyId,
                                       @Valid @RequestBody HistoryDto.Patch historyPatchDto) {
//        historyPatchDto.setHistoryId(historyId);
        HistoryDto.Response response = historyService.updateHistory(historyId, historyPatchDto);

        return ResponseEntity.ok(response);
    }
}