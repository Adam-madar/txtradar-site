// radar.js — a small self-contained animated radar dial used as the TextRadar
// logo/hero across the popup, options header, and viewer empty state.
// Radar.mount(containerEl, { size, calm }) — green sweep + pulse + dots that
// ping in the category colors. Dark disc backdrop so it looks right on any theme.
(function () {
  "use strict";
  var NS = "http://www.w3.org/2000/svg";
  var COLORS = ["#5aa6ff", "#ef9f27", "#e24b4a", "#4cd07d", "#9b6cf0", "#d4e029", "#2bb6c4", "#f06ec0"];
  var styled = false;

  function injectStyle() {
    if (styled) return; styled = true;
    var s = document.createElement("style");
    s.textContent =
      ".trRadar{position:relative;display:inline-block;overflow:hidden;border-radius:50%;" +
      "background:radial-gradient(circle at 50% 45%,#16241d,#0a0d12 72%);border:1px solid rgba(110,240,150,0.18)}" +
      ".trRadar .trSweep{position:absolute;inset:0;border-radius:50%;" +
      "background:conic-gradient(from 0deg,rgba(110,240,150,0.32),rgba(110,240,150,0) 62deg,rgba(110,240,150,0) 360deg);animation:trspin 8s linear infinite}" +
      ".trRadar .trPulse{position:absolute;inset:0;border-radius:50%;border:1.5px solid rgba(110,240,150,0.38);animation:trpulse 6s ease-out infinite}" +
      ".trRadar .trCore{position:absolute;left:50%;top:50%;border-radius:50%;background:#7dffb0;box-shadow:0 0 10px #7dffb0}" +
      "@keyframes trspin{to{transform:rotate(360deg)}}" +
      "@keyframes trpulse{0%{transform:scale(0.14);opacity:0.55}100%{transform:scale(1);opacity:0}}" +
      "@media (prefers-reduced-motion: reduce){.trRadar .trSweep,.trRadar .trPulse{animation:none}}";
    document.head.appendChild(s);
  }

  function mount(container, opts) {
    if (!container) return;
    opts = opts || {};
    var size = opts.size || 120;
    var calm = opts.calm !== false;
    injectStyle();
    container.className = (container.className || "").replace(/\btrRadar\b/g, "").trim() + " trRadar";
    container.innerHTML = "";
    container.style.width = size + "px";
    container.style.height = size + "px";
    var c = size / 2;

    var svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", "0 0 " + size + " " + size);
    svg.setAttribute("width", size); svg.setAttribute("height", size);
    svg.style.position = "absolute"; svg.style.inset = "0";

    var grid = document.createElementNS(NS, "g");
    grid.setAttribute("fill", "none");
    grid.setAttribute("stroke", "rgba(105,220,150,0.18)");
    grid.setAttribute("stroke-width", Math.max(0.6, size * 0.006));
    [0.84, 0.6, 0.37, 0.14].forEach(function (f) {
      var circ = document.createElementNS(NS, "circle");
      circ.setAttribute("cx", c); circ.setAttribute("cy", c); circ.setAttribute("r", c * f);
      grid.appendChild(circ);
    });
    [0, 45, 90, 135].forEach(function (deg) {
      var rad = deg * Math.PI / 180, dx = Math.cos(rad) * c * 0.86, dy = Math.sin(rad) * c * 0.86;
      var ln = document.createElementNS(NS, "line");
      ln.setAttribute("x1", c - dx); ln.setAttribute("y1", c - dy);
      ln.setAttribute("x2", c + dx); ln.setAttribute("y2", c + dy);
      grid.appendChild(ln);
    });
    svg.appendChild(grid);

    var dotsG = document.createElementNS(NS, "g"); svg.appendChild(dotsG);
    var dots = [], dotR = Math.max(1.3, size * 0.018);
    [0.37, 0.6, 0.84].forEach(function (f) {
      for (var a = 0; a < 360; a += 45) {
        var r = a * Math.PI / 180;
        var d = document.createElementNS(NS, "circle");
        d.setAttribute("cx", c + c * f * Math.cos(r)); d.setAttribute("cy", c + c * f * Math.sin(r));
        d.setAttribute("r", dotR); d.setAttribute("fill", "rgba(125,170,150,0.28)");
        dotsG.appendChild(d); dots.push(d);
      }
    });
    container.appendChild(svg);

    var sweep = document.createElement("div"); sweep.className = "trSweep";
    if (!calm) sweep.style.animationDuration = "4s";
    container.appendChild(sweep);

    var p1 = document.createElement("div"); p1.className = "trPulse";
    var p2 = document.createElement("div"); p2.className = "trPulse"; p2.style.animationDelay = "3s";
    if (!calm) { p1.style.animationDuration = "3.5s"; p2.style.animationDuration = "3.5s"; }
    container.appendChild(p1); container.appendChild(p2);

    var core = document.createElement("div"); core.className = "trCore";
    var cs = Math.max(4, size * 0.045);
    core.style.width = cs + "px"; core.style.height = cs + "px"; core.style.margin = (-cs / 2) + "px";
    container.appendChild(core);

    var minGap = calm ? 1300 : 350, maxGap = calm ? 3000 : 1100;
    var glow = Math.max(4, size * 0.05);
    function ping() {
      if (dots.length) {
        var d = dots[Math.floor(Math.random() * dots.length)];
        var col = COLORS[Math.floor(Math.random() * COLORS.length)];
        d.setAttribute("fill", col); d.setAttribute("r", dotR * 1.9);
        d.style.filter = "drop-shadow(0 0 " + glow + "px " + col + ")";
        (function (el) {
          setTimeout(function () {
            el.style.transition = "fill 1.4s ease, r 1.4s ease";
            el.setAttribute("fill", "rgba(125,170,150,0.28)"); el.setAttribute("r", dotR); el.style.filter = "none";
            setTimeout(function () { el.style.transition = ""; }, 1400);
          }, 90);
        })(d);
      }
      setTimeout(ping, minGap + Math.random() * (maxGap - minGap));
    }
    setTimeout(ping, 700);
  }

  globalThis.Radar = { mount: mount };
})();
