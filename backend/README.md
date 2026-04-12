# Travel Agency Backend

Spring Boot backend for the travel agency website with admin panel, dynamic content, and booking system.

## Tech Stack

- **Spring Boot 3.2** - Web, Data JPA, Security
- **MySQL** - Database
- **Layered Architecture** - Controller, Service, Repository, Entity, DTO

## Setup

### 1. MySQL

Create a database (or let the app create it):

```sql
CREATE DATABASE travel_agency;
```

Configuration is environment-driven. Copy `../env.example` and set:

- `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, `SPRING_DATASOURCE_PASSWORD`
- `JWT_SECRET` (at least 32 characters)
- `ADMIN_SEED_EMAIL`, `ADMIN_SEED_PASSWORD` (first admin user when the DB is empty)

You can still edit `src/main/resources/application.properties` for local defaults.

### 2. Run the Application

From the `backend` directory:

```bash
mvnw.cmd spring-boot:run
```

Or with Maven installed: `mvn spring-boot:run`

The server starts at **http://localhost:8080**

### 3. Admin login

Use the credentials from `ADMIN_SEED_EMAIL` / `ADMIN_SEED_PASSWORD`. If unset, defaults are `admin@travel.com` / `admin123` (change immediately for production).

## API Endpoints

### Public APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/hero | Active hero slides |
| GET | /api/locations | All locations |
| GET | /api/packages | All packages |
| GET | /api/packages/{id} | Package by ID |
| POST | /api/bookings | Create booking request |

### Admin APIs (require authentication)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /admin/dashboard/stats | Dashboard statistics |
| GET | /admin/hero | All hero slides |
| POST | /admin/hero | Create hero slide |
| PUT | /admin/hero/{id} | Update hero slide |
| DELETE | /admin/hero/{id} | Delete hero slide |
| GET | /admin/locations | All locations |
| POST | /admin/locations | Create location |
| PUT | /admin/locations/{id} | Update location |
| DELETE | /admin/locations/{id} | Delete location |
| GET | /admin/packages | All packages |
| POST | /admin/packages | Create package |
| PUT | /admin/packages/{id} | Update package |
| DELETE | /admin/packages/{id} | Delete package |
| GET | /admin/bookings | All bookings |

## Admin Panel Routes

- `/admin/login` - Admin login
- `/admin/dashboard` - Dashboard with stats
- `/admin/hero` - Hero slides management
- `/admin/locations` - Locations management
- `/admin/packages` - Packages management
- `/admin/bookings` - View booking requests

## Project Structure

```
backend/
├── src/main/java/com/nijro/travel/
│   ├── config/          # Security, Web, DataInitializer
│   ├── controller/      # ApiController, AdminController, PageController
│   ├── dto/             # DTOs
│   ├── entity/          # JPA entities (domain model)
│   ├── exception/       # GlobalExceptionHandler
│   ├── filter/          # VisitorTrackingFilter
│   ├── repository/      # JPA repositories
│   ├── security/        # CustomUserDetailsService
│   └── service/         # Business logic
└── src/main/resources/
    └── application.properties
```

## Running with Frontend

Run the backend from the `backend` folder. The app serves the frontend from the parent directory (`main-page-only/`). Ensure the working directory when running is `backend/` so that `file:../` resolves to the frontend folder.

## Troubleshooting

**`Access denied for user 'root'@'localhost' (using password: NO)`** — The app was connecting with an empty password. Set `SPRING_DATASOURCE_PASSWORD` to your MySQL root password, or edit the default in `application.properties` (local dev default is often `1234`).

**`Access denied ... (using password: YES)`** — The password in config does not match MySQL. Update `SPRING_DATASOURCE_PASSWORD` or MySQL user credentials.

**MySQL not running** — Start the MySQL service (Windows: Services app, or XAMPP/WAMP control panel).
