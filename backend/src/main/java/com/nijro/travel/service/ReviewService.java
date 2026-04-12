package com.nijro.travel.service;

import com.nijro.travel.dto.ReviewDto;
import com.nijro.travel.dto.ReviewPublicDto;
import com.nijro.travel.dto.ReviewRequestDto;
import com.nijro.travel.dto.ReviewStatsDto;
import com.nijro.travel.entity.Review;
import com.nijro.travel.entity.User;
import com.nijro.travel.repository.ReviewRepository;
import com.nijro.travel.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final FileStorageService fileStorageService;

    @Value("${reviews.require-approval:false}")
    private boolean requireApproval;

    public ReviewPublicDto create(ReviewRequestDto dto, Authentication auth, MultipartFile image) throws IOException {
        String email = auth.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));
        boolean approved = !requireApproval;
        String imageUrl = null;
        if (image != null && !image.isEmpty()) {
            imageUrl = fileStorageService.storeFile(image, "reviews");
        }
        Review review = Review.builder()
                .name(user.getName())
                .email(user.getEmail())
                .country(dto.getCountry())
                .rating(dto.getRating())
                .text(dto.getText())
                .imageUrl(imageUrl)
                .user(user)
                .approved(approved)
                .visible(true)
                .build();
        return toPublicDto(reviewRepository.save(review));
    }

    public List<ReviewPublicDto> getPublicReviews(Integer limit) {
        List<Review> list = reviewRepository.findPublicVisibleOrderByCreatedAtDesc();
        var stream = list.stream().map(this::toPublicDto);
        if (limit != null && limit > 0) {
            return stream.limit(limit).collect(Collectors.toList());
        }
        return stream.collect(Collectors.toList());
    }

    public ReviewStatsDto getPublicStats() {
        List<Review> list = reviewRepository.findPublicVisibleOrderByCreatedAtDesc();
        long count = list.size();
        if (count == 0) {
            return ReviewStatsDto.builder().averageRating(0).count(0).build();
        }
        double avg = list.stream().mapToInt(Review::getRating).average().orElse(0);
        double rounded = Math.round(avg * 10.0) / 10.0;
        return ReviewStatsDto.builder().averageRating(rounded).count(count).build();
    }

    public List<ReviewDto> getAll() {
        return reviewRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public ReviewDto update(Long id, ReviewDto dto, MultipartFile image) throws IOException {
        Review r = reviewRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Review not found"));
        r.setName(dto.getName());
        r.setEmail(dto.getEmail());
        r.setCountry(dto.getCountry());
        r.setRating(dto.getRating());
        r.setText(dto.getText());
        if (dto.getImageUrl() != null && !dto.getImageUrl().isBlank()) {
            r.setImageUrl(dto.getImageUrl());
        }
        if (image != null && !image.isEmpty()) {
            r.setImageUrl(fileStorageService.storeFile(image, "reviews"));
        }
        if (dto.getApproved() != null) r.setApproved(dto.getApproved());
        if (dto.getVisible() != null) r.setVisible(dto.getVisible());
        return toDto(reviewRepository.save(r));
    }

    public void delete(Long id) {
        reviewRepository.deleteById(id);
    }

    private ReviewPublicDto toPublicDto(Review e) {
        return ReviewPublicDto.builder()
                .id(e.getId())
                .name(e.getName())
                .country(e.getCountry())
                .rating(e.getRating())
                .text(e.getText())
                .imageUrl(e.getImageUrl())
                .createdAt(e.getCreatedAt())
                .approved(e.getApproved())
                .build();
    }

    private ReviewDto toDto(Review entity) {
        return ReviewDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .email(entity.getEmail())
                .country(entity.getCountry())
                .rating(entity.getRating())
                .text(entity.getText())
                .imageUrl(entity.getImageUrl())
                .approved(entity.getApproved())
                .visible(entity.getVisible() != null ? entity.getVisible() : true)
                .createdAt(entity.getCreatedAt())
                .build();
    }
}
