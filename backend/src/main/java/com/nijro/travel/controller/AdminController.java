package com.nijro.travel.controller;

import com.nijro.travel.dto.*;
import com.nijro.travel.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin/api")
@RequiredArgsConstructor
public class AdminController {

    private final HeroSlideService heroSlideService;
    private final LocationService locationService;
    private final PackageService packageService;
    private final BookingService bookingService;
    private final DashboardService dashboardService;
    private final VisitorService visitorService;
    private final FaqService faqService;
    private final SiteSettingService siteSettingService;
    private final ReviewService reviewService;
    private final SocialFeedService socialFeedService;

    @GetMapping("/dashboard/stats")
    public ResponseEntity<DashboardStatsDto> getDashboardStats() {
        return ResponseEntity.ok(dashboardService.getStats());
    }

    @GetMapping("/analytics")
    public ResponseEntity<AnalyticsDto> getAnalytics() {
        return ResponseEntity.ok(visitorService.getAnalytics());
    }

    // Hero Slides
    @GetMapping("/hero")
    public ResponseEntity<List<HeroSlideDto>> getAllHeroSlides() {
        return ResponseEntity.ok(heroSlideService.getAllSlides());
    }

    @PostMapping("/hero")
    public ResponseEntity<HeroSlideDto> createHeroSlide(
            @RequestPart("slide") HeroSlideDto dto,
            @RequestPart(value = "image", required = false) MultipartFile image) throws IOException {
        return ResponseEntity.ok(heroSlideService.create(dto, image));
    }

    @PutMapping("/hero/{id}")
    public ResponseEntity<HeroSlideDto> updateHeroSlide(
            @PathVariable Long id,
            @RequestPart("slide") HeroSlideDto dto,
            @RequestPart(value = "image", required = false) MultipartFile image) throws IOException {
        return ResponseEntity.ok(heroSlideService.update(id, dto, image));
    }

    @DeleteMapping("/hero/{id}")
    public ResponseEntity<Void> deleteHeroSlide(@PathVariable Long id) {
        heroSlideService.delete(id);
        return ResponseEntity.ok().build();
    }

    // Locations
    @GetMapping("/locations")
    public ResponseEntity<List<LocationDto>> getAllLocations() {
        return ResponseEntity.ok(locationService.getAll());
    }

    @PostMapping("/locations")
    public ResponseEntity<LocationDto> createLocation(
            @RequestPart("location") LocationDto dto,
            @RequestPart(value = "image", required = false) MultipartFile image) throws IOException {
        return ResponseEntity.ok(locationService.create(dto, image));
    }

    @PutMapping("/locations/{id}")
    public ResponseEntity<LocationDto> updateLocation(
            @PathVariable Long id,
            @RequestPart("location") LocationDto dto,
            @RequestPart(value = "image", required = false) MultipartFile image) throws IOException {
        return ResponseEntity.ok(locationService.update(id, dto, image));
    }

    @DeleteMapping("/locations/{id}")
    public ResponseEntity<Void> deleteLocation(@PathVariable Long id) {
        locationService.delete(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/locations/{id}/gallery")
    public ResponseEntity<LocationDto> uploadGalleryImages(
            @PathVariable Long id,
            @RequestParam("images") List<MultipartFile> images) throws IOException {
        return ResponseEntity.ok(locationService.addGalleryImages(id, images));
    }

    // Packages
    @GetMapping("/packages")
    public ResponseEntity<List<PackageDto>> getAllPackages() {
        return ResponseEntity.ok(packageService.getAll());
    }

    @PostMapping("/packages")
    public ResponseEntity<PackageDto> createPackage(
            @RequestPart("package") PackageDto dto,
            @RequestPart(value = "image", required = false) MultipartFile image,
            @RequestParam(value = "galleryImages", required = false) List<MultipartFile> galleryImages) throws IOException {
        return ResponseEntity.ok(packageService.create(dto, image, galleryImages));
    }

    @PutMapping("/packages/{id}")
    public ResponseEntity<PackageDto> updatePackage(
            @PathVariable Long id,
            @RequestPart("package") PackageDto dto,
            @RequestPart(value = "image", required = false) MultipartFile image,
            @RequestParam(value = "galleryImages", required = false) List<MultipartFile> galleryImages) throws IOException {
        return ResponseEntity.ok(packageService.update(id, dto, image, galleryImages));
    }

    @DeleteMapping("/packages/{id}")
    public ResponseEntity<Void> deletePackage(@PathVariable Long id) {
        packageService.delete(id);
        return ResponseEntity.ok().build();
    }

    // Bookings
    @GetMapping("/bookings")
    public ResponseEntity<List<BookingDto>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAll());
    }

    // FAQs
    @GetMapping("/faqs")
    public ResponseEntity<List<FaqDto>> getAllFaqs() {
        return ResponseEntity.ok(faqService.getAll());
    }

    @PostMapping("/faqs")
    public ResponseEntity<FaqDto> createFaq(@RequestBody FaqDto dto) {
        return ResponseEntity.ok(faqService.create(dto));
    }

    @PutMapping("/faqs/{id}")
    public ResponseEntity<FaqDto> updateFaq(@PathVariable Long id, @RequestBody FaqDto dto) {
        return ResponseEntity.ok(faqService.update(id, dto));
    }

    @DeleteMapping("/faqs/{id}")
    public ResponseEntity<Void> deleteFaq(@PathVariable Long id) {
        faqService.delete(id);
        return ResponseEntity.ok().build();
    }

    // Reviews
    @GetMapping("/reviews")
    public ResponseEntity<List<ReviewDto>> getAllReviews() {
        return ResponseEntity.ok(reviewService.getAll());
    }

    @PutMapping(value = "/reviews/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ReviewDto> updateReview(
            @PathVariable Long id,
            @RequestPart("review") ReviewDto dto,
            @RequestPart(value = "image", required = false) MultipartFile image) throws IOException {
        return ResponseEntity.ok(reviewService.update(id, dto, image));
    }

    @DeleteMapping("/reviews/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        reviewService.delete(id);
        return ResponseEntity.ok().build();
    }

    // Site Settings
    @GetMapping("/settings/season")
    public ResponseEntity<Map<String, String>> getSeasonalEffect() {
        return ResponseEntity.ok(Map.of("season", siteSettingService.get("seasonal_effect", "none")));
    }

    @PutMapping("/settings/season")
    public ResponseEntity<Map<String, String>> setSeasonalEffect(@RequestBody Map<String, String> body) {
        String season = body.getOrDefault("season", "none");
        siteSettingService.set("seasonal_effect", season);
        return ResponseEntity.ok(Map.of("season", season));
    }

    // Social Feed
    @GetMapping("/social-feed")
    public ResponseEntity<List<SocialFeedPhotoDto>> getAllSocialFeedPhotos() {
        return ResponseEntity.ok(socialFeedService.getAll());
    }

    @PostMapping(value = "/social-feed", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<List<SocialFeedPhotoDto>> uploadSocialFeedPhotos(
            @RequestParam("images") List<MultipartFile> images,
            @RequestParam(value = "tags", required = false) List<String> tags) throws IOException {
        return ResponseEntity.ok(socialFeedService.upload(images, tags));
    }

    @PutMapping("/social-feed/{id}")
    public ResponseEntity<SocialFeedPhotoDto> updateSocialFeedTags(
            @PathVariable Long id,
            @RequestBody Map<String, Object> body) {
        Object tags = body.get("tags");
        if (tags instanceof List) {
            @SuppressWarnings("unchecked")
            List<Object> list = (List<Object>) tags;
            List<String> strs = list.stream().map(String::valueOf).collect(java.util.stream.Collectors.toList());
            return ResponseEntity.ok(socialFeedService.updateTags(id, strs));
        }
        Object raw = body.get("tagsRaw");
        return ResponseEntity.ok(socialFeedService.updateTagsRaw(id, raw != null ? String.valueOf(raw) : ""));
    }

    @DeleteMapping("/social-feed/{id}")
    public ResponseEntity<Void> deleteSocialFeedPhoto(@PathVariable Long id) {
        socialFeedService.delete(id);
        return ResponseEntity.ok().build();
    }
}
