(function () {
  "use strict";

  var seasonUrl = typeof window.apiUrl === "function" ? window.apiUrl("/api/settings/season") : "/api/settings/season";
  fetch(seasonUrl).then(function (r) {
    if (!r.ok) throw new Error();
    return r.json();
  }).then(function (d) {
    var season = d.season || "none";
    if (season === "none") return;
    startEffect(season);
  }).catch(function () {});

  function startEffect(season) {
    var canvas = document.createElement("canvas");
    canvas.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;z-index:2;pointer-events:none;";
    document.body.insertBefore(canvas, document.body.firstChild);
    var ctx = canvas.getContext("2d");
    var W, H, particles = [];

    function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
    resize();
    window.addEventListener("resize", resize);

    var config = {
      spring: { count: 35, colors: ["#ffb7c5","#ff92a5","#ffd1dc","#fff0f3","#e8a0b4"], sizeMin: 6, sizeMax: 14, speedMin: 0.4, speedMax: 1.2, drift: 1.2, spin: true },
      summer: { count: 40, colors: ["#ffe066","#ffdd44","#fff7cc","#ffd700","#fffbe6"], sizeMin: 2, sizeMax: 5, speedMin: 0.2, speedMax: 0.6, drift: 0.3, spin: false },
      autumn: { count: 30, colors: ["#d4690e","#c0392b","#e67e22","#b8451c","#f39c12"], sizeMin: 8, sizeMax: 16, speedMin: 0.5, speedMax: 1.4, drift: 1.5, spin: true },
      winter: { count: 50, colors: ["#fff","#e8f0fe","#d6e4f0","#cfe2f3","#f0f8ff"], sizeMin: 2, sizeMax: 7, speedMin: 0.3, speedMax: 1.0, drift: 0.8, spin: false }
    };
    var c = config[season];
    if (!c) return;

    for (var i = 0; i < c.count; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H - H,
        size: c.sizeMin + Math.random() * (c.sizeMax - c.sizeMin),
        speed: c.speedMin + Math.random() * (c.speedMax - c.speedMin),
        wind: (Math.random() - 0.5) * c.drift,
        color: c.colors[Math.floor(Math.random() * c.colors.length)],
        angle: Math.random() * Math.PI * 2,
        spin: c.spin ? (Math.random() - 0.5) * 0.04 : 0,
        opacity: 0.3 + Math.random() * 0.5,
        wobble: Math.random() * Math.PI * 2
      });
    }

    function drawSpring(p) {
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.angle); ctx.globalAlpha = p.opacity; ctx.fillStyle = p.color;
      for (var j = 0; j < 5; j++) { ctx.beginPath(); ctx.ellipse(0, -p.size * 0.4, p.size * 0.3, p.size * 0.5, (j * Math.PI * 2) / 5, 0, Math.PI * 2); ctx.fill(); }
      ctx.restore();
    }
    function drawSummer(p) {
      ctx.save(); ctx.globalAlpha = p.opacity * (0.5 + 0.5 * Math.sin(p.wobble)); ctx.fillStyle = p.color; ctx.shadowColor = p.color; ctx.shadowBlur = p.size * 3;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    }
    function drawAutumn(p) {
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.angle); ctx.globalAlpha = p.opacity; ctx.fillStyle = p.color;
      ctx.beginPath(); ctx.moveTo(0, -p.size); ctx.quadraticCurveTo(p.size * 0.8, -p.size * 0.3, p.size * 0.5, p.size * 0.5);
      ctx.quadraticCurveTo(0, p.size * 0.3, 0, p.size * 0.6); ctx.quadraticCurveTo(0, p.size * 0.3, -p.size * 0.5, p.size * 0.5);
      ctx.quadraticCurveTo(-p.size * 0.8, -p.size * 0.3, 0, -p.size); ctx.fill();
      ctx.strokeStyle = "rgba(0,0,0,.1)"; ctx.lineWidth = 0.5; ctx.beginPath(); ctx.moveTo(0, -p.size); ctx.lineTo(0, p.size * 0.6); ctx.stroke();
      ctx.restore();
    }
    function drawWinter(p) {
      ctx.save(); ctx.globalAlpha = p.opacity; ctx.fillStyle = p.color;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    }

    var drawFn = { spring: drawSpring, summer: drawSummer, autumn: drawAutumn, winter: drawWinter }[season];

    function animate() {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.y += p.speed; p.x += p.wind + Math.sin(p.wobble) * 0.3; p.wobble += 0.01 + Math.random() * 0.01; p.angle += p.spin;
        if (p.y > H + p.size * 2) { p.y = -p.size * 2; p.x = Math.random() * W; }
        if (p.x > W + p.size * 2) p.x = -p.size * 2;
        if (p.x < -p.size * 2) p.x = W + p.size * 2;
        drawFn(p);
      }
      requestAnimationFrame(animate);
    }
    animate();
  }
})();
