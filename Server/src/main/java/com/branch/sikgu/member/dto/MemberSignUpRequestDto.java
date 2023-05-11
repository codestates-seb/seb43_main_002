package com.branch.sikgu.member.dto;

import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.time.LocalDate;

@Getter
@Setter
public class MemberSignUpRequestDto {
    @NotBlank(message = "이름을 입력해주세요.")
    private String name;
    @NotBlank(message = "이메일을 입력해주세요.")
    @Email(message = " 이메일 형식에 맞지 않습니다.")
    private String email;

    private String password;
    @NotBlank(message = "별명을 입력해주세요.")
    private String nickname;
    @NotBlank(message = "생년월일을 입력해주세요.")
    private LocalDate birthDay;

    private Boolean gender;
}
