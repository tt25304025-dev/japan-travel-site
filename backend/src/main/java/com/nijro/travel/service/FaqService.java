package com.nijro.travel.service;

import com.nijro.travel.dto.FaqDto;
import com.nijro.travel.entity.Faq;
import com.nijro.travel.repository.FaqRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FaqService {

    private final FaqRepository faqRepository;

    public List<FaqDto> getActive() {
        return faqRepository.findByActiveTrueOrderBySortOrderAscIdAsc().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<FaqDto> getAll() {
        return faqRepository.findAllByOrderBySortOrderAscIdAsc().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public FaqDto getById(Long id) {
        return faqRepository.findById(id)
                .map(this::toDto)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "FAQ not found"));
    }

    public FaqDto create(FaqDto dto) {
        Faq faq = Faq.builder()
                .question(dto.getQuestion())
                .answer(dto.getAnswer())
                .sortOrder(dto.getSortOrder() != null ? dto.getSortOrder() : 0)
                .active(dto.getActive() != null ? dto.getActive() : true)
                .build();
        return toDto(faqRepository.save(faq));
    }

    public FaqDto update(Long id, FaqDto dto) {
        Faq faq = faqRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "FAQ not found"));
        faq.setQuestion(dto.getQuestion());
        faq.setAnswer(dto.getAnswer());
        if (dto.getSortOrder() != null) faq.setSortOrder(dto.getSortOrder());
        if (dto.getActive() != null) faq.setActive(dto.getActive());
        return toDto(faqRepository.save(faq));
    }

    public void delete(Long id) {
        faqRepository.deleteById(id);
    }

    private FaqDto toDto(Faq entity) {
        return FaqDto.builder()
                .id(entity.getId())
                .question(entity.getQuestion())
                .answer(entity.getAnswer())
                .sortOrder(entity.getSortOrder())
                .active(entity.getActive())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
}
