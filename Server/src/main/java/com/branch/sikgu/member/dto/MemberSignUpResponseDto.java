package com.branch.sikgu.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class MemberSignUpResponseDto {
    private Long memberId;
    private String name;
    private String email;
    private String nickname;
    private String age;
    private Boolean gender;
    private LocalDateTime createdAt;
}
