package com.branch.sickgu.member.mapper;


import com.branch.sickgu.member.dto.MemberSignUpRequestDto;
import com.branch.sickgu.member.dto.MemberSignUpResponseDto;
import com.branch.sickgu.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {
    Member memberSignUpRequestDtoToMember(MemberSignUpRequestDto memberSignUpRequestDto);

    MemberSignUpResponseDto memberToMemberSignUpResponseDto(Member member);
}
