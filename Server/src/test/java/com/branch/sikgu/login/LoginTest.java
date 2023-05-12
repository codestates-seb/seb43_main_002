package com.branch.sikgu.login;

import com.branch.sikgu.TestUtil;
import com.branch.sikgu.auth.dto.JwtResponse;
import com.branch.sikgu.auth.dto.LoginDto;
import com.branch.sikgu.auth.jwt.JwtTokenType;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;

import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.headers.HeaderDocumentation.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureRestDocs
public class LoginTest {
    @Test
    void login() throws Exception {
        LoginDto loginDto = new LoginDto();
        loginDto.setEmail("user1@example.com");
        loginDto.setPassword("password1");

        JwtResponse jwtResponse = new JwtResponse("access_token", "refresh_token");

        given(jwtTokenProvider.generateToken(anyString())).willReturn(jwtResponse);

        mockMvc.perform(post("/members/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(TestUtil.toJsonString(loginDto))
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.type").value(JwtTokenType.ACCESS.getValue()))
                .andExpect(jsonPath("$.token").exists())
                .andExpect(jsonPath("$.refreshToken").exists())
                .andDo(document("members/login",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestHeaders(
                                headerWithName("Content-Type").description("JSON 타입")
                        ),
                        requestFields(
                                fieldWithPath("email").description("이메일"),
                                fieldWithPath("password").description("비밀번호")
                        ),
                        responseHeaders(
                                headerWithName("Content-Type").description("JSON 타입")
                        ),
                        responseFields(
                                fieldWithPath("type").description("토큰 타입 (Access, Refresh)"),
                                fieldWithPath("token").description("JWT Access Token"),
                                fieldWithPath("refreshToken").description("JWT Refresh Token")
                        )
                ));
    }
}
