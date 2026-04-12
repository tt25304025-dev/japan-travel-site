package com.nijro.travel.service;

import com.nijro.travel.dto.HeroSlideDto;
import com.nijro.travel.entity.HeroSlide;
import com.nijro.travel.entity.Location;
import com.nijro.travel.repository.HeroSlideRepository;
import com.nijro.travel.repository.LocationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HeroSlideService {

    private final HeroSlideRepository heroSlideRepository;
    private final LocationRepository locationRepository;
    private final FileStorageService fileStorageService;

    public List<HeroSlideDto> getActiveSlides() {
        return heroSlideRepository.findByIsActiveTrueOrderByCreatedAtAsc()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<HeroSlideDto> getAllSlides() {
        return heroSlideRepository.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public HeroSlideDto getById(Long id) {
        return heroSlideRepository.findById(id)
                .map(this::toDto)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Hero slide not found"));
    }

    public HeroSlideDto create(HeroSlideDto dto, MultipartFile image) throws IOException {
        HeroSlide slide = new HeroSlide();
        mapToEntity(dto, slide);
        if (image != null && !image.isEmpty()) {
            slide.setImageUrl(fileStorageService.storeFile(image, "hero"));
        }
        return toDto(heroSlideRepository.save(slide));
    }

    public HeroSlideDto update(Long id, HeroSlideDto dto, MultipartFile image) throws IOException {
        HeroSlide slide = heroSlideRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Hero slide not found"));
        mapToEntity(dto, slide);
        if (image != null && !image.isEmpty()) {
            slide.setImageUrl(fileStorageService.storeFile(image, "hero"));
        }
        return toDto(heroSlideRepository.save(slide));
    }

    public void delete(Long id) {
        heroSlideRepository.deleteById(id);
    }

    private void mapToEntity(HeroSlideDto dto, HeroSlide entity) {
        entity.setTitle(dto.getTitle());
        entity.setSubtitle(dto.getSubtitle());
        entity.setButtonText(dto.getButtonText());
        entity.setButtonLink(dto.getButtonLink());
        entity.setIsActive(dto.getIsActive() != null ? dto.getIsActive() : true);
        if (dto.getLocationId() != null) {
            entity.setLocation(locationRepository.findById(dto.getLocationId()).orElse(null));
        }
    }

    private HeroSlideDto toDto(HeroSlide entity) {
        return HeroSlideDto.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .subtitle(entity.getSubtitle())
                .imageUrl(entity.getImageUrl())
                .buttonText(entity.getButtonText())
                .buttonLink(entity.getButtonLink())
                .locationId(entity.getLocation() != null ? entity.getLocation().getId() : null)
                .locationName(entity.getLocation() != null ? entity.getLocation().getName() : null)
                .isActive(entity.getIsActive())
                .createdAt(entity.getCreatedAt())
                .build();
    }
}
