package com.branch.sickgu.member.dto;

import lombok.*;

@Getter
public class MemberSignUpRequestDto {
    private String name;
    private String email;
    private String password;
    private boolean gender;
    private String ageRange;
}
