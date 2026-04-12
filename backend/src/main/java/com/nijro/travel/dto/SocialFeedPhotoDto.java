package com.nijro.travel.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SocialFeedPhotoDto {
    private Long id;
    private String imageUrl;
    private List<String> tags;
    private LocalDateTime createdAt;
}

