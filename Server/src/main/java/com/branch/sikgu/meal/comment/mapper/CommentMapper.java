package com.branch.sikgu.meal.comment.mapper;

import com.branch.sikgu.meal.comment.dto.CommentDto;
import com.branch.sikgu.meal.comment.entity.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CommentMapper {
    Comment commentPostDto_to_Comment(CommentDto.Post commentPostDto);
    Comment commentPatchDto_to_Comment(CommentDto.Patch commentPatchDto);

    List<CommentDto.Response> comments_to_CommentResponseDto(List<Comment> comments);

    default CommentDto.Response commentToCommentResponseDto(Comment comment) {
        CommentDto.Response commentResponseDto;
        commentResponseDto = new CommentDto.Response(
                comment.getCommentId(),
                comment.getMember().getMemberId(),
                comment.getMember().getNickname(),
                comment.getMember().getMyPage().getImage().getImageId(),
                comment.getBody(),
                comment.getCreatedAt(),
                comment.getUpdatedAt(),
                comment.getSelectionStatus()
        );

        return commentResponseDto;
    }

    default List<CommentDto.Response> commentToResponseDtoList(List<Comment> comments) {
        return comments.stream()
                .map(this::commentToCommentResponseDto)
                .collect(Collectors.toList());
    }
}
