package com.branch.sikgu.Board;

import com.branch.sikgu.board.controller.BoardController;
import com.branch.sikgu.board.dto.BoardDto;
import com.branch.sikgu.board.entity.Board;
import com.branch.sikgu.board.service.BoardService;
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
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.headers.HeaderDocumentation.*;
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

@WebMvcTest(BoardController.class)
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
public class BoardRestDocsTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private BoardService boardService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @WithMockUser(username = "홍길동", roles = "USER")
    @DisplayName("게시글 생성")
    public void createBoardTest() throws Exception {
        // given
        LocalDateTime timeX = LocalDateTime.parse("2023-05-25T13:30");

        BoardDto.Post boardPostDto =
                new BoardDto.Post(
                        "제목",
                        "본문",
                        4,
                        Board.PassedGender.ANY,
                        timeX
                );

        given(boardService.createBoard(Mockito.any(BoardDto.Post.class), Mockito.any(String.class)))
                .willReturn(new BoardDto.Response(
                        1L,
                        1L,
                        "제목",
                        "본문",
                        LocalDateTime.now(),
                        null,
                        4,
                        Board.PassedGender.ANY,
                        timeX
                ));

        // when
        mockMvc.perform(
                        post("/boards")
                                .with(csrf())
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(boardPostDto))
                                .header("Authorization", "Bearer " + "test-token")
                )
                .andExpect(status().isCreated())
                .andDo(document("create-board",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestHeaders(
                                headerWithName("Authorization").description("액세스 토큰")
                        ),
                        requestFields(
                                List.of(
                                        fieldWithPath("title").type(JsonFieldType.STRING).description("게시글 제목"),
                                        fieldWithPath("body").type(JsonFieldType.STRING).description("게시글 본문"),
                                        fieldWithPath("total").type(JsonFieldType.NUMBER).description("참여자 총 인원").optional(),
                                        fieldWithPath("passedGender").type(JsonFieldType.STRING).description("참여자 성별 제한").optional(),
                                        fieldWithPath("mealTime").type(JsonFieldType.STRING).description("식사 시간").optional()
                                )
                        )
                ));
    }

    @Test
    @WithMockUser(roles = "USER")
    @DisplayName("게시물 수정")
    public void updateBoardTest() throws Exception {
        LocalDateTime timeX = LocalDateTime.parse("2023-05-20T13:30");
        BoardDto.Patch boardPatchDto = new BoardDto.Patch(
                1L,
                "제목",
                "본문",
                4,
                Board.PassedGender.ANY,
                timeX);
        String content = gson.toJson(boardPatchDto);

        BoardDto.Response responseDto = new BoardDto.Response(
                1L,
                1L,
                "수정 제목",
                "수정 본문",
                LocalDateTime.now(),
                LocalDateTime.now(),
                3,
                Board.PassedGender.MALE,
                timeX

        );

        given(boardService.updateBoard(boardPatchDto.getBoardId(), boardPatchDto, "test-token")).willReturn(responseDto);

        mockMvc.perform(
                        patch("/boards/{board-id}", 1L)
                                .with(csrf())
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(boardPatchDto))
//                                .content(content)
                                .header("Authorization", "Bearer " + "test-token")
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.boardId").value(boardPatchDto.getBoardId()))
                .andExpect(jsonPath("$.body").value(boardPatchDto.getBody()))
//                .andExpect(jsonPath("$.memberId", is(1)))
//                .andExpect(jsonPath("$.title", is("수정 제목")))
//                .andExpect(jsonPath("$.body", is("수정 본문")))
                .andDo(print())
                .andDo(document("update-board",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestHeaders(
                                headerWithName("Authorization").description("액세스 토큰")
                        ),
                        pathParameters(
                                parameterWithName("board-id").description("게시글 식별자")
                        ),
                        requestFields(
                                List.of(
                                        fieldWithPath("boardId").type(JsonFieldType.NUMBER).description("게시글 식별자"),
                                        fieldWithPath("title").type(JsonFieldType.STRING).description("게시글 제목"),
                                        fieldWithPath("body").type(JsonFieldType.STRING).description("게시글 본문"),
                                        fieldWithPath("total").type(JsonFieldType.NUMBER).description("참여자 총 인원").optional(),
                                        fieldWithPath("passedGender").type(JsonFieldType.STRING).description("참여자 성별 제한").optional(),
                                        fieldWithPath("mealTime").type(JsonFieldType.STRING).description("식사 시간").optional()
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("회원 식별자"),
                                        fieldWithPath("boardId").type(JsonFieldType.NUMBER).description("게시글 식별자"),
                                        fieldWithPath("title").type(JsonFieldType.STRING).description("게시글 제목"),
                                        fieldWithPath("body").type(JsonFieldType.STRING).description("게시글 본문"),
                                        fieldWithPath("createdAt").type(JsonFieldType.STRING).description("게시글 작성 시각"),
                                        fieldWithPath("updatedAt").type(JsonFieldType.STRING).description("게시글 수정 시각").optional(),
                                        fieldWithPath("total").type(JsonFieldType.NUMBER).description("참여자 총 인원").optional(),
                                        fieldWithPath("passedGender").type(JsonFieldType.STRING).description("참여자 성별 제한").optional(),
                                        fieldWithPath("mealTime").type(JsonFieldType.STRING).description("식사 시간").optional()
                                )
                        )
                ));
    }

    @Test
    @WithMockUser(roles = "USER")
    @DisplayName("게시물 삭제") // -> 403
    public void deleteBoardTest() throws Exception {
        long boardId = 1L;
        doNothing().when(boardService).deleteBoard(boardId, eq(any()));

        mockMvc.perform(
                        delete("/boards/{board-id}", boardId)
                                .header("Authorization", "Bearer " + "test-token")
                                .accept(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isNoContent())
                .andDo(print())
                .andDo(document("delete-board",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("board-id").description("게시글 식별자")
                        ),
                        requestHeaders(
                                headerWithName("Authorization").description("액세스 토큰")
                        )
                ));
    }

    @Test
    @WithMockUser
    @DisplayName("게시글 전체 조회")
    public void getBoardsTest() throws Exception {
        LocalDateTime timeX = LocalDateTime.parse("2023-05-20T13:30:00");
        LocalDateTime timeY = LocalDateTime.parse("2023-05-21T14:00:00");

        // 가상의 게시글 데이터
        List<BoardDto.Response> boards = Arrays.asList(
                new BoardDto.Response(1L, 1L,"제목1", "내용1",  timeX, null, 3, Board.PassedGender.MALE, timeY),
                new BoardDto.Response(2L, 3L,"제목2", "내용2",  timeX,  null, 4, Board.PassedGender.FEMALE, timeY)
        );

        // boardService의 getBoards() 메서드가 가상의 게시글 데이터를 반환하도록 설정
        when(boardService.getAllBoards()).thenReturn(boards);

        mockMvc.perform(
                        get("/boards")
                                .header("Authorization", "Bearer " + "test-token")
                                .accept(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2))) // 게시글이 2개인지 확인
                .andExpect(jsonPath("$[0].memberId", is(1))) // 첫 번째 게시글의 멤버 id 확인
                .andExpect(jsonPath("$[0].boardId", is(1))) // 첫 번째 게시글의 id 확인
                .andExpect(jsonPath("$[0].title", is("제목1"))) // 첫 번째 게시글의 제목 확인
                .andExpect(jsonPath("$[0].body", is("내용1"))) // 첫 번째 게시글의 내용 확인
                .andExpect(jsonPath("$[0].createdAt", is(notNullValue())))
                .andExpect(jsonPath("$[0].updatedAt").doesNotExist())
                .andExpect(jsonPath("$[0].total", is(3)))
                .andExpect(jsonPath("$[0].passedGender", is("MALE")))
                .andExpect(jsonPath("$[0].mealTime", is("2023-05-21T14:00:00")))

                .andExpect(jsonPath("$[1].memberId", is(2))) // 두 번째 게시글의 멤버 id 확인
                .andExpect(jsonPath("$[1].boardId", is(3))) // 첫 번째 게시글의 id 확인
                .andExpect(jsonPath("$[1].title", is("제목2"))) // 두 번째 게시글의 제목 확인
                .andExpect(jsonPath("$[1].body", is("내용2"))) // 두 번째 게시글의 내용 확인
                .andExpect(jsonPath("$[1].createdAt", is(notNullValue())))
                .andExpect(jsonPath("$[1].updatedAt").doesNotExist())
                .andExpect(jsonPath("$[1].total", is(4)))
                .andExpect(jsonPath("$[1].passedGender", is("FEMALE")))
                .andExpect(jsonPath("$[1].mealTime", is("2023-05-21T14:00:00")))
                .andDo(print())
                .andDo(document("get-boards",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestHeaders(
                                headerWithName("Authorization").description("액세스 토큰")
                        ),
                        responseFields(
                                fieldWithPath("[].memberId").description("게시글 작성자"),
                                fieldWithPath("[].boardId").description("게시글 식별자"),
                                fieldWithPath("[].title").description("게시글 제목"),
                                fieldWithPath("[].body").description("게시글 내용"),
                                fieldWithPath("[].createdAt").description("게시글 작성일"),
                                fieldWithPath("[].updatedAt").description("게시글 수정일").optional(),
                                fieldWithPath("[].total").description("참가자 수"),
                                fieldWithPath("[].passedGender").description("참가자 성별 제한"),
                                fieldWithPath("[].mealTime").description("식사 날짜")
                        )
                                // 필요한 필드들에 대한 설명을 추가로 작성
                        )
                );
    }

    @Test
    @WithMockUser
    @DisplayName("게시글 조회")
    public void getBoardTest() throws Exception {
        LocalDateTime timeX = LocalDateTime.parse("2023-05-20T13:30:00");
        LocalDateTime timeY = LocalDateTime.parse("2023-05-21T14:00:00");
        // 가상의 게시글 데이터
//        Board board = new Board(1L, "제목1", "내용1", 3, timeX, null, timeY, Board.PassedGender.ANY, Board.BoardStatus.ACTIVE_BOARD, new Member());
        BoardDto.Response responseDto = new BoardDto.Response(
                1L,
                1L,
                "수정 제목",
                "수정 본문",
                timeX,
                null,
                3,
                Board.PassedGender.MALE,
                timeY);

        // boardService의 getBoardById() 메서드가 가상의 게시글 데이터를 반환하도록 설정
        when(boardService.getBoardById(1L)).thenReturn(board);

        mockMvc.perform(
                        get("/boards/{board-id}", 1L)
                                .header("Authorization", "Bearer " + "test-token")
                                .accept(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.boardId", is(1))) // 게시글의 id 확인
                .andExpect(jsonPath("$.title", is("제목1"))) // 게시글의 제목 확인
                .andExpect(jsonPath("$.body", is("내용1"))) // 게시글의 내용 확인
                .andExpect(jsonPath("$.total", is(3))) // 게시글의 참가자 수 확인
                .andExpect(jsonPath("$.createdAt", is("2023-05-20T13:30:00"))) // 게시글의 작성일 확인
                .andExpect(jsonPath("$.updatedAt").doesNotExist())// 게시글의 수정일 확인
                .andExpect(jsonPath("$.mealTime", is("2023-05-21T14:00:00"))) // 게시글의 식사 날짜 확인
                .andExpect(jsonPath("$.passedGender", is("ANY"))) // 게시글의 참가자 성별 제한 확인
                .andExpect(jsonPath("$.boardStatus", is("ACTIVE_BOARD")))
                .andExpect(jsonPath("$.memberId", is(member))) // 게시글의 멤버 id 확인
                .andDo(print())
                .andDo(document("get-board",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("board-id").description("게시글 식별자")
                        ),
                        requestHeaders(
                                headerWithName("Authorization").description("액세스 토큰")
                        ),
                        responseFields(
                                fieldWithPath("memberId").description("게시글 작성자"),
                                fieldWithPath("boardId").description("게시글 식별자"),
                                fieldWithPath("title").description("게시글 제목"),
                                fieldWithPath("body").description("게시글 내용"),
                                fieldWithPath("createdAt").description("게시글 작성일"),
                                fieldWithPath("updatedAt").description("게시글 수정일"),
                                fieldWithPath("total").description("참가자 수"),
                                fieldWithPath("passedGender").description("참가자 성별 제한"),
                                fieldWithPath("mealTime").description("식사 날짜")
                        )
                ));
    }
}
