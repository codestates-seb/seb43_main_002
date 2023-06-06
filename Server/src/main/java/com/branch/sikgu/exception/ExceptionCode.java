package com.branch.sikgu.exception;

public enum ExceptionCode {
    DUPLICATE_EMAIL("중복된 이메일입니다."),
    DUPLICATE_NICKNAME("중복된 닉네임입니다."),
    INVALID_PASSWORD("잘못된 비밀번호입니다."),
    INVALID_TOKEN("유효한 토큰이 아닙니다."),

    // Board
    BOARD_NOT_FOUND("해당 포스트를 찾을 수 없습니다."),
    INACTIVED_BOARD("비활성화 된 게시물입니다."),
    MAX_CAPACITY_REACHED("인원이 모두 찼습니다."),
    MIN_CAPACITY_REACHED("참가 인원이 없습니다."),
    ALREADY_SELECTED_COMMENT("이미 수락된 요청입니다."),
    ALREADY_REFUSED_COMMENT("이미 거절된 요청입니다."),


    // Comment
    COMMENT_NOT_FOUND("해당 댓글을 찾을 수 없습니다."),
    DELETED_COMMENT("삭제된 댓글입니다."),
    CAN_NOT_WRITE("본인의 게시물에는 댓글을 작성할 수 없습니다."),

    //Member & Auth Exception
    MEMBER_NOT_FOUND("Member not found"),
    MEMBER_EXISTS("Member already exists"),
    MEMBER_MISMATCHED("Not Matched Member"),
    MEMBER_FORBIDDEN("Member Forbidden"),
    MEMBER_UNAUTHORIZED("UNAUTHORIZED"),
    INVALID_REQUEST("잘못된 요청입니다."),

    // History
    DUPLICATE_REVIEW("이미 리뷰를 남겼습니다."),
    HISTORY_NOT_FOUND("해당 히스토리를 찾을 수 없습니다."),

    // Review
    CAN_NOT_REVIEW_MYSELF("자신에게는 리뷰를 남길 수 없습니다.");



    private final String message;

    ExceptionCode(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}