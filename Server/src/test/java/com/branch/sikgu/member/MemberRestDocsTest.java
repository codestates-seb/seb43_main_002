//package com.branch.sikgu.member;
//
//import com.branch.sikgu.auth.jwt.JwtTokenizer;
//import com.branch.sikgu.auth.utils.CustomAuthorityUtils;
//import com.branch.sikgu.member.controller.MemberController;
//import com.branch.sikgu.member.dto.MemberResponseDto;
//import com.branch.sikgu.member.dto.MemberSignUpRequestDto;
//import com.branch.sikgu.member.dto.MemberSignUpResponseDto;
//import com.branch.sikgu.member.dto.MemberUpdateRequestDto;
//import com.branch.sikgu.member.entity.Member;
//import com.branch.sikgu.member.mapper.MemberMapper;
//import com.branch.sikgu.member.repository.MemberRepository;
//import com.branch.sikgu.member.service.MemberService;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.fasterxml.jackson.databind.SerializationFeature;
//import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
//import com.google.gson.Gson;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
//import org.springframework.http.MediaType;
//import org.springframework.restdocs.payload.JsonFieldType;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.test.context.support.WithMockUser;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.ResultActions;
//
//import java.time.LocalDate;
//import java.time.LocalDateTime;
//
//import static org.mockito.ArgumentMatchers.*;
//import static org.mockito.BDDMockito.given;
//import static org.mockito.Mockito.*;
//import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
//import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
//import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
//import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
//import static org.springframework.restdocs.payload.PayloadDocumentation.*;
//import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
//import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
//
//
//@WebMvcTest(MemberController.class)
//@MockBean(JpaMetamodelMappingContext.class)
//@AutoConfigureRestDocs
//public class MemberRestDocsTest {
//    @Autowired
//    private MockMvc mockMvc;
//    @MockBean
//    private MemberService memberService;
//    @MockBean
//    private MemberMapper memberMapper;
//    @MockBean
//    private MemberRepository memberRepository;
//    @Autowired
//    private Gson gson;
//    @MockBean
//    private CustomAuthorityUtils customAuthorityUtils;
//    @MockBean
//    private JwtTokenizer jwtTokenizer;
//
//    @Test @WithMockUser
//    @DisplayName("회원 가입")
//    public void MemberSignUpTest() throws Exception {
//        // given
//        MemberSignUpRequestDto memberSignUpRequestDto = new MemberSignUpRequestDto();
//        memberSignUpRequestDto.setName("이석원");
//        memberSignUpRequestDto.setEmail("user1@example.com");
//        memberSignUpRequestDto.setPassword("password1");
//        memberSignUpRequestDto.setNickname("프론트대장");
//        memberSignUpRequestDto.setBirthday(LocalDate.parse("2005-05-11"));
//        memberSignUpRequestDto.setGender(true);
//
//
//        given(memberMapper.memberSignUpRequestDtoToMember(any(MemberSignUpRequestDto.class))).willReturn(new Member());
//
//        MemberSignUpResponseDto memberSignUpResponseDto = new MemberSignUpResponseDto();
//        memberSignUpResponseDto.setMemberId(1L);
//        memberSignUpResponseDto.setName("이석원");
//        memberSignUpResponseDto.setEmail("user1@example.com");
//        memberSignUpResponseDto.setNickname("프론트대장");
//        memberSignUpResponseDto.setBirthday(LocalDate.parse("2005-05-11"));
//        memberSignUpResponseDto.setGender(true);
//        memberSignUpResponseDto.setCreatedAt(LocalDateTime.now());
//
//        given(memberService.signUp(any(MemberSignUpRequestDto.class))).willReturn(memberSignUpResponseDto);
//
//        ObjectMapper objectMapper = new ObjectMapper();
//        objectMapper.registerModule(new JavaTimeModule());
//        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
//        String jsonRequest = objectMapper.writeValueAsString(memberSignUpRequestDto);
//
//        // when
//        ResultActions actions = mockMvc.perform(
//                post("/members/signup")
//                        .with(csrf())
//                        .accept(MediaType.APPLICATION_JSON)
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(jsonRequest)
//        );
//
//        // then
//        actions
//                .andExpect(status().isCreated())
//                .andExpect(jsonPath("$.memberId").value(memberSignUpResponseDto.getMemberId()))
//                .andExpect(jsonPath("$.name").value(memberSignUpResponseDto.getName()))
//                .andExpect(jsonPath("$.email").value(memberSignUpResponseDto.getEmail()))
//                .andExpect(jsonPath("$.nickname").value(memberSignUpResponseDto.getNickname()))
//                .andExpect(jsonPath("$.birthday").exists())
//                .andExpect(jsonPath("$.gender").value(memberSignUpResponseDto.getGender()))
//                .andExpect(jsonPath("$.createdAt").exists())
//                .andDo(print())
//                .andDo(document("/members/signup",
//                        preprocessRequest(prettyPrint()),
//                        preprocessResponse(prettyPrint()),
//                        requestFields(
//                                fieldWithPath("name").type(JsonFieldType.STRING).description("이름"),
//                                fieldWithPath("email").type(JsonFieldType.STRING).description("이메일"),
//                                fieldWithPath("password").type(JsonFieldType.STRING).description("비밀번호"),
//                                fieldWithPath("nickname").type(JsonFieldType.STRING).description("별명"),
//                                fieldWithPath("birthday").type(JsonFieldType.STRING).description("생년월일(yyyy-MM-dd)"),
//                                fieldWithPath("gender").type(JsonFieldType.BOOLEAN).description("성별(true:남성, false:여성)")
//                        ),
//                        responseFields(
//                                fieldWithPath("memberId").description("회원 아이디"),
//                                fieldWithPath("name").description("이름"),
//                                fieldWithPath("email").description("이메일"),
//                                fieldWithPath("nickname").description("별명"),
//                                fieldWithPath("birthday").description("생년월일(yyyy-MM-dd)"),
//                                fieldWithPath("gender").description("성별(true:남성, false:여성)"),
//                                fieldWithPath("createdAt").description("생성일")
//                        )
//                ));
//    }
//
//    @Test
//    @WithMockUser
//    @DisplayName("회원 정보 수정")
//    public void updateMemberTest() throws Exception {
//        // given
//        MemberUpdateRequestDto memberUpdateRequestDto = new MemberUpdateRequestDto();
//        memberUpdateRequestDto.setName("최용준");
//        memberUpdateRequestDto.setEmail("BACKEND2@example.com");
//        memberUpdateRequestDto.setPassword("PASSWORD!2");
//        memberUpdateRequestDto.setNickname("백엔드대장");
//        memberUpdateRequestDto.setBirthday(LocalDate.parse("2005-05-11"));
//        memberUpdateRequestDto.setGender(false);
//        // memberUpdateRequestDto 객체의 필드 값 설정 ...
//
//        // Service 객체에서 반환되는 MemberResponseDto 객체
//        MemberResponseDto expectedResponseDto = new MemberResponseDto();
//        expectedResponseDto.setMemberId(1L);
//        expectedResponseDto.setName(memberUpdateRequestDto.getName());
//        expectedResponseDto.setEmail(memberUpdateRequestDto.getEmail());
//        expectedResponseDto.setNickname(memberUpdateRequestDto.getNickname());
//        expectedResponseDto.setBirthday(memberUpdateRequestDto.getBirthday());
//        expectedResponseDto.setGender(memberUpdateRequestDto.getGender());
//        expectedResponseDto.setStatus(Member.MemberStatus.MEMBER_ACTIVE);
//        expectedResponseDto.setCreatedAt(LocalDateTime.now());
//        expectedResponseDto.setUpdatedAt(LocalDateTime.now());
//
//        given(memberService.updateMember(any(Authentication.class), any(MemberUpdateRequestDto.class)))
//                .willAnswer(invocation -> {
//                    MemberUpdateRequestDto requestDto = invocation.getArgument(1);
//                    return new MemberResponseDto(1L, requestDto.getName(), requestDto.getEmail(), requestDto.getNickname(),
//                            requestDto.getBirthday(), requestDto.getGender(), Member.MemberStatus.MEMBER_ACTIVE,
//                            LocalDateTime.now(), LocalDateTime.now());
//                });
//
//        ObjectMapper objectMapper = new ObjectMapper();
//        objectMapper.registerModule(new JavaTimeModule());
//        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
//        String jsonRequest = objectMapper.writeValueAsString(memberUpdateRequestDto);
//
//        // when
//        ResultActions actions = mockMvc.perform(
//                patch("/members/editprofile")
//                        .header("Authorization", "Bearer access_token")
//                        .with(csrf())
//                        .accept(MediaType.APPLICATION_JSON)
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(jsonRequest)
//        );
//
//        // then
//        actions
//                .andExpect(status().isOk())
//                .andDo(document("/members/editprofile",
//                        preprocessRequest(prettyPrint()),
//                        preprocessResponse(prettyPrint()),
//                        requestHeaders(
//                                headerWithName("Authorization").description("인증 토큰 (Bearer {access_token})")
//                        ),
//                        requestFields(
//                                fieldWithPath("name").type(JsonFieldType.STRING).description("이름 (선택)"),
//                                fieldWithPath("email").type(JsonFieldType.STRING).description("이메일 (선택)"),
//                                fieldWithPath("password").type(JsonFieldType.STRING).optional().description("비밀번호 (선택)"),
//                                fieldWithPath("nickname").type(JsonFieldType.STRING).description("별명 (선택)"),
//                                fieldWithPath("birthday").type(JsonFieldType.STRING).description("생년월일(yyyy-MM-dd) (선택)"),
//                                fieldWithPath("gender").type(JsonFieldType.BOOLEAN).description("성별(true:남성, false:여성) (선택)")
//                        ),
//                        responseFields(
//                                fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("회원 ID"),
//                                fieldWithPath("name").type(JsonFieldType.STRING).description("이름"),
//                                fieldWithPath("email").type(JsonFieldType.STRING).description("이메일"),
//                                fieldWithPath("nickname").type(JsonFieldType.STRING).description("별명"),
//                                fieldWithPath("birthday").type(JsonFieldType.STRING).description("생년월일(yyyy-MM-dd)"),
//                                fieldWithPath("gender").type(JsonFieldType.BOOLEAN).description("성별(true:남성, false:여성)"),
//                                fieldWithPath("status").type(JsonFieldType.STRING).description("회원 상태(ACTIVE:활동, INACTIVE:비활동)"),
//                                fieldWithPath("createdAt").type(JsonFieldType.STRING).description("회원 가입일시(yyyy-MM-dd'T'HH:mm:ss)"),
//                                fieldWithPath("updatedAt").type(JsonFieldType.STRING).description("회원 정보 수정일시(yyyy-MM-dd'T'HH:mm:ss)")
//                        )
//                ));
//    }
//    @Test
//    @WithMockUser
//    @DisplayName("내 정보 조회")
//    public void getMemberTest() throws Exception {
//        // given
//        MemberResponseDto expectedResponseDto = new MemberResponseDto();
//        expectedResponseDto.setMemberId(1L);
//        expectedResponseDto.setName("최용준");
//        expectedResponseDto.setEmail("BACKEND@example.com");
//        expectedResponseDto.setNickname("백엔드대장");
//        expectedResponseDto.setBirthday(LocalDate.parse("2005-05-11"));
//        expectedResponseDto.setGender(true);
//        expectedResponseDto.setStatus(Member.MemberStatus.MEMBER_ACTIVE);
//        expectedResponseDto.setCreatedAt(LocalDateTime.now());
//        expectedResponseDto.setUpdatedAt(LocalDateTime.now());
//
//        given(memberService.findMember(any(Authentication.class)))
//                .willReturn(expectedResponseDto);
//
//
//
//        // when
//        ResultActions actions = mockMvc.perform(
//                get("/members/me")
//                        .header("Authorization", "Bearer access_token")
//                        .accept(MediaType.APPLICATION_JSON)
//        );
//
//        // then
//        actions
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.memberId").value(expectedResponseDto.getMemberId()))
//                .andExpect(jsonPath("$.name").value(expectedResponseDto.getName()))
//                .andExpect(jsonPath("$.email").value(expectedResponseDto.getEmail()))
//                .andExpect(jsonPath("$.nickname").value(expectedResponseDto.getNickname()))
//                .andExpect(jsonPath("$.birthday").value(expectedResponseDto.getBirthday().toString()))
//                .andExpect(jsonPath("$.gender").value(expectedResponseDto.getGender()))
//                .andExpect(jsonPath("$.status").value(expectedResponseDto.getStatus().name()))
//                .andExpect(jsonPath("$.createdAt").exists())
//                .andExpect(jsonPath("$.updatedAt").exists())
//                .andDo(document("/members/me",
//                        preprocessRequest(prettyPrint()),
//                        preprocessResponse(prettyPrint()),
//                        requestHeaders(
//                                headerWithName("Authorization").description("인증 토큰 (Bearer {access_token})")
//                        ),
//                        responseFields(
//                                fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("회원 ID"),
//                                fieldWithPath("name").type(JsonFieldType.STRING).description("이름"),
//                                fieldWithPath("email").type(JsonFieldType.STRING).description("이메일"),
//                                fieldWithPath("nickname").type(JsonFieldType.STRING).description("별명"),
//                                fieldWithPath("birthday").type(JsonFieldType.STRING).description("생년월일(yyyy-MM-dd)"),
//                                fieldWithPath("gender").type(JsonFieldType.BOOLEAN).description("성별(true:남성, false:여성)"),
//                                fieldWithPath("status").type(JsonFieldType.STRING).description("회원 상태(ACTIVE:활동, INACTIVE:비활동)"),
//                                fieldWithPath("createdAt").type(JsonFieldType.STRING).description("회원 가입일시(yyyy-MM-dd'T'HH:mm:ss)"),
//                                fieldWithPath("updatedAt").type(JsonFieldType.STRING).description("회원 정보 수정일시(yyyy-MM-dd'T'HH:mm:ss)")
//                        )
//                ));
//    }
//
//    @Test
//    @WithMockUser
//    @DisplayName("회원 탈퇴")
//    public void deleteMemberTest() throws Exception {
//        // given
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        doNothing().when(memberService).deleteMember(authentication);
//
//        // when
//        ResultActions actions = mockMvc.perform(
//                delete("/members/delete")
//                        .with(csrf())
//                        .header("Authorization", "Bearer access_token")
//        );
//
//        // then
//        actions
//                .andExpect(status().isNoContent())
//                .andDo(document("/members/delete",
//                        preprocessRequest(prettyPrint()),
//                        preprocessResponse(prettyPrint()),
//                        requestHeaders(
//                                headerWithName("Authorization").description("인증 토큰 (Bearer {access_token})")
//                        )
//                ));
//
//        verify(memberService, times(1)).deleteMember(authentication);
//    }
//
//}
