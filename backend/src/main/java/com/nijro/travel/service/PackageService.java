package com.nijro.travel.service;

import com.nijro.travel.dto.PackageDto;
import com.nijro.travel.entity.TravelPackage;
import com.nijro.travel.repository.LocationRepository;
import com.nijro.travel.repository.PackageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.Normalizer;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PackageService {

    private final PackageRepository packageRepository;
    private final LocationRepository locationRepository;
    private final FileStorageService fileStorageService;

    public List<PackageDto> getAll() {
        return packageRepository.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public PackageDto getById(Long id) {
        return packageRepository.findById(id)
                .map(this::toDto)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Package not found"));
    }

    public Optional<PackageDto> findBySlug(String slug) {
        return packageRepository.findBySlug(slug).map(this::toDto);
    }

    @Transactional
    public PackageDto create(PackageDto dto, MultipartFile image, List<MultipartFile> galleryImages) throws IOException {
        TravelPackage pkg = new TravelPackage();
        mapToEntity(dto, pkg);
        pkg.setSlug(resolveUniqueSlug(slugify(pkg.getTitle()), null));
        applyMainImage(dto, image, pkg);
        mergeGallery(pkg, dto.getGalleryImageUrls(), galleryImages, true);
        return toDto(packageRepository.save(pkg));
    }

    @Transactional
    public PackageDto update(Long id, PackageDto dto, MultipartFile image, List<MultipartFile> galleryImages) throws IOException {
        TravelPackage pkg = packageRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Package not found"));
        String previousTitle = pkg.getTitle();
        mapToEntity(dto, pkg);
        if (!Objects.equals(previousTitle, pkg.getTitle())) {
            pkg.setSlug(resolveUniqueSlug(slugify(pkg.getTitle()), id));
        }
        applyMainImage(dto, image, pkg);
        boolean galleryPayloadPresent = dto.getGalleryImageUrls() != null
                || hasNonEmptyFiles(galleryImages);
        if (galleryPayloadPresent) {
            mergeGallery(pkg, dto.getGalleryImageUrls(), galleryImages, false);
        }
        return toDto(packageRepository.save(pkg));
    }

    @Transactional
    public void delete(Long id) {
        packageRepository.deleteById(id);
    }

    /**
     * Ensures every package has a unique slug (for existing rows after schema migration).
     */
    @Transactional
    public void backfillSlugs() {
        packageRepository.findAll().forEach(p -> {
            if (p.getSlug() == null || p.getSlug().isBlank()) {
                p.setSlug(resolveUniqueSlug(slugify(p.getTitle()), p.getId()));
                packageRepository.save(p);
            }
        });
    }

    private void applyMainImage(PackageDto dto, MultipartFile image, TravelPackage pkg) throws IOException {
        if (image != null && !image.isEmpty()) {
            pkg.setImageUrl(fileStorageService.storeFile(image, "packages"));
        } else if (dto.getImageUrl() != null && !dto.getImageUrl().isBlank()) {
            pkg.setImageUrl(dto.getImageUrl());
        }
    }

    private void mergeGallery(TravelPackage pkg, List<String> dtoUrls, List<MultipartFile> uploads, boolean isCreate) throws IOException {
        List<String> urls = new ArrayList<>();
        if (dtoUrls != null) {
            urls.addAll(dtoUrls);
        } else if (!isCreate && pkg.getGalleryImageUrls() != null) {
            urls.addAll(pkg.getGalleryImageUrls());
        }
        appendStoredFiles(urls, uploads);
        pkg.setGalleryImageUrls(urls);
    }

    private void appendStoredFiles(List<String> urls, List<MultipartFile> uploads) throws IOException {
        if (uploads == null) return;
        for (MultipartFile f : uploads) {
            if (f != null && !f.isEmpty()) {
                String u = fileStorageService.storeFile(f, "packages");
                if (u != null) {
                    urls.add(u);
                }
            }
        }
    }

    private boolean hasNonEmptyFiles(List<MultipartFile> uploads) {
        if (uploads == null) return false;
        for (MultipartFile f : uploads) {
            if (f != null && !f.isEmpty()) return true;
        }
        return false;
    }

    private String slugify(String title) {
        if (title == null || title.isBlank()) {
            return "package";
        }
        String s = Normalizer.normalize(title.trim(), Normalizer.Form.NFD)
                .replaceAll("\\p{M}+", "");
        s = s.toLowerCase(Locale.ROOT).replaceAll("[^a-z0-9]+", "-").replaceAll("^-+", "").replaceAll("-+$", "");
        return s.isEmpty() ? "package" : s;
    }

    private String resolveUniqueSlug(String base, Long excludeId) {
        String candidate = base;
        int n = 2;
        while (true) {
            var existing = packageRepository.findBySlug(candidate);
            if (existing.isEmpty() || (excludeId != null && excludeId.equals(existing.get().getId()))) {
                return candidate;
            }
            candidate = base + "-" + n++;
        }
    }

    private void mapToEntity(PackageDto dto, TravelPackage entity) {
        entity.setTitle(dto.getTitle());
        entity.setDescription(dto.getDescription());
        entity.setPrice(dto.getPrice());
        entity.setDurationDays(dto.getDurationDays());
        entity.setIncludes(dto.getIncludes());
        entity.setPlacesCovered(dto.getPlacesCovered());
        entity.setFeatured(dto.getFeatured() != null ? dto.getFeatured() : false);
        if (dto.getLocationId() != null) {
            entity.setLocation(locationRepository.findById(dto.getLocationId()).orElse(null));
        }
    }

    private PackageDto toDto(TravelPackage entity) {
        List<String> gallery = entity.getGalleryImageUrls() == null
                ? new ArrayList<>()
                : new ArrayList<>(entity.getGalleryImageUrls());
        return PackageDto.builder()
                .id(entity.getId())
                .slug(entity.getSlug())
                .title(entity.getTitle())
                .description(entity.getDescription())
                .price(entity.getPrice())
                .durationDays(entity.getDurationDays())
                .locationId(entity.getLocation() != null ? entity.getLocation().getId() : null)
                .locationName(entity.getLocation() != null ? entity.getLocation().getName() : null)
                .imageUrl(entity.getImageUrl())
                .includes(entity.getIncludes())
                .placesCovered(entity.getPlacesCovered())
                .featured(entity.getFeatured())
                .createdAt(entity.getCreatedAt())
                .galleryImageUrls(gallery)
                .build();
    }
}
