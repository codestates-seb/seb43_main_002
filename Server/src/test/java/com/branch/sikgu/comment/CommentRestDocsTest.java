package com.branch.sikgu.comment;

import com.branch.sikgu.meal.comment.controller.CommentController;
import com.branch.sikgu.meal.comment.dto.CommentDto;
import com.branch.sikgu.meal.comment.entity.Comment;
import com.branch.sikgu.meal.comment.mapper.CommentMapper;
import com.branch.sikgu.meal.comment.service.CommentService;
import com.fasterxml.jackson.databind.ObjectMapper;
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

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(CommentController.class)
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
public class CommentRestDocsTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private CommentService commentService;

    @MockBean
    private CommentMapper commentMapper;

    @Test
    @WithMockUser
    @DisplayName("댓글 작성")
    public void createCommentTest () throws Exception {
        CommentDto.Post commentPostDto =
                new CommentDto.Post("댓글 내용");

        given(commentService.createComment(any(), eq(1L), eq("test-token"))).willReturn(new Comment());

        mockMvc.perform(
                post("/boards/{board-id}/comments", 1L)
                        .with(csrf())
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(commentPostDto))
                        .header("Authorization", "Bearer " + "test-token")
        )
                .andExpect(status().isCreated())
                .andDo(document("comment/create",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestHeaders(
                                headerWithName("Authorization").description("접근 토큰")
                        ),
                        requestFields(
                                List.of(
                                        fieldWithPath("body").type(JsonFieldType.STRING).description("댓글 내용")
                                )
                        )
                        ));
    }

    @Test
    @WithMockUser
    @DisplayName("댓글 수정")
    public void updateCommentTest () throws Exception {
        CommentDto.Patch commentPatchDto = new CommentDto.Patch(
                1L,
                "수정 댓글",
                LocalDateTime.now()
        );

        CommentDto.Response commentResponseDto =
                new CommentDto.Response(1L,
                        1L,
                        "닉네임",
                        "수정된 댓글내용입니다",
                        LocalDateTime.now(),
                        LocalDateTime.now());

        given(commentService.updateComment(any(Comment.class), Mockito.any())).willReturn(new Comment());
        given(commentMapper.commentPatchDto_to_Comment(Mockito.any(CommentDto.Patch.class))).willReturn(new Comment());
        given(commentMapper.commentToCommentResponseDto(Mockito.any(Comment.class)))
                .willReturn(commentResponseDto);

        mockMvc.perform(
                        patch("/boards/comments/{comment-id}", commentPatchDto.getCommentId())
                                .with(csrf())
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
//                                .content(content)
                                .content(objectMapper.writeValueAsString(commentPatchDto))
                                .header("Authorization", "Bearer " + "test-token")
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.commentId").value(commentPatchDto.getCommentId()))
                .andDo(document("comment/update",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestHeaders(
                                headerWithName("Authorization").description("접근 토큰")
                        ),
                        pathParameters(
                                parameterWithName("comment-id").description("댓글 식별")
                        ),
                        requestFields(
                                List.of(
                                        fieldWithPath("commentId").type(JsonFieldType.NUMBER).description("댓글 식별자"),
                                        fieldWithPath("body").type(JsonFieldType.STRING).description("댓글 내용"),
                                        fieldWithPath("updatedAt").type(JsonFieldType.STRING).description("수정 시간")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("commentId").type(JsonFieldType.NUMBER).description("댓글 식별자"),
                                        fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("멤버 식별자"),
                                        fieldWithPath("nickName").type(JsonFieldType.STRING).description("닉네임"),
                                        fieldWithPath("body").type(JsonFieldType.STRING).description("댓글 내용"),
                                        fieldWithPath("createdAt").type(JsonFieldType.STRING).description("작성 시간"),
                                        fieldWithPath("updatedAt").type(JsonFieldType.STRING).description("수정 시간")
                                )
                        )
                        ));
    }

    @Test
    @WithMockUser
    @DisplayName("특정 게시물에 대한 댓글 조회")
    public void getCommentTest() throws Exception {
        LocalDateTime timeX = LocalDateTime.parse("2023-05-20T13:30:00");
        LocalDateTime timeY = LocalDateTime.parse("2023-05-21T14:00:00");

        List<CommentDto.Response> comments = Arrays.asList(
                new CommentDto.Response(1L,
                        1L,
                        "닉네임1",
                        "댓글내용1입니다",
                        timeX,
                        timeY),
                new CommentDto.Response(2L,
                        3L,
                        "닉네임2",
                        "댓글내용2입니다",
                        timeX,
                        timeY)

        );

//        when(commentService.findComment(1L)).thenReturn(new Comment());
        given(commentService.findComments(1L)).willReturn(comments);

        mockMvc.perform(
                        get("/boards/{board-id}/comments", 1L)
                                .with(csrf())
                                .header("Authorization", "Bearer " + "token")
                                .accept(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2))) // 게시글이 2개인지 확인

                .andExpect(jsonPath("$[0].commentId", is(1))) // 첫 번째 게시글의 멤버 id 확인
                .andExpect(jsonPath("$[0].memberId", is(1)))
                .andExpect(jsonPath("$[0].nickName", is("닉네임1")))
                .andExpect(jsonPath("$[0].body", is("댓글내용1입니다"))) // 첫 번째 게시글의 멤버 id 확인
                .andExpect(jsonPath("$[0].createdAt", is("2023-05-20T13:30:00")))
                .andExpect(jsonPath("$[0].updatedAt", is("2023-05-21T14:00:00")))

                .andExpect(jsonPath("$[1].commentId", is(2))) // 첫 번째 게시글의 멤버 id 확인
                .andExpect(jsonPath("$[1].memberId", is(3)))
                .andExpect(jsonPath("$[1].nickName", is("닉네임2")))
                .andExpect(jsonPath("$[1].body", is("댓글내용2입니다"))) // 첫 번째 게시글의 멤버 id 확인
                .andExpect(jsonPath("$[1].createdAt", is("2023-05-20T13:30:00")))
                .andExpect(jsonPath("$[1].updatedAt", is("2023-05-21T14:00:00")))

                .andDo(print())
                .andDo(document("comment/getByBoard",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestHeaders(
                                headerWithName("Authorization").description("액세스 토큰")
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("[].commentId").type(JsonFieldType.NUMBER).description("댓글 식별자"),
                                        fieldWithPath("[].memberId").type(JsonFieldType.NUMBER).description("멤버 식별자"),
                                        fieldWithPath("[].nickName").type(JsonFieldType.STRING).description("닉네임"),
                                        fieldWithPath("[].body").type(JsonFieldType.STRING).description("댓글 내용"),
                                        fieldWithPath("[].createdAt").type(JsonFieldType.STRING).description("작성 시간"),
                                        fieldWithPath("[].updatedAt").type(JsonFieldType.STRING).description("수정 시간")
                                )
                        )
                ));
    }

    @Test
    @WithMockUser
    @DisplayName("댓글 삭제") // -> 403
    public void deleteBoardTest() throws Exception {
        long commentId = 1L;
        doNothing().when(commentService).deleteComment(commentId, eq(any()));

        mockMvc.perform(
                        delete("/boards/comments/{comment-id}", commentId)
                                .header("Authorization", "Bearer " + "test-token")
                                .with(csrf())
                                .accept(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isNoContent())
                .andDo(print())
                .andDo(document("comment/delete",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("comment-id").description("댓글 식별자")
                        ),
                        requestHeaders(
                                headerWithName("Authorization").description("액세스 토큰")
                        )
                ));
    }
}
