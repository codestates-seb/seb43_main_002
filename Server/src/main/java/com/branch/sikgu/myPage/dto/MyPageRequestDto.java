package com.branch.sikgu.myPage.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class MyPageRequestDto {
    private String introduce;
    private String nickname;
    private String name;
    private LocalDate birthday;
    private Boolean gender;
    private String password;
}
