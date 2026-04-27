#!/bin/bash
# Render build script for nijoTravel (nijotours.com)
# Bundles the static frontend into the Spring Boot JAR so everything
# is served from a single process on Render.
set -e

echo "==> Copying frontend files into backend static resources..."
mkdir -p backend/src/main/resources/static

# Core HTML pages
cp index.html location.html package.html reviews.html backend/src/main/resources/static/

# Stylesheets, scripts, images
cp travel-redesign.css travel-redesign.js backend/src/main/resources/static/
cp -r admin backend/src/main/resources/static/
cp -r css   backend/src/main/resources/static/
cp -r imgs  backend/src/main/resources/static/
cp -r js    backend/src/main/resources/static/

# Theme assets (fonts + JS used by the public site)
cp -r wp-content/themes backend/src/main/resources/static/wp-content/

echo "==> Building Spring Boot JAR..."
cd backend
mvn package -DskipTests -B

echo "==> Build complete. JAR: backend/target/travel-agency-1.0.0.jar"
