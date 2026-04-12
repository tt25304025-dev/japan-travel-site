package com.nijro.travel.repository;

import com.nijro.travel.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    long countByCreatedAtBetween(LocalDateTime start, LocalDateTime end);

    List<Booking> findAllByOrderByCreatedAtDesc();
}
