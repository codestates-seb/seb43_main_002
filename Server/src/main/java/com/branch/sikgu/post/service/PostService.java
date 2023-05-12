package com.branch.sikgu.post.service;

import com.branch.sikgu.auth.jwt.JwtTokenizer;
import com.branch.sikgu.exception.BusinessLogicException;
import com.branch.sikgu.exception.ExceptionCode;
import com.branch.sikgu.exception.HttpStatus;
import com.branch.sikgu.member.entity.Member;
import com.branch.sikgu.member.repository.MemberRepository;
import com.branch.sikgu.member.service.MemberService;
import com.branch.sikgu.post.dto.PostPatchDto;
import com.branch.sikgu.post.dto.PostRequestDto;
import com.branch.sikgu.post.dto.PostResponseDto;
import com.branch.sikgu.post.entity.Post;
import com.branch.sikgu.post.mapper.PostMapper;
import com.branch.sikgu.post.repository.PostRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import org.apache.commons.lang3.StringUtils;
import io.jsonwebtoken.SignatureAlgorithm;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

import static org.springframework.security.config.Elements.JWT;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final PostMapper postMapper;
    private final JwtTokenizer jwtTokenizer;
    private final MemberService memberService;

    public PostService(PostRepository postRepository, PostMapper postMapper, JwtTokenizer jwtTokenizer, MemberService memberService) {
        this.postRepository = postRepository;
        this.postMapper = postMapper;
        this.jwtTokenizer = jwtTokenizer;
        this.memberService = memberService;
    }

    // 게시물 등록
    public PostResponseDto.Response createPost(PostRequestDto.Request requestDto, String authentication) {
        Member member = memberService.findMember(authentication);
        Post post = postMapper.toEntity(requestDto);
        post.setMember(member);
        Post savedPost = postRepository.save(post);

        return postMapper.toResponseDto(savedPost);
    }

    // 게시물 수정
    public PostResponseDto.Response updatePost(Long postId, PostPatchDto.Patch patchDto, String authentication) {
        Post post = getPostById(postId);
        Member member = memberService.findMember(authentication);

        // 작성자만 수정 가능하도록 확인
        if (!post.getMember().equals(member)) {
            throw new BusinessLogicException(ExceptionCode.INVALID_TOKEN, HttpStatus.NOT_FOUND);
        }

        // 수정 내용 반영
        post.setTitle(patchDto.getTitle());
        post.setBody(patchDto.getBody());
        post.setTotal(patchDto.getTotal());
        post.setPassedGender(patchDto.getPassedGender());
        post.setMealTime(patchDto.getMealTime());
        post.setUpdatedAt(LocalDateTime.now());

        Post updatedPost = postRepository.save(post);
        return postMapper.toResponseDto(updatedPost);
    }

    // 게시물 삭제
    public void deletePost(Long postId, String authentication) {
        Long memberId = getMemberIdFromAuthentication(authentication);
        Post existingPost = getPostByIdAndMember(postId, memberId);
        postRepository.delete(existingPost);
    }

    // 해당 멤버의 게시물 조회
    public List<PostResponseDto.Response> getPostsByMember(String authentication) {
//        validateAuthentication(authentication);
        Member member = memberService.findMember(authentication);
        List<Post> posts = postRepository.findByMemberMemberId(member.getMemberId());
        return postMapper.toResponseDtoList(posts);
    }

    public PostResponseDto.Response getPostResponseById(Long postId) {
        Post post = getPostById(postId);
        return postMapper.toResponseDto(post);
    }

    // 토큰에서 멤버 ID 가져오기
    private Long getMemberIdFromAuthentication(String authentication) {
        if (StringUtils.isBlank(authentication)) {
            throw new IllegalArgumentException("Authentication token is required.");
        }

        Long memberId = jwtTokenizer.getMemberId(authentication);
        if (memberId == null) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        return memberId;
    }

    // 게시물 ID 가져오기
    private Post getPostById(Long postId) {
        return postRepository.findById(postId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND, HttpStatus.NOT_FOUND));
    }

    // 게시물 ID와 작성한 멤버 ID 가져오기
    private Post getPostByIdAndMember(Long postId, Long memberId) {
        return postRepository.findByPostIdAndMemberMemberId(postId, memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND, HttpStatus.NOT_FOUND));
    }

    // 인증 토큰 유효성 검사 (유효 : true, 무효 : false)
//    public boolean validateAuthentication(String token) {
//        try {
//            Algorithm algorithm = Algorithm.HMAC256(secret);
//            JWTVerifier verifier = JWT.require(algorithm).build();
//            verifier.verify(token);
//            return true;
//        } catch (Exception e) {
//            return false;
//        }
//    }
}