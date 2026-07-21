/*
  Azarian Growth Agency — shared navigation (single source of truth).

  Why a plain <script src> and not a .dc component?
  The site is often opened straight from disk (file://), where the browser
  blocks fetch() of sibling files — so a <dc-import> nav never loads. A classic
  script loads fine under file:// AND http://, so the nav works everywhere.

  Usage on any page: put an empty shell in the template and load this file:
      <nav class="agn-nav" data-agn-nav aria-label="Primary"></nav>
      <script src="./nav.js" defer></script>
  It self-mounts (even after the dc-runtime renders the nav). Edit this file
  once and every page updates.

  DROP-DOWN DESIGN (matches Figma 22549-7737) — a vertical, top-to-bottom cascade
  that opens directly BELOW the trigger and grows downward:
    • Level 1  → icon "tiles" (icon + label). Active tile gets a teal border.
    • Level 2  → a horizontal row of "tabs". Only branches (items that have a
                 3rd level) show a chevron; leaves don't. Hovering a tab focuses
                 it and DIMS the others. (Skipped when a tile leads straight to
                 links, i.e. it has no 3rd level — no artificial level is added.)
    • Level 3  → the final "Links", laid out in sections of MAX 5 links each; a
                 new section starts beside the previous once 5 are reached, and
                 sections wrap so everything stays visible on any screen.
  Glass/blur keeps the content behind unreadable. The menu closes 350ms after the
  pointer leaves (not instantly). Animations: spring-eased box resize/---slide.
*/
(function () {
  "use strict";
  if (window.AzarianNav) return;

  // NAV TREE — the single source of truth (desktop cascade + mobile drawer).
  // Node = string leaf | ['Label','href'] | { label, href?, children?[] }.
  var HOME = "Azarian Home.dc.html";
  var NAV = [
    { label: "How We Help", children: [
      { label: "Digital Advertising", children: [
        "Diagnostic Services","Paid Search Marketing","Google Ads Agency","Facebook Ads Agency",
        "Amazon Ads Agency","Social Media Marketing","Search Engine Marketing","Yelp Marketing Agency"
      ]},
      { label: "Website Optimization", children: [
        "Website Building & Design","Conversion Rate Optimization","Landing Page Design","Branding Services",
        "Search Engine Optimization (SEO)","Local SEO Agency","Link-Building Services","GEO Agency"
      ]},
      { label: "Growth & Strategy", children: [
        "Content Marketing","Thought Leadership","Email Marketing","Fractional CMO Services",
        "Marketing Analytics & Reporting","Signal-Based Outreach","AI Marketing","Webinar Marketing"
      ]},
      { label: "Local Services", children: [
        { label: "California", children: [
          "Web Design for California","SEO for California","SEO Corona","Web Design Riverside","Digital Marketing Ontario"
        ]},
        { label: "Los Angeles County", children: [
          "Los Angeles PPC Agency","Los Angeles SEO Company","Los Angeles Social Media Marketing Agency",
          "Web Design Agency in LA","Digital Marketing Cerritos","Digital Marketing Long Beach","SEO Long Beach","Web Design Long Beach"
        ]},
        { label: "Orange County", children: [
          "Web Design Orange County","SEO Orange County","Digital Marketing Irvine","SEO Irvine",
          "Digital Marketing Newport Beach","SEO Newport Beach","Web Design Newport Beach","SEO Aliso Viejo",
          "SEO Costa Mesa","Web Design Costa Mesa","SEO Huntington Beach","Web Design Brea","SEO Fullerton","SEO Anaheim"
        ]}
      ]}
    ]},
    { label: "Who We Help", children: [
      { label: "B2C", children: [
        "SaaS","B2C Marketing Agency","Startup Marketing Agency","Fintech","Credit Unions",
        "E-commerce","Fashion Digital Marketing Agency","Law Firms","Personal Injury Law Firm","Home Services"
      ]},
      { label: "B2B", children: [
        "SaaS","B2B SaaS Platforms","Enterprise SaaS","Private Markets","Private Equity Firms","Venture Capital Firms"
      ]}
    ]},
    { label: "Who We Are", children: [
      ["About Us", "Azarian About.dc.html"],
      "Job Opportunities","[A] Growth Pathway Program","Referral Program"
    ]},
    { label: "Learn", children: [
      "Webinars","Podcast","Interviews","Blog","Case Studies","Guides",
      { label: "Tools", children: [
        "AI Tools",
        { label: "Calculators", children: [
          "CPM","CRO","CTR","ROAS","CPC","CAC","ROI","Churn Rate","Burn Rate",
          "Instagram Engagement Rate","PPC","Retention Rate Calculator"
        ]}
      ]},
      { label: "Academy", children: [ "Growth Fundamentals Course" ]}
    ]},
    { label: "Growth OS", href: "Azarian Home.dc.html#os" },
    { label: "About Us",  href: "Azarian About.dc.html" }
  ];

  var CLOSE_DELAY = 350; // ms after pointer leaves before the menu closes

  // Line icons for the level-1 tiles (keyed by label; generic fallback).
  var ICONS = {
    "Digital Advertising": '<path d="M4 10v4h3l5 4V6l-5 4H4Z"/><path d="M15 9a3 3 0 0 1 0 6"/>',
    "Website Optimization": '<rect x="3" y="4" width="18" height="13" rx="1.5"/><path d="M8 21h8M12 17v4"/>',
    "Growth & Strategy": '<polyline points="3 17 9 11 13 15 21 7"/><polyline points="15 7 21 7 21 13"/>',
    "Local Services": '<path d="M12 21s-6-5.3-6-10a6 6 0 0 1 12 0c0 4.7-6 10-6 10Z"/><circle cx="12" cy="11" r="2"/>',
    "B2C": '<path d="M6 8h12l-1 12H7L6 8Z"/><path d="M9 8a3 3 0 0 1 6 0"/>',
    "B2B": '<rect x="3" y="7" width="18" height="13" rx="1.5"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18"/>',
    "About Us": '<circle cx="9" cy="9" r="3"/><path d="M3.5 20a5.5 5.5 0 0 1 11 0"/><path d="M16 7a3 3 0 0 1 0 6M15.5 20a5.5 5.5 0 0 1 5 0"/>',
    "Job Opportunities": '<rect x="3" y="7" width="18" height="13" rx="1.5"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M12 12v3M10.5 13.5h3"/>',
    "[A] Growth Pathway Program": '<path d="M4 20h4v-4h4v-4h4V8h4"/>',
    "Referral Program": '<circle cx="6" cy="12" r="2.4"/><circle cx="17" cy="6" r="2.4"/><circle cx="17" cy="18" r="2.4"/><path d="M8.2 10.9 14.8 7.3M8.2 13.1l6.6 3.6"/>',
    "Webinars": '<rect x="3" y="6" width="12" height="12" rx="2"/><path d="m15 10 6-3v10l-6-3Z"/>',
    "Podcast": '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M6 11a6 6 0 0 0 12 0M12 17v4M9 21h6"/>',
    "Interviews": '<path d="M4 5h16v11H9l-4 3V5Z"/><path d="M8 9h8M8 12h5"/>',
    "Blog": '<path d="M4 20h4L18 10l-4-4L4 16v4Z"/><path d="m14 6 4 4"/>',
    "Case Studies": '<path d="M5 20V11M10 20V5M15 20v-6M20 20V8"/>',
    "Guides": '<path d="M4 5a2 2 0 0 1 2-2h6v16H6a2 2 0 0 0-2 2V5Z"/><path d="M20 5a2 2 0 0 0-2-2h-6v16h6a2 2 0 0 1 2 2V5Z"/>',
    "Tools": '<path d="M15.5 7.5a3.5 3.5 0 0 1-4.6 4.6L5 18l1 1 5.9-5.9a3.5 3.5 0 0 0 4.6-4.6l-2 2-1.9-1.9 1.9-2Z"/>',
    "Academy": '<path d="m3 9 9-4 9 4-9 4-9-4Z"/><path d="M7 11v4c0 1.1 2.2 2 5 2s5-.9 5-2v-4"/>'
  };
  var ICON_FALLBACK = '<circle cx="12" cy="12" r="8"/><path d="M12 8v8M8 12h8"/>';
  function icon(label) {
    return '<svg class="agn-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
      (ICONS[label] || ICON_FALLBACK) + "</svg>";
  }

  // --- helpers ---------------------------------------------------------------
  function slug(s) { return s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
  function norm(node) {
    if (Array.isArray(node)) return { label: node[0], href: node[1], children: null };
    if (typeof node === "string") return { label: node, href: "#" + slug(node), children: null };
    var children = node.children && node.children.length ? node.children : null;
    return { label: node.label, href: node.href || (children ? null : "#" + slug(node.label)), children: children };
  }
  function hasBranch(node) { return !!(node.children && node.children.some(function (c) { return !!norm(c).children; })); }
  function el(tag, cls, html) { var n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; }
  function caretDown() { return '<span class="agn-caret"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></span>'; }
  function tabCaret() { return '<span class="agn-tcaret"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></span>'; }
  function isTouch() { return window.matchMedia && window.matchMedia("(hover:none)").matches; }

  // --- Liquid Glass Engine (vanilla port of rdev/liquid-glass-react) ----------
  var lgIdCounter = 0;

  function liquidGlass(container, opts) {
    var o = Object.assign({
      displacementScale: 70,
      blurAmount: 0.0625,
      saturation: 140,
      aberrationIntensity: 2,
      elasticity: 0.15,
      cornerRadius: 100,
      overLight: false
    }, opts || {});

    var id = "lg-" + (++lgIdCounter);
    var filterId = id + "-filter";
    var svgNS = "http://www.w3.org/2000/svg";

    var svg = document.createElementNS(svgNS, "svg");
    svg.style.cssText = "position:absolute;width:0;height:0;overflow:hidden;pointer-events:none;";
    svg.setAttribute("aria-hidden", "true");

    var defs = document.createElementNS(svgNS, "defs");
    var filter = document.createElementNS(svgNS, "filter");
    filter.setAttribute("id", filterId);
    filter.setAttribute("x", "-10%"); filter.setAttribute("y", "-10%");
    filter.setAttribute("width", "120%"); filter.setAttribute("height", "120%");
    filter.setAttribute("color-interpolation-filters", "sRGB");

    // feImage — displacement map (generated inline as data URI)
    var feImage = document.createElementNS(svgNS, "feImage");
    feImage.setAttribute("preserveAspectRatio", "none");
    feImage.setAttribute("result", "dispMap");

    // feDisplacementMap — refraction
    var feDisp = document.createElementNS(svgNS, "feDisplacementMap");
    feDisp.setAttribute("in", "SourceGraphic");
    feDisp.setAttribute("in2", "dispMap");
    feDisp.setAttribute("scale", o.displacementScale.toString());
    feDisp.setAttribute("xChannelSelector", "R");
    feDisp.setAttribute("yChannelSelector", "G");
    feDisp.setAttribute("result", "displaced");

    // feGaussianBlur — frosting
    var feBlur = document.createElementNS(svgNS, "feGaussianBlur");
    feBlur.setAttribute("in", "displaced");
    feBlur.setAttribute("stdDeviation", (o.blurAmount * 16).toString());
    feBlur.setAttribute("result", "blurred");

    // feColorMatrix — saturation boost
    var feSat = document.createElementNS(svgNS, "feColorMatrix");
    feSat.setAttribute("in", "blurred");
    feSat.setAttribute("type", "saturate");
    feSat.setAttribute("values", (o.saturation / 100).toString());
    feSat.setAttribute("result", "saturated");

    // Chromatic aberration — offset R and B channels
    var abr = o.aberrationIntensity;
    if (abr > 0) {
      var feOffR = document.createElementNS(svgNS, "feOffset");
      feOffR.setAttribute("in", "saturated");
      feOffR.setAttribute("dx", abr.toString()); feOffR.setAttribute("dy", "0");
      feOffR.setAttribute("result", "offR");
      var feCmR = document.createElementNS(svgNS, "feColorMatrix");
      feCmR.setAttribute("in", "offR"); feCmR.setAttribute("type", "matrix");
      feCmR.setAttribute("values", "1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0");
      feCmR.setAttribute("result", "redCh");

      var feOffG = document.createElementNS(svgNS, "feOffset");
      feOffG.setAttribute("in", "saturated");
      feOffG.setAttribute("dx", "0"); feOffG.setAttribute("dy", "0");
      feOffG.setAttribute("result", "offG");
      var feCmG = document.createElementNS(svgNS, "feColorMatrix");
      feCmG.setAttribute("in", "offG"); feCmG.setAttribute("type", "matrix");
      feCmG.setAttribute("values", "0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0");
      feCmG.setAttribute("result", "greenCh");

      var feOffB = document.createElementNS(svgNS, "feOffset");
      feOffB.setAttribute("in", "saturated");
      feOffB.setAttribute("dx", (-abr).toString()); feOffB.setAttribute("dy", "0");
      feOffB.setAttribute("result", "offB");
      var feCmB = document.createElementNS(svgNS, "feColorMatrix");
      feCmB.setAttribute("in", "offB"); feCmB.setAttribute("type", "matrix");
      feCmB.setAttribute("values", "0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0");
      feCmB.setAttribute("result", "blueCh");

      var blendRG = document.createElementNS(svgNS, "feBlend");
      blendRG.setAttribute("in", "redCh"); blendRG.setAttribute("in2", "greenCh");
      blendRG.setAttribute("mode", "screen"); blendRG.setAttribute("result", "rg");

      var blendAll = document.createElementNS(svgNS, "feBlend");
      blendAll.setAttribute("in", "rg"); blendAll.setAttribute("in2", "blueCh");
      blendAll.setAttribute("mode", "screen");

      filter.appendChild(feImage);
      filter.appendChild(feDisp);
      filter.appendChild(feBlur);
      filter.appendChild(feSat);
      filter.appendChild(feOffR); filter.appendChild(feCmR);
      filter.appendChild(feOffG); filter.appendChild(feCmG);
      filter.appendChild(feOffB); filter.appendChild(feCmB);
      filter.appendChild(blendRG); filter.appendChild(blendAll);
    } else {
      filter.appendChild(feImage);
      filter.appendChild(feDisp);
      filter.appendChild(feBlur);
      filter.appendChild(feSat);
    }

    defs.appendChild(filter);
    svg.appendChild(defs);
    container.appendChild(svg);

    function generateDispMap(w, h) {
      var r = o.cornerRadius;
      var edge = Math.min(w, h) * 0.12;
      var lxId = id + "-lx", lyId = id + "-ly";
      return "data:image/svg+xml," + encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '">' +
        '<defs>' +
        '<linearGradient id="' + lxId + '" x1="0%" y1="0%" x2="100%" y2="0%">' +
        '<stop offset="0%" stop-color="rgb(0,128,0)"/>' +
        '<stop offset="' + (edge / w * 100) + '%" stop-color="rgb(128,128,0)"/>' +
        '<stop offset="' + (100 - edge / w * 100) + '%" stop-color="rgb(128,128,0)"/>' +
        '<stop offset="100%" stop-color="rgb(255,128,0)"/>' +
        '</linearGradient>' +
        '<linearGradient id="' + lyId + '" x1="0%" y1="0%" x2="0%" y2="100%">' +
        '<stop offset="0%" stop-color="rgb(128,0,0)"/>' +
        '<stop offset="' + (edge / h * 100) + '%" stop-color="rgb(128,128,0)"/>' +
        '<stop offset="' + (100 - edge / h * 100) + '%" stop-color="rgb(128,128,0)"/>' +
        '<stop offset="100%" stop-color="rgb(128,255,0)"/>' +
        '</linearGradient>' +
        '</defs>' +
        '<rect width="' + w + '" height="' + h + '" rx="' + r + '" fill="rgb(128,128,0)"/>' +
        '<rect width="' + w + '" height="' + h + '" rx="' + r + '" fill="url(#' + lxId + ')" opacity="0.7"/>' +
        '<rect width="' + w + '" height="' + h + '" rx="' + r + '" fill="url(#' + lyId + ')" opacity="0.7" style="mix-blend-mode:multiply"/>' +
        '</svg>');
    }

    function updateSize() {
      var rect = container.getBoundingClientRect();
      var w = Math.round(rect.width) || 400;
      var h = Math.round(rect.height) || 72;
      feImage.setAttribute("href", generateDispMap(w, h));
      feImage.setAttribute("width", w + "px");
      feImage.setAttribute("height", h + "px");
    }

    updateSize();

    // Progressive enhancement: apply SVG filter only in Chrome/Edge where it works
    var filterUrl = "url(#" + filterId + ")";
    var sat = "saturate(" + (o.saturation / 100) + ")";
    var ua = navigator.userAgent;
    var canUseSvgFilter = (/Chrome/.test(ua) || /Edg\//.test(ua)) && !/Safari/.test(ua.replace(/Chrome|Edg\//g, ""));
    if (canUseSvgFilter) {
      container.style.backdropFilter = filterUrl + " " + sat;
      container.style.webkitBackdropFilter = filterUrl + " " + sat;
    }
    // Otherwise, the CSS-defined backdrop-filter (blur + saturate) remains untouched

    // Elastic mouse tracking
    var mouseX = 0, mouseY = 0, curX = 0, curY = 0, raf = null;
    function onMove(e) {
      var rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      if (!raf) tick();
    }
    var baseTransform = "";
    function tick() {
      curX += (mouseX - curX) * (o.elasticity * 1.2);
      curY += (mouseY - curY) * (o.elasticity * 1.2);
      var rotX = curY * -1.2;
      var rotY = curX * 1.2;
      if (Math.abs(curX) > 0.005 || Math.abs(curY) > 0.005) {
        container.style.transform = baseTransform + " perspective(800px) rotateX(" + rotX + "deg) rotateY(" + rotY + "deg)";
        raf = requestAnimationFrame(tick);
      } else {
        container.style.transform = baseTransform;
        raf = null;
      }
    }
    function onLeave() {
      mouseX = 0; mouseY = 0;
      if (!raf) tick();
    }

    if (o.elasticity > 0 && !isTouch()) {
      container.addEventListener("pointermove", onMove);
      container.addEventListener("pointerleave", onLeave);
    }

    var ro = new ResizeObserver(function () { setTimeout(updateSize, 0); });
    ro.observe(container);

    return { filterId: filterId, updateSize: updateSize, svg: svg, canUseSvgFilter: canUseSvgFilter, destroy: function () {
      ro.disconnect();
      container.removeEventListener("pointermove", onMove);
      container.removeEventListener("pointerleave", onLeave);
      if (svg.parentNode) svg.parentNode.removeChild(svg);
    }};
  }

  // --- one-time global CSS ---------------------------------------------------
  function injectStyles() {
    var css = [
    // Theme tokens — DARK is the default (over dark sections). The JS samples the
    // background behind the bar and toggles .theme-light over light sections.
    // Dropdown is portaled to <body> with the same blur(22px) saturate(1.4) glass
    // as the bar, plus a denser tint so menu text stays readable.
    ".agn-nav{position:fixed;top:18px;left:50%;transform:translateX(-50%);z-index:120;",
      "--agn-txt:#C6D0E0;--agn-txt-strong:#fff;--agn-bar-bg:rgba(255,255,255,0.06);--agn-bar-border:rgba(255,255,255,0.12);",
      "--agn-icon-bg:rgba(255,255,255,0.06);--agn-icon-border:rgba(255,255,255,0.14);--agn-icon-fg:#E7ECF4;",
      "--agn-icon-hbg:rgba(255,255,255,0.12);--agn-icon-hborder:rgba(255,255,255,0.28);--agn-hl:rgba(255,255,255,0.10);--agn-logo-fg:#fff;",
      "--agn-drop-bg:rgba(11,27,56,0.66);--agn-drop-border:rgba(255,255,255,0.14);",
      "--agn-drop-shadow:0 34px 80px -26px rgba(3,10,26,.55),inset 0 1px 0 rgba(255,255,255,.16);",
      "--agn-tile-bg:rgba(255,255,255,0.05);--agn-tile-border:rgba(255,255,255,0.10);--agn-tile-hover:rgba(255,255,255,0.22);",
      "--agn-accent:#1BFED1;--agn-tile-active-bg:rgba(27,254,209,0.10);--agn-divider:rgba(255,255,255,0.12);",
      "--agn-link-hover-bg:rgba(255,255,255,0.08);--agn-ico:#9FB0C8;",
      "width:min(1296px,calc(100% - 36px));height:72px;box-sizing:border-box;display:flex;align-items:center;gap:14px;",
      "padding:0 14px 0 24px;border-radius:100px;border:1px solid var(--agn-bar-border);",
      "background:var(--agn-bar-bg);",
      "backdrop-filter:blur(22px) saturate(1.4);-webkit-backdrop-filter:blur(22px) saturate(1.4);",
      "box-shadow:0 8px 40px -12px rgba(8,18,38,.5),inset 0 1px 0 rgba(255,255,255,.16);",
      "transition:background .4s ease,border-color .4s ease,box-shadow .4s ease;",
      "font-family:'Poppins',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}",
    ".agn-nav.theme-light{--agn-txt:#39465A;--agn-txt-strong:#0B1B38;--agn-bar-bg:rgba(255,255,255,0.66);--agn-bar-border:rgba(11,27,56,0.10);",
      "--agn-icon-bg:rgba(11,27,56,0.05);--agn-icon-border:rgba(11,27,56,0.12);--agn-icon-fg:#0B1B38;",
      "--agn-icon-hbg:rgba(11,27,56,0.10);--agn-icon-hborder:rgba(11,27,56,0.24);--agn-hl:rgba(11,27,56,0.06);--agn-logo-fg:#0B1B38;",
      "--agn-drop-bg:rgba(255,255,255,0.78);--agn-drop-border:rgba(11,27,56,0.12);",
      "--agn-drop-shadow:0 28px 64px -22px rgba(20,40,80,.22),inset 0 1px 0 rgba(255,255,255,.7);",
      "--agn-tile-bg:rgba(11,27,56,0.04);--agn-tile-border:rgba(11,27,56,0.10);--agn-tile-hover:rgba(11,27,56,0.20);",
      "--agn-accent:#11d5ae;--agn-tile-active-bg:rgba(17,213,174,0.14);--agn-divider:rgba(11,27,56,0.10);",
      "--agn-link-hover-bg:rgba(11,27,56,0.06);--agn-ico:#5A6B80;",
      "box-shadow:0 16px 44px -18px rgba(20,40,80,.30),inset 0 1px 0 rgba(255,255,255,.55);}",
    ".agn-logo{display:flex;align-items:center;gap:11px;text-decoration:none;flex-shrink:0;transition:opacity .3s ease;}",
    ".agn-logo img{height:34px;width:auto;display:block;}",
    ".agn-logo svg{height:38px;width:auto;display:block;}",
    ".agn-logo .agn-logo-fg{fill:var(--agn-logo-fg);transition:fill .4s ease;}",
    ".agn-icon{display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;flex-shrink:0;",
      "border-radius:50%;border:1px solid var(--agn-icon-border);background:var(--agn-icon-bg);",
      "-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);color:var(--agn-icon-fg);cursor:pointer;",
      "transition:opacity .3s ease,background .25s,border-color .25s,color .25s;}",
    ".agn-icon:hover{background:var(--agn-icon-hbg);border-color:var(--agn-icon-hborder);color:var(--agn-txt-strong);}",
    ".agn-center{flex:1;position:relative;display:flex;align-items:center;justify-content:center;gap:2px;min-width:0;transition:opacity .3s ease;}",
    ".agn-hl{position:absolute;top:50%;left:0;height:38px;transform:translateY(-50%);border-radius:100px;",
      "background:var(--agn-hl);opacity:0;pointer-events:none;",
      "transition:left .32s cubic-bezier(.22,1,.36,1),width .32s cubic-bezier(.22,1,.36,1),opacity .25s ease,background .4s ease;z-index:0;}",
    ".agn-trigger{position:relative;z-index:1;display:inline-flex;align-items:center;gap:6px;height:44px;padding:0 15px;",
      "border:0;background:transparent;color:var(--agn-txt);font-family:inherit;font-size:15px;font-weight:500;white-space:nowrap;",
      "cursor:pointer;border-radius:100px;transition:color .3s ease;}",
    ".agn-trigger:hover,.agn-trigger.is-open{color:var(--agn-txt-strong);}",
    ".agn-trigger.is-link{text-decoration:none;}",
    ".agn-caret{display:inline-flex;transition:transform .3s cubic-bezier(.22,1,.36,1);opacity:.75;}",
    ".agn-trigger.is-open .agn-caret{transform:rotate(180deg);}",
    ".agn-cta{display:inline-flex;align-items:center;height:46px;background:var(--accent,#1BFED1);color:#0B1B38;",
      "font-weight:600;font-size:15px;padding:0 24px;border-radius:100px;text-decoration:none;white-space:nowrap;flex-shrink:0;",
      "transition:transform .3s cubic-bezier(.16,.84,.44,1),box-shadow .3s,opacity .35s ease;box-shadow:0 8px 24px -8px rgba(31,201,160,.55);}",
    ".agn-cta:hover{box-shadow:0 14px 34px -8px rgba(31,201,160,.8);}",
    /* Search mode — explode chrome only (not the mega panel). */
    ".agn-nav > .agn-logo,.agn-nav > .agn-center,.agn-nav > [data-nav-search],.agn-nav > .agn-cta,.agn-nav > .agn-burger{",
      "transform-origin:50% 50%;",
      "transition:opacity .28s cubic-bezier(.15,.85,.25,1),transform .32s cubic-bezier(.12,.9,.2,1.05),filter .28s ease;}",
    ".agn-nav.is-searching > .agn-logo,.agn-nav.is-searching > .agn-center,.agn-nav.is-searching > [data-nav-search],",
    ".agn-nav.is-searching > .agn-cta,.agn-nav.is-searching > .agn-burger{opacity:0;pointer-events:none;filter:blur(3px);}",
    ".agn-nav.is-searching > .agn-logo{transform:scale(1.55) translateX(-18%);}",
    ".agn-nav.is-searching > .agn-center{transform:scale(1.85);}",
    ".agn-nav.is-searching > [data-nav-search]{transform:scale(2.1);}",
    ".agn-nav.is-searching > .agn-cta{transform:scale(1.65) translateX(22%);}",
    ".agn-nav.is-searching > .agn-burger{transform:scale(1.9) translateX(30%);}",
    // Mega is portaled to <body> (fixed) so backdrop-filter works — it cannot live
    // under .agn-nav's transform:translateX(-50%). Same blur/saturate as the bar.
    ".agn-mega{position:fixed;left:0;top:0;width:0;z-index:119;pointer-events:none;box-sizing:border-box;padding-top:14px;",
      "font-family:'Poppins',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;",
      "--agn-txt:#C6D0E0;--agn-txt-strong:#fff;--agn-drop-bg:rgba(11,27,56,0.66);--agn-drop-border:rgba(255,255,255,0.14);",
      "--agn-drop-shadow:0 34px 80px -26px rgba(3,10,26,.55),inset 0 1px 0 rgba(255,255,255,.16);",
      "--agn-tile-bg:rgba(255,255,255,0.05);--agn-tile-border:rgba(255,255,255,0.10);--agn-tile-hover:rgba(255,255,255,0.22);",
      "--agn-accent:#1BFED1;--agn-tile-active-bg:rgba(27,254,209,0.10);--agn-divider:rgba(255,255,255,0.12);",
      "--agn-link-hover-bg:rgba(255,255,255,0.08);--agn-ico:#9FB0C8;}",
    ".agn-mega.theme-light{--agn-txt:#39465A;--agn-txt-strong:#0B1B38;--agn-drop-bg:rgba(255,255,255,0.78);--agn-drop-border:rgba(11,27,56,0.12);",
      "--agn-drop-shadow:0 28px 64px -22px rgba(20,40,80,.22),inset 0 1px 0 rgba(255,255,255,.7);",
      "--agn-tile-bg:rgba(11,27,56,0.04);--agn-tile-border:rgba(11,27,56,0.10);--agn-tile-hover:rgba(11,27,56,0.20);",
      "--agn-accent:#11d5ae;--agn-tile-active-bg:rgba(17,213,174,0.14);--agn-divider:rgba(11,27,56,0.10);",
      "--agn-link-hover-bg:rgba(11,27,56,0.06);--agn-ico:#5A6B80;}",
    ".agn-mega.is-open{pointer-events:auto;}",
    ".agn-mega-pos{position:relative;width:100%;}",
    ".agn-box{position:relative;overflow:hidden;border-radius:24px;border:1px solid var(--agn-drop-border);",
      "background:var(--agn-drop-bg);",
      "backdrop-filter:blur(22px) saturate(1.4);-webkit-backdrop-filter:blur(22px) saturate(1.4);",
      "box-shadow:var(--agn-drop-shadow);",
      "color:var(--agn-txt);",
      "visibility:hidden;pointer-events:none;",
      "transform:scale(0.86) translateY(-8px);transform-origin:top center;",
      "width:0;height:0;box-sizing:border-box;",
      "transition:transform .34s cubic-bezier(.22,1,.36,1),visibility .28s ease,",
      "height .36s cubic-bezier(.22,1,.36,1),background .4s ease,border-color .4s ease,box-shadow .4s ease;}",
    ".agn-mega.is-open .agn-box{visibility:visible;pointer-events:auto;transform:scale(1) translateY(0);}",
    ".agn-panel{position:absolute;top:0;left:0;width:100%;box-sizing:border-box;",
      "display:flex;flex-direction:column;padding:24px;opacity:0;pointer-events:none;",
      "transition:opacity .28s ease,transform .32s cubic-bezier(.22,1,.36,1);}",
    ".agn-panel.is-active{opacity:1;pointer-events:auto;}",
    // level 1 — tiles
    ".agn-tiles{display:flex;flex-wrap:nowrap;gap:12px;width:100%;}",
    ".agn-tile{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;flex:1 1 0;",
      "min-width:160px;min-height:fit-content;padding:12px 14px;box-sizing:border-box;border-radius:16px;overflow:hidden;",
      "border:1.5px solid var(--agn-tile-border);background:var(--agn-tile-bg);color:var(--agn-txt);",
      "font-family:'Poppins',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:14px;font-weight:500;line-height:1;letter-spacing:0;",
      "text-align:center;text-decoration:none;cursor:pointer;",
      "transition:border-color .2s ease,background .2s ease,color .2s ease;}",
    ".agn-tile .agn-ico{width:30px;height:30px;color:var(--agn-ico);transition:color .2s ease;}",
    ".agn-tile:hover{border-color:var(--agn-tile-hover);color:var(--agn-txt-strong);}",
    ".agn-tile:hover .agn-ico{color:var(--agn-txt-strong);}",
    ".agn-tile.is-active{border-color:var(--agn-accent,#1BFED1);background:var(--agn-tile-active-bg);color:var(--agn-accent,#1BFED1);}",
    ".agn-tile.is-active .agn-ico{color:var(--agn-accent,#1BFED1);}",
    ".agn-tlabel{line-height:1.2;word-break:break-word;overflow-wrap:break-word;max-width:100%;text-align:center;",
      "font-family:inherit;font-size:14px;font-weight:500;}",
    // sub area (levels 2 + 3)
    ".agn-sub{display:flex;flex-direction:column;}",
    ".agn-sub:not(:empty){margin-top:16px;padding-top:16px;border-top:1px solid var(--agn-divider);}",
    // reveal animation (auto-plays on insertion — no JS/rAF needed, always ends visible)
    "@keyframes agnReveal{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}",
    // level 2 — tabs · Figma Poppins/14/Medium
    ".agn-tabs{display:flex;flex-wrap:wrap;gap:6px 24px;animation:agnReveal .28s cubic-bezier(.22,1,.36,1) both;}",
    ".agn-tab{display:inline-flex;align-items:center;gap:5px;padding:2px 0;border:0;background:transparent;",
      "color:var(--agn-txt);font-family:'Poppins',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;",
      "font-size:14px;font-weight:500;line-height:1;letter-spacing:0;white-space:nowrap;cursor:pointer;",
      "text-decoration:none;opacity:.55;transition:opacity .2s ease,color .2s ease;}",
    ".agn-tab:hover{opacity:1;color:var(--agn-txt-strong);}",
    ".agn-tab.is-active{opacity:1;color:var(--agn-accent,#1BFED1);}",
    ".agn-tcaret{display:inline-flex;transition:transform .25s cubic-bezier(.22,1,.36,1);}",
    ".agn-tab.is-active .agn-tcaret{transform:rotate(180deg);}",
    // level 3 — links · Figma Poppins/14/Medium
    ".agn-linkwrap{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:4px 16px;margin-top:16px;width:100%;animation:agnReveal .28s cubic-bezier(.22,1,.36,1) both;}",
    ".agn-linkwrap:empty{margin-top:0;}",
    ".agn-link3{padding:8px 12px;color:var(--agn-txt);",
      "font-family:'Poppins',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;",
      "font-size:14px;font-weight:500;line-height:1.3;letter-spacing:0;",
      "text-decoration:none;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;border-radius:8px;text-align:left;transition:color .18s ease,background .18s ease;}",
    ".agn-link3:hover{color:var(--agn-txt-strong);background:var(--agn-link-hover-bg);}",
    // search — colors follow .theme-dark / .theme-light tokens from the bar
    ".agn-search{position:absolute;left:20px;right:14px;top:0;bottom:0;display:flex;align-items:center;gap:12px;",
      "opacity:0;pointer-events:none;transform:scale(.88);transform-origin:50% 50%;",
      "transition:opacity .32s ease .1s,transform .38s cubic-bezier(.16,.84,.44,1) .1s;z-index:5;}",
    ".agn-search.is-open{opacity:1;pointer-events:auto;transform:scale(1);}",
    ".agn-nav:not(.is-searching) .agn-search{transition-delay:0s;}",
    ".agn-search input{flex:1;min-width:0;height:44px;border:0;outline:0;background:transparent;color:var(--agn-txt-strong);",
      "font-family:inherit;font-size:17px;font-weight:500;caret-color:var(--agn-accent,#1BFED1);}",
    ".agn-search input::placeholder{color:var(--agn-txt);opacity:.72;}",
    // mobile
    ".agn-burger{display:none;}",
    ".agn-drawer{display:none;",
      "font-family:'Poppins',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;",
      "--agn-txt:#C6D0E0;--agn-txt-strong:#fff;--agn-drop-bg:rgba(11,27,56,0.66);--agn-drop-border:rgba(255,255,255,0.14);",
      "--agn-drop-shadow:0 34px 80px -26px rgba(3,10,26,.55),inset 0 1px 0 rgba(255,255,255,.16);",
      "--agn-divider:rgba(255,255,255,0.12);--agn-ico:#9FB0C8;}",
    ".agn-drawer.theme-light{--agn-txt:#39465A;--agn-txt-strong:#0B1B38;--agn-drop-bg:rgba(255,255,255,0.78);--agn-drop-border:rgba(11,27,56,0.12);",
      "--agn-drop-shadow:0 28px 64px -22px rgba(20,40,80,.22),inset 0 1px 0 rgba(255,255,255,.7);",
      "--agn-divider:rgba(11,27,56,0.10);--agn-ico:#5A6B80;}",
    /* Mobile NavigationBar — Figma 22664:6884 + burger
       logo left · search + CTA + burger right · no center links */
    "@media(max-width:960px){",
      ".agn-nav{height:62px;width:calc(100% - 16px);padding:0 16px;gap:8px;justify-content:flex-start;",
        "top:max(20px,env(safe-area-inset-top,0px));",
        "--agn-bar-bg:rgba(255,255,255,0.08);--agn-bar-border:rgba(255,255,255,0.14);",
        "backdrop-filter:blur(28px) saturate(1.5);-webkit-backdrop-filter:blur(28px) saturate(1.5);}",
      ".agn-nav.theme-light{--agn-bar-bg:rgba(255,255,255,0.52);--agn-bar-border:rgba(11,27,56,0.10);}",
      ".agn-center{display:none !important;}",
      ".agn-burger{display:inline-flex !important;width:34px;height:34px;",
        "background:rgba(255,255,255,0.05);border-color:transparent;",
        "-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);}",
      ".agn-nav.theme-light > .agn-burger{background:rgba(11,27,56,0.05);}",
      ".agn-burger svg{width:16px;height:16px;}",
      ".agn-logo{flex-shrink:0;}",
      ".agn-logo img,.agn-logo svg{height:32px;width:auto;}",
      ".agn-nav > [data-nav-search]{margin-left:auto;width:34px;height:34px;",
        "background:rgba(255,255,255,0.05);border-color:transparent;",
        "-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);}",
      ".agn-nav.theme-light > [data-nav-search]{background:rgba(11,27,56,0.05);}",
      ".agn-nav > [data-nav-search] svg{width:16px;height:16px;}",
      ".agn-cta{display:inline-flex !important;height:auto;min-height:34px;padding:8px 12px;",
        "font-size:13px;font-weight:600;line-height:1;border-radius:999px;",
        "box-shadow:0 12px 34px -10px rgba(31,201,160,0.6);}",
      ".agn-search{left:16px;right:16px;}",
      ".agn-search input{height:38px;font-size:15px;}",
      ".agn-drawer{display:block;position:fixed;top:94px;left:50%;transform:translateX(-50%);z-index:115;",
        "width:calc(100% - 16px);max-height:calc(var(--vh-stable,1vh)*100 - 110px);overflow-y:auto;box-sizing:border-box;",
        "border-radius:24px;border:1px solid var(--agn-drop-border);background:var(--agn-drop-bg);color:var(--agn-txt);",
        "-webkit-backdrop-filter:blur(22px) saturate(1.4);backdrop-filter:blur(22px) saturate(1.4);padding:12px;",
        "box-shadow:var(--agn-drop-shadow);",
        "opacity:0;pointer-events:none;translate:0 -10px;transition:opacity .3s ease,translate .3s ease,background .4s ease,border-color .4s ease;}",
      ".agn-drawer.is-open{opacity:1;pointer-events:auto;translate:0 0;}",
      ".agn-macc{border-bottom:1px solid var(--agn-divider);}",
      ".agn-macc:last-child{border-bottom:0;}",
      ".agn-msum{display:flex;align-items:center;gap:10px;width:100%;padding:14px 12px;",
        "border:0;background:transparent;color:var(--agn-txt-strong);font-family:inherit;font-size:15px;font-weight:600;cursor:pointer;text-decoration:none;}",
      ".agn-msum .agn-ico{width:20px;height:20px;color:var(--agn-ico);flex-shrink:0;}",
      ".agn-msum .agn-caret{margin-left:auto;transition:transform .3s ease;}",
      ".agn-macc.is-open>.agn-msum .agn-caret{transform:rotate(180deg);}",
      ".agn-mbody{display:none;padding:0 0 8px 12px;margin-left:6px;border-left:1px solid var(--agn-divider);}",
      ".agn-macc.is-open>.agn-mbody{display:block;}",
      ".agn-mleaf{display:block;padding:10px 12px;color:var(--agn-txt);text-decoration:none;font-size:14px;font-weight:500;}",
      ".agn-mleaf:hover{color:var(--agn-txt-strong);}",
      ".agn-msum.lvl2{font-size:14px;font-weight:500;color:var(--agn-txt);padding:11px 12px;}",
    "}"
    ].join("");
    var s = document.getElementById("agn-nav-css");
    if (!s) {
      s = document.createElement("style");
      s.id = "agn-nav-css";
      document.head.appendChild(s);
    }
    s.textContent = css;
  }

  // --- mount one nav bar into an empty <nav data-agn-nav> shell ---------------
  function mount(nav) {
    injectStyles();
    if (nav.className.indexOf("agn-nav") < 0) nav.className = ("agn-nav " + nav.className).trim();
    nav.textContent = "";

    var state = { active: -1, panels: [], triggers: [], hl: null, mega: null, megaPos: null, box: null,
      drawer: null, closeSearch: null, closeTimer: null,
      curPanel: null, tabEls: [], tabNodes: [], linkwrap: null };

    // logo → Hero (smooth scroll on Home; otherwise navigate to Home#top)
    var logo = el("a", "agn-logo");
    logo.href = HOME + "#top";
    logo.setAttribute("aria-label", "Azarian Growth Agency — Home");
    // Inlined logo so the white "A" mark can recolor per theme (.agn-logo-fg).
    logo.innerHTML = '<svg viewBox="0 0 64 64" fill="none" role="img" aria-label="Azarian Growth Agency" xmlns="http://www.w3.org/2000/svg">' +
      '<path fill-rule="evenodd" clip-rule="evenodd" d="M33.0761 41.5463C32.3459 41.478 31.5915 41.478 30.8608 41.5463V60.0229H33.0761V41.5463Z" fill="#2997FF"></path>' +
      '<path fill-rule="evenodd" clip-rule="evenodd" d="M28.0415 42.3013C27.8881 42.367 27.7409 42.4366 27.6004 42.5122C26.9471 42.8608 26.3589 43.3157 25.8262 43.8475V54.3846H28.0415V42.3013Z" fill="#2997FF"></path>' +
      '<path fill-rule="evenodd" clip-rule="evenodd" d="M35.6938 42.3013V54.3846H37.9091V43.8479C37.376 43.3161 36.7872 42.8613 36.1349 42.5127C35.9944 42.4375 35.8477 42.3675 35.6938 42.3017V42.3013Z" fill="#2997FF"></path>' +
      '<path class="agn-logo-fg" fill-rule="evenodd" clip-rule="evenodd" d="M31.98 35.0947C38.2389 35.0947 43.6805 38.5695 46.4548 43.6825H52.985L50.3633 39.1744L42.4815 25.6187V25.6066L34.5997 12.0523L31.9806 7.54541L29.3602 12.0523L21.4784 25.6066V25.6187L13.5966 39.1744L10.9756 43.6825H17.5051C20.2801 38.5695 25.721 35.0947 31.98 35.0947ZM26.7141 28.6174L26.7192 28.6199L31.9806 19.5712L37.2419 28.6199L37.2471 28.6174L38.6865 31.0927C36.5912 30.5369 34.3554 30.2835 31.9806 30.3325C29.6057 30.2835 27.37 30.5369 25.2741 31.0927L26.7141 28.6174Z"></path>' +
      '<path d="M0.360352 50.9097V3.25391H7.70703V4.73042H2.04397V49.4332H7.70703V50.9097H0.360352Z" fill="#1BFED1"></path>' +
      '<path d="M63.6003 50.9097H56.3046V49.4332H61.9167V4.73042H56.3046V3.25391H63.6003V50.9097Z" fill="#1BFED1"></path>' +
      '<path d="M7.70703 49.4336H2.04395V4.73047H7.70703V3.25391H0.360352V50.9102H7.70703V49.4336ZM63.6006 3.25391H56.3047V4.73047H61.917V49.4336H56.3047V50.9102H63.6006V3.25391ZM7.96094 4.98438H2.29785V49.1787H7.96094V51.1641H0.106445V3H7.96094V4.98438ZM63.8545 51.1641H56.0508V49.1787H61.6621V4.98438H56.0508V3H63.8545V51.1641Z" fill="#1BFED1"></path>' +
      '</svg>';
    logo.addEventListener("click", function (e) {
      var hero = document.getElementById("top") || document.querySelector("[data-hero-pin], [data-hero-scroll]");
      if (!hero) return; // other pages → follow href to Home#top
      e.preventDefault();
      if (state.closeSearch) state.closeSearch();
      closeNow();
      window.scrollTo({ top: 0, behavior: "smooth" });
      try { history.replaceState(null, "", "#top"); } catch (err) {}
    });
    nav.appendChild(logo);

    // center trigger row + drop-down viewport
    var center = el("div", "agn-center");
    center.setAttribute("data-nav-center", "");
    var hl = el("span", "agn-hl");
    center.appendChild(hl);
    state.hl = hl;

    var mega = el("div", "agn-mega");
    mega.setAttribute("data-agn-mega", "");
    var megaPos = el("div", "agn-mega-pos");
    var box = el("div", "agn-box");
    megaPos.appendChild(box);
    mega.appendChild(megaPos);
    state.mega = mega; state.megaPos = megaPos; state.box = box;

    // --- controller functions ---
    var boxGlass = null;
    // Mega lives on <body> as position:fixed so backdrop-filter can blur the page
    // (broken under .agn-nav's transform). Keep it aligned to the bar.
    function positionMega() {
      var r = nav.getBoundingClientRect();
      mega.style.left = r.left + "px";
      mega.style.width = r.width + "px";
      mega.style.top = r.bottom + "px";
    }

    // Origin at the hovered trigger so the panel grows out from the cursor.
    function originFromTrigger(trigger) {
      positionMega();
      var navR = nav.getBoundingClientRect();
      var w = navR.width || nav.offsetWidth;
      if (!trigger || !w) return "50% 0%";
      var tr = trigger.getBoundingClientRect();
      var x = tr.left + tr.width / 2 - navR.left;
      x = Math.max(28, Math.min(w - 28, x));
      return x.toFixed(1) + "px 0px";
    }

    // Measure panel at the FINAL width. Measuring while width is 0 stacks the
    // grid into a tall column and locks a huge empty height (the old bug).
    function layout() {
      var i = state.active;
      var panel = state.panels[i];
      if (!panel) return;
      positionMega();
      var w = nav.offsetWidth;
      box.style.width = w + "px";
      void panel.offsetWidth;
      var h = Math.ceil(panel.scrollHeight || panel.offsetHeight);
      if (h < 8) {
        requestAnimationFrame(function () { if (state.active === i) layout(); });
        return;
      }
      box.style.height = h + "px";
      if (boxGlass) setTimeout(function () { boxGlass.updateSize(); }, 60);
    }

    function buildLinks(wrap, children) {
      wrap.innerHTML = "";
      children.forEach(function (c) {
        var cn = norm(c);
        var a = el("a", "agn-link3");
        a.href = cn.href;
        a.textContent = cn.label;
        a.addEventListener("click", closeNow);
        wrap.appendChild(a);
      });
    }

    function setTab(j) {
      state.tab = j;
      state.tabEls.forEach(function (t, k) { t.classList.toggle("is-active", k === j); });
      var n = state.tabNodes[j];
      if (n && n.children) buildLinks(state.linkwrap, n.children);
      else { state.linkwrap.innerHTML = ""; }
      layout();
    }

    function setTile(ti) {
      var panel = state.curPanel;
      panel._tiles.forEach(function (t, k) { t.classList.toggle("is-active", k === ti); });
      var sub = panel._sub;
      sub.innerHTML = "";
      state.tabEls = []; state.tabNodes = []; state.linkwrap = null;
      var tnode = norm(panel._node.children[ti]);
      if (!tnode.children) { layout(); return; }          // leaf tile → nothing below

      if (hasBranch(tnode)) {
        // level 2 tabs + level 3 links
        var tabs = el("div", "agn-tabs");
        var linkwrap = el("div", "agn-linkwrap");
        state.linkwrap = linkwrap;
        state.tabNodes = tnode.children.map(norm);
        tnode.children.forEach(function (c, j) {
          var cn = norm(c);
          var branch = !!cn.children;
          var tab = el(branch ? "button" : "a", "agn-tab");
          if (branch) { tab.type = "button"; tab.innerHTML = "<span>" + cn.label + "</span>" + tabCaret(); }
          else { tab.href = cn.href; tab.textContent = cn.label; }
          tab.addEventListener("pointerenter", function () { if (!isTouch()) setTab(j); });
          if (branch) tab.addEventListener("click", function (e) { e.preventDefault(); e.stopPropagation(); setTab(j); });
          else tab.addEventListener("click", closeNow);
          tabs.appendChild(tab);
          state.tabEls[j] = tab;
        });
        sub.appendChild(tabs);
        sub.appendChild(linkwrap);
        var first = 0;
        for (var k = 0; k < state.tabNodes.length; k++) { if (state.tabNodes[k].children) { first = k; break; } }
        setTab(first);
      } else {
        // level 2 skipped — tile leads straight to links (no 3rd level)
        var lw = el("div", "agn-linkwrap");
        sub.appendChild(lw);
        buildLinks(lw, tnode.children);
      }
      layout();
    }

    function open(i) {
      if (!state.panels[i]) { close(); return; }
      cancelClose();
      if (state.active === i) return;
      var prev = state.active;
      var wasClosed = prev === -1;
      var dir = wasClosed ? 0 : (i > prev ? 1 : -1);
      var trigger = state.triggers[i];
      state.active = i;
      state.curPanel = state.panels[i];
      state.triggers.forEach(function (t, k) {
        var on = k === i;
        if (t.classList) t.classList.toggle("is-open", on);
        if (t.setAttribute) t.setAttribute("aria-expanded", on ? "true" : "false");
      });
      state.panels.forEach(function (p, k) {
        if (!p) return;
        if (k === i) {
          p.style.transition = "none";
          p.style.transform = "translateX(" + (dir * 26) + "px)";
          p.classList.add("is-active");
          void p.offsetWidth;
          p.style.transition = "";
          p.style.transform = "translateX(0)";
        } else if (p.classList.contains("is-active")) {
          p.style.transform = "translateX(" + (-dir * 26) + "px)";
          p.classList.remove("is-active");
        } else {
          p.style.transform = "";
          p.classList.remove("is-active");
        }
      });

      box.style.transformOrigin = originFromTrigger(trigger);
      mega.classList.add("is-open");

      if (wasClosed) {
        // Size first (no width animation), then scale up from the trigger.
        box.style.transition = "none";
        box.style.transform = "scale(0.86) translateY(-8px)";
        setTile(0);
        layout();
        void box.offsetWidth;
        box.style.transition = "";
        box.style.transform = "scale(1) translateY(0)";
      } else {
        setTile(0);
        layout();
      }
      setTimeout(function () { if (boxGlass) boxGlass.updateSize(); }, 450);
    }

    function close() {
      cancelClose();
      if (state.active === -1) return;
      var trigger = state.triggers[state.active];
      if (trigger) box.style.transformOrigin = originFromTrigger(trigger);
      state.active = -1; state.curPanel = null;
      state.triggers.forEach(function (t) { if (t.classList) t.classList.remove("is-open"); if (t.setAttribute) t.setAttribute("aria-expanded", "false"); });
      mega.classList.remove("is-open");
      box.style.transform = "scale(0.86) translateY(-8px)";
      // Collapse size after the scale-out so the next open measures cleanly.
      setTimeout(function () {
        if (state.active !== -1) return;
        box.style.width = "0px";
        box.style.height = "0px";
      }, 320);
      hl.style.opacity = "0";
    }
    function closeNow() { close(); }
    function scheduleClose() { cancelClose(); state.closeTimer = setTimeout(close, CLOSE_DELAY); }
    function cancelClose() { if (state.closeTimer) { clearTimeout(state.closeTimer); state.closeTimer = null; } }

    function moveHl(t) {
      if (!t || isTouch()) return;
      var parent = t.parentElement;
      if (!parent) return;
      var pr = parent.getBoundingClientRect();
      var r = t.getBoundingClientRect();
      hl.style.width = r.width + "px";
      hl.style.left = (r.left - pr.left) + "px";
      hl.style.opacity = "1";
    }

    // build triggers + panels
    NAV.forEach(function (raw, i) {
      var node = norm(raw);
      if (node.children) {
        var t = el("button", "agn-trigger");
        t.type = "button";
        t.setAttribute("aria-haspopup", "true");
        t.setAttribute("aria-expanded", "false");
        t.innerHTML = node.label + caretDown();
        t.addEventListener("pointerenter", function () { if (!isTouch()) open(i); });
        t.addEventListener("focus", function () { open(i); });
        t.addEventListener("click", function (e) { e.preventDefault(); e.stopPropagation(); state.active === i ? close() : open(i); });
        center.appendChild(t);
        state.triggers[i] = t;

        // panel: tiles built once; sub rebuilt on hover
        var panel = el("div", "agn-panel");
        panel._node = node;
        var tilesEl = el("div", "agn-tiles");
        panel._tiles = [];
        node.children.forEach(function (c, ti) {
          var cn = norm(c);
          var tile = el(cn.children ? "button" : "a", "agn-tile");
          if (cn.children) tile.type = "button"; else tile.href = cn.href;
          tile.innerHTML = icon(cn.label) + '<span class="agn-tlabel">' + cn.label + "</span>";
          tile.addEventListener("pointerenter", function () { if (!isTouch()) setTile(ti); });
          if (cn.children) tile.addEventListener("click", function (e) { e.preventDefault(); e.stopPropagation(); setTile(ti); });
          else tile.addEventListener("click", closeNow);
          tilesEl.appendChild(tile);
          panel._tiles[ti] = tile;
        });
        var subEl = el("div", "agn-sub");
        panel._sub = subEl;
        panel.appendChild(tilesEl);
        panel.appendChild(subEl);
        box.appendChild(panel);
        state.panels[i] = panel;
      } else {
        var a = el("a", "agn-trigger is-link");
        a.href = node.href;
        a.textContent = node.label;
        a.addEventListener("pointerenter", function () { if (!isTouch()) close(); });
        center.appendChild(a);
        state.triggers[i] = a;
      }
    });
    nav.appendChild(center);
    // Portal mega to body so glass blur works (not under nav transform).
    var staleMega = document.querySelector("[data-agn-mega]");
    if (staleMega && staleMega !== mega) staleMega.parentNode.removeChild(staleMega);
    document.body.appendChild(mega);
    mega.classList.add("theme-dark");
    positionMega();

    state.triggers.forEach(function (t) { t.addEventListener("pointerenter", function () { moveHl(t); }); });
    center.addEventListener("pointerleave", function () { hl.style.opacity = "0"; });

    // Search button sits to the LEFT of the CTA (right side of the bar).
    var searchBtn = el("button", "agn-icon");
    searchBtn.type = "button";
    searchBtn.setAttribute("aria-label", "Search");
    searchBtn.setAttribute("data-nav-search", "");
    searchBtn.innerHTML = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.5" y2="16.5"></line></svg>';
    nav.appendChild(searchBtn);

    // CTA
    var cta = el("a", "agn-cta");
    cta.href = HOME + "#cta";
    cta.setAttribute("data-nav-cta", "");
    cta.textContent = "Start a Conversation";
    nav.appendChild(cta);

    // mobile burger
    var burger = el("button", "agn-icon agn-burger");
    burger.type = "button";
    burger.setAttribute("aria-label", "Open menu");
    burger.setAttribute("aria-expanded", "false");
    var burgerIcon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="7" x2="21" y2="7"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="17" x2="21" y2="17"></line></svg>';
    var closeIcon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="5" y1="5" x2="19" y2="19"></line><line x1="19" y1="5" x2="5" y2="19"></line></svg>';
    burger.innerHTML = burgerIcon;
    nav.appendChild(burger);

    // search overlay (inherits dark/light theme tokens from .agn-nav)
    var search = el("div", "agn-search");
    search.innerHTML =
      '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="var(--agn-accent,var(--accent,#1BFED1))" stroke-width="2" stroke-linecap="round" style="flex-shrink:0" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.5" y2="16.5"></line></svg>' +
      '<input type="search" placeholder="Search Azarian Growth Agency…" autocomplete="off" enterkeyhint="search" />' +
      '<button type="button" class="agn-icon" data-search-close aria-label="Close search" style="width:38px;height:38px"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="5" y1="5" x2="19" y2="19"></line><line x1="19" y1="5" x2="5" y2="19"></line></svg></button>';
    nav.appendChild(search);

    // wire search — CSS class drives the cross-fade; theme stays on the bar
    (function () {
      var input = search.querySelector("input");
      var closeX = search.querySelector("[data-search-close]");
      var isOpen = false;
      var set = function (v) {
        if (v === isOpen) return;
        isOpen = v;
        nav.classList.toggle("is-searching", v);
        search.classList.toggle("is-open", v);
        if (v) {
          close();
          if (state.drawer) state.drawer.classList.remove("is-open");
          setTimeout(function () { try { input.focus(); } catch (err) {} }, 180);
        } else {
          input.blur();
        }
      };
      searchBtn.addEventListener("click", function (e) { e.stopPropagation(); set(!isOpen); });
      closeX.addEventListener("click", function (e) { e.stopPropagation(); set(false); });
      input.addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
      search.addEventListener("click", function (e) { e.stopPropagation(); });
      state.closeSearch = function () { set(false); };
    })();

    // mobile drawer (recursive accordion of the same tree)
    function buildDrawerNode(node, lvl) {
      if (!node.children) {
        var a = el("a", lvl === 1 ? "agn-msum" : "agn-mleaf");
        a.href = node.href;
        a.innerHTML = (lvl === 1 ? icon(node.label) : "") + "<span>" + node.label + "</span>";
        if (lvl === 1) { var w = el("div", "agn-macc"); w.appendChild(a); return w; }
        return a;
      }
      var acc = el("div", "agn-macc");
      var sum = el("button", "agn-msum" + (lvl > 1 ? " lvl2" : ""));
      sum.type = "button";
      sum.innerHTML = (lvl === 1 ? icon(node.label) : "") + "<span>" + node.label + "</span>" + caretDown();
      sum.addEventListener("click", function (e) { e.stopPropagation(); acc.classList.toggle("is-open"); });
      var body = el("div", "agn-mbody");
      node.children.forEach(function (c) { body.appendChild(buildDrawerNode(norm(c), lvl + 1)); });
      acc.appendChild(sum); acc.appendChild(body);
      return acc;
    }
    if (state.drawer && state.drawer.parentNode) state.drawer.parentNode.removeChild(state.drawer);
    var drawer = el("div", "agn-drawer");
    NAV.forEach(function (raw) { drawer.appendChild(buildDrawerNode(norm(raw), 1)); });
    var mcta = el("a", "agn-cta");
    mcta.href = HOME + "#cta";
    mcta.textContent = "Start a Conversation";
    mcta.style.cssText += "width:calc(100% - 12px);justify-content:center;margin:12px 6px 6px;height:52px;";
    drawer.appendChild(mcta);
    document.body.appendChild(drawer);
    state.drawer = drawer;

    function setDrawerOpen(willOpen) {
      drawer.classList.toggle("is-open", willOpen);
      burger.setAttribute("aria-expanded", willOpen ? "true" : "false");
      burger.setAttribute("aria-label", willOpen ? "Close menu" : "Open menu");
      burger.innerHTML = willOpen ? closeIcon : burgerIcon;
      if (willOpen && state.closeSearch) state.closeSearch();
    }
    burger.addEventListener("click", function (e) {
      e.stopPropagation();
      setDrawerOpen(!drawer.classList.contains("is-open"));
    });
    drawer.querySelectorAll("a[href]").forEach(function (a) {
      a.addEventListener("click", function () { setDrawerOpen(false); });
    });
    state.setDrawerOpen = setDrawerOpen;

    // Adapt the bar (and glass dropdown) to whatever section is behind it: sample
    // the background luminance under the bar and switch light/dark theme tokens
    // so bar + menu text stay readable over any page section.
    function colorLum(c) {
      if (!c) return null;
      var m = c.match(/[\d.]+/g);
      if (!m || m.length < 3) return null;
      var a = m[3] != null ? +m[3] : 1;
      if (a < 0.35) return null; // too transparent to judge — keep walking up
      return (0.2126 * +m[0] + 0.7152 * +m[1] + 0.0722 * +m[2]) / 255;
    }
    function elemLum(elm) {
      var st = getComputedStyle(elm);
      var L = colorLum(st.backgroundColor);
      if (L != null) return L;
      var bi = st.backgroundImage; // handle gradient backgrounds (avg of colour stops)
      if (bi && bi.indexOf("gradient") >= 0) {
        var cols = bi.match(/rgba?\([^)]*\)/g), ls = [];
        if (cols) for (var i = 0; i < cols.length; i++) { var l = colorLum(cols[i]); if (l != null) ls.push(l); }
        if (ls.length) return ls.reduce(function (a, b) { return a + b; }, 0) / ls.length;
      }
      return null;
    }
    var _themeRaf = null;
    function detectTheme() {
      var rect = nav.getBoundingClientRect();
      if (!rect.width) return;
      var y = rect.top + rect.height / 2;
      var xs = [rect.left + 28, (rect.left + rect.right) / 2, rect.right - 28];
      var prevPE = nav.style.pointerEvents;
      nav.style.pointerEvents = "none";           // so we sample the page, not the bar
      var lums = [];
      for (var k = 0; k < xs.length; k++) {
        var elm = document.elementFromPoint(xs[k], y), depth = 0;
        while (elm && depth < 14) {
          var L = elemLum(elm);
          if (L != null) { lums.push(L); break; }
          elm = elm.parentElement; depth++;
        }
      }
      nav.style.pointerEvents = prevPE;
      if (!lums.length) return;                    // undetectable (e.g. photo bg) — keep current theme
      var avg = lums.reduce(function (a, b) { return a + b; }, 0) / lums.length;
      var light = avg > 0.55;
      nav.classList.toggle("theme-light", light);
      nav.classList.toggle("theme-dark", !light);
      mega.classList.toggle("theme-light", light);
      mega.classList.toggle("theme-dark", !light);
      if (state.drawer) {
        state.drawer.classList.toggle("theme-light", light);
        state.drawer.classList.toggle("theme-dark", !light);
      }
    }
    function applyScroll() {                        // rAF-throttled; keeps the name the listeners use
      if (_themeRaf) return;
      _themeRaf = requestAnimationFrame(function () {
        _themeRaf = null;
        detectTheme();
        if (state.active !== -1) positionMega();
      });
    }
    nav.classList.add("theme-dark");               // definite default (dark bg / light bar)
    mega.classList.add("theme-dark");
    if (state.drawer) state.drawer.classList.add("theme-dark");
    detectTheme();
    // re-check after layout / fonts / async content settle
    setTimeout(detectTheme, 120);
    setTimeout(detectTheme, 500);
    setTimeout(detectTheme, 1200);

    // close 350ms after the pointer leaves the nav OR the portaled mega panel
    nav.addEventListener("pointerenter", cancelClose);
    nav.addEventListener("pointerleave", scheduleClose);
    mega.addEventListener("pointerenter", cancelClose);
    mega.addEventListener("pointerleave", scheduleClose);

    // Liquid Glass on the bar. Mega uses the same CSS blur tokens (portaled to body).
    liquidGlass(nav, {
      displacementScale: 50,
      blurAmount: 0.90,
      saturation: 140,
      aberrationIntensity: 2,
      elasticity: 0,
      cornerRadius: 100
    });

    boxGlass = null;

    nav._agn = { navEl: nav, mega: mega, open: open, close: close, closeNow: closeNow, layout: layout, applyScroll: applyScroll,
      cancelClose: cancelClose, closeSearch: function () { if (state.closeSearch) state.closeSearch(); },
      drawer: drawer, setDrawerOpen: setDrawerOpen, active: function () { return state.active; } };
    return nav._agn;
  }

  // --- self-mount into any runtime-rendered <nav data-agn-nav> ---------------
  function autoMount() {
    var navs = document.querySelectorAll("nav[data-agn-nav]");
    for (var i = 0; i < navs.length; i++) {
      if (!navs[i].querySelector("[data-nav-center]")) mount(navs[i]);
    }
  }
  function currentCtrl() {
    var n = document.querySelector("nav[data-agn-nav]");
    return n && n._agn;
  }

  // global listeners (bound once)
  window.addEventListener("scroll", function () { var c = currentCtrl(); if (c) c.applyScroll(); }, { passive: true });
  document.addEventListener("pointerdown", function (e) {
    var c = currentCtrl(); if (!c) return;
    var inNav = c.navEl.contains(e.target);
    var inMega = c.mega && c.mega.contains(e.target);
    var inDrawer = c.drawer && c.drawer.contains(e.target);
    if (!inNav && !inMega) {
      c.closeNow(); c.closeSearch();
      if (c.setDrawerOpen && !inDrawer) c.setDrawerOpen(false);
      else if (c.drawer && !inDrawer) c.drawer.classList.remove("is-open");
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      var c = currentCtrl();
      if (c) {
        c.closeNow(); c.closeSearch();
        if (c.setDrawerOpen) c.setDrawerOpen(false);
        else if (c.drawer) c.drawer.classList.remove("is-open");
      }
    }
  });
  window.addEventListener("resize", function () { var c = currentCtrl(); if (c) { c.applyScroll(); if (c.active() !== -1) c.layout(); } });

  var mo = new MutationObserver(autoMount);
  function boot() { autoMount(); mo.observe(document.documentElement, { childList: true, subtree: true }); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

  window.AzarianNav = { mount: mount, autoMount: autoMount };
})();
