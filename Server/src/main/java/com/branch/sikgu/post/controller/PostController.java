package com.branch.sikgu.post.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class PostController {
    @PostMapping
    public ResponseEntity postPost(@RequestHeader(name = "Authorization") String token,
                                   @Validated @RequestBody PostPostDto postPostDto) {
        Post post = service.save
    }
}