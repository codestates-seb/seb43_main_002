package com.branch.sikgu.meal.history.mapper;

import com.branch.sikgu.meal.history.dto.HistoryDto;
import com.branch.sikgu.meal.history.entity.History;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface HistoryMapper {
    HistoryMapper INSTANCE = Mappers.getMapper(HistoryMapper.class);

    HistoryDto.Response toResponseDto(History history);

    History toEntity(HistoryDto.Post post);
}