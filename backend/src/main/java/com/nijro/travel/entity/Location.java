package com.nijro.travel.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "locations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Location {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String city;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "full_description", columnDefinition = "LONGTEXT")
    private String fullDescription;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "gallery_images", columnDefinition = "TEXT")
    private String galleryImages;

    @Column(name = "video_url")
    private String videoUrl;

    @Column(columnDefinition = "TEXT")
    private String highlights;

    @Column(name = "opening_hours")
    private String openingHours;

    @Column(name = "closed_days")
    private String closedDays;

    @Column(name = "admission_fee")
    private String admissionFee;

    private String address;

    private Double latitude;

    private Double longitude;

    @Column(name = "access_info", columnDefinition = "TEXT")
    private String accessInfo;

    @Column(name = "nearby_places", columnDefinition = "TEXT")
    private String nearbyPlaces;

    @Column(name = "custom_details", columnDefinition = "TEXT")
    private String customDetails;

    @Builder.Default
    @Column(name = "featured_hero")
    private Boolean featuredHero = false;

    @Builder.Default
    @Column(nullable = false)
    private Boolean active = true;

    @Builder.Default
    @Column(name = "sort_order")
    private Integer sortOrder = 0;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
