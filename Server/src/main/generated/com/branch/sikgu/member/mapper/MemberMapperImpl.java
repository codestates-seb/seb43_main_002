package com.branch.sikgu.member.mapper;

import com.branch.sikgu.member.dto.MemberResponseDto;
import com.branch.sikgu.member.dto.MemberSignUpRequestDto;
import com.branch.sikgu.member.dto.MemberSignUpResponseDto;
import com.branch.sikgu.member.entity.Member;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-05-25T14:01:58+0900",
    comments = "version: 1.5.1.Final, compiler: javac, environment: Java 11.0.18 (Azul Systems, Inc.)"
)
@Component
public class MemberMapperImpl implements MemberMapper {

    @Override
    public Member memberSignUpRequestDtoToMember(MemberSignUpRequestDto memberSignUpRequestDto) {
        if ( memberSignUpRequestDto == null ) {
            return null;
        }

        Member member = new Member();

        member.setName( memberSignUpRequestDto.getName() );
        member.setEmail( memberSignUpRequestDto.getEmail() );
        member.setPassword( memberSignUpRequestDto.getPassword() );
        member.setNickname( memberSignUpRequestDto.getNickname() );
        member.setBirthday( memberSignUpRequestDto.getBirthday() );
        member.setGender( memberSignUpRequestDto.getGender() );

        return member;
    }

    @Override
    public MemberSignUpResponseDto memberToMemberSignUpResponseDto(Member member) {
        if ( member == null ) {
            return null;
        }

        MemberSignUpResponseDto memberSignUpResponseDto = new MemberSignUpResponseDto();

        memberSignUpResponseDto.setMemberId( member.getMemberId() );
        memberSignUpResponseDto.setName( member.getName() );
        memberSignUpResponseDto.setEmail( member.getEmail() );
        memberSignUpResponseDto.setNickname( member.getNickname() );
        memberSignUpResponseDto.setBirthday( member.getBirthday() );
        memberSignUpResponseDto.setGender( member.getGender() );
        memberSignUpResponseDto.setCreatedAt( member.getCreatedAt() );

        return memberSignUpResponseDto;
    }

    @Override
    public MemberResponseDto memberToMemberResponseDto(Member member) {
        if ( member == null ) {
            return null;
        }

        MemberResponseDto memberResponseDto = new MemberResponseDto();

        memberResponseDto.setMemberId( member.getMemberId() );
        memberResponseDto.setName( member.getName() );
        memberResponseDto.setEmail( member.getEmail() );
        memberResponseDto.setNickname( member.getNickname() );
        memberResponseDto.setBirthday( member.getBirthday() );
        memberResponseDto.setGender( member.getGender() );
        memberResponseDto.setStatus( member.getStatus() );
        memberResponseDto.setCreatedAt( member.getCreatedAt() );
        memberResponseDto.setUpdatedAt( member.getUpdatedAt() );

        return memberResponseDto;
    }

    @Override
    public List<MemberResponseDto> membersToMemberResponseDtos(List<Member> members) {
        if ( members == null ) {
            return null;
        }

        List<MemberResponseDto> list = new ArrayList<MemberResponseDto>( members.size() );
        for ( Member member : members ) {
            list.add( memberToMemberResponseDto( member ) );
        }

        return list;
    }
}
