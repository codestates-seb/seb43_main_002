package com.branch.sickgu.member.mapper;

import com.branch.sickgu.member.dto.MemberPostDto;
import com.branch.sickgu.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface MemberMapper {

    MemberMapper INSTANCE = Mappers.getMapper(MemberMapper.class);

    @Mapping(source = "password", target = "password", qualifiedByName = "encodePassword")
    Member toMember(MemberPostDto dto);

    default String encodePassword(String password) {
        return PasswordEncoder.encode(password);
    }
}
