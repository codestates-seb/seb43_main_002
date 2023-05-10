package com.branch.sikgu.member.dto;

import lombok.*;

@Getter
@Setter
public class MemberSignUpRequestDto {
    private String name;
    private String email;
    private String password;
    private String nickname;
    private String age;
    private boolean gender;
}
