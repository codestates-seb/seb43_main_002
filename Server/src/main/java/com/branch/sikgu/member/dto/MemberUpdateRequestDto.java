package com.branch.sikgu.member.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.time.LocalDate;

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

//    @NotBlank(message = "생년월일을 입력해주세요.")
    private LocalDate birthday; // javax.validation.constraints.NotBlank 제약 조건이
                                // java.time.LocalDate 타입에 대해 유효성 검사기를 찾을 수 없어서
                                // LocalDate 타입의 값에 대한 유효성 검사기를 등록해야 합니다.
                                // 이를 위해서는 javax.validation.ConstraintValidator 인터페이스를 구현한 클래스를 만들어야 합니다.
                                // 구현 예정...
    private Boolean gender;
}
