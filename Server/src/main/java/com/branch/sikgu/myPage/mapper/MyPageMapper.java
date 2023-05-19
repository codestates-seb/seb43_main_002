package com.branch.sikgu.myPage.mapper;

import com.branch.sikgu.myPage.dto.MyPageResponseDto;
import com.branch.sikgu.myPage.entity.MyPage;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MyPageMapper {

    MyPageResponseDto MyPageToMyPageResponseDto(MyPage myPage);
}
