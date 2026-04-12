package com.nijro.travel.controller;

import com.nijro.travel.dto.*;
import com.nijro.travel.security.JwtService;
import com.nijro.travel.service.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ApiController {

    private final HeroSlideService heroSlideService;
    private final LocationService locationService;
    private final PackageService packageService;
    private final BookingService bookingService;
    private final ReviewService reviewService;
    private final FaqService faqService;
    private final UserService userService;
    private final SiteSettingService siteSettingService;
    private final SocialFeedService socialFeedService;
    private final JwtService jwtService;

    @GetMapping("/hero")
    public ResponseEntity<List<HeroSlideDto>> getHeroSlides() {
        return ResponseEntity.ok(heroSlideService.getActiveSlides());
    }

    @GetMapping("/locations")
    public ResponseEntity<List<LocationDto>> getLocations() {
        return ResponseEntity.ok(locationService.getActive());
    }

    @GetMapping("/locations/{id}")
    public ResponseEntity<LocationDto> getLocation(@PathVariable Long id) {
        return ResponseEntity.ok(locationService.getById(id));
    }

    @GetMapping("/packages")
    public ResponseEntity<List<PackageDto>> getPackages() {
        return ResponseEntity.ok(packageService.getAll());
    }

    @GetMapping("/packages/{id}")
    public ResponseEntity<PackageDto> getPackage(@PathVariable Long id) {
        return ResponseEntity.ok(packageService.getById(id));
    }

    @GetMapping("/packages/slug/{slug}")
    public ResponseEntity<PackageDto> getPackageBySlug(@PathVariable String slug) {
        Optional<PackageDto> dto = packageService.findBySlug(slug);
        return dto.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/bookings")
    public ResponseEntity<BookingDto> createBooking(@Valid @RequestBody BookingRequestDto dto) {
        return ResponseEntity.ok(bookingService.create(dto));
    }

    @GetMapping("/reviews/summary")
    public ResponseEntity<ReviewStatsDto> getReviewSummary() {
        return ResponseEntity.ok(reviewService.getPublicStats());
    }

    @GetMapping("/reviews")
    public ResponseEntity<List<ReviewPublicDto>> getReviews(
            @RequestParam(required = false) Integer limit) {
        return ResponseEntity.ok(reviewService.getPublicReviews(limit));
    }

    /**
     * Multipart fields: country, rating, text (optional: image file).
     * Plain form fields are used instead of a JSON part so all browsers send correct types
     * (JSON-as-Blob is often application/octet-stream and breaks RequestPart deserialization).
     */
    @PostMapping(value = "/reviews", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ReviewPublicDto> createReview(
            @Valid @ModelAttribute ReviewRequestDto dto,
            @RequestPart(value = "image", required = false) MultipartFile image,
            Authentication authentication) throws IOException {
        return ResponseEntity.ok(reviewService.create(dto, authentication, image));
    }

    @GetMapping("/faqs")
    public ResponseEntity<List<FaqDto>> getActiveFaqs() {
        return ResponseEntity.ok(faqService.getActive());
    }

    @GetMapping("/settings/season")
    public ResponseEntity<Map<String, String>> getSeasonalEffect() {
        String season = siteSettingService.get("seasonal_effect", "none");
        return ResponseEntity.ok(Map.of("season", season));
    }

    @GetMapping("/social-feed")
    public ResponseEntity<List<SocialFeedPhotoDto>> getSocialFeed(@RequestParam(required = false) Integer limit) {
        return ResponseEntity.ok(socialFeedService.getLatest(limit));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDto> register(@Valid @RequestBody RegisterRequestDto dto) {
        UserDto user = userService.register(dto);
        String token = jwtService.generateToken(user);
        return ResponseEntity.ok(AuthResponseDto.of(user, token));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@Valid @RequestBody LoginRequestDto dto) {
        UserDto user = userService.login(dto);
        String token = jwtService.generateToken(user);
        return ResponseEntity.ok(AuthResponseDto.of(user, token));
    }
}
