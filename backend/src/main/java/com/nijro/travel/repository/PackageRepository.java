package com.nijro.travel.repository;

import com.nijro.travel.entity.TravelPackage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PackageRepository extends JpaRepository<TravelPackage, Long> {

    List<TravelPackage> findByFeaturedTrue();

    Optional<TravelPackage> findBySlug(String slug);
}
