package com.nijro.travel.service;

import com.nijro.travel.dto.SocialFeedPhotoDto;
import com.nijro.travel.entity.SocialFeedPhoto;
import com.nijro.travel.repository.SocialFeedPhotoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SocialFeedService {

    private final SocialFeedPhotoRepository repository;
    private final FileStorageService fileStorageService;

    public List<SocialFeedPhotoDto> getLatest(Integer limit) {
        int lim = (limit == null || limit <= 0) ? 18 : Math.min(limit, 200);
        return repository.findAllByOrderByCreatedAtDesc()
                .stream()
                .limit(lim)
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<SocialFeedPhotoDto> getAll() {
        return repository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<SocialFeedPhotoDto> upload(List<MultipartFile> images, List<String> tagsPerImage) throws IOException {
        if (images == null || images.isEmpty()) return List.of();
        List<String> tags = tagsPerImage != null ? tagsPerImage : List.of();

        List<SocialFeedPhotoDto> out = new ArrayList<>();
        for (int i = 0; i < images.size(); i++) {
            MultipartFile img = images.get(i);
            if (img == null || img.isEmpty()) continue;

            String rawTags = i < tags.size() ? tags.get(i) : "";
            SocialFeedPhoto entity = new SocialFeedPhoto();
            entity.setImageUrl(fileStorageService.storeFile(img, "social"));
            entity.setTagsCsv(normalizeTagsToCsv(rawTags));
            out.add(toDto(repository.save(entity)));
        }
        return out;
    }

    public SocialFeedPhotoDto updateTags(Long id, List<String> tags) {
        SocialFeedPhoto p = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Social feed photo not found"));
        p.setTagsCsv(normalizeTagsToCsv(tags != null ? String.join(",", tags) : ""));
        return toDto(repository.save(p));
    }

    public SocialFeedPhotoDto updateTagsRaw(Long id, String rawTags) {
        SocialFeedPhoto p = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Social feed photo not found"));
        p.setTagsCsv(normalizeTagsToCsv(rawTags));
        return toDto(repository.save(p));
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    private SocialFeedPhotoDto toDto(SocialFeedPhoto e) {
        return SocialFeedPhotoDto.builder()
                .id(e.getId())
                .imageUrl(e.getImageUrl())
                .tags(parseCsvTags(e.getTagsCsv()))
                .createdAt(e.getCreatedAt())
                .build();
    }

    private static List<String> parseCsvTags(String csv) {
        if (csv == null || csv.isBlank()) return List.of();
        return Arrays.stream(csv.split(","))
                .map(String::trim)
                .filter(s -> !s.isBlank())
                .distinct()
                .collect(Collectors.toList());
    }

    private static String normalizeTagsToCsv(String raw) {
        if (raw == null) return "";
        String normalized = raw
                .replace("\n", " ")
                .replace("\r", " ")
                .replace(";", " ")
                .replace("|", " ")
                .replace("#", " ");

        List<String> tokens = Arrays.stream(normalized.split("[,\\s]+"))
                .map(String::trim)
                .filter(s -> !s.isBlank())
                .map(s -> s.replaceAll("[^a-zA-Z0-9_-]", ""))
                .filter(s -> !s.isBlank())
                .map(String::toLowerCase)
                .distinct()
                .limit(20)
                .collect(Collectors.toList());

        return String.join(",", tokens);
    }
}

