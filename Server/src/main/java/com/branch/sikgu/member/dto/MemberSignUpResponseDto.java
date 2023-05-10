package com.branch.sikgu.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class MemberSignUpResponseDto {
    private Long memberId;
    private String name;
    private String email;
    private String nickname;
    private String age;
    private boolean gender;
    private LocalDateTime createdAt;
}
