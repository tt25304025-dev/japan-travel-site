package com.nijro.travel.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HeroSlideDto {
    private Long id;
    private String title;
    private String subtitle;
    private String imageUrl;
    private String buttonText;
    private String buttonLink;
    private Long locationId;
    private String locationName;
    private Boolean isActive;
    private LocalDateTime createdAt;
}
