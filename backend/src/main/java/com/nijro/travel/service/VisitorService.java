package com.nijro.travel.service;

import com.nijro.travel.dto.AnalyticsDto;
import com.nijro.travel.entity.Visitor;
import com.nijro.travel.repository.VisitorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VisitorService {

    private final VisitorRepository visitorRepository;

    public void trackVisit(String ipAddress, String page) {
        Visitor visitor = Visitor.builder()
                .ipAddress(ipAddress)
                .visitDate(LocalDate.now())
                .page(page != null ? page : "/")
                .build();
        visitorRepository.save(visitor);
    }

    public long getVisitorsToday() {
        return visitorRepository.countByVisitDate(LocalDate.now());
    }

    public long getVisitorsThisMonth() {
        LocalDate start = LocalDate.now().withDayOfMonth(1);
        LocalDate end = LocalDate.now();
        return visitorRepository.countByVisitDateBetween(start, end);
    }

    public AnalyticsDto getAnalytics() {
        long visitorsToday = getVisitorsToday();
        long visitorsThisMonth = getVisitorsThisMonth();
        List<Object[]> topPages = visitorRepository.findMostVisitedPages();

        List<Map<String, Object>> mostVisitedPages = topPages.stream()
                .limit(10)
                .map(row -> Map.<String, Object>of(
                        "page", row[0],
                        "count", ((Number) row[1]).longValue()
                ))
                .collect(Collectors.toList());

        return AnalyticsDto.builder()
                .visitorsToday(visitorsToday)
                .visitorsThisMonth(visitorsThisMonth)
                .mostVisitedPages(mostVisitedPages)
                .build();
    }
}
