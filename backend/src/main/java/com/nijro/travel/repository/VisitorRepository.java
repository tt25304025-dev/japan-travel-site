package com.nijro.travel.repository;

import com.nijro.travel.entity.Visitor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface VisitorRepository extends JpaRepository<Visitor, Long> {

    long countByVisitDate(LocalDate date);

    long countByVisitDateBetween(LocalDate start, LocalDate end);

    @Query("SELECT v.page, COUNT(v) FROM Visitor v GROUP BY v.page ORDER BY COUNT(v) DESC")
    List<Object[]> findMostVisitedPages();
}
