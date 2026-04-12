package com.nijro.travel.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewRequestDto {

    @NotBlank(message = "Country is required")
    @Size(max = 120, message = "Country must be at most 120 characters")
    private String country;

    @NotNull(message = "Rating is required")
    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating must be at most 5")
    private Integer rating;

    @NotBlank(message = "Review text is required")
    @Size(min = 10, max = 1000, message = "Review must be between 10 and 1000 characters")
    private String text;
}
