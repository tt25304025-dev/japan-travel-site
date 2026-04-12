package com.nijro.travel.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingRequestDto {
    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    private String phone;
    private LocalDate dateOfBirth;
    private String country;
    private Integer peopleCount;
    private Boolean hasChildrenUnder18;
    private Integer childrenUnder18Count;
    private String specialPlaces;
    private List<Long> selectedPackageIds;
    private Long packageId;
    private String message;
}
