package com.branch.sikgu.meal.history.service;

import com.branch.sikgu.exception.BusinessLogicException;
import com.branch.sikgu.exception.ExceptionCode;
import com.branch.sikgu.exception.HttpStatus;
import com.branch.sikgu.meal.board.dto.BoardDto;
import com.branch.sikgu.meal.board.entity.Board;
import com.branch.sikgu.meal.board.mapper.BoardMapper;
import com.branch.sikgu.meal.board.repository.BoardRepository;
import com.branch.sikgu.meal.comment.entity.Comment;
import com.branch.sikgu.meal.comment.repository.CommentRepository;
import com.branch.sikgu.meal.history.dto.HistoryDto;
import com.branch.sikgu.meal.history.dto.HistoryMemberDto;
import com.branch.sikgu.meal.history.entity.History;
import com.branch.sikgu.meal.history.mapper.HistoryMapper;
import com.branch.sikgu.meal.history.repository.HistoryRepository;
import com.branch.sikgu.member.dto.MemberResponseDto;
import com.branch.sikgu.member.entity.Member;
import com.branch.sikgu.member.mapper.MemberMapper;
import com.branch.sikgu.member.service.MemberService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
@Slf4j
public class HistoryService {
    private final CommentRepository commentRepository;
    private final BoardRepository boardRepository;
    private final HistoryRepository historyRepository;
    private final MemberMapper memberMapper;
    private final HistoryMapper historyMapper;
    private final MemberService memberService;
    private final BoardMapper boardMapper;
    private final History history;

    // 스케줄의 정해진 인원수가 모두 차거나, 스케줄의 식사시간이 지난 경우 해당 History 를 확정하는 서비스
    public History createHistory(long boardId) {
        History checkedHistory = checkingHistory(boardId);

        return historyRepository.save(checkedHistory);
    }

    public HistoryDto.Response updateHistory (Long historyId, HistoryDto.Patch patchDto) {
        History originalHistory = historyRepository.findByHistoryId(historyId);
        originalHistory.setStatus(patchDto.isStatus());
        historyRepository.save(originalHistory);

        return historyMapper.toResponseDto(originalHistory);
    }

    // 멤버가 참여한 History를 조회하는 서비스
    public List<HistoryDto.Response> getMyHistory(Authentication authentication) {
        Long memberId = memberService.getCurrentMemberId(authentication);
        List<History> myHistories = historyRepository.findByMemberId(memberId);

//        List<HistoryDto.Response> historyList = myHistories
//                .stream()
//                .map(history -> {
//                    // HistoryResponseDto로 변환하는 로직 작성
//                    HistoryDto.Response historyResponseDto = new HistoryDto.Response(
//                            history.getHistoryId(),
//                            history.getBoard(),
//                            history.getMembers());
//                    // 필요한 정보를 historyResponseDto에 설정
//                    return historyResponseDto;
//                })
//                .collect(Collectors.toList());

        List<HistoryDto.Response> historyList = myHistories.stream()
                .map(history -> {
                    // Convert Board entity to BoardDto.Response
                    BoardDto.BoardMemberResponse boardResponse = boardMapper.toBoardMemberResponseDto(history.getBoard());

                    // Convert Member entities to MemberDto.Response list
                    List<MemberResponseDto.HistoryMemberResponse> memberResponses = history.getMembers().stream()
                            .map(member -> memberMapper.memberToHistoryMemberResponseDto(member))
                            .collect(Collectors.toList());

                    // Create HistoryDto.Response with converted entities
                    HistoryDto.Response historyResponseDto = new HistoryDto.Response(
                            history.getHistoryId(),
                            history.isStatus(),
                            boardResponse,
                            memberResponses);

                    // Set any other necessary information in historyResponseDto

                    return historyResponseDto;
                })
                .collect(Collectors.toList());
        return historyList;
    }

    // 식사 시간이 지났는지 확인
    private boolean isMealTimePassed(LocalDateTime mealTime) {
        LocalDateTime currentDateTime = LocalDateTime.now();
        return currentDateTime.isAfter(mealTime);
    }

    // 채택 확정된 demand 개수 확인 / 식사시간이 지났는지 확인
    private History checkingHistory(long boardId) {
        Optional<Board> optionalBoard = boardRepository.findById(boardId);
        Board board = optionalBoard.orElse(null);

        long selectedCount = commentRepository.findByBoardId(board.getBoardId())
                .stream()
                .filter(comment -> comment.getSelectionStatus() == Comment.SelectionStatus.SELECTION)
                .count();

        History history = null;
        if (selectedCount >= board.getTotal() || isMealTimePassed(board.getMealTime())) {
            // 시간 로직 추가: 식사 시간이 지났는지 검증
            if (isMealTimePassed(board.getMealTime())) {
                throw new RuntimeException("식사 시간이 지났습니다.");
            }
            // History 생성 및 저장
            history = new History();

            List<Member> members = commentRepository.findByBoardId(board.getBoardId())
                    .stream()
                    .filter(comment -> comment.getSelectionStatus() == Comment.SelectionStatus.SELECTION)
                    .map(Comment::getMember)
                    .collect(Collectors.toList());

//            List<MemberResponseDto> memberResponseDtoList = memberMapper.membersToMemberResponseDtos(members);
            history.setMembers(members);
            history.setBoard(board);
        }

        return history;
    }

    public List<HistoryMemberDto> getHistoryMembers(Long historyId) {
        History history = historyRepository.findById(historyId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.HISTORY_NOT_FOUND, HttpStatus.NOT_FOUND));

        List<HistoryMemberDto> historyMembers = history.getMembers().stream()
                .map(member -> {
                    HistoryMemberDto memberDto = new HistoryMemberDto();
                    memberDto.setMemberId(member.getMemberId());
                    memberDto.setNickname(member.getNickname());
                    return memberDto;
                })
                .collect(Collectors.toList());
        return historyMembers;
    }
}