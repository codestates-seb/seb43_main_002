package com.branch.sikgu.board.mapper;

import com.branch.sikgu.board.dto.BoardDto;
import com.branch.sikgu.board.entity.Board;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Component
@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface BoardMapper {

    // Response
    default BoardDto.Response toResponseDto(Board board) {
        return new BoardDto.Response(
                board.getMember().getMemberId(),
                board.getBoardId(),
                board.getTitle(),
                board.getBody(),
                board.getCreatedAt(),
                board.getUpdatedAt(),
                board.getTotal(),
                board.getPassedGender(),
                board.getMealTime()
        );
    }

    // 작성 -> Entity
    default Board toEntity(BoardDto.Post postDto) {
        Board board = new Board();
        board.setTitle(postDto.getTitle());
        board.setBody(postDto.getBody());
        board.setTotal(postDto.getTotal());
        board.setPassedGender(postDto.getPassedGender());
        board.setMealTime(postDto.getMealTime());
        return board;
    }

    // 게시물 수정
    default void updateEntity(Board board, BoardDto.Patch patchDto) {
        board.setTitle(patchDto.getTitle());
        board.setBody(patchDto.getBody());
        board.setTotal(patchDto.getTotal());
        board.setPassedGender(patchDto.getPassedGender());
        board.setMealTime(patchDto.getMealTime());
        board.setUpdatedAt(LocalDateTime.now());
    }


    // Board Entity -> Response 객체로 변환하여 리스트 반환
    default List<BoardDto.Response> toResponseDtoList(List<Board> boards) {
        return boards.stream()
                .map(this::toResponseDto)
                .collect(Collectors.toList());
    }
}