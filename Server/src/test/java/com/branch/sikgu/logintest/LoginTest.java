//package com.branch.sikgu.logintest;
//
//import com.branch.sikgu.SikguApplication;
//import com.branch.sikgu.member.entity.Member;
//import com.branch.sikgu.member.repository.MemberRepository;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.http.MediaType;
//import org.springframework.restdocs.RestDocumentationContextProvider;
//import org.springframework.restdocs.RestDocumentationExtension;
//import org.springframework.restdocs.mockmvc.MockMvcRestDocumentation;
//import org.springframework.security.crypto.password.PasswordEncoder;
//
//import org.springframework.test.annotation.Rollback;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.MvcResult;
//import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
//import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
//import org.springframework.test.web.servlet.setup.MockMvcBuilders;
//import org.springframework.transaction.annotation.Transactional;
//import org.springframework.web.context.WebApplicationContext;
//
//import java.time.LocalDate;
//import java.util.Optional;
//
//import static org.springframework.restdocs.headers.HeaderDocumentation.*;
//import static org.springframework.restdocs.payload.PayloadDocumentation.*;
//import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
//
//
//@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT, classes = SikguApplication.class)
//@AutoConfigureRestDocs
//@Transactional
//@Rollback
//@ExtendWith(RestDocumentationExtension.class)
//public class LoginTest {
//
//    @Autowired
//    private WebApplicationContext context;
//
//    @Autowired
//    private MemberRepository memberRepository;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    private MockMvc mockMvc;
//
//    @BeforeEach
//    void setUp(RestDocumentationContextProvider restDocumentation) {
//        mockMvc = MockMvcBuilders
//                .webAppContextSetup(context)
//                .apply(springSecurity())
//                .apply(MockMvcRestDocumentation.documentationConfiguration(restDocumentation))
//                .build();
//
//        Member member = new Member();
//        member.setMemberId(1L);
//        member.setEmail("user1@example.com");
//        member.setPassword(passwordEncoder.encode("password1"));
//        member.setName("김우디");
//        member.setNickname("WOODY");
//        member.setBirthday(LocalDate.parse("0000-06-07"));
//        member.setGender(true);
//        memberRepository.save(member);
//    }
//
//    @Test
//    @DisplayName("로그인 테스트")
//    private String loginTest() throws Exception {
//        Optional<Member> member = memberRepository.findByEmail("user1@example.com");
//        String requestBody = "{\"email\":\"user1@example.com\", \"password\":\"password1\"}";
//        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/members/login")
//                        .content(requestBody)
//                        .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(MockMvcResultMatchers.status().isOk())
//                .andDo(MockMvcRestDocumentation.document("/members/login",
//                        requestFields(
//                                fieldWithPath("email").description("로그인할 이메일"),
//                                fieldWithPath("password").description("로그인할 패스워드")
//                        ),
//                        responseHeaders(
//                                headerWithName("Authorization").description("인증 토큰 (Bearer {access_token})")
//                        )
//                ))
//                .andReturn();
//
//        return result.getResponse().getHeader("Authorization");
//    }
//
//    @Test
//    @DisplayName("로그아웃 테스트")
//    void logoutTest() throws Exception {
//        // 로그인을 먼저 수행합니다.
//        String token = loginTest();
//
//        // 로그아웃을 시도합니다.
//        mockMvc.perform(MockMvcRequestBuilders.post("/members/logout")
//                        .header("Authorization", token))
//                .andExpect(MockMvcResultMatchers.status().isOk())
//                .andDo(MockMvcRestDocumentation.document("/members/logout",
//                        requestHeaders(
//                                headerWithName("Authorization").description("인증 토큰 (Bearer {access_token})")
//                        ),
//                        responseHeaders(
//                                headerWithName("Authorization").description("인증 토큰 (Bearer {access_token})")
//                )));
//    }
//
//
//}