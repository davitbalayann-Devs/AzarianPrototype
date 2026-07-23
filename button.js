/*
  Azarian Growth Agency — shared Button component (single source of truth).

  Variants:
    .agn-btn              → filled teal primary (hero CTA)
    .agn-btn--ghost       → transparent / glass secondary

  Usage in markup:
    <a href="#cta" class="agn-btn" data-magnetic>Start a Conversation</a>
    <a href="#os" class="agn-btn agn-btn--ghost" data-magnetic>See how it works</a>
    <button type="submit" class="agn-btn" data-magnetic>Start the Conversation</button>

  Or via API:
    AzarianButton.create({ href:'#cta', label:'Start a Conversation', variant:'primary' })
    AzarianButton.create({ href:'#x', label:'Ghost', variant:'ghost', html:'…' })
    AzarianButton.bindMagnetic(root)  // wires [data-magnetic] hover tilt
*/
(function () {
  "use strict";
  if (window.AzarianButton) return;

  var STYLE_ID = "agn-btn-styles";

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    var css = [
      ".agn-btn{",
        "display:inline-flex;align-items:center;justify-content:center;gap:10px;",
        "box-sizing:border-box;appearance:none;border:none;cursor:pointer;",
        "font-family:'Poppins',system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;",
        "font-weight:600;font-size:16px;line-height:1;padding:16px 24px;",
        "border-radius:999px;text-decoration:none;white-space:nowrap;flex-shrink:0;",
        /* Brand fill is fixed — do not use page --accent (Home #1BFED1 vs About #1FC9A0). */
        "background:#1BFED1;color:#063B6D;",
        "box-shadow:0 12px 34px -10px rgba(31,201,160,.6);",
        "transition:transform .3s cubic-bezier(.16,.84,.44,1),box-shadow .3s ease,background .3s ease,border-color .3s ease,color .3s ease,opacity .3s ease;",
      "}",
      ".agn-btn:hover{box-shadow:0 20px 46px -12px rgba(31,201,160,.85);}",
      ".agn-btn:disabled,.agn-btn[aria-disabled='true']{opacity:.55;cursor:not-allowed;pointer-events:none;}",
      ".agn-btn svg{flex-shrink:0;}",

      /* Ghost / transparent */
      ".agn-btn--ghost{",
        "background:rgba(255,255,255,.1);color:#fff;",
        "border:1px solid rgba(255,255,255,.12);",
        "box-shadow:none;",
        "-webkit-backdrop-filter:blur(2.5px);backdrop-filter:blur(2.5px);",
      "}",
      ".agn-btn--ghost:hover{",
        "background:rgba(255,255,255,.16);",
        "border-color:rgba(255,255,255,.22);",
        "box-shadow:none;",
      "}",

      /* Compact — nav bar / denser rows */
      ".agn-btn--sm{height:46px;padding:0 24px;font-size:15px;gap:8px;",
        "box-shadow:0 8px 24px -8px rgba(31,201,160,.55);}",
      ".agn-btn--sm:hover{box-shadow:0 14px 34px -8px rgba(31,201,160,.8);}",
      ".agn-btn--ghost.agn-btn--sm{box-shadow:none;height:auto;min-height:46px;padding:12px 20px;}",

      /* Block / full-width helpers */
      ".agn-btn--block{width:100%;}",

      /* Mobile hero sizing (matches former .hero-cta) */
      "@media(max-width:960px){",
        ".agn-btn{font-size:14px;padding:12px 18px;gap:4px;}",
        ".agn-btn--sm{font-size:14px;height:auto;min-height:34px;padding:8px 12px;}",
      "}",
    ].join("");

    var style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = css;
    document.head.appendChild(style);
  }

  function create(opts) {
    opts = opts || {};
    injectStyles();
    var tag = opts.tag || (opts.href ? "a" : "button");
    var el = document.createElement(tag);
    var variant = opts.variant === "ghost" ? "ghost" : "primary";
    var classes = ["agn-btn"];
    if (variant === "ghost") classes.push("agn-btn--ghost");
    if (opts.size === "sm") classes.push("agn-btn--sm");
    if (opts.block) classes.push("agn-btn--block");
    if (opts.className) classes.push(opts.className);
    el.className = classes.join(" ");

    if (tag === "a") {
      el.href = opts.href || "#";
      if (opts.target) el.target = opts.target;
      if (opts.rel) el.rel = opts.rel;
    } else {
      el.type = opts.type || "button";
      if (opts.disabled) el.disabled = true;
    }

    if (opts.html != null) el.innerHTML = opts.html;
    else el.textContent = opts.label != null ? opts.label : "Button";

    if (opts.magnetic !== false) el.setAttribute("data-magnetic", "true");
    if (opts.attrs) {
      Object.keys(opts.attrs).forEach(function (k) { el.setAttribute(k, opts.attrs[k]); });
    }
    return el;
  }

  function bindMagnetic(root) {
    var scope = root || document;
    var els = scope.querySelectorAll
      ? scope.querySelectorAll("[data-magnetic]")
      : [];
    Array.prototype.forEach.call(els, function (el) {
      if (el.__agnMagneticBound) return;
      el.__agnMagneticBound = true;
      var move = function (ev) {
        var r = el.getBoundingClientRect();
        var dx = (ev.clientX - (r.left + r.width / 2)) * 0.28;
        var dy = (ev.clientY - (r.top + r.height / 2)) * 0.28;
        el.style.transform = "translate(" + dx.toFixed(1) + "px," + dy.toFixed(1) + "px)";
      };
      var reset = function () { el.style.transform = "translate(0,0)"; };
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", reset);
    });
  }

  // Auto-inject styles ASAP; magnetic binds after DOM is ready / on demand.
  if (document.head) injectStyles();
  else document.addEventListener("DOMContentLoaded", injectStyles);

  function bootMagnetic() {
    bindMagnetic(document);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootMagnetic);
  } else {
    bootMagnetic();
  }
  // Re-bind after delayed mounts (nav drawer, dc-runtime).
  setTimeout(bootMagnetic, 0);
  setTimeout(bootMagnetic, 400);

  window.AzarianButton = {
    create: create,
    bindMagnetic: bindMagnetic,
    injectStyles: injectStyles,
  };
})();
