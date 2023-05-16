package com.branch.sikgu.member;

import com.branch.sikgu.auth.jwt.JwtTokenizer;
import com.branch.sikgu.auth.utils.CustomAuthorityUtils;
import com.branch.sikgu.member.controller.MemberController;
import com.branch.sikgu.member.dto.MemberSignUpRequestDto;
import com.branch.sikgu.member.dto.MemberSignUpResponseDto;
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
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.time.LocalDateTime;

import static org.hamcrest.Matchers.startsWith;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.hamcrest.Matchers.is;
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
        memberSignUpRequestDto.setAge("123456");
        memberSignUpRequestDto.setGender(true);

        String content = gson.toJson(memberSignUpRequestDto);

        given(memberMapper.memberSignUpRequestDtoToMember(Mockito.any(MemberSignUpRequestDto.class))).willReturn(new Member());

        MemberSignUpResponseDto memberSignUpResponseDto = new MemberSignUpResponseDto();
        memberSignUpResponseDto.setMemberId(1L);
        memberSignUpResponseDto.setName("이석원");
        memberSignUpResponseDto.setEmail("user1@example.com");
        memberSignUpResponseDto.setNickname("프론트대장");
        memberSignUpResponseDto.setAge("123456");
        memberSignUpResponseDto.setGender(true);
        memberSignUpResponseDto.setCreatedAt(LocalDateTime.now());

        given(memberService.signUp(Mockito.any(MemberSignUpRequestDto.class))).willReturn(memberSignUpResponseDto);

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
                .andExpect(jsonPath("$.age").value(memberSignUpResponseDto.getAge()))
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
                                fieldWithPath("age").type(JsonFieldType.STRING).description("생년월일(yyMMdd)"),
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
}
