package com.branch.sikgu.member.mapper;


import com.branch.sikgu.image.Entity.Image;
import com.branch.sikgu.member.dto.MemberResponseDto;
import com.branch.sikgu.member.dto.MemberSignUpRequestDto;
import com.branch.sikgu.member.dto.MemberSignUpResponseDto;
import com.branch.sikgu.member.entity.Member;
import com.branch.sikgu.myPage.dto.MyPageResponseDto;
import com.branch.sikgu.myPage.entity.MyPage;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {
    Member memberSignUpRequestDtoToMember(MemberSignUpRequestDto memberSignUpRequestDto);

    MemberSignUpResponseDto memberToMemberSignUpResponseDto(Member member);

    MemberResponseDto memberToMemberResponseDto(Member member);

    List<MemberResponseDto> membersToMemberResponseDtos(List<Member> members);

    default MemberResponseDto.HistoryMemberResponse memberToHistoryMemberResponseDto(Member member) {
        return new MemberResponseDto.HistoryMemberResponse(
                member.getMemberId(),
                member.getNickname()
        );
    }
}
