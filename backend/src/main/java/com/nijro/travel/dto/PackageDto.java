package com.nijro.travel.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PackageDto {
    private Long id;
    private String slug;
    private String title;
    private String description;
    private BigDecimal price;
    private Integer durationDays;
    private Long locationId;
    private String locationName;
    private String imageUrl;
    private String includes;
    private String placesCovered;
    private Boolean featured;
    private LocalDateTime createdAt;
    @Builder.Default
    private List<String> galleryImageUrls = new ArrayList<>();
}
