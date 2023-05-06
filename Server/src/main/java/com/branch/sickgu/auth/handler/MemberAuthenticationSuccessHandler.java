package com.branch.sickgu.auth.handler;

import com.google.gson.Gson;
import com.branch.sickgu.auth.dto.LoginResponseDto;
import com.branch.sickgu.member.entity.Member;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class MemberAuthenticationSuccessHandler implements AuthenticationSuccessHandler {  // (1)
    // (2)
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        // 인증 성공 후, 로그를 기록하거나 사용자 정보를 response로 전송하는 등의 추가 작업을 할 수 있다.
        log.info("# Authenticated successfully!");

        sendSuccessResponse(response, authentication);
    }

    // 로그인하고 멤버 ID를 JSON타입으로 변환하여 응답
    private void sendSuccessResponse(HttpServletResponse response, Authentication authentication) throws IOException {
        Gson gson = new Gson();
        Member member = (Member) authentication.getPrincipal();
        LoginResponseDto loginResponseDto = new LoginResponseDto();
        loginResponseDto.setMemberId(member.getMemberId());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.getWriter().write(gson.toJson(loginResponseDto));
    }
}