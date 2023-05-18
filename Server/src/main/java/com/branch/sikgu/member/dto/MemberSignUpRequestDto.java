package com.branch.sikgu.member.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
public class MemberSignUpRequestDto {
    private String name;
    private String email;
    private String password;
    private String nickname;
    private LocalDate birthday;
    private Boolean gender;
}
