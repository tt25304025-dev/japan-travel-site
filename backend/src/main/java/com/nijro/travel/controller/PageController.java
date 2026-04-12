package com.nijro.travel.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

    @GetMapping("/admin/login")
    public String adminLogin() {
        return "forward:/admin/login.html";
    }

    @GetMapping("/admin/dashboard")
    public String adminDashboard() {
        return "forward:/admin/dashboard.html";
    }

    @GetMapping("/admin/packages")
    public String adminPackages() {
        return "forward:/admin/packages.html";
    }

    @GetMapping("/admin/locations")
    public String adminLocations() {
        return "forward:/admin/locations.html";
    }

    @GetMapping("/admin/bookings")
    public String adminBookings() {
        return "forward:/admin/bookings.html";
    }

    @GetMapping("/admin/hero")
    public String adminHero() {
        return "forward:/admin/hero.html";
    }

    @GetMapping("/admin/faqs")
    public String adminFaqs() {
        return "forward:/admin/faqs.html";
    }

    @GetMapping("/admin/reviews")
    public String adminReviews() {
        return "forward:/admin/reviews.html";
    }

    @GetMapping("/admin/social-feed")
    public String adminSocialFeed() {
        return "forward:/admin/social-feed.html";
    }

    @GetMapping("/reviews")
    public String allReviews() {
        return "forward:/reviews.html";
    }

    @GetMapping("/location/{id}")
    public String locationDetail() {
        return "forward:/location.html";
    }

    @GetMapping("/package/{slug}")
    public String packageDetail() {
        return "forward:/package.html";
    }
}
