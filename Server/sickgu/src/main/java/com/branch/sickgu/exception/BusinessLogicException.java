package com.branch.sickgu.exception;

public class BusinessLogicException extends RuntimeException {
    private final ExceptionCode code;
    private final HttpStatus status;

    public BusinessLogicException(ExceptionCode code, HttpStatus status) {
        super(code.getMessage());
        this.code = code;
        this.status = status;
    }

    public ExceptionCode getCode() {
        return code;
    }

    public HttpStatus getStatus() {
        return status;
    }
}
