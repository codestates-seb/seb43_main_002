package com.branch.sikgu.member.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class EmailCheckRequestDto {
    @NotBlank
    String email;
}
