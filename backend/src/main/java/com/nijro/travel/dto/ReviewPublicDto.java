package com.nijro.travel.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewPublicDto {
    private Long id;
    private String name;
    private String country;
    private Integer rating;
    private String text;
    private String imageUrl;
    private LocalDateTime createdAt;
    private Boolean approved;
}
