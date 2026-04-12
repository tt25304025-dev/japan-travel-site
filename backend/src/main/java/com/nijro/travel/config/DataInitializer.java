package com.nijro.travel.config;

import com.nijro.travel.entity.*;
import com.nijro.travel.repository.*;
import com.nijro.travel.service.PackageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final LocationRepository locationRepository;
    private final PackageRepository packageRepository;
    private final HeroSlideRepository heroSlideRepository;
    private final PasswordEncoder passwordEncoder;
    private final PackageService packageService;

    @Value("${app.admin.seed-email}")
    private String seedAdminEmail;

    @Value("${app.admin.seed-password}")
    private String seedAdminPassword;

    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            User admin = User.builder()
                    .name("Admin")
                    .email(seedAdminEmail)
                    .password(passwordEncoder.encode(seedAdminPassword))
                    .role("ADMIN")
                    .build();
            userRepository.save(admin);
        }

        var locNames = List.of("Tokyo", "Kyoto", "Osaka", "Mount Fuji", "Hiroshima", "Nara", "Sapporo", "Fukuoka", "Nikko");
        var existingLocNames = locationRepository.findAll().stream().map(Location::getName).toList();
        for (String name : locNames) {
            if (!existingLocNames.contains(name)) {
                locationRepository.save(createLocation(name, getCity(name), getLocDesc(name), getLocImage(name), true));
            }
        }

        if (packageRepository.count() == 0 && locationRepository.count() > 0) {
            List<Location> locs = locationRepository.findAll();

            packageRepository.save(TravelPackage.builder()
                    .slug("tokyo-city-break")
                    .title("Tokyo City Break")
                    .description("3 days exploring Tokyo's highlights including Shibuya, Akihabara, and Tsukiji Market")
                    .price(new BigDecimal("590"))
                    .durationDays(3)
                    .location(findLoc(locs, "Tokyo"))
                    .imageUrl("https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&q=80")
                    .includes("Hotel accommodation (2 nights), Airport transfer, Tokyo Metro pass, Guided city tour, Welcome dinner")
                    .placesCovered("Shibuya, Akihabara, Tsukiji Market, Tokyo Tower, Senso-ji Temple")
                    .featured(true)
                    .build());

            packageRepository.save(TravelPackage.builder()
                    .slug("classic-explorer")
                    .title("Classic Explorer")
                    .description("The perfect 7-day journey through Japan's golden route")
                    .price(new BigDecimal("1490"))
                    .durationDays(7)
                    .location(findLoc(locs, "Kyoto"))
                    .imageUrl("https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=600&q=80")
                    .includes("Hotel accommodation (6 nights), 7-day JR Pass, Airport transfers, Guided tours in each city, Traditional ryokan stay (1 night)")
                    .placesCovered("Tokyo, Kyoto, Osaka, Fushimi Inari, Arashiyama, Dotonbori")
                    .featured(true)
                    .build());

            packageRepository.save(TravelPackage.builder()
                    .slug("culture-nature")
                    .title("Culture & Nature")
                    .description("14 days of deep cultural immersion and natural beauty across Japan")
                    .price(new BigDecimal("2890"))
                    .durationDays(14)
                    .location(findLoc(locs, "Nara"))
                    .imageUrl("https://images.unsplash.com/photo-1550303435-1703d8811aaa?w=600&q=80")
                    .includes("Hotel accommodation (13 nights), 14-day JR Pass, Airport transfers, Tea ceremony experience, Cooking class, Guided hiking tours, Onsen experience")
                    .placesCovered("Tokyo, Kyoto, Nara, Hiroshima, Miyajima Island, Hakone, Mount Fuji area")
                    .featured(true)
                    .build());

            packageRepository.save(TravelPackage.builder()
                    .slug("grand-circuit")
                    .title("Grand Circuit")
                    .description("21 days covering all major cities and hidden countryside gems")
                    .price(new BigDecimal("4290"))
                    .durationDays(21)
                    .location(findLoc(locs, "Hiroshima"))
                    .imageUrl("https://images.unsplash.com/photo-1719360569943-310d65648d37?w=600&q=80")
                    .includes("Hotel accommodation (20 nights), 21-day JR Pass, All transfers, Private guide (select days), Traditional experiences, Pocket WiFi")
                    .placesCovered("Tokyo, Yokohama, Kamakura, Hakone, Kyoto, Nara, Osaka, Hiroshima, Miyajima, Himeji, Kanazawa")
                    .featured(true)
                    .build());

            packageRepository.save(TravelPackage.builder()
                    .slug("deep-japan")
                    .title("Deep Japan")
                    .description("One full month to experience Japan at a relaxed pace")
                    .price(new BigDecimal("5990"))
                    .durationDays(30)
                    .location(findLoc(locs, "Sapporo"))
                    .imageUrl("https://images.unsplash.com/photo-1735472436886-712aae78144d?w=600&q=80")
                    .includes("Hotel accommodation (29 nights), Full JR Pass, All transfers, Private guides, Cultural workshops, Ski/hiking gear rental, Onsen passport")
                    .placesCovered("All major regions: Kanto, Kansai, Chugoku, Hokkaido, Tohoku, Chubu")
                    .featured(false)
                    .build());

            packageRepository.save(TravelPackage.builder()
                    .slug("nomad-long-stay")
                    .title("Nomad Long Stay")
                    .description("3-month flexible multi-region immersion for serious Japan lovers")
                    .price(new BigDecimal("13900"))
                    .durationDays(90)
                    .location(findLoc(locs, "Osaka"))
                    .imageUrl("https://images.unsplash.com/photo-1589452271712-64b8a66c7b71?w=600&q=80")
                    .includes("Monthly apartment rentals, Regional rail passes, Language classes (optional), Coworking access, Seasonal festival passes, 24/7 support line")
                    .placesCovered("Full Japan coverage: Tokyo, Osaka, Kyoto, Fukuoka, Sapporo, Okinawa, rural villages")
                    .featured(false)
                    .build());
        }

        if (locationRepository.count() > 0) {
            List<Location> locs = locationRepository.findAll();
            String[] allTitles = {"Mount Fuji", "Tokyo", "Kyoto", "Osaka", "Hiroshima", "Nara", "Sapporo", "Fukuoka", "Nikko", "Japan"};
            var existing = heroSlideRepository.findAll().stream().map(HeroSlide::getTitle).toList();
            for (String title : allTitles) {
                if (!existing.contains(title)) {
                    Location loc = locs.stream().filter(l -> l.getName().equals(title)).findFirst()
                            .orElse(locs.isEmpty() ? null : locs.get(0));
                    heroSlideRepository.save(createHeroSlide(title, getSubtitle(title), getImageUrl(title), loc));
                }
            }
        }

        packageService.backfillSlugs();
    }

    private Location findLoc(List<Location> locs, String name) {
        return locs.stream().filter(l -> l.getName().equals(name)).findFirst()
                .orElse(locs.isEmpty() ? null : locs.get(0));
    }

    private Location createLocation(String name, String city, String desc, String img, boolean featured) {
        return Location.builder()
                .name(name)
                .city(city)
                .description(desc)
                .imageUrl(img)
                .featuredHero(featured)
                .active(true)
                .sortOrder(0)
                .build();
    }

    private String getCity(String name) {
        return switch (name) {
            case "Mount Fuji" -> "Fuji";
            default -> name;
        };
    }

    private String getLocDesc(String name) {
        return switch (name) {
            case "Tokyo" -> "Japan's bustling capital";
            case "Kyoto" -> "Ancient temples and geisha districts";
            case "Osaka" -> "Japan's kitchen and vibrant nightlife";
            case "Mount Fuji" -> "Iconic peak of Japan";
            case "Hiroshima" -> "Peace and heritage";
            case "Nara" -> "Sacred deer and temples";
            case "Sapporo" -> "Snow and culture in Hokkaido";
            case "Fukuoka" -> "Gateway to Asia";
            case "Nikko" -> "Shrines and nature";
            default -> "";
        };
    }

    private String getLocImage(String name) {
        return switch (name) {
            case "Tokyo" -> "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80";
            case "Kyoto" -> "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80";
            case "Osaka" -> "https://images.unsplash.com/photo-1589452271712-64b8a66c7b71?w=600&q=80";
            case "Mount Fuji" -> "https://images.unsplash.com/photo-1578637387939-43c525550085?w=600&q=80";
            case "Hiroshima" -> "https://images.unsplash.com/photo-1719360569943-310d65648d37?w=600&q=80";
            case "Nara" -> "https://images.unsplash.com/photo-1530708780517-cc640cf05561?w=600&q=80";
            case "Sapporo" -> "https://images.unsplash.com/photo-1735472436886-712aae78144d?w=600&q=80";
            case "Fukuoka" -> "https://images.unsplash.com/photo-1618897037073-5edb010d92f5?w=600&q=80";
            case "Nikko" -> "https://images.unsplash.com/photo-1735034757679-326e2c678979?w=600&q=80";
            default -> "https://images.unsplash.com/photo-1578637387939-43c525550085?w=600&q=80";
        };
    }

    private HeroSlide createHeroSlide(String title, String subtitle, String imageUrl, Location location) {
        return HeroSlide.builder()
                .title(title)
                .subtitle(subtitle)
                .imageUrl(imageUrl)
                .buttonText("Explore")
                .buttonLink("#packages")
                .location(location)
                .isActive(true)
                .build();
    }

    private String getSubtitle(String title) {
        return switch (title) {
            case "Mount Fuji" -> "Iconic Peak of";
            case "Tokyo" -> "Experience";
            case "Kyoto" -> "Discover Ancient Temples of";
            case "Osaka" -> "Vibrant City of";
            case "Hiroshima" -> "Peace and Heritage in";
            case "Nara" -> "Sacred Deer and Temples of";
            case "Sapporo" -> "Snow and Culture in";
            case "Fukuoka" -> "Gateway to Asia in";
            case "Nikko" -> "Shrines and Nature in";
            case "Japan" -> "Traditional Beauty of";
            default -> "";
        };
    }

    private String getImageUrl(String title) {
        return switch (title) {
            case "Mount Fuji" -> "https://images.unsplash.com/photo-1578637387939-43c525550085?w=1920";
            case "Tokyo" -> "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1920";
            case "Kyoto" -> "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1920";
            case "Osaka" -> "https://images.unsplash.com/photo-1589452271712-64b8a66c7b71?w=1920";
            case "Hiroshima" -> "https://images.unsplash.com/photo-1719360569943-310d65648d37?w=1920";
            case "Nara" -> "https://images.unsplash.com/photo-1530708780517-cc640cf05561?w=1920";
            case "Sapporo" -> "https://images.unsplash.com/photo-1735472436886-712aae78144d?w=1920";
            case "Fukuoka" -> "https://images.unsplash.com/photo-1618897037073-5edb010d92f5?w=1920";
            case "Nikko" -> "https://images.unsplash.com/photo-1735034757679-326e2c678979?w=1920";
            case "Japan" -> "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1920";
            default -> "https://images.unsplash.com/photo-1578637387939-43c525550085?w=1920";
        };
    }
}
