package com.branch.sikgu.meal.history.repository;

import com.branch.sikgu.meal.history.dto.HistoryDto;
import com.branch.sikgu.meal.history.entity.History;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoryRepository extends JpaRepository<History, Long> {
    @Query("SELECT h FROM History h JOIN h.members m WHERE m.memberId =:memberId")
    List<History> findByMemberId(@Param("memberId") Long memberId);

    History findByHistoryId (Long historyId);
}