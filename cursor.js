/*
  Azarian Growth Agency — shared square cursor (single source of truth).

  Auto-mounts on any page that loads this script. Theme switches via nearest
  ancestor with data-cursor-theme="dark|light" (same as Home).

  Usage:
    <script src="./cursor.js"></script>
    <!-- tag sections so the cursor colour adapts -->
    <section data-cursor-theme="dark">…</section>
    <section data-cursor-theme="light">…</section>

  Interactive snap targets (corners expand to element bounds):
    a[href], button, .agn-btn, [data-magnetic], [data-tilt], [data-deck-card], …

  API:
    AzarianCursor.mount(opts?)
    AzarianCursor.destroy()
*/
(function () {
  "use strict";
  if (window.AzarianCursor) return;

  var STYLE_ID = "agn-cursor-styles";
  var CS = 12;
  var BW = 3;
  var COL_DARK = "#1FC9A0";
  var COL_LIGHT = "#0B1B38";
  var COL_TARGET = "#1BFED1";
  var SELECTOR =
    'a[href],button,[role="button"],.agn-btn,[data-magnetic],[data-tilt],[data-deck-card],' +
    'input[type="submit"],input[type="button"],summary,.agn-trigger,[data-nav-cta],[data-nav-search],.agn-burger';

  var state = null;

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    var style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = [
      "html.agn-cursor-on,html.agn-cursor-on *{cursor:none !important;}",
      "@media(hover:none),(pointer:coarse){",
        "html.agn-cursor-on,html.agn-cursor-on *{cursor:auto !important;}",
        ".agn-cursor{display:none !important;}",
      "}",
    ].join("");
    (document.head || document.documentElement).appendChild(style);
  }

  function isTouchNarrow() {
    var touch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    return touch && window.innerWidth <= 768;
  }

  function themeUnder(el) {
    var n = el;
    while (n && n.nodeType === 1) {
      var t = n.getAttribute && n.getAttribute("data-cursor-theme");
      if (t) return t;
      n = n.parentElement;
    }
    return "dark";
  }

  function destroy() {
    if (!state) return;
    cancelAnimationFrame(state.raf);
    window.removeEventListener("mousemove", state.onMove);
    window.removeEventListener("mouseover", state.onOver);
    window.removeEventListener("mouseout", state.onOut);
    window.removeEventListener("mousedown", state.onDown);
    window.removeEventListener("mouseup", state.onUp);
    document.documentElement.classList.remove("agn-cursor-on");
    if (state.wrap && state.wrap.parentNode) state.wrap.parentNode.removeChild(state.wrap);
    state = null;
  }

  function mount(/* opts */) {
    injectStyles();
    if (isTouchNarrow()) {
      destroy();
      return null;
    }
    if (state) return state;

    var wrap = document.createElement("div");
    wrap.className = "agn-cursor";
    wrap.setAttribute("aria-hidden", "true");
    Object.assign(wrap.style, {
      position: "fixed",
      left: "0",
      top: "0",
      width: "0",
      height: "0",
      pointerEvents: "none",
      zIndex: "2147482000",
      willChange: "transform",
    });

    var dot = document.createElement("div");
    Object.assign(dot.style, {
      position: "absolute",
      left: "50%",
      top: "50%",
      width: "5px",
      height: "5px",
      borderRadius: "50%",
      background: COL_DARK,
      transform: "translate(-50%,-50%)",
      transition: "background-color .25s ease",
      willChange: "transform",
    });
    wrap.appendChild(dot);

    var removes = [
      ["borderRight", "borderBottom"],
      ["borderLeft", "borderBottom"],
      ["borderLeft", "borderTop"],
      ["borderRight", "borderTop"],
    ];
    var defaults = [
      [-18, -18],
      [6, -18],
      [6, 6],
      [-18, 6],
    ];
    var corners = [];
    for (var i = 0; i < 4; i++) {
      var c = document.createElement("div");
      Object.assign(c.style, {
        position: "absolute",
        left: "50%",
        top: "50%",
        width: CS + "px",
        height: CS + "px",
        border: "2.5px solid " + COL_DARK,
        transition: "border-color .25s ease",
        willChange: "transform",
      });
      removes[i].forEach(function (r) {
        c.style[r] = "none";
      });
      c._cur = { x: defaults[i][0], y: defaults[i][1] };
      c._def = defaults[i];
      corners.push(c);
      wrap.appendChild(c);
    }

    var host = document.body || document.documentElement;
    host.appendChild(wrap);
    document.documentElement.classList.add("agn-cursor-on");

    var mx = window.innerWidth / 2;
    var my = window.innerHeight / 2;
    var px = mx;
    var py = my;
    var rot = 0;
    var active = null;
    var down = false;
    var curColor = COL_DARK;
    var spinPerFrame = 360 / (2.6 * 60);
    var rafId = 0;
    var lastThemeSample = 0;

    function setColor(col) {
      if (col === curColor) return;
      curColor = col;
      corners.forEach(function (corner) {
        corner.style.borderColor = col;
      });
      dot.style.background = col;
    }

    function sampleTheme() {
      var under = document.elementFromPoint(mx, my);
      setColor(under && themeUnder(under) === "light" ? COL_LIGHT : COL_DARK);
    }

    function onMove(e) {
      mx = e.clientX;
      my = e.clientY;
      // elementFromPoint is expensive over WebGL/composited heroes — throttle.
      if (!active) {
        var now = performance.now();
        if (now - lastThemeSample > 120) {
          lastThemeSample = now;
          sampleTheme();
        }
      }
    }

    function onOver(e) {
      var n = e.target;
      while (n && n.nodeType === 1) {
        if (n.matches && n.matches(SELECTOR)) break;
        n = n.parentElement;
      }
      var t = n && n.matches && n.matches(SELECTOR) ? n : null;
      if (t) {
        active = t;
        setColor(COL_TARGET);
      }
    }

    function onOut(e) {
      if (
        active &&
        (e.target === active || (active.contains && !active.contains(e.relatedTarget)))
      ) {
        active = null;
      }
    }

    function onDown() {
      down = true;
    }
    function onUp() {
      down = false;
    }

    function raf() {
      px += (mx - px) * 0.2;
      py += (my - py) * 0.2;
      if (active && !document.body.contains(active)) active = null;
      var desired;
      if (active) {
        var r = active.getBoundingClientRect();
        desired = [
          [r.left - BW - px, r.top - BW - py],
          [r.right + BW - CS - px, r.top - BW - py],
          [r.right + BW - CS - px, r.bottom + BW - CS - py],
          [r.left - BW - px, r.bottom + BW - CS - py],
        ];
      } else {
        rot = (rot + spinPerFrame) % 360;
        desired = corners.map(function (corner) {
          return corner._def;
        });
      }
      var scale = down ? 0.82 : 1;
      wrap.style.transform =
        "translate(" +
        px +
        "px," +
        py +
        "px) rotate(" +
        (active ? 0 : rot) +
        "deg) scale(" +
        scale +
        ")";
      corners.forEach(function (corner, idx) {
        var s = active ? 0.28 : 0.32;
        corner._cur.x += (desired[idx][0] - corner._cur.x) * s;
        corner._cur.y += (desired[idx][1] - corner._cur.y) * s;
        corner.style.transform =
          "translate(" + corner._cur.x + "px," + corner._cur.y + "px)";
      });
      rafId = requestAnimationFrame(raf);
      if (state) state.raf = rafId;
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mouseout", onOut, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    rafId = requestAnimationFrame(raf);

    state = {
      wrap: wrap,
      raf: rafId,
      onMove: onMove,
      onOver: onOver,
      onOut: onOut,
      onDown: onDown,
      onUp: onUp,
    };
    return state;
  }

  function boot() {
    if (!document.body) return;
    mount();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
  // dc-runtime / deferred mounts
  setTimeout(boot, 0);
  setTimeout(boot, 400);

  window.AzarianCursor = {
    mount: mount,
    destroy: destroy,
  };
})();
