package com.branch.sikgu.attendee.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

public class AttendeeDto {
    @Getter
    @Setter
    @AllArgsConstructor
    public static class Response {
        private Long attendeeId;
        private Long memberId;
        private String nickName;

        private int total;
        private int passedGender;
        private LocalDateTime mealTime;
    }

    @Setter
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Post {
    }
}
