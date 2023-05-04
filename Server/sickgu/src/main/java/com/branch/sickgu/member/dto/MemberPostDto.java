package com.branch.sickgu.member.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberPostDto {
    private String name;
    private String email;
    private String password;
    private boolean gender;
    private String ageRange;
}
