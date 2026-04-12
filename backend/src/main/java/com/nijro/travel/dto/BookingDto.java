package com.nijro.travel.dto;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingDto {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private LocalDate dateOfBirth;
    private String country;
    private Integer peopleCount;
    private Boolean hasChildrenUnder18;
    private Integer childrenUnder18Count;
    private String specialPlaces;
    private String selectedPackageIds;
    private Long packageId;
    private String packageTitle;
    private String message;
    private String status;
    private LocalDateTime createdAt;
}
