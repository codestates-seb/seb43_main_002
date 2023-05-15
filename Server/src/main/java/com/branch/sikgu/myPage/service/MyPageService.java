package com.branch.sikgu.myPage.service;

import com.branch.sikgu.myPage.dto.MyPageResponseDto;
import com.branch.sikgu.myPage.entity.MyPage;
import com.branch.sikgu.myPage.mapper.MyPageMapper;
import com.branch.sikgu.myPage.repository.MyPageRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@AllArgsConstructor
public class MyPageService {
    private final MyPageRepository myPageRepository;
    private final MyPageMapper myPageMapper;

    public MyPageResponseDto getMyPage(Long memberId) {
        MyPage mypage = myPageRepository.findByMember_MemberId(memberId);
        return myPageMapper.MyPageToMyPageResponseDto(mypage);
    }
}
