package com.nijro.travel.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardStatsDto {
    private long totalPackages;
    private long totalLocations;
    private long bookingsToday;
    private long visitorsToday;
}
