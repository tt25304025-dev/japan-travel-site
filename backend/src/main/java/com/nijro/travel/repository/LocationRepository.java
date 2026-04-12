package com.nijro.travel.repository;

import com.nijro.travel.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LocationRepository extends JpaRepository<Location, Long> {

    List<Location> findByActiveTrueOrderBySortOrderAscNameAsc();

    List<Location> findAllByOrderBySortOrderAscNameAsc();
}
