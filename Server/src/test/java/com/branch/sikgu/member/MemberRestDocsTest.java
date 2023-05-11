package com.branch.sikgu.member;

import com.branch.sikgu.auth.jwt.JwtTokenizer;
import com.branch.sikgu.auth.utils.CustomAuthorityUtils;
import com.branch.sikgu.member.controller.MemberController;
import com.branch.sikgu.member.dto.MemberResponseDto;
import com.branch.sikgu.member.dto.MemberSignUpRequestDto;
import com.branch.sikgu.member.dto.MemberSignUpResponseDto;
import com.branch.sikgu.member.dto.MemberUpdateRequestDto;
import com.branch.sikgu.member.entity.Member;
import com.branch.sikgu.member.mapper.MemberMapper;
import com.branch.sikgu.member.service.MemberService;
import com.google.gson.Gson;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.core.Authentication;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.time.LocalDate;
import java.time.LocalDateTime;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(MemberController.class)
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
public class MemberRestDocsTest {
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private MemberService memberService;
    @MockBean
    private MemberMapper memberMapper;
    @Autowired
    private Gson gson;
    @MockBean
    private CustomAuthorityUtils customAuthorityUtils;
    @MockBean
    private JwtTokenizer jwtTokenizer;

    @Test @WithMockUser
    @DisplayName("회원 가입")
    public void MemberSignUpTest() throws Exception {
        // given
        MemberSignUpRequestDto memberSignUpRequestDto = new MemberSignUpRequestDto();
        memberSignUpRequestDto.setName("이석원");
        memberSignUpRequestDto.setEmail("user1@example.com");
        memberSignUpRequestDto.setPassword("password1");
        memberSignUpRequestDto.setNickname("프론트대장");
        memberSignUpRequestDto.setBirthDay(LocalDate.of(05,05,11));
        memberSignUpRequestDto.setGender(true);

        String content = gson.toJson(memberSignUpRequestDto);

        given(memberMapper.memberSignUpRequestDtoToMember(any(MemberSignUpRequestDto.class))).willReturn(new Member());

        MemberSignUpResponseDto memberSignUpResponseDto = new MemberSignUpResponseDto();
        memberSignUpResponseDto.setMemberId(1L);
        memberSignUpResponseDto.setName("이석원");
        memberSignUpResponseDto.setEmail("user1@example.com");
        memberSignUpResponseDto.setNickname("프론트대장");
        memberSignUpResponseDto.setBirthDay(LocalDate.of(05,05,11));
        memberSignUpResponseDto.setGender(true);
        memberSignUpResponseDto.setCreatedAt(LocalDateTime.now());

        given(memberService.signUp(any(MemberSignUpRequestDto.class))).willReturn(memberSignUpResponseDto);

        // when
        ResultActions actions = mockMvc.perform(
                post("/members/signup")
                        .with(csrf())
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
        );

        // then
        actions
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.memberId").value(memberSignUpResponseDto.getMemberId()))
                .andExpect(jsonPath("$.name").value(memberSignUpResponseDto.getName()))
                .andExpect(jsonPath("$.email").value(memberSignUpResponseDto.getEmail()))
                .andExpect(jsonPath("$.nickname").value(memberSignUpResponseDto.getNickname()))
                .andExpect(jsonPath("$.birthDay").value(memberSignUpResponseDto.getBirthDay()))
                .andExpect(jsonPath("$.gender").value(memberSignUpResponseDto.getGender()))
                .andExpect(jsonPath("$.createdAt").exists())
                .andDo(print())
                .andDo(document("/members/signup",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(
                                fieldWithPath("name").type(JsonFieldType.STRING).description("이름"),
                                fieldWithPath("email").type(JsonFieldType.STRING).description("이메일"),
                                fieldWithPath("password").type(JsonFieldType.STRING).description("비밀번호"),
                                fieldWithPath("nickname").type(JsonFieldType.STRING).description("별명"),
                                fieldWithPath("birthDay").type(JsonFieldType.STRING).description("생년월일(yyMMdd)"),
                                fieldWithPath("gender").type(JsonFieldType.BOOLEAN).description("성별(true:남성, false:여성)")
                        ),
                        responseFields(
                                fieldWithPath("memberId").description("회원 아이디"),
                                fieldWithPath("name").description("이름"),
                                fieldWithPath("email").description("이메일"),
                                fieldWithPath("nickname").description("별명"),
                                fieldWithPath("age").description("생년월일(yyMMdd)"),
                                fieldWithPath("gender").description("성별(true:남성, false:여성)"),
                                fieldWithPath("createdAt").description("생성일")
                        )
                ));
    }
    @Test
    @WithMockUser
    @DisplayName("회원 정보 수정")
    public void updateMemberTest() throws Exception {
        // given
        MemberUpdateRequestDto memberUpdateRequestDto = new MemberUpdateRequestDto();
        memberUpdateRequestDto.setName("최용준");
        memberUpdateRequestDto.setEmail("user1@example.com");
        memberUpdateRequestDto.setPassword("newPassword1");
        memberUpdateRequestDto.setNickname("백엔드대장");
        memberUpdateRequestDto.setBirthDay(LocalDate.of(05,05,11));
        memberUpdateRequestDto.setGender(true);


        Long memberId = 1L;
        given(memberService.updateMember(any(Authentication.class), any(MemberUpdateRequestDto.class)))
                .willReturn(new MemberResponseDto());

        String content = gson.toJson(memberUpdateRequestDto);

        // when
        ResultActions actions = mockMvc.perform(
                patch("/members/editprofile")
                        .header("Authorization", "authorization")
                        .with(csrf())
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
        );

        // then
        actions
                .andExpect(status().isOk())
                .andDo(print())
                .andDo(document("/members/update",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(
                                fieldWithPath("name").type(JsonFieldType.STRING).description("이름"),
                                fieldWithPath("email").type(JsonFieldType.STRING).description("이메일"),
                                fieldWithPath("password").type(JsonFieldType.STRING).description("비밀번호"),
                                fieldWithPath("nickname").type(JsonFieldType.STRING).description("별명"),
                                fieldWithPath("birthDay").type(JsonFieldType.STRING).description("생년월일(yyMMdd)"),
                                fieldWithPath("gender").type(JsonFieldType.BOOLEAN).description("성별(true:남성, false:여성)")
                        )
                ));
    }
}
