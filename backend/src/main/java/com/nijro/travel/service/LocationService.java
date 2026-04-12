package com.nijro.travel.service;

import com.nijro.travel.dto.LocationDto;
import com.nijro.travel.entity.Location;
import com.nijro.travel.repository.LocationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LocationService {

    private final LocationRepository locationRepository;
    private final FileStorageService fileStorageService;

    public List<LocationDto> getAll() {
        return locationRepository.findAllByOrderBySortOrderAscNameAsc().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<LocationDto> getActive() {
        return locationRepository.findByActiveTrueOrderBySortOrderAscNameAsc().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public LocationDto getById(Long id) {
        return locationRepository.findById(id)
                .map(this::toDto)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Location not found"));
    }

    public LocationDto create(LocationDto dto, MultipartFile image) throws IOException {
        Location location = new Location();
        mapToEntity(dto, location);
        if (image != null && !image.isEmpty()) {
            location.setImageUrl(fileStorageService.storeFile(image, "locations"));
        }
        return toDto(locationRepository.save(location));
    }

    public LocationDto update(Long id, LocationDto dto, MultipartFile image) throws IOException {
        Location location = locationRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Location not found"));
        mapToEntity(dto, location);
        if (image != null && !image.isEmpty()) {
            location.setImageUrl(fileStorageService.storeFile(image, "locations"));
        }
        return toDto(locationRepository.save(location));
    }

    public LocationDto addGalleryImages(Long id, List<MultipartFile> images) throws IOException {
        Location location = locationRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Location not found"));
        List<String> existing = splitCsv(location.getGalleryImages());
        for (MultipartFile img : images) {
            if (img != null && !img.isEmpty()) {
                existing.add(fileStorageService.storeFile(img, "locations/gallery"));
            }
        }
        location.setGalleryImages(String.join(",", existing));
        return toDto(locationRepository.save(location));
    }

    public void delete(Long id) {
        locationRepository.deleteById(id);
    }

    private void mapToEntity(LocationDto dto, Location entity) {
        entity.setName(dto.getName());
        entity.setCity(dto.getCity());
        entity.setDescription(dto.getDescription());
        entity.setFullDescription(dto.getFullDescription());
        if (dto.getImageUrl() != null && !dto.getImageUrl().isBlank()) {
            entity.setImageUrl(dto.getImageUrl());
        }
        if (dto.getGalleryImages() != null) {
            entity.setGalleryImages(String.join(",", dto.getGalleryImages()));
        }
        entity.setVideoUrl(dto.getVideoUrl());
        if (dto.getHighlights() != null) {
            entity.setHighlights(String.join(",", dto.getHighlights()));
        }
        entity.setOpeningHours(dto.getOpeningHours());
        entity.setClosedDays(dto.getClosedDays());
        entity.setAdmissionFee(dto.getAdmissionFee());
        entity.setAddress(dto.getAddress());
        entity.setLatitude(dto.getLatitude());
        entity.setLongitude(dto.getLongitude());
        entity.setAccessInfo(dto.getAccessInfo());
        if (dto.getNearbyPlaces() != null) {
            entity.setNearbyPlaces(String.join(",", dto.getNearbyPlaces()));
        }
        entity.setCustomDetails(dto.getCustomDetails());
        entity.setFeaturedHero(dto.getFeaturedHero() != null ? dto.getFeaturedHero() : false);
        entity.setActive(dto.getActive() != null ? dto.getActive() : true);
        entity.setSortOrder(dto.getSortOrder() != null ? dto.getSortOrder() : 0);
    }

    private LocationDto toDto(Location entity) {
        return LocationDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .city(entity.getCity())
                .description(entity.getDescription())
                .fullDescription(entity.getFullDescription())
                .imageUrl(entity.getImageUrl())
                .galleryImages(splitCsv(entity.getGalleryImages()))
                .videoUrl(entity.getVideoUrl())
                .highlights(splitCsv(entity.getHighlights()))
                .openingHours(entity.getOpeningHours())
                .closedDays(entity.getClosedDays())
                .admissionFee(entity.getAdmissionFee())
                .address(entity.getAddress())
                .latitude(entity.getLatitude())
                .longitude(entity.getLongitude())
                .accessInfo(entity.getAccessInfo())
                .nearbyPlaces(splitCsv(entity.getNearbyPlaces()))
                .customDetails(entity.getCustomDetails())
                .featuredHero(entity.getFeaturedHero())
                .active(entity.getActive())
                .sortOrder(entity.getSortOrder())
                .createdAt(entity.getCreatedAt())
                .build();
    }

    private List<String> splitCsv(String csv) {
        if (csv == null || csv.isBlank()) return new java.util.ArrayList<>();
        return new java.util.ArrayList<>(Arrays.asList(csv.split(",")));
    }
}
