package com.nijro.travel.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LocationDto {
    private Long id;
    private String name;
    private String city;
    private String description;
    private String fullDescription;
    private String imageUrl;
    private List<String> galleryImages;
    private String videoUrl;
    private List<String> highlights;
    private String openingHours;
    private String closedDays;
    private String admissionFee;
    private String address;
    private Double latitude;
    private Double longitude;
    private String accessInfo;
    private List<String> nearbyPlaces;
    private String customDetails;
    private Boolean featuredHero;
    private Boolean active;
    private Integer sortOrder;
    private LocalDateTime createdAt;
}
