package com.nijro.travel.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewStatsDto {
    private double averageRating;
    private long count;
}
