package com.nijro.travel.service;

import com.nijro.travel.dto.DashboardStatsDto;
import com.nijro.travel.repository.BookingRepository;
import com.nijro.travel.repository.LocationRepository;
import com.nijro.travel.repository.PackageRepository;
import com.nijro.travel.repository.VisitorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final PackageRepository packageRepository;
    private final LocationRepository locationRepository;
    private final BookingRepository bookingRepository;
    private final VisitorRepository visitorRepository;

    public DashboardStatsDto getStats() {
        long totalPackages = packageRepository.count();
        long totalLocations = locationRepository.count();
        LocalDateTime start = LocalDate.now().atStartOfDay();
        LocalDateTime end = LocalDate.now().atTime(LocalTime.MAX);
        long bookingsToday = bookingRepository.countByCreatedAtBetween(start, end);
        long visitorsToday = visitorRepository.countByVisitDate(LocalDate.now());

        return DashboardStatsDto.builder()
                .totalPackages(totalPackages)
                .totalLocations(totalLocations)
                .bookingsToday(bookingsToday)
                .visitorsToday(visitorsToday)
                .build();
    }
}
