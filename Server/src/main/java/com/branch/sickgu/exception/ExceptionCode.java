package com.branch.sickgu.exception;

import lombok.Getter;

public enum ExceptionCode {
    //Member & Auth Exception
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member already exists"),
    MEMBER_MISMATCHED(400,"Not Matched Member"),
    MEMBER_FORBIDDEN(403,"Member Forbidden"),
    MEMBER_UNAUTHORIZED(401,"UNAUTHORIZED"),


    //Comment Exception
    COMMENT_NOT_FOUND(404, "Comment not found"),
    COMMENT_DELETED(404, "Comment already deleted")
    ;

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
