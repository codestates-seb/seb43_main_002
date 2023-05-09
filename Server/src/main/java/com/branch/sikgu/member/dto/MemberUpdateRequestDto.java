package com.branch.sikgu.member.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberUpdateRequestDto {
    private String name;
    private String email;
    private String password;
}
