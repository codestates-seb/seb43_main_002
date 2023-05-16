package com.branch.sikgu.auth.jwt;

public enum JwtTokenType {
    ACCESS("access"), REFRESH("refresh");

    private final String value;

    JwtTokenType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
