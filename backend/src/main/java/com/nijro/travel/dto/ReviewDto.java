package com.nijro.travel.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewDto {
    private Long id;
    private String name;
    private String email;
    private String country;
    private Integer rating;
    private String text;
    private String imageUrl;
    private Boolean approved;
    private Boolean visible;
    private LocalDateTime createdAt;
}
