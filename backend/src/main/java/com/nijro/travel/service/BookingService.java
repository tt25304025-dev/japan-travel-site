package com.nijro.travel.service;

import com.nijro.travel.dto.BookingDto;
import com.nijro.travel.dto.BookingRequestDto;
import com.nijro.travel.entity.Booking;
import com.nijro.travel.entity.TravelPackage;
import com.nijro.travel.repository.BookingRepository;
import com.nijro.travel.repository.PackageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final PackageRepository packageRepository;

    public BookingDto create(BookingRequestDto dto) {
        TravelPackage pkg = null;
        if (dto.getPackageId() != null) {
            pkg = packageRepository.findById(dto.getPackageId()).orElse(null);
        }

        String selectedPkgIds = null;
        if (dto.getSelectedPackageIds() != null && !dto.getSelectedPackageIds().isEmpty()) {
            selectedPkgIds = dto.getSelectedPackageIds().stream()
                    .map(String::valueOf)
                    .collect(Collectors.joining(","));
        }

        Booking booking = Booking.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .dateOfBirth(dto.getDateOfBirth())
                .country(dto.getCountry())
                .peopleCount(dto.getPeopleCount())
                .hasChildrenUnder18(dto.getHasChildrenUnder18())
                .childrenUnder18Count(dto.getChildrenUnder18Count())
                .specialPlaces(dto.getSpecialPlaces())
                .selectedPackageIds(selectedPkgIds)
                .travelPackage(pkg)
                .message(dto.getMessage())
                .status("PENDING")
                .build();
        return toDto(bookingRepository.save(booking));
    }

    public List<BookingDto> getAll() {
        return bookingRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public BookingDto getById(Long id) {
        return bookingRepository.findById(id)
                .map(this::toDto)
                .orElseThrow(() -> new RuntimeException("Booking not found: " + id));
    }

    public long countBookingsToday() {
        LocalDateTime start = LocalDate.now().atStartOfDay();
        LocalDateTime end = LocalDate.now().atTime(LocalTime.MAX);
        return bookingRepository.countByCreatedAtBetween(start, end);
    }

    private BookingDto toDto(Booking entity) {
        return BookingDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .email(entity.getEmail())
                .phone(entity.getPhone())
                .dateOfBirth(entity.getDateOfBirth())
                .country(entity.getCountry())
                .peopleCount(entity.getPeopleCount())
                .hasChildrenUnder18(entity.getHasChildrenUnder18())
                .childrenUnder18Count(entity.getChildrenUnder18Count())
                .specialPlaces(entity.getSpecialPlaces())
                .selectedPackageIds(entity.getSelectedPackageIds())
                .packageId(entity.getTravelPackage() != null ? entity.getTravelPackage().getId() : null)
                .packageTitle(entity.getTravelPackage() != null ? entity.getTravelPackage().getTitle() : null)
                .message(entity.getMessage())
                .status(entity.getStatus())
                .createdAt(entity.getCreatedAt())
                .build();
    }
}
