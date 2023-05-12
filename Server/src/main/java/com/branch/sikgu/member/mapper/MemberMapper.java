package com.branch.sikgu.member.mapper;


import com.branch.sikgu.member.dto.MemberResponseDto;
import com.branch.sikgu.member.dto.MemberSignUpRequestDto;
import com.branch.sikgu.member.dto.MemberSignUpResponseDto;
import com.branch.sikgu.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {
    Member memberSignUpRequestDtoToMember(MemberSignUpRequestDto memberSignUpRequestDto);

    MemberSignUpResponseDto memberToMemberSignUpResponseDto(Member member);

    MemberResponseDto memberToMemberResponseDto(Member member);

    MemberResponseDto memberToMemberResponseDtoWithoutSensitiveInfo(MemberResponseDto member);

    List<MemberResponseDto> memberToMemberList(List<Member> members);

    List<MemberResponseDto> membersToMemberResponseDtos(List<Member> members);



}
