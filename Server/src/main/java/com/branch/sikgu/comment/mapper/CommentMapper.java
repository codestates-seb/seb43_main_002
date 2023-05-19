package com.branch.sikgu.comment.mapper;

import com.branch.sikgu.comment.dto.CommentDto;
import com.branch.sikgu.comment.entity.Comment;
import com.branch.sikgu.comment.dto.CommentDto.Response;
import com.branch.sikgu.comment.dto.CommentDto.Post;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CommentMapper {
    Comment commentPostDto_to_Comment(Post commentPostDto);
    Comment commentPatchDto_to_Comment(CommentDto.Patch commentPatchDto);

    List<Response> comments_to_CommentResponseDto(List<Comment> comments);

    default Response commentToCommentResponseDto(Comment comment) {
        Response commentResponseDto;
        commentResponseDto = new Response(
        comment.getCommentId(),
        comment.getMember().getMemberId(),
        comment.getMember().getNickname(),
        comment.getBody(),
        comment.getCreatedAt(),
        comment.getUpdatedAt()
        );

        return commentResponseDto;
    }

    default List<Response> commentToResponseDtoList(List<Comment> comments) {
        return comments.stream()
                .map(this::commentToCommentResponseDto)
                .collect(Collectors.toList());
    }
}
