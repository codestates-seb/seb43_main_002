package com.branch.sickgu.member.dto;

import com.branch.sickgu.member.entity.Member;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class MemberResponseDto {
    private Long memberId;
    private String name;
    private String email;
    private Member.MemberStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private boolean gender;
    private String ageRange;
}