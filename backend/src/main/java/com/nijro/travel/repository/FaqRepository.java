package com.nijro.travel.repository;

import com.nijro.travel.entity.Faq;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FaqRepository extends JpaRepository<Faq, Long> {

    List<Faq> findByActiveTrueOrderBySortOrderAscIdAsc();

    List<Faq> findAllByOrderBySortOrderAscIdAsc();
}
