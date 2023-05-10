package com.branch.sikgu.member.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class MemberUpdateRequestDto {
    @NotBlank(message = "이름을 입력해주세요.")
    private String name;
    @NotBlank(message = "이메일을 입력해주세요.")
    @Email(message = " 이메일 형식에 맞지 않습니다.")
    private String email;
    private String password;
    @NotBlank(message = "별명을 입력해주세요.")
    private String nickname;
    @NotBlank(message = "생년월일을 입력해주세요.")
    private String age;
    private Boolean gender;
}
