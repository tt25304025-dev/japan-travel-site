/**
 * Production: set before other scripts (optional).
 * Example when the API is on another host:
 *   window.__APP_CONFIG__ = { apiBase: 'https://api.yourdomain.com', adminApiBase: 'https://api.yourdomain.com' };
 * Leave empty when the site and API share the same origin (typical Spring Boot setup).
 */
(function () {
  window.__APP_CONFIG__ = window.__APP_CONFIG__ || {};
  if (typeof window.__APP_CONFIG__.apiBase === "undefined") {
    window.__APP_CONFIG__.apiBase = "";
  }
  if (typeof window.__APP_CONFIG__.adminApiBase === "undefined") {
    window.__APP_CONFIG__.adminApiBase = "";
  }

  window.apiUrl = function (path) {
    if (!path.startsWith("/")) path = "/" + path;
    var base = (window.__APP_CONFIG__.apiBase || "").replace(/\/$/, "");
    return base ? base + path : path;
  };

  window.adminApiUrl = function (path) {
    if (!path.startsWith("/")) path = "/" + path;
    var cfg = window.__APP_CONFIG__ || {};
    var base = (cfg.adminApiBase || cfg.apiBase || "").replace(/\/$/, "");
    return base ? base + path : path;
  };
})();
