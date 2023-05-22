package com.branch.sikgu.comment.mapper;

import com.branch.sikgu.comment.dto.CommentDto;
import com.branch.sikgu.comment.entity.Comment;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-05-20T17:18:19+0900",
    comments = "version: 1.5.1.Final, compiler: javac, environment: Java 11.0.18 (Azul Systems, Inc.)"
)
@Component
public class CommentMapperImpl implements CommentMapper {

    @Override
    public Comment commentPostDto_to_Comment(CommentDto.Post commentPostDto) {
        if ( commentPostDto == null ) {
            return null;
        }

        Comment comment = new Comment();

        comment.setBody( commentPostDto.getBody() );

        return comment;
    }

    @Override
    public Comment commentPatchDto_to_Comment(CommentDto.Patch commentPatchDto) {
        if ( commentPatchDto == null ) {
            return null;
        }

        Comment comment = new Comment();

        comment.setCommentId( commentPatchDto.getCommentId() );
        comment.setBody( commentPatchDto.getBody() );
        comment.setUpdatedAt( commentPatchDto.getUpdatedAt() );

        return comment;
    }

    @Override
    public List<CommentDto.Response> comments_to_CommentResponseDto(List<Comment> comments) {
        if ( comments == null ) {
            return null;
        }

        List<CommentDto.Response> list = new ArrayList<CommentDto.Response>( comments.size() );
        for ( Comment comment : comments ) {
            list.add( commentToCommentResponseDto( comment ) );
        }

        return list;
    }
}
