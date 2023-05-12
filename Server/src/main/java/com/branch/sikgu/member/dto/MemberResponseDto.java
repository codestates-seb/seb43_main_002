package com.branch.sikgu.member.dto;

import com.branch.sikgu.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class MemberResponseDto {
    private Long memberId;
    private String name;
    private String email;
    private String nickname;
    private String age;
    private Boolean gender;
    private Member.MemberStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}