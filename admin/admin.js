(function () {
  var cfg = window.__APP_CONFIG__ || {};
  var base = (cfg.adminApiBase || cfg.apiBase || "").replace(/\/$/, "");
  var API = base ? base + "/admin/api" : "/admin/api";

  function apiFetch(url, options) {
    options = options || {};
    return fetch(API + url, Object.assign({ credentials: "include" }, options));
  }

  function showError(msg) {
    alert(msg || "An error occurred");
  }

  window.apiFetch = apiFetch;
  window.showError = showError;
})();
