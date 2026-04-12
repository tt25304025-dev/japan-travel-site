/**
 * API Integration - Fetches dynamic data from backend when available.
 * Falls back to static/embedded data when API is not reachable.
 */
(function () {
  "use strict";

  var cfg = window.__APP_CONFIG__ || {};
  var origin = (cfg.apiBase || "").replace(/\/$/, "");
  var API_BASE = origin ? origin + "/api" : "/api";

  function toSliderItem(slide) {
    var img = slide.imageUrl || "";
    return {
      desktop_image: img,
      desktop_layer: img,
      thumb_image: img.replace(/w=\d+/, "w=400") || img,
      sub_title: slide.subtitle || "",
      thumb_title: slide.title || "",
    };
  }

  function toPackage(p) {
    var slug = p.slug || (p.id != null ? "package-" + p.id : "");
    return {
      title: p.title || "",
      slug: slug,
      d: (p.durationDays || 0) + " Days",
      style: p.locationName || p.title || "Travel",
      plan: p.description || p.title,
      price: p.price ? parseFloat(p.price) : 0,
      img: p.imageUrl || "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80",
      id: p.id,
      includes: p.includes || "",
      places: p.placesCovered || "",
      featured: !!p.featured,
      galleryImageUrls: p.galleryImageUrls || [],
    };
  }

  function toLocation(l) {
    return {
      id: l.id,
      name: l.name,
      city: l.city,
      description: l.description,
      fullDescription: l.fullDescription,
      imageUrl: l.imageUrl,
      galleryImages: l.galleryImages,
      videoUrl: l.videoUrl,
      highlights: l.highlights,
      openingHours: l.openingHours,
      closedDays: l.closedDays,
      admissionFee: l.admissionFee,
      address: l.address,
      latitude: l.latitude,
      longitude: l.longitude,
      accessInfo: l.accessInfo,
      nearbyPlaces: l.nearbyPlaces,
      customDetails: l.customDetails,
    };
  }

  function fetchJson(url) {
    return fetch(API_BASE + url)
      .then(function (r) {
        if (!r.ok) throw new Error("API error");
        return r.json();
      });
  }

  function initHero() {
    fetchJson("/hero")
      .then(function (slides) {
        if (slides && slides.length) {
          window.slider_items = slides.map(toSliderItem);
          window.slider_itemscount = window.slider_items.length;
          replaceHeroWithSwiper(slides);
        }
      })
      .catch(function () {});
  }

  function replaceHeroWithSwiper(slides) {
    var hero = document.querySelector(".hero-banner.home");
    if (!hero || typeof Swiper === "undefined") return;

    var sliderItems = slides.map(toSliderItem);

    var html = '<div class="swiper hero-swiper"><div class="swiper-wrapper">';
    slides.forEach(function (s) {
      var img = s.imageUrl || "";
      var link = s.buttonLink ? ' href="' + s.buttonLink + '"' : "";
      html += '<div class="swiper-slide">';
      html += '<div class="hero-slide-bg" style="background-image:url(' + img + ')"></div>';
      html += '<div class="hero-slide-content">';
      if (s.subtitle) html += '<p class="hero-slide-sub">' + s.subtitle + "</p>";
      html += '<h1 class="hero-slide-title">' + s.title + "</h1>";
      if (s.buttonText) html += '<a class="hero-slide-btn"' + link + ">" + s.buttonText + "</a>";
      html += "</div></div>";
    });
    html += "</div></div>";
    html += '<div class="swiper-pagination hero-pagination"></div>';
    html += '<div class="swiper-button-prev hero-prev"></div>';
    html += '<div class="swiper-button-next hero-next"></div>';

    var banner = hero.querySelector(".banner.home, .owl-carousel");
    if (banner) {
      banner.outerHTML = html;

      var sliderTrigger = hero.querySelector(".slider-trigger");
      if (sliderTrigger && sliderItems.length) {
        var thumbHtml = "";
        sliderItems.forEach(function (item, idx) {
          var activeClass = idx === 0 ? " active" : "";
          thumbHtml += '<div class="cilckelm' + activeClass + '" data-index="' + idx + '"><span class="img-holder"><img src="' + (item.thumb_image || item.desktop_image) + '" alt="' + (item.thumb_title || "") + '"></span><span class="text">' + (item.sub_title || "") + "<span>" + (item.thumb_title || "") + "</span></span></div>";
        });
        sliderTrigger.innerHTML = thumbHtml;
        sliderTrigger.classList.add("showup");
        if (window.matchMedia("(max-width: 1199px)").matches) {
          sliderTrigger.classList.add("hero-slider-mobile");
        }
      }

      var style = document.createElement("style");
      style.textContent =
        ".hero-swiper{height:100vh;}.hero-slide-bg{position:absolute;inset:0;background-size:cover;background-position:center}.hero-slide-content{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:#fff;text-align:center;padding:2rem}.hero-slide-sub{font-size:1rem;letter-spacing:3px;text-transform:uppercase;margin-bottom:0.5rem;text-shadow:0 1px 3px rgba(0,0,0,.8),0 2px 8px rgba(0,0,0,.6),0 0 20px rgba(0,0,0,.5);color:#fff}.hero-slide-title{font-size:clamp(2rem,5vw,4rem);font-weight:700;margin-bottom:1rem;text-shadow:0 2px 4px rgba(0,0,0,.7),0 4px 12px rgba(0,0,0,.5)}.hero-slide-btn{display:inline-block;padding:12px 28px;background:#fff;color:#40485e;text-decoration:none;border-radius:50px;font-weight:600;margin-top:1rem;transition:.3s}.hero-slide-btn:hover{background:#f39c12;color:#fff}.hero-pagination{color:#fff}.hero-prev,.hero-next{color:#fff}";
      document.head.appendChild(style);

      var swiper = new Swiper(".hero-swiper", {
        loop: true,
        autoplay: { delay: 4500, disableOnInteraction: false },
        pagination: { el: ".hero-pagination", clickable: true },
        navigation: { nextEl: ".hero-next", prevEl: ".hero-prev" },
        on: {
          slideChangeTransitionEnd: function () {
            var idx = this.realIndex;
            var els = hero.querySelectorAll(".slider-trigger .cilckelm");
            els.forEach(function (el, i) {
              el.classList.toggle("active", i === idx);
            });
          },
        },
      });

      if (sliderTrigger) {
        sliderTrigger.addEventListener("click", function (e) {
          var el = e.target.closest(".cilckelm");
          if (el) {
            var idx = parseInt(el.getAttribute("data-index"), 10);
            if (!isNaN(idx)) swiper.slideToLoop(idx, 400);
          }
        });
      }
    }
  }

  function initPackages() {
    window.apiPackages = null;
    window.apiPackagesReady = false;
    fetchJson("/packages")
      .then(function (pkgs) {
        window.apiPackages = pkgs && pkgs.length ? pkgs.map(toPackage) : [];
        window.apiPackagesReady = true;
      })
      .catch(function () {
        window.apiPackages = [];
        window.apiPackagesReady = true;
      });
  }

  function initLocations() {
    window.apiLocations = null;
    window.apiLocationsReady = false;
    fetchJson("/locations")
      .then(function (locs) {
        window.apiLocations = locs && locs.length ? locs.map(toLocation) : [];
        window.apiLocationsReady = true;
        window.dispatchEvent(new CustomEvent("travelLocationsReady"));
      })
      .catch(function () {
        window.apiLocations = [];
        window.apiLocationsReady = true;
        window.dispatchEvent(new CustomEvent("travelLocationsReady"));
      });
  }

  function submitBooking(data) {
    return fetch(API_BASE + "/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(function (r) {
      if (!r.ok) throw new Error("Booking failed");
      return r.json();
    });
  }

  function submitReview(data) {
    return fetch(API_BASE + "/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(function (r) {
      if (!r.ok) throw new Error("Review submission failed");
      return r.json();
    });
  }

  function getReviews() {
    return fetchJson("/reviews");
  }

  function getFaqs() {
    return fetchJson("/faqs");
  }

  window.TravelAPI = {
    initHero: initHero,
    initPackages: initPackages,
    initLocations: initLocations,
    submitBooking: submitBooking,
    submitReview: submitReview,
    getReviews: getReviews,
    getFaqs: getFaqs,
    getPackages: function () {
      return window.apiPackages;
    },
    getLocations: function () {
      return window.apiLocations;
    },
  };

  function waitForPackages(cb) {
    if (window.apiPackagesReady) return cb();
    var t = setTimeout(cb, 1200);
    var i = setInterval(function () {
      if (window.apiPackagesReady) {
        clearTimeout(t);
        clearInterval(i);
        cb();
      }
    }, 50);
  }

  window.TravelAPI.waitForPackages = waitForPackages;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initHero();
      initPackages();
      initLocations();
    });
  } else {
    initHero();
    initPackages();
    initLocations();
  }
})();
