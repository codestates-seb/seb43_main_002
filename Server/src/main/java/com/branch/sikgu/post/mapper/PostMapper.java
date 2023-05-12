package com.branch.sikgu.post.mapper;

import com.branch.sikgu.post.dto.PostPatchDto;
import com.branch.sikgu.post.dto.PostRequestDto;
import com.branch.sikgu.post.dto.PostResponseDto;
import com.branch.sikgu.post.entity.Post;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Component
@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PostMapper {

    default PostResponseDto.Response toResponseDto(Post post) {
        return new PostResponseDto.Response(
                post.getMember().getMemberId(),
                post.getPostId(),
                post.getTitle(),
                post.getBody(),
                post.getCreatedAt(),
                post.getTotal(),
                post.getPassedGender(),
                post.getMealTime()
        );
    }

    default Post toEntity(PostRequestDto.Request requestDto) {
        Post post = new Post();
        post.setTitle(requestDto.getTitle());
        post.setBody(requestDto.getBody());
        post.setTotal(requestDto.getTotal());
        post.setPassedGender(requestDto.getPassedGender());
        post.setMealTime(requestDto.getMealTime());
        return post;
    }

    default void updateEntity(Post post, PostPatchDto.Patch patchDto) {
        post.setTitle(patchDto.getTitle());
        post.setBody(patchDto.getBody());
        post.setTotal(patchDto.getTotal());
        post.setPassedGender(patchDto.getPassedGender());
        post.setMealTime(patchDto.getMealTime());
        post.setUpdatedAt(LocalDateTime.now());
    }

    // Post 엔티티 객체의 리스트를 받아 각각을 PostResponseDto.Response 객체로 변환한 후 리스트로 반환
    default List<PostResponseDto.Response> toResponseDtoList(List<Post> posts) {
        return posts.stream()
                .map(this::toResponseDto)
                .collect(Collectors.toList());
    }
}