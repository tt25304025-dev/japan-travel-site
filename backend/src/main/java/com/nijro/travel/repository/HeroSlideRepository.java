package com.nijro.travel.repository;

import com.nijro.travel.entity.HeroSlide;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HeroSlideRepository extends JpaRepository<HeroSlide, Long> {

    List<HeroSlide> findByIsActiveTrueOrderByCreatedAtAsc();
}
