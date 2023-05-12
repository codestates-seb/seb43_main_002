package com.branch.sikgu.member.dto;

import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.time.LocalDate;

@Getter
@Setter
public class MemberSignUpRequestDto {
    private String name;
    private String email;
    private String password;
    private String nickname;
    private String birthday;
    private Boolean gender;
}
