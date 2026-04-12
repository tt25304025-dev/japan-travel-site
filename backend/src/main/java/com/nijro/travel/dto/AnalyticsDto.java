package com.nijro.travel.dto;

import lombok.*;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnalyticsDto {
    private long visitorsToday;
    private long visitorsThisMonth;
    private List<Map<String, Object>> mostVisitedPages;
}
