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
    private boolean gender;
    private String ageRange;
    private LocalDateTime createdAt;
}
