package com.nijro.travel.repository;

import com.nijro.travel.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query("SELECT r FROM Review r WHERE r.approved = true AND (r.visible = true OR r.visible IS NULL) ORDER BY r.createdAt DESC")
    List<Review> findPublicVisibleOrderByCreatedAtDesc();

    List<Review> findAllByOrderByCreatedAtDesc();
}
