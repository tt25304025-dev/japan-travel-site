# Travel Agency Website

A dynamic travel agency platform with admin panel, hero slider, packages, locations, and booking system.

## Contents
- `index.html` - Main page
- `js/config.js` - Optional API base URL for split hosting (`window.__APP_CONFIG__`)
- `travel-redesign.js` - Dynamic content (packages, trip builder, etc.)
- `travel-redesign.css` - Styles
- `js/api-integration.js` - API integration for dynamic data
- `admin/` - Admin panel (login, dashboard, hero, locations, packages, bookings)
- `backend/` - Spring Boot REST API
- `imgs/` - Placeholders (e.g. `1x1.png` for lazy loading)
- `wp-content/themes/toc/` - Theme JS (`functions.min.js`) and fonts
- `env.example` - Environment variables for production (copy to `.env` or set in hosting)

## Quick Start (Static Mode)
1. Open `index.html` in a browser or serve this folder with any static server
2. Content uses built-in static data

## Full Backend Mode

1. **MySQL**: Create database `travel_agency` (or let the app create it)
2. **Configure**: Set `SPRING_DATASOURCE_PASSWORD`, `JWT_SECRET`, and `ADMIN_SEED_PASSWORD` (see `env.example`). Defaults in `application.properties` are for local dev only.
3. **Run backend** (from `backend/`): `mvnw.cmd spring-boot:run` (Windows) or `./mvnw spring-boot:run` (Mac/Linux)
4. **Open**: http://localhost:8080
5. **Admin**: http://localhost:8080/admin/login — use `ADMIN_SEED_EMAIL` / `ADMIN_SEED_PASSWORD` (defaults: `nijojapan@gmail.com` / `nijo@123` if unset)

When the backend runs, the frontend fetches hero slides, packages, locations from the API and submits bookings to `POST /api/bookings`. See `backend/README.md` and `DEPLOYMENT_NOTES.txt` for production details.
