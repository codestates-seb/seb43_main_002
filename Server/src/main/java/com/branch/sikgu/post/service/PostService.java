package com.branch.sikgu.post.service;

import com.branch.sikgu.exception.BusinessLogicException;
import com.branch.sikgu.exception.ExceptionCode;
import com.branch.sikgu.exception.HttpStatus;
import com.branch.sikgu.member.service.MemberService;
import com.branch.sikgu.post.entity.Post;
import com.branch.sikgu.post.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Member;
import java.util.List;
import java.util.Optional;

@Service

public class PostService {
    private final MemberService memberService;
    private final PostRepository postRepository;

    @Autowired
    public PostService(MemberService memberService, PostRepository postRepository) {
        this.memberService = memberService;
        this.postRepository = postRepository;
    }

    // 게시물 등록
    public Post save(Post post, String token) {
        Member member = memberService.findMember(token);
        Post.setMember(member);
        return postRepository.save(post);
    }

    // 전체 조회
    public List<Post> findAll() {
        return postRepository.findAll();
    }

    // 게시물 조회
    public Post findPostById (Long postId) {
        return findVerifiedPost(postId);
    }

    private Post findVerifiedPost(Long postId) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        if (optionalPost.isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.POST_NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        Post post = optionalPost.get();
        if(post.getPostStatus()  == Post.PostStatus.POST_INACTIVE){
            throw new BusinessLogicException(ExceptionCode.INACTIVED_POST, HttpStatus.NOT_FOUND);
        }
        return post;
    }
}
