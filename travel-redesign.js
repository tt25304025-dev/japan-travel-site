(function () {
  "use strict";

  var WHATSAPP_NUMBER = "818084752765";
  var WHATSAPP_URL = "https://wa.me/" + WHATSAPP_NUMBER;

  var C = {
    brand: "#c0392b",
    gold: "#f39c12",
    navy: "#1a1f36",
  };

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  var USD_TO_JPY = 150;

  function currency(n) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
  }

  function currencyJPY(n) {
    return "\u00A5" + new Intl.NumberFormat("ja-JP", { maximumFractionDigits: 0 }).format(Math.round(n * USD_TO_JPY));
  }

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html) e.innerHTML = html;
    return e;
  }

  function escHtml(s) {
    if (s == null) return "";
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function escAttr(s) {
    if (s == null) return "";
    return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "");
  }

  var cityImages = {
    Tokyo: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&q=80",
    Kyoto: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=600&q=80",
    Osaka: "https://images.unsplash.com/photo-1589452271712-64b8a66c7b71?w=600&q=80",
    Nara: "https://images.unsplash.com/photo-1550303435-1703d8811aaa?w=600&q=80",
    Hiroshima: "https://images.unsplash.com/photo-1719360569943-310d65648d37?w=600&q=80",
    Hokkaido: "imgs/hokkaido.png",
  };

  /** Multiple images per destination for the Custom Trip Builder preview slider (keys match chip labels). */
  var destinationPreviewGallery = {
    Tokyo: [
      { src: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=960&q=80", alt: "Tokyo cityscape at night" },
      { src: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=960&q=80", alt: "Tokyo skyline" },
      { src: "https://images.unsplash.com/photo-1513407030348-c983a97b97d8?w=960&q=80", alt: "Tokyo street and crossing" },
    ],
    Kyoto: [
      { src: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=960&q=80", alt: "Kyoto bamboo grove" },
      { src: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=960&q=80", alt: "Kyoto traditional streets" },
      { src: "https://images.unsplash.com/photo-1624253323208-14e5f3e9f3b4?w=960&q=80", alt: "Kyoto temple" },
    ],
    Osaka: [
      { src: "https://images.unsplash.com/photo-1590559899731-a38283955443?w=960&q=80", alt: "Osaka Dotonbori" },
      { src: "https://images.unsplash.com/photo-1589452271712-64b8a66c7b71?w=960&q=80", alt: "Osaka urban view" },
      { src: "https://images.unsplash.com/photo-1578469550956-0e16a51cb336?w=960&q=80", alt: "Osaka Castle area" },
    ],
    "Mount Fuji": [
      { src: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=960&q=80", alt: "Mount Fuji and lake" },
      { src: "https://images.unsplash.com/photo-1576678927411-48a16a3a870a?w=960&q=80", alt: "Mount Fuji cherry blossoms" },
      { src: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=960&q=80", alt: "Fuji view from Chureito" },
    ],
    Hiroshima: [
      { src: "https://images.unsplash.com/photo-1719360569943-310d65648d37?w=960&q=80", alt: "Hiroshima area" },
      { src: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=960&q=80", alt: "Miyajima torii gate" },
      { src: "https://images.unsplash.com/photo-1578469550956-0e16a3a870a?w=960&q=80", alt: "Peaceful Japan coast" },
    ],
    Nara: [
      { src: "https://images.unsplash.com/photo-1550303435-1703d8811aaa?w=960&q=80", alt: "Nara deer park" },
      { src: "https://images.unsplash.com/photo-1570527140771-020b71408665?w=960&q=80", alt: "Nara Todai-ji" },
      { src: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=960&q=80", alt: "Nara temple grounds" },
    ],
    Sapporo: [
      { src: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=960&q=80", alt: "Sapporo winter city" },
      { src: "https://images.unsplash.com/photo-1513415756790-2ac1db1297d0?w=960&q=80", alt: "Hokkaido snow landscape" },
      { src: "https://images.unsplash.com/photo-1551524164-687a55dd1126?w=960&q=80", alt: "Hokkaido nature" },
    ],
    Fukuoka: [
      { src: "https://images.unsplash.com/photo-1590559899731-a38283955443?w=960&q=80", alt: "Fukuoka city lights" },
      { src: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=960&q=80", alt: "Kyushu scenery" },
      { src: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=960&q=80", alt: "Japan nature" },
    ],
    Nikko: [
      { src: "https://images.unsplash.com/photo-1576678927411-48a16a3a870a?w=960&q=80", alt: "Nikko forest shrine" },
      { src: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=960&q=80", alt: "Japanese temple in nature" },
      { src: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=960&q=80", alt: "Scenic Japan" },
    ],
  };

  var defaultPreviewGallery = [
    { src: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=960&q=80", alt: "Japan travel" },
    { src: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=960&q=80", alt: "Japan landscape" },
    { src: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=960&q=80", alt: "Japan mountains" },
  ];

  function galleryForDestination(name) {
    if (!name) return defaultPreviewGallery;
    var g = destinationPreviewGallery[name];
    if (g && g.length) return g;
    var lower = String(name).toLowerCase();
    var keys = Object.keys(destinationPreviewGallery);
    for (var i = 0; i < keys.length; i++) {
      if (keys[i].toLowerCase() === lower) return destinationPreviewGallery[keys[i]];
    }
    return defaultPreviewGallery;
  }

  var staticPackages = [
    { id: 1, slug: "tokyo-city-break", title: "Tokyo City Break", d: "3 Days", style: "City Break", plan: "Tokyo + Yokohama — city highlights and bayside day trips.", price: 590, img: cityImages.Tokyo, includes: "Hotel (2 nights), Airport transfer, Metro pass, City tour, Welcome dinner", places: "Shibuya, Akihabara, Tsukiji, Tokyo Tower, Senso-ji" },
    { id: 2, slug: "classic-explorer", title: "Classic Explorer", d: "7 Days", style: "Classic Explorer", plan: "Tokyo \u2192 Kyoto \u2192 Osaka — Japan\u2019s golden route in one week.", price: 1490, img: cityImages.Kyoto, includes: "Hotel (6 nights), 7-day JR Pass, Transfers, Guided tours, Ryokan stay", places: "Tokyo, Kyoto, Osaka, Fushimi Inari, Arashiyama, Dotonbori" },
    { id: 3, slug: "culture-nature", title: "Culture & Nature", d: "14 Days", style: "Culture & Nature", plan: "Tokyo \u2192 Kyoto \u2192 Nara \u2192 Hiroshima \u2192 Hakone — temples, deer, and mountains.", price: 2890, img: cityImages.Nara, includes: "Hotel (13 nights), 14-day JR Pass, Tea ceremony, Cooking class, Hiking tours, Onsen", places: "Tokyo, Kyoto, Nara, Hiroshima, Miyajima, Hakone, Mt Fuji" },
    { id: 4, slug: "grand-circuit", title: "Grand Circuit", d: "21 Days", style: "Grand Circuit", plan: "All major cities plus countryside towns at a thorough pace.", price: 4290, img: cityImages.Hiroshima, includes: "Hotel (20 nights), 21-day JR Pass, Private guide, Traditional experiences, Pocket WiFi", places: "Tokyo, Yokohama, Kamakura, Hakone, Kyoto, Nara, Osaka, Hiroshima, Himeji, Kanazawa" },
    { id: 5, slug: "deep-japan", title: "Deep Japan", d: "1 Month", style: "Deep Japan", plan: "All major regions at a relaxed pace — one full month.", price: 5990, img: cityImages.Hokkaido, includes: "Hotel (29 nights), Full JR Pass, Private guides, Cultural workshops, Onsen passport", places: "Kanto, Kansai, Chugoku, Hokkaido, Tohoku, Chubu" },
    { id: 6, slug: "nomad-long-stay", title: "Nomad Long Stay", d: "3 Months", style: "Nomad Long Stay", plan: "Flexible multi-region immersion for long-stay travelers.", price: 13900, img: cityImages.Osaka, includes: "Apartment rentals, Rail passes, Language classes, Coworking access, Festival passes", places: "Full Japan: Tokyo, Osaka, Kyoto, Fukuoka, Sapporo, Okinawa" },
  ];

  function getPackages() {
    return (window.apiPackages && window.apiPackages.length) ? window.apiPackages : staticPackages;
  }

  var staticLocations = ["Tokyo", "Kyoto", "Osaka", "Mount Fuji", "Hiroshima", "Nara", "Sapporo", "Fukuoka", "Nikko"];

  function getLocations() {
    if (window.apiLocations && window.apiLocations.length) {
      return window.apiLocations.map(function (l) { return l.name; });
    }
    return staticLocations;
  }

  var logistics = [
    { icon: "\uD83D\uDDFA\uFE0F", title: "Route Planning", desc: "Expert itinerary design optimized for rail passes and travel time." },
    { icon: "\uD83C\uDFE8", title: "Hotel Booking", desc: "Curated stays from budget hostels to luxury ryokans." },
    { icon: "\uD83D\uDE85", title: "Transport Guide", desc: "JR Pass advice, subway maps, and intercity route planning." },
    { icon: "\uD83E\uDDED", title: "On-Ground Support", desc: "Local coordination and 24/7 emergency travel assistance." },
    { icon: "\uD83D\uDCC4", title: "Visa Education", desc: "Step-by-step guidance on visa types and requirements." },
    { icon: "\uD83D\uDE97", title: "Car Rental", desc: "Private transfers and self-drive options across Japan.", coming: true },
  ];

  var faqs = [
    { q: "Do I need a visa to visit Japan?", a: "Many countries have visa-free agreements with Japan for stays up to 90 days. We can help you check your specific country's requirements and guide you through the process." },
    { q: "What is a JR Pass and do I need one?", a: "The Japan Rail Pass is a cost-effective way to travel across Japan by bullet train (Shinkansen) and other JR lines. We recommend it for trips visiting multiple cities \u2014 it\u2019s included in most of our packages." },
    { q: "When is the best time to visit Japan?", a: "Japan is beautiful year-round! Cherry blossom season (late March\u2013April) and autumn leaves (October\u2013November) are most popular. Summer has festivals, and winter offers skiing and hot springs." },
    { q: "Can I customize a travel package?", a: "Absolutely! Use our inquiry form or contact us on WhatsApp to tell us your preferences. We\u2019ll create a personalized itinerary just for you." },
    { q: "Do I need to sign in to make a booking inquiry?", a: "No! You can submit an inquiry or booking form without signing in. Simply fill out the form and we\u2019ll get back to you via email or WhatsApp." },
    { q: "How do I contact you for urgent help during my trip?", a: "You can reach us 24/7 via WhatsApp at +81 80-8475-2765. We also provide a local emergency support number with all our packages." },
    { q: "Is Japan safe for families with children?", a: "Japan is one of the safest countries in the world for travelers, including families with children. Public transport is clean and efficient, and people are very helpful." },
  ];

  var aiResponses = [
    "Great question! For a 7-day trip, I'd recommend: Day 1\u20133 Tokyo (Shibuya, Akihabara, Tsukiji), Day 4\u20135 Kyoto (Fushimi Inari, Arashiyama), Day 6\u20137 Osaka (Dotonbori, Osaka Castle). Use a 7-day JR Pass for seamless travel!",
    "The best time to visit Japan for cherry blossoms is late March to mid-April. Tokyo blooms first, then Kyoto follows about a week later. Book accommodation early \u2014 it\u2019s peak season!",
    "For budget travelers, consider capsule hotels ($25\u201340/night), eat at conveyor-belt sushi restaurants, and get a regional rail pass instead of the full JR Pass if you're staying in one area.",
    "Visa-free entry is available for 68 countries for stays up to 90 days. You'll need a valid passport, return ticket, and proof of sufficient funds. I can help you check your specific country's requirements!",
    "Must-try foods: Ramen in Tokyo, Takoyaki in Osaka, Kaiseki in Kyoto, fresh seafood in Hokkaido, and Hiroshima-style okonomiyaki. Don't miss convenience store onigiri \u2014 surprisingly amazing!",
  ];

  function findTarget() {
    return $(".welcome-text.explore-top") || $(".hero-banner") || document.body;
  }

  function buildHTML() {
    var h = "";

    // === LOCATIONS SECTION ===
    h += '<div class="jtr-section locations-section" id="locations-section"><div class="jtr-inner">';
    h += '<div class="sec-head fade-up"><span class="overline">Explore Japan</span><h2>Locations</h2><p>Discover the most beautiful destinations across Japan. Click to learn more.</p></div>';
    h += '<div class="loc-grid" id="loc-grid"></div>';
    h += '<div class="loc-viewmore-wrap" id="loc-viewmore-wrap" style="display:none"><button class="jbtn jbtn-outline loc-viewmore-btn" id="loc-viewmore-btn"><span id="loc-viewmore-text">View More</span> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" id="loc-viewmore-arrow"><polyline points="6 9 12 15 18 9"/></svg></button></div>';
    h += '</div></div>';

    // === PACKAGES SECTION WITH CHECKBOXES ===
    h += '<div class="jtr-section" id="packages"><div class="jtr-inner">';
    h += '<div class="sec-head fade-up"><span class="overline">Ready-Made Packages</span><h2>Japan Travel Packages</h2><p>Choose one package below. Each package shows what\'s included, duration, and covered destinations.</p></div>';
    h += '<div class="pkg-grid" id="pkg-grid">';
    getPackages().forEach(function (p) {
      var includes = p.includes || "";
      var places = p.places || p.placesCovered || "";
      var slug = p.slug || (p.id != null ? "package-" + p.id : "");
      var titleLine = p.title || p.plan || "";
      h += '<div class="pkg-card fade-up" data-pkg-id="' + (p.id || '') + '" data-pkg-slug="' + slug + '" tabindex="0" role="link" aria-label="View package details">';
      h += '<label class="pkg-select-label"><input type="radio" name="pkg-select" class="pkg-radio" value="' + (p.id || '') + '"><span class="pkg-check-mark"></span></label>';
      h += '<div class="pkg-img" style="background-image:url(' + p.img + ')"><span class="pkg-duration">' + p.d + '</span><span class="pkg-style">' + p.style + '</span></div>';
      h += '<div class="pkg-body">';
      if (titleLine) h += '<h3 class="pkg-title">' + titleLine + '</h3>';
      h += '<p class="pkg-route">' + p.plan + '</p>';
      if (places) h += '<div class="pkg-places"><strong>Places:</strong> ' + places + '</div>';
      if (includes) h += '<div class="pkg-includes"><strong>Includes:</strong> ' + includes + '</div>';
      h += '<div class="pkg-footer"><span class="pkg-price">' + currency(p.price) + ' <small>/person</small><span class="pkg-price-jpy">' + currencyJPY(p.price) + '</span></span><a href="#inquiry-section" class="jbtn jbtn-primary jbtn-sm pkg-book-btn" data-package-id="' + (p.id || '') + '">Book Now</a></div>';
      h += '</div></div>';
    });
    h += '</div>';
    h += '<div class="pkg-actions fade-up"><button class="jbtn jbtn-primary jbtn-lg" id="book-selected-btn">Book Selected Package</button></div>';
    h += '</div></div>';

    // === TRAVELER INQUIRY FORM ===
    h += '<div class="jtr-section inquiry-section" id="inquiry-section"><div class="jtr-inner">';
    h += '<div class="sec-head fade-up"><span class="overline">Plan Your Trip</span><h2>Traveler Inquiry / Booking Form</h2><p>No sign-in required. Fill in your details and we\'ll get back to you within 24 hours.</p></div>';
    h += '<div class="inquiry-wrap fade-up">';
    h += '<form id="inquiry-form" class="inquiry-form" novalidate>';
    h += '<div class="form-row-2">';
    h += '<div class="form-field"><label for="inq-name">Full Name <span class="req">*</span></label><input type="text" id="inq-name" placeholder="Your full name" required></div>';
    h += '<div class="form-field"><label for="inq-email">Email Address <span class="req">*</span></label><input type="email" id="inq-email" placeholder="you@example.com" required></div>';
    h += '</div>';
    h += '<div class="form-row-2">';
    h += '<div class="form-field"><label for="inq-dob">Date of Birth</label><input type="date" id="inq-dob"></div>';
    h += '<div class="form-field"><label for="inq-country">Country <span class="req">*</span></label><input type="text" id="inq-country" placeholder="Your country" required></div>';
    h += '</div>';
    h += '<div class="form-row-2">';
    h += '<div class="form-field"><label for="inq-people">How many people will visit? <span class="req">*</span></label><input type="number" id="inq-people" min="1" max="50" placeholder="Number of travelers" required></div>';
    h += '<div class="form-field"><label for="inq-phone">Phone / WhatsApp</label><input type="tel" id="inq-phone" placeholder="+1 234 567 8900"></div>';
    h += '</div>';
    h += '<div class="form-field children-field">';
    h += '<label class="checkbox-label"><input type="checkbox" id="inq-children"> Are there any children under 18?</label>';
    h += '<div class="children-count" id="children-count-wrap" style="display:none"><label for="inq-children-count">How many children under 18?</label><input type="number" id="inq-children-count" min="1" max="20" placeholder="Number of children"></div>';
    h += '</div>';
    h += '<div class="form-field"><label for="inq-special">Special places to visit / requests</label><textarea id="inq-special" rows="4" placeholder="Tell us about your dream Japan trip \u2014 specific places, activities, dietary needs, etc."></textarea></div>';

    h += '<div class="form-field"><label for="inq-package-select">Selected Package <span class="req">*</span></label>';
    h += '<select id="inq-package-select" name="package" required>';
    h += '<option value="">Select a Japan travel package\u2026</option>';
    getPackages().forEach(function (p) {
      if (p.id == null) return;
      var titleLine = p.title || p.plan || "Package";
      var styleLine = p.style || "";
      var dur = p.d || "";
      var priceStr = p.price != null ? currency(p.price) + "/person" : "";
      var optLabel = titleLine + (styleLine ? " \u2014 " + styleLine : "") + (dur ? " (" + dur + ")" : "") + (priceStr ? " \u2014 " + priceStr : "");
      h += '<option value="' + escAttr(String(p.id)) + '">' + escHtml(optLabel) + "</option>";
    });
    h += '<option value="custom">Custom package (not listed) \u2014 describe below</option>';
    h += "</select>";
    h += '<p class="inq-package-hint">Choosing a package above or using <strong>Book Now</strong> updates this list automatically. You can also pick a package here.</p></div>';
    h += '<div class="form-field" id="inq-custom-package-wrap" style="display:none"><label for="inq-custom-package">Describe your custom package <span class="req">*</span></label><textarea id="inq-custom-package" rows="4" placeholder="Duration, destinations, group size, budget, must-see places, etc."></textarea></div>';

    h += '<div class="form-field"><label for="inq-message">Additional Message</label><textarea id="inq-message" rows="3" placeholder="Any other information you\'d like to share..."></textarea></div>';

    h += '<div class="form-actions">';
    h += '<button type="submit" class="jbtn jbtn-primary jbtn-lg"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13"/><path d="M22 2L15 22L11 13L2 9L22 2Z"/></svg> Submit Inquiry</button>';
    h += '</div>';
    h += '</form>';
    h += '</div></div></div>';

    // === SUCCESS MODAL ===
    h += '<div class="success-modal" id="success-modal">';
    h += '<div class="success-box">';
    h += '<div class="success-icon">\u2705</div>';
    h += '<h2>Inquiry Submitted!</h2>';
    h += '<p>Your inquiry has been saved and a WhatsApp message with your details has been prepared.</p>';
    h += '<p class="success-sub">If WhatsApp didn\'t open, please allow pop-ups and try again.</p>';
    h += '<div class="success-actions">';
    h += '<button class="jbtn jbtn-primary jbtn-lg" id="close-success">OK</button>';
    h += '</div></div></div>';

    // === CUSTOM TRIP BUILDER ===
    h += '<div class="jtr-section sakura-section" id="trip-builder-section"><div class="sakura-rain" id="sakura-rain"></div><div class="jtr-inner">';
    h += '<div class="sec-head fade-up"><span class="overline">Plan Your Way</span><h2>Custom Trip Builder</h2><p>Share your travel preferences and plan details so we can craft your perfect Japan trip.</p></div>';
    h += '<div class="builder-wrap fade-up">';
    h += '<div class="builder-form">';
    h += '<div class="field-group"><label>Duration</label><select id="trip-duration"><option value="3">3 Days</option><option value="7" selected>7 Days</option><option value="14">14 Days</option><option value="21">21 Days</option><option value="30">1 Month</option><option value="90">3 Months</option></select></div>';
    h += '<div class="field-group"><label>Destinations</label><div class="chips" id="dest-chips"></div></div>';
    h += '<div class="field-group"><label>Hotel Type</label><select id="hotel-type"><option value="budget">Budget</option><option value="standard" selected>Standard</option><option value="luxury">Luxury</option></select></div>';
    h += '<div class="field-group"><label>Transport</label><select id="transport-type"><option value="car" selected>Car</option><option value="van">Van</option><option value="bus">Bus</option></select></div>';
    h += '<div class="field-group"><label>Activities</label><div class="chips" id="act-chips"></div></div>';
    h += '<div class="field-group"><label for="trip-style">Trip Style <span class="optional-note">(Optional, recommended)</span></label><select id="trip-style"><option value="">Select your preferred style</option><option value="Relaxed Travel">Relaxed Travel</option><option value="Adventure Trip">Adventure Trip</option><option value="Luxury Experience">Luxury Experience</option><option value="Family Friendly">Family Friendly</option><option value="Budget Friendly">Budget Friendly</option></select></div>';
    h += '<div class="field-group"><label for="trip-plan">Tell Us Your Plan <span class="optional-note">(Optional, recommended)</span></label><textarea id="trip-plan" rows="4" placeholder="Write what you want to experience in Japan..."></textarea></div>';
    h += '<div class="btn-row"><button class="jbtn jbtn-dark" id="submit-trip-btn">\uD83D\uDCE9 Submit Trip Request</button></div>';
    h += "</div>";
    h += '<aside class="trip-preview-panel" id="trip-preview-panel" aria-label="Destination preview">';
    h += '<div class="trip-preview-frame">';
    h += '<img class="trip-preview-img trip-preview-img-a visible" id="trip-preview-img-a" src="" alt="">';
    h += '<img class="trip-preview-img trip-preview-img-b" id="trip-preview-img-b" src="" alt="">';
    h += '<div class="trip-preview-gradient"></div>';
    h += '<p class="trip-preview-label" id="trip-preview-label"></p>';
    h += '</div>';
    h += '<div class="trip-preview-dots" id="trip-preview-dots" role="tablist" aria-label="Slide indicators"></div>';
    h += '<p class="trip-preview-hint">Tap a destination to preview it here.</p>';
    h += "</aside>";
    h += "</div></div></div>";

    // === LOGISTICS ===
    h += '<div class="jtr-section" id="logistics-section"><div class="jtr-inner">';
    h += '<div class="sec-head fade-up"><span class="overline">We Handle Everything</span><h2>Logistics & Travel Support</h2><p>From visas to transport to on-ground help \u2014 travel stress-free.</p></div>';
    h += '<div class="logistics-grid">';
    logistics.forEach(function (l) {
      h += '<div class="log-card fade-up">';
      if (l.coming) h += '<div class="coming-soon">Coming Soon</div>';
      h += '<div class="log-icon">' + l.icon + "</div><h4>" + l.title + "</h4><p>" + l.desc + "</p></div>";
    });
    h += "</div></div></div>";

    // === TESTIMONIALS ===
    h += '<div class="jtr-section testimonials-section" id="testimonials-section"><div class="jtr-inner">';
    h += '<div class="sec-head fade-up"><span class="overline">What Travelers Say</span><h2>Reviews & Testimonials</h2><p>Hear from travelers who experienced Japan with us.</p></div>';
    h += '<div class="review-summary-bar fade-up" id="review-summary-bar" style="display:none"></div>';

    h += '<div class="review-action-bar fade-up">';
    h += '<button class="jbtn jbtn-primary" id="write-review-btn" style="display:none"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg> Write a Review</button>';
    h += '<p class="review-signin-hint" id="review-signin-hint"><a href="#" id="review-signin-link">Sign in</a> to write a review</p>';
    h += '</div>';

    h += '<div class="review-form-wrap" id="review-form-wrap" style="display:none">';
    h += '<form id="review-form" class="review-form fade-up">';
    h += '<h3>Share Your Experience</h3>';
    h += '<div class="star-rating-input" id="star-rating-input">';
    h += '<span class="star-pick" data-val="1">\u2606</span>';
    h += '<span class="star-pick" data-val="2">\u2606</span>';
    h += '<span class="star-pick" data-val="3">\u2606</span>';
    h += '<span class="star-pick" data-val="4">\u2606</span>';
    h += '<span class="star-pick" data-val="5">\u2606</span>';
    h += '<input type="hidden" id="review-rating" value="0">';
    h += '</div>';
    h += '<div class="form-field"><label for="review-country">Country <span class="req">*</span></label><input type="text" id="review-country" maxlength="120" required placeholder="e.g. Australia, United Kingdom"></div>';
    h += '<div class="form-field"><label for="review-image">Photo (optional)</label><input type="file" id="review-image" accept="image/jpeg,image/png,image/webp,image/gif"></div>';
    h += '<div class="form-field"><label for="review-text">Your Review <span class="req">*</span></label><textarea id="review-text" rows="4" placeholder="Tell us about your experience traveling to Japan with us..." required></textarea></div>';
    h += '<div class="form-actions"><button type="submit" class="jbtn jbtn-primary">Submit Review</button><button type="button" class="jbtn jbtn-outline" id="cancel-review">Cancel</button></div>';
    h += '</form></div>';

    h += '<div class="testimonials-grid" id="testimonials-grid"><p class="reviews-loading">Loading reviews\u2026</p></div>';
    h += '<div class="review-show-all-wrap fade-up"><a href="/reviews" class="jbtn jbtn-outline" id="show-all-reviews-btn">Show all reviews</a></div>';
    h += "</div></div>";

    // === FAQ ===
    h += '<div class="jtr-section faq-section" id="faq-section"><div class="jtr-inner">';
    h += '<div class="sec-head fade-up"><span class="overline">Common Questions</span><h2>Frequently Asked Questions</h2><p>Everything you need to know before your Japan trip.</p></div>';
    h += '<div class="faq-list" id="faq-list"></div>';
    h += '</div></div>';

    // === NIJO TRAVEL SECTION ===
    h += '<div class="jtr-section nijo-section"><div class="jtr-inner">';
    h += '<div class="nijo-header fade-up">';
    h += '<div class="nijo-brand">';
    h += '<div class="nijo-logo-wrap"><img src="/imgs/logo.jpg" alt="Nijro Travel & Tours"></div>';
    h += '<div class="nijo-brand-text">';
    h += '<h2>Nijo Travel & Tours</h2>';
    h += '<p class="nijo-tagline">Your Gateway to Authentic Japan Experiences</p>';
    h += '<div class="nijo-badges">';
    h += '<span class="nijo-badge"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> Verified Agency</span>';
    h += '<span class="nijo-badge"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> Sri Lanka & Japan</span>';
    h += '<span class="nijo-badge"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> 500+ Happy Travelers</span>';
    h += '</div></div></div>';
    h += '<div class="nijo-services">';
    h += '<div class="nijo-service"><span class="nijo-srv-icon">\u2708\uFE0F</span><span>Flight Booking</span></div>';
    h += '<div class="nijo-service"><span class="nijo-srv-icon">\uD83C\uDFE8</span><span>Hotel Reservations</span></div>';
    h += '<div class="nijo-service"><span class="nijo-srv-icon">\uD83D\uDE85</span><span>JR Pass & Transport</span></div>';
    h += '<div class="nijo-service"><span class="nijo-srv-icon">\uD83D\uDDFA\uFE0F</span><span>Custom Itineraries</span></div>';
    h += '<div class="nijo-service"><span class="nijo-srv-icon">\uD83C\uDF38</span><span>Cultural Tours</span></div>';
    h += '<div class="nijo-service"><span class="nijo-srv-icon">\uD83D\uDCF1</span><span>24/7 Support</span></div>';
    h += '</div></div>';

    // Social feeds
    h += '<div class="sec-head fade-up" style="margin-top:40px"><span class="overline">Stay Connected</span><h2>Follow Our Journey</h2><p>See our latest tours, travel tips, and behind-the-scenes moments.</p></div>';
    h += '<div class="nijo-social-grid fade-up">';

    var fbPageUrl = "https://www.facebook.com/people/Nijo-Travel-Tours/61571071693564/";
    var fbPosts = [
      "https://www.facebook.com/permalink.php?story_fbid=pfbid02ETARWCZ8jkRaGAKA9WjZeZpdubEaa3QYMyosU8rfYpj1jqvMapdJynjg2oe9RGnwl&id=61571071693564",
      "https://www.facebook.com/permalink.php?story_fbid=pfbid021cgGvcXW3SKZsx3VzSdY7KMBTN9TaGe4uG3huSKD4hc3NFjePNxXqQz39DKyhwxgl&id=61571071693564",
      "https://www.facebook.com/permalink.php?story_fbid=pfbid02531A6f8DxnnJoRQA8suNw6ZzUGeTggASnYjfy9KdEpZ6Ao1KpMCtPyz4tCk1DS83l&id=61571071693564",
      "https://www.facebook.com/permalink.php?story_fbid=pfbid0NWoU9FEFSvae7hdTAoa7oc6zzEEA2bwBjgKfeYtsq3vnCvNFxRvGRKa1gWt91peYl&id=61571071693564"
    ];
    h += '<div class="nijo-social-card">';
    h += '<div class="nijo-social-label"><svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> Facebook</div>';
    h += '<div class="nijo-fb-posts">';
    fbPosts.forEach(function(postUrl) {
      var postSrc = "https://www.facebook.com/plugins/post.php?href=" + encodeURIComponent(postUrl) + "&width=250&show_text=true";
      h += '<div class="nijo-fb-post"><iframe src="' + postSrc + '" width="250" height="280" style="border:none;overflow:hidden;max-width:100%" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" title="Facebook Post"></iframe></div>';
    });
    h += '</div>';
    h += '<a href="' + fbPageUrl + '" target="_blank" rel="noopener noreferrer" class="nijo-follow-btn nijo-follow-fb">Follow on Facebook</a>';
    h += '</div>';

    h += '<div class="nijo-social-card">';
    h += '<div class="nijo-social-label"><svg width="20" height="20" viewBox="0 0 24 24" fill="#000"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.76 1.52V6.84a4.84 4.84 0 0 1-1-.15z"/></svg> TikTok</div>';
    h += '<div class="tiktok-embed-wrap">';
    h += '<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@nijo.trvel.tours" data-unique-id="nijo.trvel.tours" data-embed-from="oembed" data-embed-type="creator" style="max-width:780px; min-width:288px;">';
    h += '<section><a target="_blank" href="https://www.tiktok.com/@nijo.trvel.tours?refer=creator_embed">@nijo.trvel.tours</a></section>';
    h += '</blockquote></div>';
    h += '<a href="https://www.tiktok.com/@nijo.trvel.tours" target="_blank" rel="noopener noreferrer" class="nijo-follow-btn nijo-follow-tt">Follow on TikTok</a>';
    h += '</div></div>';

    // Contact CTA with WhatsApp
    h += '<div class="nijo-cta fade-up" id="contact-section">';
    h += '<div class="nijo-cta-inner">';
    h += '<h3>Ready to Explore Japan?</h3>';
    h += '<p>Contact us today and let our team craft the perfect Japanese adventure for you.</p>';
    h += '<div class="nijo-cta-btns">';
    h += '<a href="' + WHATSAPP_URL + '?text=' + encodeURIComponent("Hi! I'm interested in booking a Japan travel package with Nijo Travel & Tours.") + '" target="_blank" class="nijo-follow-btn nijo-follow-wa"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 0 0 .612.616l4.52-1.468A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.94 9.94 0 0 1-5.292-1.519l-.379-.227-2.678.87.894-2.634-.25-.393A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg> Chat on WhatsApp</a>';
    h += '<a href="mailto:info@nijotraveltours.com" class="nijo-follow-btn nijo-follow-email"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> Email Us</a>';
    h += '<a href="#inquiry-section" class="nijo-follow-btn nijo-follow-form-link">Book Now</a>';
    h += '</div></div></div>';

    h += "</div></div>";

    // === SOCIAL FEED (#TravelJapan) ===
    h += '<div class="jtr-section social-feed-section" id="social-feed-section"><div class="jtr-inner">';
    h += '<div class="sec-head fade-up"><span class="overline">#TravelJapan</span><h2>Social Feed</h2><p>A compact photo album of recent Japan moments.</p></div>';
    h += '<div class="sf-grid fade-up" id="sf-grid" aria-label="Social feed photo grid"></div>';
    h += '</div></div>';

    // === MAP ===
    h += '<div class="jtr-section"><div class="jtr-inner">';
    h += '<div class="sec-head fade-up"><span class="overline">Explore The Map</span><h2>Japan at a Glance</h2></div>';
    h += '<div class="map-wrapper fade-up"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6657890.970396557!2d133.0!3d36.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34674e0fd77f192f%3A0xf54275d47c665244!2sJapan!5e0!3m2!1sen!2sus!4v1" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Japan Map"></iframe></div>';
    h += "</div></div>";

    // === FOOTER ===
    h += '<footer class="travel-footer">';
    h += '<div class="tf-inner">';
    h += '<div class="tf-col"><h4>Nijo Travel & Tours</h4><p>Your complete guide to planning the perfect Japanese adventure. From flights to accommodation to the most authentic experiences.</p><div class="tf-socials"><a href="https://www.facebook.com/people/Nijo-Travel-Tours/61571071693564/" target="_blank" title="Facebook">f</a><a href="https://www.tiktok.com/@nijo.trvel.tours" target="_blank" title="TikTok">\u266A</a><a href="' + WHATSAPP_URL + '" target="_blank" title="WhatsApp">\uD83D\uDCAC</a></div></div>';
    h += '<div class="tf-col"><h4>Quick Links</h4><ul><li><a href="#packages">Packages</a></li><li><a href="#inquiry-section">Book Now</a></li><li><a href="#trip-builder-section">Trip Builder</a></li><li><a href="#testimonials-section">Reviews</a></li></ul></div>';
    h += '<div class="tf-col"><h4>Support</h4><ul><li><a href="#contact-section">Contact Us</a></li><li><a href="#faq-section">FAQs</a></li><li><a href="#logistics-section">Visa Guide</a></li><li><a href="' + WHATSAPP_URL + '" target="_blank">WhatsApp Support</a></li></ul></div>';
    h += '<div class="tf-col"><h4>Newsletter</h4><p>Get the latest Japan travel deals and tips.</p><div style="display:flex;gap:8px"><input id="nl-email" type="email" placeholder="Your email" style="flex:1;padding:10px 14px;border:1px solid rgba(255,255,255,.2);border-radius:50px;background:rgba(255,255,255,.08);color:#fff;font-size:14px;font-family:inherit"><button class="jbtn jbtn-primary jbtn-sm" id="nl-btn">\u2192</button></div></div>';
    h += "</div>";
    h += '<div class="tf-bottom"><span></span><span></span></div>';
    h += "</footer>";

    // === FLOATING WHATSAPP BUTTON ===
    h += '<a href="' + WHATSAPP_URL + '?text=' + encodeURIComponent("Hi! I'm interested in Japan travel packages.") + '" target="_blank" class="whatsapp-float" id="whatsapp-float" title="Contact us on WhatsApp"><svg width="28" height="28" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 0 0 .612.616l4.52-1.468A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.94 9.94 0 0 1-5.292-1.519l-.379-.227-2.678.87.894-2.634-.25-.393A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg></a>';

    // === CHAT FAB ===
    h += '<button class="chat-fab" id="chat-fab" title="AI Travel Assistant">\uD83D\uDCAC</button>';

    // === CHAT PANEL ===
    h += '<div class="ai-chat-panel" id="ai-chat-panel">';
    h += '<div class="ai-chat-header"><h4>\uD83C\uDDEF\uD83C\uDDF5 AI Travel Assistant</h4><button class="ai-chat-close" id="chat-close">\u2715</button></div>';
    h += '<div class="ai-chat-body" id="chat-body"><div class="chat-msg bot">Konnichiwa! \uD83C\uDF38 I\'m your Japan travel assistant. Ask me anything about destinations, transport, food, visa, or itineraries!</div></div>';
    h += '<div class="ai-chat-input"><input type="text" id="chat-input" placeholder="Ask about Japan travel..."><button id="chat-send">\u27A4</button></div>';
    h += "</div>";

    // === LOGIN / REGISTER MODAL ===
    h += '<div class="login-modal" id="login-modal">';
    h += '<div class="login-box">';
    h += '<button class="login-close" id="login-close">\u2715</button>';
    h += '<div class="login-tabs"><button class="login-tab active" data-tab="login">Login</button><button class="login-tab" data-tab="register">Create Account</button></div>';

    h += '<div class="login-tab-content" id="tab-login">';
    h += '<p class="login-sub">Sign in to your account to leave reviews and manage bookings.</p>';
    h += '<div id="login-error" class="login-error" style="display:none"></div>';
    h += '<div class="login-field"><label>Email <span class="req">*</span></label><input type="email" id="login-email" placeholder="you@example.com"></div>';
    h += '<div class="login-field"><label>Password <span class="req">*</span></label><input type="password" id="login-pass" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"></div>';
    h += '<button class="jbtn jbtn-primary jbtn-lg" id="login-submit" style="width:100%;justify-content:center">Login</button>';
    h += '<p class="login-switch">Don\'t have an account? <a href="#" id="switch-to-register">Create one</a></p>';
    h += '</div>';

    h += '<div class="login-tab-content" id="tab-register" style="display:none">';
    h += '<p class="login-sub">Create a new account to leave reviews and share your travel experience.</p>';
    h += '<div id="register-error" class="login-error" style="display:none"></div>';
    h += '<div id="register-success" class="login-success" style="display:none"></div>';
    h += '<div class="login-field"><label>Full Name <span class="req">*</span></label><input type="text" id="reg-name" placeholder="Your full name"></div>';
    h += '<div class="login-field"><label>Email <span class="req">*</span></label><input type="email" id="reg-email" placeholder="you@example.com"></div>';
    h += '<div class="login-field"><label>Password <span class="req">*</span></label><input type="password" id="reg-pass" placeholder="Min 6 characters"></div>';
    h += '<div class="login-field"><label>Confirm Password <span class="req">*</span></label><input type="password" id="reg-pass2" placeholder="Re-enter password"></div>';
    h += '<button class="jbtn jbtn-primary jbtn-lg" id="register-submit" style="width:100%;justify-content:center">Create Account</button>';
    h += '<p class="login-switch">Already have an account? <a href="#" id="switch-to-login">Login</a></p>';
    h += '</div>';

    h += "</div></div>";

    // === SOCIAL FEED MODAL ===
    h += '<div class="sf-modal" id="sf-modal" aria-hidden="true">';
    h += '<div class="sf-modal-backdrop" id="sf-modal-backdrop"></div>';
    h += '<div class="sf-modal-content" role="dialog" aria-modal="true" aria-label="Photo viewer">';
    h += '<button class="sf-modal-close" id="sf-modal-close" aria-label="Close">\u2715</button>';
    h += '<img id="sf-modal-img" alt="Social feed photo">';
    h += '<div class="sf-modal-tags" id="sf-modal-tags"></div>';
    h += "</div></div>";

    return h;
  }

  function mount() {
    if ($(".jtr")) return;

    var doMount = function () {
      var target = findTarget();
      var wrapper = el("div", "jtr");
      wrapper.innerHTML = buildHTML();

      if (target === document.body) {
        document.body.appendChild(wrapper);
      } else {
        target.insertAdjacentElement("afterend", wrapper);
      }

      hideOldSections();
      addSignInButton();
      initHeroVideo();
      initHeroMobileCarousel();
      initHeroClouds();
      initSakura();
      loadSocialEmbeds();
      initChips();
      initEstimator();
      initAuth();
      initAI();
      initChat();
      initScrollReveal();
      initLocationCards();
      initPackageNavigation();
      initNewsletter();
      initInquiryForm();
      initFAQ();
      initPackageCheckboxes();
      initTravelGuidesLocations();
      initReviews();
      initSocialFeed();
      initNavScroll();
      applyPreselectPackage();
    };

    if (window.TravelAPI && window.TravelAPI.waitForPackages) {
      window.TravelAPI.waitForPackages(doMount);
    } else {
      doMount();
    }
  }

  function addSignInButton() {
    // Sign-in click handled in initAuth()
  }

  // === HERO VIDEO (YouTube embed — autoplay requires mute=1 in most browsers) ===
  var HERO_YOUTUBE_VIDEO_ID = "NQ6_Sqt_w3Y";

  function appendHeroVideoShield(wrap) {
    if (!wrap || wrap.querySelector(".hero-video-shield")) return;
    var shield = el("div", "hero-video-shield");
    shield.setAttribute("aria-hidden", "true");
    shield.tabIndex = -1;
    wrap.appendChild(shield);
  }

  function initHeroVideo() {
    var hero = $(".welcome-text.explore-top");
    if (!hero) return;
    var existingWrap = hero.querySelector(".hero-video-wrap");
    if (existingWrap) {
      appendHeroVideoShield(existingWrap);
      return;
    }
    var wrap = el("div", "hero-video-wrap hero-video-wrap--youtube");
    var iframe = document.createElement("iframe");
    iframe.className = "hero-yt";
    iframe.setAttribute("title", "Japan travel — featured video");
    iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
    iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
    iframe.setAttribute("allowfullscreen", "");
    var vid = HERO_YOUTUBE_VIDEO_ID;
    var origin = "";
    try {
      if (window.location && window.location.origin && window.location.origin.indexOf("http") === 0) {
        origin = "&origin=" + encodeURIComponent(window.location.origin);
      }
    } catch (e) {}
    iframe.src = "https://www.youtube.com/embed/" + vid
      + "?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1&controls=0&disablekb=1&fs=0&loop=1&iv_load_policy=3"
      + "&playlist=" + encodeURIComponent(vid)
      + origin;
    wrap.appendChild(iframe);
    appendHeroVideoShield(wrap);
    hero.insertBefore(wrap, hero.firstChild);
  }

  function initHeroMobileCarousel() {
    if (!document.body.classList.contains("home")) return;
    var heroBanner = $(".hero-banner.home");
    if (!heroBanner || typeof window.slider_items === "undefined" || !window.slider_items.length) return;
    if (window.matchMedia("(min-width: 1200px)").matches) return;
    if (typeof window.jQuery === "undefined" || typeof window.jQuery.fn.owlCarousel === "undefined") return;
    var jq = window.jQuery;
    var banner = heroBanner.querySelector(".banner.home");
    var sliderTrigger = heroBanner.querySelector(".slider-trigger");
    if (!banner || !sliderTrigger) return;
    if (banner.classList.contains("owl-loaded")) return;
    var imgUrl = function (url, w) { if (!url) return ""; if (url.indexOf("unsplash.com") !== -1) { if (url.indexOf("?") !== -1) return url.replace(/w=\d+/, "w=" + w); return url + "?w=" + w; } return url; };
    var itemsHtml = "";
    for (var i = 1; i < window.slider_items.length; i++) {
      var it = window.slider_items[i]; var dImg = it.desktop_image || it.thumb_image;
      var m768 = imgUrl(dImg, 768); var m1200 = imgUrl(dImg, 1200);
      itemsHtml += '<div class="item"><picture><source media="(max-width: 767px)" srcset="' + m768 + '"><source media="(max-width: 1199px)" srcset="' + m1200 + '"><img src="' + dImg + '" alt="' + (it.thumb_title || "") + '" title="' + (it.thumb_title || "") + '"></picture><div class="layer"><img src="' + (it.desktop_layer || dImg) + '" alt="' + (it.thumb_title || "") + '"></div></div>';
    }
    banner.insertAdjacentHTML("beforeend", itemsHtml);
    var thumbHtml = "";
    for (var s = 0; s < window.slider_items.length; s++) {
      var item = window.slider_items[s]; var activeClass = s === 0 ? " active" : "";
      thumbHtml += '<div class="cilckelm' + activeClass + '" data-index="' + s + '"><span class="img-holder"><img src="' + (item.thumb_image || item.desktop_image) + '" alt="' + (item.thumb_title || "") + '"></span><span class="text">' + (item.sub_title || "") + "<span>" + (item.thumb_title || "") + "</span></span></div>";
    }
    sliderTrigger.innerHTML = thumbHtml;
    sliderTrigger.classList.add("showup", "hero-slider-mobile");
    var owl = jq(banner).owlCarousel({ items: 1, loop: true, autoplay: true, autoplayTimeout: 4500, autoplayHoverPause: false, dots: false, nav: false, touchDrag: true, pullDrag: true, smartSpeed: 800, animateOut: "fadeOut", animateIn: "fadeIn" });
    owl.on("changed.owl.carousel", function (e) { var idx = e.item.index; var count = window.slider_items.length; var actualIdx = ((idx % count) + count) % count; jq(sliderTrigger).find(".cilckelm").removeClass("active").eq(actualIdx).addClass("active"); });
    jq(sliderTrigger).on("click", ".cilckelm", function (ev) { ev.preventDefault(); ev.stopPropagation(); var idx = parseInt(jq(this).attr("data-index"), 10); owl.trigger("stop.owl.autoplay").trigger("to.owl.carousel", [idx, 400, true]); });
  }

  function initHeroClouds() {
    var hero = $(".welcome-text.explore-top");
    if (!hero || hero.querySelector(".hero-clouds")) return;
    var cloudSvgLeft = '<svg viewBox="0 0 800 900" preserveAspectRatio="xMinYMin slice" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="cgl" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#fff" stop-opacity=".95"/><stop offset="60%" stop-color="#fff" stop-opacity=".6"/><stop offset="100%" stop-color="#fff" stop-opacity="0"/></linearGradient></defs><ellipse cx="200" cy="200" rx="500" ry="250" fill="url(#cgl)"/><ellipse cx="150" cy="500" rx="450" ry="220" fill="url(#cgl)"/><ellipse cx="250" cy="750" rx="520" ry="280" fill="url(#cgl)"/></svg>';
    var cloudSvgRight = '<svg viewBox="0 0 800 900" preserveAspectRatio="xMaxYMin slice" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="cgr" x1="1" y1="0" x2="0" y2="0"><stop offset="0%" stop-color="#fff" stop-opacity=".95"/><stop offset="60%" stop-color="#fff" stop-opacity=".6"/><stop offset="100%" stop-color="#fff" stop-opacity="0"/></linearGradient></defs><ellipse cx="600" cy="180" rx="480" ry="230" fill="url(#cgr)"/><ellipse cx="650" cy="480" rx="420" ry="200" fill="url(#cgr)"/><ellipse cx="580" cy="760" rx="500" ry="260" fill="url(#cgr)"/></svg>';
    var wrap = el("div", "hero-clouds");
    wrap.innerHTML = '<div class="hero-cloud hero-cloud--left">' + cloudSvgLeft + '</div><div class="hero-cloud hero-cloud--right">' + cloudSvgRight + '</div>';
    hero.appendChild(wrap);
  }

  function loadSocialEmbeds() {
    (function (d, s, id) {
      if (d.getElementById(id)) return;
      var js = d.createElement(s); js.id = id; js.src = "https://www.tiktok.com/embed.js"; js.async = true; d.body.appendChild(js);
    })(document, "script", "tiktok-embed-js");
  }

  function initSakura() {
    var container = document.getElementById("sakura-rain");
    if (!container) return;
    var petalShapes = ["M0,0 C2,-4 8,-4 10,0 C8,4 2,4 0,0 Z", "M0,0 C3,-5 9,-3 10,0 C9,5 3,3 0,0 Z", "M0,1 C2,-4 9,-5 11,0 C9,4 2,5 0,1 Z"];
    var colors = ["#ffb7c5", "#ffc1cc", "#ffa6b8", "#ffd1dc", "#ff9eb5"];
    for (var i = 0; i < 35; i++) {
      var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("viewBox", "0 0 12 8"); svg.setAttribute("class", "sakura-petal");
      var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", petalShapes[Math.floor(Math.random() * petalShapes.length)]);
      path.setAttribute("fill", colors[Math.floor(Math.random() * colors.length)]);
      svg.appendChild(path);
      var size = 10 + Math.random() * 16;
      svg.style.width = size + "px"; svg.style.height = size + "px"; svg.style.left = Math.random() * 100 + "%";
      svg.style.animationDuration = (5 + Math.random() * 8) + "s"; svg.style.animationDelay = (Math.random() * 10) + "s";
      svg.style.opacity = 0.4 + Math.random() * 0.5;
      container.appendChild(svg);
    }
  }

  function hideOldSections() {
    [".discover-around", ".discover-toc", ".things-to-do", ".video-block", ".card-layout-home", ".homepagepartner", ".clouds", "footer.footer"].forEach(function (s) {
      $$(s).forEach(function (el) { el.style.display = "none"; });
    });
    var hero = $(".welcome-text.explore-top");
    if (hero) {
      var sibling = hero.nextElementSibling;
      while (sibling && !sibling.classList.contains("jtr")) {
        if (sibling.tagName === "SECTION" || sibling.tagName === "DIV") sibling.style.display = "none";
        sibling = sibling.nextElementSibling;
      }
      var parent = hero.parentElement;
      if (parent && parent.tagName === "SECTION") {
        var parentSib = parent.nextElementSibling;
        while (parentSib && !parentSib.classList.contains("jtr")) {
          if (!parentSib.classList.contains("jtr")) parentSib.style.display = "none";
          parentSib = parentSib.nextElementSibling;
        }
      }
    }
  }

  // === PACKAGE CHECKBOXES ===
  function initPackageCheckboxes() {
    var bookSelectedBtn = document.getElementById("book-selected-btn");
    if (bookSelectedBtn) {
      bookSelectedBtn.addEventListener("click", function () {
        if (!$(".pkg-radio:checked")) {
          alert("Please select a package first.");
          return;
        }
        syncSelectedPackages();
        var section = document.getElementById("inquiry-section");
        if (section) section.scrollIntoView({ behavior: "smooth" });
      });
    }

    $$(".pkg-radio").forEach(function (rb) {
      rb.addEventListener("change", syncSelectedPackages);
    });
    syncSelectedPackages();
  }

  /** Keep inquiry package dropdown in sync when the grid radio changes (Book Now, card selection, etc.). */
  function syncSelectedPackages() {
    var pkgSel = document.getElementById("inq-package-select");
    if (!pkgSel) return;
    var customWrap = document.getElementById("inq-custom-package-wrap");
    var selected = $(".pkg-radio:checked");
    if (!selected) {
      if (pkgSel.value !== "custom") {
        pkgSel.value = "";
        if (customWrap) customWrap.style.display = "none";
      }
      return;
    }
    pkgSel.value = String(selected.value);
    if (customWrap) customWrap.style.display = "none";
  }

  /** When the inquiry dropdown changes, update grid radios and custom field visibility. */
  function applyInquiryPackageSelectToGrid() {
    var pkgSel = document.getElementById("inq-package-select");
    var customWrap = document.getElementById("inq-custom-package-wrap");
    if (!pkgSel) return;
    var v = pkgSel.value;
    if (v === "custom") {
      $$(".pkg-radio").forEach(function (rb) { rb.checked = false; });
      if (customWrap) customWrap.style.display = "block";
      return;
    }
    if (customWrap) customWrap.style.display = "none";
    if (!v) {
      $$(".pkg-radio").forEach(function (rb) { rb.checked = false; });
      return;
    }
    var safe = String(v).replace(/"/g, "");
    var rb = document.querySelector('.pkg-radio[value="' + safe + '"]');
    $$(".pkg-radio").forEach(function (r) { r.checked = false; });
    if (rb) rb.checked = true;
  }

  // === INQUIRY FORM ===
  function initInquiryForm() {
    var form = document.getElementById("inquiry-form");
    var childrenCb = document.getElementById("inq-children");
    var childrenWrap = document.getElementById("children-count-wrap");
    var pkgSel = document.getElementById("inq-package-select");

    if (pkgSel) {
      pkgSel.addEventListener("change", function () {
        applyInquiryPackageSelectToGrid();
      });
    }

    if (childrenCb && childrenWrap) {
      childrenCb.addEventListener("change", function () {
        childrenWrap.style.display = childrenCb.checked ? "block" : "none";
      });
    }

    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!validateInquiryForm()) return;

        var selEl = document.getElementById("inq-package-select");
        var selVal = selEl ? selEl.value : "";
        var customNote = (document.getElementById("inq-custom-package") && selVal === "custom")
          ? document.getElementById("inq-custom-package").value.trim()
          : "";
        var selectedPkgId = null;
        if (selVal && selVal !== "custom") {
          selectedPkgId = parseInt(selVal, 10);
          if (isNaN(selectedPkgId)) selectedPkgId = null;
        }
        var baseMessage = document.getElementById("inq-message").value.trim();
        var combinedMessage = baseMessage;
        if (selVal === "custom" && customNote) {
          combinedMessage = (baseMessage ? baseMessage + "\n\n" : "") + "[Custom package request]\n" + customNote;
        }
        var data = {
          name: document.getElementById("inq-name").value.trim(),
          email: document.getElementById("inq-email").value.trim(),
          phone: document.getElementById("inq-phone").value.trim(),
          dateOfBirth: document.getElementById("inq-dob").value || null,
          country: document.getElementById("inq-country").value.trim(),
          peopleCount: parseInt(document.getElementById("inq-people").value, 10) || null,
          hasChildrenUnder18: document.getElementById("inq-children").checked,
          childrenUnder18Count: document.getElementById("inq-children").checked ? parseInt(document.getElementById("inq-children-count").value, 10) || 0 : 0,
          specialPlaces: document.getElementById("inq-special").value.trim(),
          packageId: selectedPkgId,
          message: combinedMessage,
          tripStyle: document.getElementById("trip-style") ? document.getElementById("trip-style").value : "",
          tripPlan: document.getElementById("trip-plan") ? document.getElementById("trip-plan").value.trim() : ""
        };

        var submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) { submitBtn.disabled = true; submitBtn.innerHTML = "Submitting..."; }

        var pkgs = getPackages();
        var selectedPkg = selectedPkgId ? pkgs.find(function (p) { return String(p.id) === String(selectedPkgId); }) : null;

        var waMsg = "New Travel Inquiry\n"
          + "========================\n"
          + "Name: " + data.name + "\n"
          + "Email: " + data.email + "\n"
          + (data.phone ? "Phone: " + data.phone + "\n" : "")
          + (data.dateOfBirth ? "DOB: " + data.dateOfBirth + "\n" : "")
          + "Country: " + data.country + "\n"
          + "Travelers: " + (data.peopleCount || 1) + "\n"
          + (data.hasChildrenUnder18 ? "Children under 18: " + data.childrenUnder18Count + "\n" : "")
          + (selVal === "custom" ? "Package: Custom / not listed\n" + (customNote ? "Details: " + customNote + "\n" : "") : selectedPkg ? "Package: " + (selectedPkg.title ? selectedPkg.title + " — " : "") + selectedPkg.style + " (" + selectedPkg.d + ") - " + currency(selectedPkg.price) + "/person\n" : "No package selected\n")
          + (data.tripStyle ? "Trip style: " + data.tripStyle + "\n" : "")
          + (data.tripPlan ? "Trip plan: " + data.tripPlan + "\n" : "")
          + (data.specialPlaces ? "Special requests: " + data.specialPlaces + "\n" : "")
          + (selVal === "custom" ? (baseMessage ? "Additional message: " + baseMessage + "\n" : "") : (data.message ? "Message: " + data.message + "\n" : ""))
          + "========================";

        function afterSubmit() {
          form.reset();
          var sr = $(".pkg-radio:checked"); if (sr) sr.checked = false;
          var cw = document.getElementById("inq-custom-package-wrap");
          if (cw) cw.style.display = "none";
          syncSelectedPackages();
          if (childrenWrap) childrenWrap.style.display = "none";
          if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13"/><path d="M22 2L15 22L11 13L2 9L22 2Z"/></svg> Submit Inquiry'; }
          window.open(WHATSAPP_URL + "?text=" + encodeURIComponent(waMsg), "_blank");
        }

        if (window.TravelAPI && window.TravelAPI.submitBooking) {
          window.TravelAPI.submitBooking(data)
            .then(function () { showSuccessModal(); afterSubmit(); })
            .catch(function () { showSuccessModal(); afterSubmit(); });
        } else {
          setTimeout(function () { showSuccessModal(); afterSubmit(); }, 800);
        }
      });
    }

    var closeSuccess = document.getElementById("close-success");
    if (closeSuccess) {
      closeSuccess.addEventListener("click", function () {
        var m = document.getElementById("success-modal");
        if (m) m.classList.remove("open");
      });
    }
    var successModal = document.getElementById("success-modal");
    if (successModal) {
      successModal.addEventListener("click", function (e) {
        if (e.target === successModal) successModal.classList.remove("open");
      });
    }
  }

  function validateInquiryForm() {
    var name = document.getElementById("inq-name").value.trim();
    var email = document.getElementById("inq-email").value.trim();
    var country = document.getElementById("inq-country").value.trim();
    var people = document.getElementById("inq-people").value;
    var pkgSel = document.getElementById("inq-package-select");
    var pkgVal = pkgSel ? pkgSel.value : "";

    clearFormErrors();

    var valid = true;
    if (!name) { showFieldError("inq-name", "Full name is required"); valid = false; }
    if (!email || !email.includes("@")) { showFieldError("inq-email", "Valid email is required"); valid = false; }
    if (!country) { showFieldError("inq-country", "Country is required"); valid = false; }
    if (!people || parseInt(people, 10) < 1) { showFieldError("inq-people", "Number of people is required"); valid = false; }
    if (!pkgVal) { showFieldError("inq-package-select", "Please select a package or Custom"); valid = false; }
    if (pkgVal === "custom") {
      var customEl = document.getElementById("inq-custom-package");
      if (!customEl || !customEl.value.trim()) { showFieldError("inq-custom-package", "Please describe your custom package"); valid = false; }
    }
    return valid;
  }

  function showFieldError(fieldId, msg) {
    var field = document.getElementById(fieldId);
    if (!field) return;
    field.classList.add("field-error");
    var err = el("span", "field-error-msg", msg);
    field.parentNode.appendChild(err);
  }

  function clearFormErrors() {
    $$(".field-error").forEach(function (f) { f.classList.remove("field-error"); });
    $$(".field-error-msg").forEach(function (e) { e.remove(); });
  }

  function showSuccessModal() {
    var m = document.getElementById("success-modal");
    if (m) m.classList.add("open");
  }

  // === LOCATION CARDS ===
  var LOC_VISIBLE_COUNT = 8;
  var locExpanded = false;

  function renderLocationCards(locs) {
    var grid = document.getElementById("loc-grid");
    var wrap = document.getElementById("loc-viewmore-wrap");
    if (!grid) return;
    if (!locs || !locs.length) {
      grid.innerHTML = '<p style="color:#999;text-align:center;width:100%">No locations available yet.</p>';
      if (wrap) wrap.style.display = "none";
      return;
    }
    var html = "";
    locs.forEach(function (l, idx) {
      var hidden = idx >= LOC_VISIBLE_COUNT && !locExpanded ? ' style="display:none"' : '';
      var img = l.imageUrl || "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80";
      html += '<a href="/location/' + l.id + '" class="loc-card fade-up visible" data-loc-idx="' + idx + '"' + hidden + '>';
      html += '<div class="loc-card-img" style="background-image:url(' + img + ')">';
      html += '<div class="loc-card-overlay">';
      html += '<h3 class="loc-card-name">' + (l.name || "") + '</h3>';
      html += '<span class="loc-card-city">' + (l.city || "") + '</span>';
      html += '</div></div>';
      if (l.description) html += '<p class="loc-card-desc">' + l.description + '</p>';
      html += '</a>';
    });
    grid.innerHTML = html;

    if (wrap) {
      if (locs.length > LOC_VISIBLE_COUNT) {
        wrap.style.display = "";
        updateViewMoreBtn();
      } else {
        wrap.style.display = "none";
      }
    }
  }

  function updateViewMoreBtn() {
    var text = document.getElementById("loc-viewmore-text");
    var arrow = document.getElementById("loc-viewmore-arrow");
    if (text) text.textContent = locExpanded ? "Show Less" : "View More";
    if (arrow) arrow.style.transform = locExpanded ? "rotate(180deg)" : "";
  }

  function toggleLocationCards() {
    locExpanded = !locExpanded;
    var cards = document.querySelectorAll("#loc-grid .loc-card");
    cards.forEach(function (card) {
      var idx = parseInt(card.getAttribute("data-loc-idx"), 10);
      if (idx >= LOC_VISIBLE_COUNT) {
        card.style.display = locExpanded ? "" : "none";
      }
    });
    updateViewMoreBtn();
    if (!locExpanded) {
      var section = document.getElementById("locations-section");
      if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function initLocationCards() {
    var grid = document.getElementById("loc-grid");
    if (!grid) return;

    var btn = document.getElementById("loc-viewmore-btn");
    if (btn) btn.addEventListener("click", toggleLocationCards);

    function load(locs) {
      if (grid.children.length > 0) return;
      renderLocationCards(locs);
    }

    if (window.apiLocations && window.apiLocations.length) {
      load(window.apiLocations);
    } else {
      window.addEventListener("travelLocationsReady", function () {
        load(window.apiLocations);
      });
      setTimeout(function () {
        if (grid.children.length === 0) {
          fetch((typeof window.apiUrl === "function" ? window.apiUrl("/api/locations") : "/api/locations")).then(function (r) {
            if (!r.ok) throw new Error();
            return r.json();
          }).then(function (data) {
            if (data && data.length) load(data);
            else load(null);
          }).catch(function () {
            load(null);
          });
        }
      }, 2000);
    }
  }

  // === FAQ ACCORDION ===
  function renderFaqList(items) {
    var list = document.getElementById("faq-list");
    if (!list) return;
    var html = "";
    items.forEach(function (f, idx) {
      html += '<div class="faq-item fade-up visible">';
      html += '<button class="faq-question" data-faq="' + idx + '"><span>' + (f.q || f.question) + '</span><span class="faq-toggle">+</span></button>';
      html += '<div class="faq-answer" id="faq-a-' + idx + '"><p>' + (f.a || f.answer) + '</p></div>';
      html += '</div>';
    });
    list.innerHTML = html;
    bindFaqClicks();
  }

  function bindFaqClicks() {
    $$(".faq-question").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var idx = btn.getAttribute("data-faq");
        var answer = document.getElementById("faq-a-" + idx);
        var isOpen = btn.classList.contains("open");
        $$(".faq-question").forEach(function (b) { b.classList.remove("open"); });
        $$(".faq-answer").forEach(function (a) { a.classList.remove("open"); });
        if (!isOpen && answer) {
          btn.classList.add("open");
          answer.classList.add("open");
        }
      });
    });
  }

  function initFAQ() {
    fetch((typeof window.apiUrl === "function" ? window.apiUrl("/api/faqs") : "/api/faqs")).then(function (r) {
      if (!r.ok) throw new Error("API error");
      return r.json();
    }).then(function (data) {
      if (data && data.length) {
        renderFaqList(data);
      } else {
        renderFaqList(faqs);
      }
    }).catch(function () {
      renderFaqList(faqs);
    });
  }

  // === CHIPS ===
  function initChips() {
    fillChips("dest-chips", getLocations());
    fillChips("act-chips", ["Food", "Anime", "Nature", "Culture", "Shopping"]);
    initTripBuilderPreview();
  }

  function initTravelGuidesLocations() {
    var buildGuidesHtml = function () {
      var locs = getLocations();
      var h = '<h3>Japan Travel Guides</h3><ul>';
      locs.forEach(function (name) { h += '<li><a href="#locations-section" class="nav-scroll">Explore ' + name + "</a></li>"; });
      h += "</ul>"; return h;
    };
    var updateGuides = function () {
      var desktopBox = document.querySelector("#menu-desktop-menu .table-parent .menu-item-box:first-child");
      if (desktopBox) desktopBox.innerHTML = buildGuidesHtml();
      var mobileSub = document.querySelector("#menu-main-menu li:nth-child(2) .sub-menu");
      if (mobileSub) {
        var locs = getLocations();
        mobileSub.innerHTML = locs.map(function (n) { return '<li><a href="#locations-section" class="nav-scroll">Explore ' + n + "</a></li>"; }).join("");
      }
    };
    updateGuides();
    window.addEventListener("travelLocationsReady", updateGuides);
  }

  function initNavScroll() {
    var sectionIds = ["locations-section", "packages", "trip-builder-section", "logistics-section", "inquiry-section", "testimonials-section", "faq-section", "contact-section", "social-feed-section"];
    document.addEventListener("click", function (e) {
      var a = e.target.closest("a[href^='#']");
      if (!a) return;
      var href = a.getAttribute("href"); if (!href || href.length < 2) return;
      var id = href.slice(1).split("?")[0];
      if (sectionIds.indexOf(id) !== -1 && document.getElementById(id)) {
        e.preventDefault();
        document.getElementById(id).scrollIntoView({ behavior: "smooth", block: "start" });
        var menuWrap = document.querySelector(".menu-wrapper");
        if (menuWrap && (menuWrap.classList.contains("open") || menuWrap.classList.contains("active"))) menuWrap.classList.remove("open", "active");
        var topMenu = document.querySelector(".top-menu");
        if (topMenu && topMenu.classList.contains("on")) topMenu.classList.remove("on");
      }
    });
  }

  // === SOCIAL FEED ===
  function initSocialFeed() {
    var grid = document.getElementById("sf-grid");
    if (!grid) return;

    var modal = document.getElementById("sf-modal");
    var modalImg = document.getElementById("sf-modal-img");
    var modalTags = document.getElementById("sf-modal-tags");
    var closeBtn = document.getElementById("sf-modal-close");
    var backdrop = document.getElementById("sf-modal-backdrop");

    var close = function () {
      if (!modal) return;
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("sf-modal-open");
      if (modalImg) modalImg.src = "";
      if (modalTags) modalTags.innerHTML = "";
    };

    if (closeBtn) closeBtn.addEventListener("click", close);
    if (backdrop) backdrop.addEventListener("click", close);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });

    var open = function (src, tags) {
      if (!modal || !modalImg) return;
      modalImg.src = src;
      if (modalTags) {
        modalTags.innerHTML = (tags || [])
          .slice(0, 8)
          .map(function (t) { return '<span class="sf-tag">#' + esc(t) + "</span>"; })
          .join("");
      }
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("sf-modal-open");
    };

    var render = function (items) {
      if (!Array.isArray(items) || !items.length) {
        grid.innerHTML = '<div class="sf-empty">No photos yet. Check back soon.</div>';
        return;
      }

      var tiles = items.slice(0, 18).map(function (p) {
        var tags = (p.tags || []).slice(0, 3);
        var tagHtml = tags.length
          ? '<div class="sf-tags">' + tags.map(function (t) { return '<span class="sf-tag">#' + esc(t) + "</span>"; }).join("") + "</div>"
          : "";
        return '<button class="sf-tile" type="button" data-src="' + escAttr(p.imageUrl) + '" aria-label="Open photo">' +
          '<img loading="lazy" src="' + escAttr(p.imageUrl) + '" alt="Travel photo">' +
          tagHtml +
          "</button>";
      }).join("");

      grid.innerHTML = tiles;
      grid.querySelectorAll(".sf-tile").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var src = btn.getAttribute("data-src") || "";
          var idx = Array.prototype.indexOf.call(grid.children, btn);
          var tags = (items[idx] && items[idx].tags) ? items[idx].tags : [];
          open(src, tags);
        });
      });
    };

    fetch((typeof window.apiUrl === "function" ? window.apiUrl("/api/social-feed?limit=18") : "/api/social-feed?limit=18"))
      .then(function (r) { return r.ok ? r.json() : []; })
      .then(render)
      .catch(function () { render([]); });
  }

  function esc(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function escAttr(s) {
    return esc(s).replace(/`/g, "&#96;");
  }

  function fillChips(id, names) {
    var root = document.getElementById(id); if (!root) return;
    names.forEach(function (name) {
      var btn = el("button", "chip", name);
      btn.type = "button"; btn.setAttribute("data-value", name);
      btn.addEventListener("click", function () { btn.classList.toggle("active"); });
      root.appendChild(btn);
    });
  }

  function selectedChips(id) { return $$("#" + id + " .chip.active").map(function (c) { return c.getAttribute("data-value"); }); }

  function initTripBuilderPreview() {
    var panel = document.getElementById("trip-preview-panel");
    var imgA = document.getElementById("trip-preview-img-a");
    var imgB = document.getElementById("trip-preview-img-b");
    var labelEl = document.getElementById("trip-preview-label");
    var dotsRoot = document.getElementById("trip-preview-dots");
    var destRoot = document.getElementById("dest-chips");
    if (!panel || !imgA || !imgB || !labelEl || !dotsRoot || !destRoot) return;

    var AUTO_MS = 4500;
    var slideIndex = 0;
    var gallery = defaultPreviewGallery;
    var displayName = "Japan";
    var timer = null;
    var frontIsA = true;

    function clearTimer() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    function renderDots() {
      dotsRoot.innerHTML = "";
      gallery.forEach(function (_, i) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "trip-preview-dot" + (i === slideIndex ? " active" : "");
        b.setAttribute("aria-label", "Image " + (i + 1) + " of " + gallery.length);
        b.setAttribute("aria-selected", i === slideIndex ? "true" : "false");
        b.addEventListener("click", function () {
          slideIndex = i;
          showCurrentSlide(true);
          startAuto();
        });
        dotsRoot.appendChild(b);
      });
    }

    function showCurrentSlide(fromDotClick) {
      var item = gallery[slideIndex] || gallery[0];
      if (!item) return;
      var front = frontIsA ? imgA : imgB;
      var back = frontIsA ? imgB : imgA;
      back.src = item.src;
      back.alt = item.alt || displayName;
      back.classList.add("visible");
      front.classList.remove("visible");
      frontIsA = !frontIsA;
      labelEl.textContent = displayName;
      if (fromDotClick) renderDots();
      else {
        $$(".trip-preview-dot").forEach(function (d, i) {
          d.classList.toggle("active", i === slideIndex);
          d.setAttribute("aria-selected", i === slideIndex ? "true" : "false");
        });
      }
    }

    function advance() {
      if (gallery.length < 2) return;
      slideIndex = (slideIndex + 1) % gallery.length;
        showCurrentSlide(false);
    }

    function startAuto() {
      clearTimer();
      if (gallery.length > 1) timer = setInterval(advance, AUTO_MS);
    }

    function setPreviewDestination(name) {
      clearTimer();
      displayName = name || "Japan";
      gallery = galleryForDestination(name);
      slideIndex = 0;
      var first = gallery[0];
      if (first) {
        imgA.src = first.src;
        imgA.alt = first.alt || displayName;
        imgA.classList.add("visible");
        imgB.classList.remove("visible");
        frontIsA = true;
      }
      labelEl.textContent = displayName;
      renderDots();
      startAuto();
    }

    var defaultDest = (getLocations()[0] || "Tokyo");
    setPreviewDestination(defaultDest);

    var lastFocusedDest = defaultDest;

    destRoot.addEventListener("click", function (e) {
      var chip = e.target.closest(".chip");
      if (!chip) return;
      var name = chip.getAttribute("data-value");
      setTimeout(function () {
        if (chip.classList.contains("active")) {
          lastFocusedDest = name;
          setPreviewDestination(name);
          return;
        }
        if (lastFocusedDest === name) {
          var actives = destRoot.querySelectorAll(".chip.active");
          if (actives.length) {
            lastFocusedDest = actives[actives.length - 1].getAttribute("data-value");
            setPreviewDestination(lastFocusedDest);
          } else {
            lastFocusedDest = null;
            setPreviewDestination(defaultDest);
          }
        }
      }, 0);
    });

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) clearTimer();
      else startAuto();
    });
  }

  function initEstimator() {
    var subBtn = document.getElementById("submit-trip-btn");
    if (subBtn) subBtn.addEventListener("click", function () {
      if (!selectedChips("dest-chips").length) { alert("Please select at least one destination."); return; }
      var inqSpecial = document.getElementById("inq-special");
      var tripPlan = document.getElementById("trip-plan");
      var tripStyle = document.getElementById("trip-style");
      if (inqSpecial && tripPlan && !inqSpecial.value.trim() && tripPlan.value.trim()) {
        inqSpecial.value = tripPlan.value.trim();
      }
      if (tripStyle) {
        var inqMessage = document.getElementById("inq-message");
        if (inqMessage && tripStyle.value && !inqMessage.value.trim()) {
          inqMessage.value = "Preferred trip style: " + tripStyle.value;
        }
      }
      var section = document.getElementById("inquiry-section");
      if (section) section.scrollIntoView({ behavior: "smooth" });
    });
  }

  // === AUTH ===
  function openLogin() { var m = document.getElementById("login-modal"); if (m) m.classList.add("open"); }
  function closeLogin() { var m = document.getElementById("login-modal"); if (m) m.classList.remove("open"); }

  function switchTab(tabName) {
    var tabs = document.querySelectorAll(".login-tab");
    tabs.forEach(function (t) { t.classList.toggle("active", t.getAttribute("data-tab") === tabName); });
    var loginTab = document.getElementById("tab-login");
    var regTab = document.getElementById("tab-register");
    if (loginTab) loginTab.style.display = tabName === "login" ? "" : "none";
    if (regTab) regTab.style.display = tabName === "register" ? "" : "none";
    hideErrors();
  }

  function hideErrors() {
    ["login-error", "register-error", "register-success"].forEach(function (id) {
      var el = document.getElementById(id); if (el) { el.style.display = "none"; el.textContent = ""; }
    });
  }

  function showError(id, msg) { var el = document.getElementById(id); if (el) { el.textContent = msg; el.style.display = ""; } }

  function getUserSession() {
    try { return JSON.parse(sessionStorage.getItem("travelerSession")); } catch (e) { return null; }
  }

  function setUserSession(data) {
    try { sessionStorage.setItem("travelerSession", JSON.stringify(data)); } catch (e) {}
    // Backward-compat cleanup: remove any old persistent session
    try { localStorage.removeItem("travelerSession"); } catch (e2) {}
    updateLoginBtnUI();
    updateReviewUI();
  }

  function clearUserSession() {
    try { sessionStorage.removeItem("travelerSession"); } catch (e) {}
    try { localStorage.removeItem("travelerSession"); } catch (e2) {}
    updateLoginBtnUI();
    updateReviewUI();
  }

  function getTravelerSession() { return getUserSession(); }

  function updateLoginBtnUI() {
    var btn = document.getElementById("header-login-btn");
    var text = document.getElementById("header-login-text");
    if (!btn || !text) return;
    var session = getUserSession();
    if (session) {
      text.textContent = session.name.split(" ")[0];
      btn.classList.add("logged-in");
    } else {
      text.textContent = "Login";
      btn.classList.remove("logged-in");
    }
  }

  function updateReviewUI() {
    var session = getUserSession();
    var writeBtn = document.getElementById("write-review-btn");
    var hint = document.getElementById("review-signin-hint");
    if (session) {
      if (writeBtn) writeBtn.style.display = "";
      if (hint) hint.style.display = "none";
    } else {
      if (writeBtn) writeBtn.style.display = "none";
      if (hint) hint.style.display = "";
    }
  }

  function initAuth() {
    // Ensure old persistent logins don't survive browser restarts
    try { localStorage.removeItem("travelerSession"); } catch (e0) {}

    var closeBtn = document.getElementById("login-close");
    var modal = document.getElementById("login-modal");
    if (closeBtn) closeBtn.addEventListener("click", closeLogin);
    if (modal) modal.addEventListener("click", function (e) { if (e.target === modal) closeLogin(); });

    var tabs = document.querySelectorAll(".login-tab");
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () { switchTab(tab.getAttribute("data-tab")); });
    });

    var switchToReg = document.getElementById("switch-to-register");
    var switchToLog = document.getElementById("switch-to-login");
    if (switchToReg) switchToReg.addEventListener("click", function (e) { e.preventDefault(); switchTab("register"); });
    if (switchToLog) switchToLog.addEventListener("click", function (e) { e.preventDefault(); switchTab("login"); });

    var loginBtn = document.getElementById("login-submit");
    if (loginBtn) loginBtn.addEventListener("click", function () {
      hideErrors();
      var email = document.getElementById("login-email").value.trim();
      var pass = document.getElementById("login-pass").value;
      if (!email || email.indexOf("@") < 1) { showError("login-error", "Please enter a valid email."); return; }
      if (!pass) { showError("login-error", "Please enter your password."); return; }
      loginBtn.disabled = true; loginBtn.textContent = "Logging in...";
      fetch((typeof window.apiUrl === "function" ? window.apiUrl("/api/login") : "/api/login"), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: email, password: pass }) })
        .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, data: d }; }); })
        .then(function (res) {
          if (!res.ok) { showError("login-error", res.data.error || "Login failed."); return; }
          setUserSession({ id: res.data.id, name: res.data.name, email: res.data.email, role: res.data.role, token: res.data.token });
          closeLogin();
          document.getElementById("login-email").value = "";
          document.getElementById("login-pass").value = "";
        })
        .catch(function () { showError("login-error", "Could not connect. Please try again."); })
        .finally(function () { loginBtn.disabled = false; loginBtn.textContent = "Login"; });
    });

    var regBtn = document.getElementById("register-submit");
    if (regBtn) regBtn.addEventListener("click", function () {
      hideErrors();
      var name = document.getElementById("reg-name").value.trim();
      var email = document.getElementById("reg-email").value.trim();
      var pass = document.getElementById("reg-pass").value;
      var pass2 = document.getElementById("reg-pass2").value;
      if (!name) { showError("register-error", "Please enter your name."); return; }
      if (!email || email.indexOf("@") < 1) { showError("register-error", "Please enter a valid email."); return; }
      if (!pass || pass.length < 6) { showError("register-error", "Password must be at least 6 characters."); return; }
      if (pass !== pass2) { showError("register-error", "Passwords do not match."); return; }
      regBtn.disabled = true; regBtn.textContent = "Creating account...";
      fetch((typeof window.apiUrl === "function" ? window.apiUrl("/api/register") : "/api/register"), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: name, email: email, password: pass }) })
        .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, data: d }; }); })
        .then(function (res) {
          if (!res.ok) { showError("register-error", res.data.error || "Registration failed."); return; }
          var suc = document.getElementById("register-success");
          if (res.data.token) {
            setUserSession({ id: res.data.id, name: res.data.name, email: res.data.email, role: res.data.role, token: res.data.token });
            if (suc) { suc.textContent = "Account created! You are signed in."; suc.style.display = ""; }
            setTimeout(function () { closeLogin(); }, 1200);
          } else if (suc) {
            suc.textContent = "Account created! You can now login.";
            suc.style.display = "";
          }
          document.getElementById("reg-name").value = "";
          document.getElementById("reg-email").value = "";
          document.getElementById("reg-pass").value = "";
          document.getElementById("reg-pass2").value = "";
          if (!res.data.token) {
            setTimeout(function () { switchTab("login"); document.getElementById("login-email").value = email; }, 1500);
          }
        })
        .catch(function () { showError("register-error", "Could not connect. Please try again."); })
        .finally(function () { regBtn.disabled = false; regBtn.textContent = "Create Account"; });
    });

    var headerBtn = document.getElementById("header-login-btn");
    if (headerBtn) {
      headerBtn.addEventListener("click", function (e) {
        e.preventDefault();
        var session = getUserSession();
        if (session) {
          if (confirm("Signed in as " + session.name + ". Sign out?")) clearUserSession();
        } else {
          switchTab("login");
          openLogin();
        }
      });
    }

    updateLoginBtnUI();
    updateReviewUI();
  }

  // === REVIEWS ===
  function escReviewText(s) {
    var d = document.createElement("div");
    d.textContent = s == null ? "" : String(s);
    return d.innerHTML;
  }

  function formatReviewDate(iso) {
    if (!iso) return "";
    try {
      return new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
    } catch (e) { return ""; }
  }

  function renderReviewCard(r) {
    var n = r.rating || 0;
    var stars = "";
    for (var i = 0; i < n; i++) stars += "\u2B50";
    var dateStr = formatReviewDate(r.createdAt);
    var meta = [r.country, dateStr].filter(Boolean).join(" \u00B7 ");
    var html = '<div class="testimonial-card fade-up visible">';
    if (r.imageUrl) {
      html += '<div class="testimonial-photo"><img src="' + escReviewText(r.imageUrl) + '" alt="" loading="lazy" decoding="async"></div>';
    }
    html += '<div class="testimonial-stars">' + stars + '</div>';
    html += '<p class="testimonial-text">"' + escReviewText(r.text || "") + '"</p>';
    html += '<div class="testimonial-author"><strong>' + escReviewText(r.name || "Traveler") + '</strong>';
    html += "<span>" + escReviewText(meta) + "</span></div>";
    html += "</div>";
    return html;
  }

  function renderAverageStars(avg) {
    var rounded = Math.min(5, Math.max(0, Math.round(avg)));
    var out = "";
    for (var i = 0; i < 5; i++) out += i < rounded ? "\u2605" : "\u2606";
    return out;
  }

  function loadReviewSummary() {
    fetch((typeof window.apiUrl === "function" ? window.apiUrl("/api/reviews/summary") : "/api/reviews/summary"))
      .then(function (r) { if (!r.ok) return null; return r.json(); })
      .then(function (s) {
        var bar = document.getElementById("review-summary-bar");
        if (!bar || !s || !s.count) return;
        bar.style.display = "";
        var avg = typeof s.averageRating === "number" ? s.averageRating : 0;
        bar.innerHTML = '<span class="review-avg-stars" aria-hidden="true">' + renderAverageStars(avg) + '</span>' +
          '<span class="review-avg-num">' + avg.toFixed(1) + "</span>" +
          '<span class="review-avg-count">out of 5 \u00B7 ' + s.count + " review" + (s.count === 1 ? "" : "s") + "</span>";
      })
      .catch(function () {});
  }

  function loadReviewsFromAPI() {
    fetch((typeof window.apiUrl === "function" ? window.apiUrl("/api/reviews?limit=6") : "/api/reviews?limit=6"))
      .then(function (r) { if (!r.ok) throw new Error(); return r.json(); })
      .then(function (reviews) {
        var grid = document.getElementById("testimonials-grid");
        if (!grid) return;
        if (!reviews || !reviews.length) {
          grid.innerHTML = '<p class="reviews-empty">No reviews yet. Be the first to share your experience!</p>';
          return;
        }
        grid.innerHTML = reviews.map(function (r) { return renderReviewCard(r); }).join("");
      })
      .catch(function () {
        var grid = document.getElementById("testimonials-grid");
        if (grid) grid.innerHTML = '<p class="reviews-empty">Could not load reviews.</p>';
      });
  }

  function initReviews() {
    loadReviewsFromAPI();
    loadReviewSummary();

    var writeBtn = document.getElementById("write-review-btn");
    var formWrap = document.getElementById("review-form-wrap");
    var cancelBtn = document.getElementById("cancel-review");
    var signinLink = document.getElementById("review-signin-link");
    var form = document.getElementById("review-form");
    var ratingInput = document.getElementById("review-rating");
    var starPicks = document.querySelectorAll(".star-pick");

    if (signinLink) signinLink.addEventListener("click", function (e) { e.preventDefault(); openLogin(); });

    if (writeBtn && formWrap) {
      writeBtn.addEventListener("click", function () {
        formWrap.style.display = "";
        writeBtn.style.display = "none";
        formWrap.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    }

    if (cancelBtn && formWrap && writeBtn) {
      cancelBtn.addEventListener("click", function () {
        formWrap.style.display = "none";
        if (getTravelerSession()) writeBtn.style.display = "";
      });
    }

    starPicks.forEach(function (star) {
      star.addEventListener("click", function () {
        var val = parseInt(star.getAttribute("data-val"), 10);
        if (ratingInput) ratingInput.value = val;
        starPicks.forEach(function (s) {
          s.textContent = parseInt(s.getAttribute("data-val"), 10) <= val ? "\u2605" : "\u2606";
          s.classList.toggle("active", parseInt(s.getAttribute("data-val"), 10) <= val);
        });
      });
      star.addEventListener("mouseenter", function () {
        var val = parseInt(star.getAttribute("data-val"), 10);
        starPicks.forEach(function (s) {
          s.textContent = parseInt(s.getAttribute("data-val"), 10) <= val ? "\u2605" : "\u2606";
        });
      });
    });

    var starsContainer = document.getElementById("star-rating-input");
    if (starsContainer) {
      starsContainer.addEventListener("mouseleave", function () {
        var cur = parseInt(ratingInput.value, 10) || 0;
        starPicks.forEach(function (s) {
          s.textContent = parseInt(s.getAttribute("data-val"), 10) <= cur ? "\u2605" : "\u2606";
        });
      });
    }

    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var session = getTravelerSession();
        if (!session) { alert("Please sign in first."); openLogin(); return; }
        if (!session.token) { alert("Please sign out and sign in again to refresh your session."); openLogin(); return; }
        var rating = parseInt(ratingInput.value, 10);
        if (!rating || rating < 1) { alert("Please select a star rating."); return; }
        var country = document.getElementById("review-country").value.trim();
        if (!country) { alert("Please enter your country."); return; }
        var text = document.getElementById("review-text").value.trim();
        if (!text || text.length < 10) { alert("Please write at least 10 characters for your review."); return; }

        var submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Submitting..."; }

        var fd = new FormData();
        fd.append("country", country);
        fd.append("rating", String(rating));
        fd.append("text", text);
        var imgInput = document.getElementById("review-image");
        if (imgInput && imgInput.files && imgInput.files[0]) fd.append("image", imgInput.files[0]);

        fetch((typeof window.apiUrl === "function" ? window.apiUrl("/api/reviews") : "/api/reviews"), {
          method: "POST",
          headers: { Authorization: "Bearer " + session.token },
          body: fd
        }).then(function (r) {
          if (r.status === 401) throw new Error("auth");
          if (!r.ok) throw new Error("Failed");
          return r.json();
        }).then(function (review) {
          form.reset();
          ratingInput.value = "0";
          starPicks.forEach(function (s) { s.textContent = "\u2606"; s.classList.remove("active"); });
          if (formWrap) formWrap.style.display = "none";
          if (writeBtn) writeBtn.style.display = "";
          loadReviewsFromAPI();
          loadReviewSummary();
          if (review.approved === false) {
            alert("Thank you! Your review was submitted and is awaiting moderation.");
          } else {
            alert("Thank you for your review!");
          }
        }).catch(function (err) {
          if (err && err.message === "auth") {
            alert("Your session expired. Please sign in again.");
            clearUserSession();
            openLogin();
          } else {
            alert("Could not submit your review. Please try again.");
          }
        }).finally(function () {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = "Submit Review"; }
        });
      });
    }

    updateReviewUI();
  }

  function initAI() {}

  // === CHAT ===
  function openChat() { var p = document.getElementById("ai-chat-panel"); var f = document.getElementById("chat-fab"); if (p) p.classList.add("open"); if (f) f.classList.add("hidden"); }
  function closeChat() { var p = document.getElementById("ai-chat-panel"); var f = document.getElementById("chat-fab"); if (p) p.classList.remove("open"); if (f) f.classList.remove("hidden"); }

  function addChatMsg(text, who) {
    var body = document.getElementById("chat-body"); if (!body) return;
    var msg = el("div", "chat-msg " + who, text);
    body.appendChild(msg); body.scrollTop = body.scrollHeight;
  }

  function initChat() {
    var fab = document.getElementById("chat-fab");
    var closeBtn = document.getElementById("chat-close");
    var sendBtn = document.getElementById("chat-send");
    var input = document.getElementById("chat-input");
    if (fab) fab.addEventListener("click", openChat);
    if (closeBtn) closeBtn.addEventListener("click", closeChat);
    function sendMessage() {
      var text = input ? input.value.trim() : ""; if (!text) return;
      addChatMsg(text, "user"); input.value = "";
      setTimeout(function () { addChatMsg(aiResponses[Math.floor(Math.random() * aiResponses.length)], "bot"); }, 600 + Math.random() * 800);
    }
    if (sendBtn) sendBtn.addEventListener("click", sendMessage);
    if (input) input.addEventListener("keydown", function (e) { if (e.key === "Enter") sendMessage(); });
  }

  // === SCROLL REVEAL ===
  function initScrollReveal() {
    var items = $$(".fade-up"); if (!items.length) return;
    if (!("IntersectionObserver" in window)) { items.forEach(function (el) { el.classList.add("visible"); }); return; }
    var obs = new IntersectionObserver(function (entries) { entries.forEach(function (entry) { if (entry.isIntersecting) { entry.target.classList.add("visible"); obs.unobserve(entry.target); } }); }, { threshold: 0.12 });
    items.forEach(function (el) { obs.observe(el); });
  }

  // === PACKAGE CARDS: details page + Book Now ===
  function initPackageNavigation() {
    $$(".pkg-card").forEach(function (card) {
      function openDetails() {
        var slug = card.getAttribute("data-pkg-slug");
        if (!slug) return;
        window.location.href = "/package/" + encodeURIComponent(slug);
      }
      card.addEventListener("click", function (e) {
        if (e.target.closest(".pkg-select-label")) return;
        if (e.target.closest(".pkg-book-btn")) return;
        openDetails();
      });
      card.addEventListener("keydown", function (e) {
        if (e.key !== "Enter" && e.key !== " ") return;
        if (e.target.closest && (e.target.closest(".pkg-select-label") || e.target.closest(".pkg-book-btn"))) return;
        if (e.target.classList && e.target.classList.contains("pkg-radio")) return;
        e.preventDefault();
        openDetails();
      });
    });
    $$(".pkg-book-btn").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var pkgId = btn.getAttribute("data-package-id");
        var card = btn.closest(".pkg-card");
        if (!pkgId && card) pkgId = card.getAttribute("data-pkg-id");
        if (pkgId) {
          var safeId = String(pkgId).replace(/"/g, "");
          var rb = document.querySelector('.pkg-radio[value="' + safeId + '"]');
          if (rb) {
            rb.checked = true;
            syncSelectedPackages();
          }
        }
        var section = document.getElementById("inquiry-section");
        if (section) section.scrollIntoView({ behavior: "smooth" });
        try { history.replaceState(null, "", "#inquiry-section"); } catch (x) { location.hash = "inquiry-section"; }
      });
    });
  }

  function applyPreselectPackage() {
    var pre = null;
    try { pre = sessionStorage.getItem("preselectPackageId"); } catch (x) { return; }
    if (!pre) return;
    try { sessionStorage.removeItem("preselectPackageId"); } catch (x) {}
    var rb = document.querySelector('.pkg-radio[value="' + pre.replace(/"/g, "") + '"]');
    if (rb) {
      rb.checked = true;
      syncSelectedPackages();
    }
    if (window.location.hash === "#inquiry-section") {
      setTimeout(function () {
        var section = document.getElementById("inquiry-section");
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }, 120);
    }
  }

  // === NEWSLETTER ===
  function initNewsletter() {
    var btn = document.getElementById("nl-btn");
    var input = document.getElementById("nl-email");
    if (btn && input) {
      btn.addEventListener("click", function () {
        if (input.value.trim() && input.value.includes("@")) {
          alert("Subscribed! \uD83C\uDF89 You'll receive the latest Japan travel updates.");
          input.value = "";
        } else {
          alert("Please enter a valid email address.");
        }
      });
    }
  }

  /** Compact hamburger menu: close on outside click / Escape; keep aria-expanded in sync with .active */
  function initMobileNavDropdown() {
    if (initMobileNavDropdown._done) return;
    var root = document.querySelector(".top-menu.toc .mobile-nav-dropdown");
    if (!root) return;
    initMobileNavDropdown._done = true;
    var panel = root.querySelector(".menu-wrapper");
    var trigger = root.querySelector(".menu-trigger");
    function syncAria() {
      if (trigger && panel) trigger.setAttribute("aria-expanded", panel.classList.contains("active") ? "true" : "false");
    }
    root.addEventListener("click", function () {
      requestAnimationFrame(syncAria);
    });
    document.addEventListener("click", function (e) {
      if (!panel || !panel.classList.contains("active")) return;
      if (root.contains(e.target)) return;
      panel.classList.remove("active");
      syncAria();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      if (!panel || !panel.classList.contains("active")) return;
      panel.classList.remove("active");
      syncAria();
      if (trigger) trigger.focus();
    });
    if (trigger) {
      trigger.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          trigger.click();
        }
      });
    }
    var closeBtn = root.querySelector(".menu-wrapper .close");
    if (closeBtn) {
      closeBtn.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          closeBtn.click();
        }
      });
    }
  }

  // === INIT ===
  function boot() {
    mount();
    initMobileNavDropdown();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
