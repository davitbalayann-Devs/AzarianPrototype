/*
  Azarian Growth Agency — sticky top webinar banner (single source of truth).
  Figma 23099:5781 desktop · 23099:5841 mobile · theme follows nav.

  Usage on any page:
    <div data-promo-banner></div>
    <script src="../promo-banner.js" defer></script>
  Load before nav.js so theme sync can find the banner.
*/
(function () {
  "use strict";
  if (window.AzarianPromoBanner) return;

  var STYLE_ID = "agn-promo-banner-styles";
  var ARROW =
    '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">' +
    '<path fill-rule="evenodd" clip-rule="evenodd" d="M8 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8C14.6667 4.3181 11.6819 1.33333 8 1.33333C4.3181 1.33333 1.33333 4.3181 1.33333 8C1.33333 11.6819 4.3181 14.6667 8 14.6667ZM6.5 6C6.5 5.72386 6.72386 5.5 7 5.5H10C10.2761 5.5 10.5 5.72386 10.5 6V9C10.5 9.27614 10.2761 9.5 10 9.5C9.72386 9.5 9.5 9.27614 9.5 9V7.20711L6.35355 10.3536C6.15829 10.5488 5.84171 10.5488 5.64645 10.3536C5.45118 10.1583 5.45118 9.84171 5.64645 9.64645L8.79289 6.5H7C6.72386 6.5 6.5 6.27614 6.5 6Z" fill="currentColor"/>' +
    "</svg>";

  var EVENTS = [
    {
      title: "SF Tech Week",
      date: "Oct 8",
      href: "https://us02web.zoom.us/webinar/register/WN_kf5vb4lnTWmpcHuIvCcVRg#/registration",
    },
    {
      title: "LA Tech Week",
      date: "Oct 15",
      href: "https://us02web.zoom.us/webinar/register/WN_8YtyQYHaToq_GA39diQXsw#/registration",
    },
  ];

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    var css = [
      "html{--agn-top-banner:69px;}",
      ".promo-banner{",
        "--promo-border:rgba(255,255,255,.2);",
        "--promo-bg-base:rgba(8,18,38,.92);",
        "--promo-bg:linear-gradient(180deg,rgba(108,181,251,.14) 0%,rgba(108,181,251,0) 100%);",
        "--promo-title:#1BFED1;",
        "--promo-title-hover:#6affe0;",
        "--promo-cta:#fff;",
        "--promo-cta-hover:#1BFED1;",
        "--promo-date:#fff;",
        "--promo-hover-bg:rgba(255,255,255,.05);",
        "--promo-hover-wash:linear-gradient(180deg,rgba(108,181,251,.22) 0%,rgba(27,254,209,.06) 100%);",
        "--promo-line:#1BFED1;",
        "position:fixed;top:0;left:0;right:0;z-index:10050;height:69px;",
        "display:flex;align-items:stretch;box-sizing:border-box;",
        "border-bottom:1px solid var(--promo-border);",
        "background-color:var(--promo-bg-base);",
        "background-image:var(--promo-bg);",
        "backdrop-filter:blur(10px) saturate(1.2);-webkit-backdrop-filter:blur(10px) saturate(1.2);",
        "-webkit-transform:translateZ(0);transform:translateZ(0);",
        "transition:background-color .4s ease,background-image .4s ease,border-color .4s ease,backdrop-filter .4s ease;",
        "font-family:'Poppins',system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;",
      "}",
      ".promo-banner.theme-light{",
        "--promo-border:rgba(11,27,56,.12);",
        "--promo-bg-base:rgba(255,255,255,.88);",
        "--promo-bg:linear-gradient(180deg,rgba(255,255,255,.82) 0%,rgba(255,255,255,.62) 100%);",
        "--promo-title:#0B9F88;",
        "--promo-title-hover:#063B6D;",
        "--promo-cta:#39465A;",
        "--promo-cta-hover:#11d5ae;",
        "--promo-date:#0B1B38;",
        "--promo-hover-bg:rgba(11,27,56,.04);",
        "--promo-hover-wash:linear-gradient(180deg,rgba(17,213,174,.14) 0%,rgba(11,27,56,.03) 100%);",
        "--promo-line:#11d5ae;",
        "backdrop-filter:blur(16px) saturate(1.35);-webkit-backdrop-filter:blur(16px) saturate(1.35);",
      "}",
      ".promo-banner-half{",
        "flex:1 1 0;min-width:0;display:flex;align-items:center;justify-content:space-between;gap:4px;",
        "padding:12px clamp(20px,5.5vw,80px);box-sizing:border-box;text-decoration:none;color:inherit;",
        "position:relative;isolation:isolate;overflow:hidden;cursor:pointer;",
        "transition:background .32s cubic-bezier(.16,.84,.44,1);",
      "}",
      ".promo-banner-half + .promo-banner-half{border-left:1px solid var(--promo-border);transition:border-color .4s ease;}",
      ".promo-banner-half::before{",
        "content:\"\";position:absolute;inset:0;z-index:0;pointer-events:none;opacity:0;",
        "background:var(--promo-hover-wash);",
        "transition:opacity .32s cubic-bezier(.16,.84,.44,1);",
      "}",
      ".promo-banner-half:hover::before,.promo-banner-half:focus-visible::before{opacity:1;}",
      ".promo-banner-half:hover,.promo-banner-half:focus-visible{outline:none;background:var(--promo-hover-bg);}",
      ".promo-banner-meta{",
        "position:relative;z-index:1;display:flex;flex-direction:column;align-items:flex-start;justify-content:center;",
        "min-width:0;flex:1 1 auto;",
      "}",
      ".promo-banner-title{",
        "font-family:inherit;font-weight:700;font-size:20px;line-height:24px;",
        "color:var(--promo-title);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%;",
        "transition:color .28s ease,transform .32s cubic-bezier(.16,.84,.44,1);",
      "}",
      ".promo-banner-half:hover .promo-banner-title,",
      ".promo-banner-half:focus-visible .promo-banner-title{color:var(--promo-title-hover);transform:translateY(-1px);}",
      ".promo-banner-cta{",
        "position:relative;display:inline-flex;align-items:center;gap:4px;overflow:hidden;",
        "font-family:inherit;font-weight:500;font-size:14px;line-height:1;",
        "color:var(--promo-cta);white-space:nowrap;padding:0 0 2px;",
        "transition:color .28s cubic-bezier(.16,.84,.44,1);",
      "}",
      ".promo-banner-cta svg{width:16px;height:16px;flex:0 0 auto;display:block;color:inherit;}",
      ".promo-banner-cta::after{",
        "content:\"\";position:absolute;bottom:0;left:-100%;width:100%;height:1px;background:var(--promo-line);",
        "transition:left .32s cubic-bezier(.16,.84,.44,1),background .4s ease;",
      "}",
      ".promo-banner-half:hover .promo-banner-cta,",
      ".promo-banner-half:focus-visible .promo-banner-cta{color:var(--promo-cta-hover);}",
      ".promo-banner-half:hover .promo-banner-cta::after,",
      ".promo-banner-half:focus-visible .promo-banner-cta::after{left:0;}",
      ".promo-banner-date{",
        "position:relative;z-index:1;flex:0 0 auto;",
        "font-family:inherit;font-weight:700;font-size:clamp(22px,2.2vw,32px);line-height:1.125;",
        "color:var(--promo-date);white-space:nowrap;",
        "transition:transform .32s cubic-bezier(.16,.84,.44,1),color .28s ease;",
      "}",
      ".promo-banner-half:hover .promo-banner-date,",
      ".promo-banner-half:focus-visible .promo-banner-date{transform:translateX(2px);}",
      /* Mobile — Figma 23099:5841 (390×63): title+CTA stack, date top-right 10px */
      "@media(max-width:960px){",
        "html{--agn-top-banner:calc(63px + env(safe-area-inset-top,0px));}",
        ".promo-banner{",
          "height:auto;min-height:63px;",
          "padding-top:env(safe-area-inset-top,0px);",
          "backdrop-filter:blur(2px);-webkit-backdrop-filter:blur(2px);",
        "}",
        ".promo-banner.theme-light{",
          "backdrop-filter:blur(8px) saturate(1.2);-webkit-backdrop-filter:blur(8px) saturate(1.2);",
        "}",
        ".promo-banner-half{",
          "align-items:flex-start;justify-content:space-between;gap:4px;",
          "padding:12px;min-height:63px;box-sizing:border-box;",
        "}",
        ".promo-banner-meta{flex:1 1 0;min-width:0;justify-content:center;}",
        ".promo-banner-title{",
          "font-size:12px;line-height:18px;font-weight:700;",
          "white-space:nowrap;overflow:hidden;text-overflow:ellipsis;",
        "}",
        ".promo-banner-half:hover .promo-banner-title,",
        ".promo-banner-half:focus-visible .promo-banner-title{transform:none;}",
        ".promo-banner-cta{font-size:14px;line-height:1;padding:0;display:inline-flex;}",
        ".promo-banner-cta svg{width:16px;height:16px;}",
        ".promo-banner-date{",
          "align-self:flex-start;padding-top:0;",
          "font-size:10px;line-height:15px;font-weight:700;",
        "}",
        ".promo-banner-half:hover .promo-banner-date,",
        ".promo-banner-half:focus-visible .promo-banner-date{transform:none;}",
      "}",
      "@media(prefers-reduced-motion:reduce){",
        ".promo-banner,.promo-banner-half,.promo-banner-half::before,.promo-banner-title,",
        ".promo-banner-cta,.promo-banner-cta::after,.promo-banner-date,",
        ".promo-banner-half + .promo-banner-half{transition:none !important;}",
      "}",
    ].join("");
    var style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = css;
    (document.head || document.documentElement).appendChild(style);
  }

  function halfHtml(ev) {
    return (
      '<a class="promo-banner-half" href="' +
      ev.href +
      '" target="_blank" rel="noopener noreferrer">' +
      '<span class="promo-banner-meta">' +
      '<span class="promo-banner-title">' +
      ev.title +
      "</span>" +
      '<span class="promo-banner-cta">Reserve your seat' +
      ARROW +
      "</span>" +
      "</span>" +
      '<span class="promo-banner-date">' +
      ev.date +
      "</span>" +
      "</a>"
    );
  }

  /* Portal on <body> — never move/remove in-page slots (that breaks Dark Component). */
  var PORTAL_ID = "agn-promo-banner-live";
  var _settled = false;

  function hidePageSlots() {
    var nodes = document.querySelectorAll("[data-promo-banner]");
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      if (n.id === PORTAL_ID) continue;
      n.setAttribute("data-promo-banner-slot", "");
      n.removeAttribute("data-promo-banner");
      n.removeAttribute("data-promo-banner-ready");
      n.removeAttribute("role");
      n.removeAttribute("aria-label");
      n.className = "";
      n.innerHTML = "";
      n.style.cssText =
        "display:none!important;height:0!important;margin:0!important;padding:0!important;border:0!important;overflow:hidden!important;";
    }
  }

  function getPortal() {
    var portal = document.getElementById(PORTAL_ID);
    if (!portal) {
      portal = document.createElement("div");
      portal.id = PORTAL_ID;
      portal.setAttribute("data-promo-banner", "");
      if (document.body) document.body.insertBefore(portal, document.body.firstChild);
    } else if (!portal.hasAttribute("data-promo-banner")) {
      portal.setAttribute("data-promo-banner", "");
    }
    return portal;
  }

  function mount(el) {
    if (!el) return;
    injectStyles();
    if (el.getAttribute("data-promo-banner-ready") && el.querySelector(".promo-banner-half")) return;
    el.classList.add("promo-banner", "theme-dark");
    el.setAttribute("role", "region");
    if (!el.getAttribute("aria-label")) el.setAttribute("aria-label", "Upcoming webinars");
    el.innerHTML = EVENTS.map(halfHtml).join("");
    el.setAttribute("data-promo-banner-ready", "1");
  }

  function autoMount() {
    if (!document.body) return;
    hidePageSlots();
    var el = getPortal();
    mount(el);
    if (el.getAttribute("data-promo-banner-ready") && el.querySelector(".promo-banner-half")) {
      _settled = true;
    }
  }

  var _moTimer = null;
  var mo = new MutationObserver(function () {
    if (_settled) {
      // Only neutralize newly re-inserted page slots — do not remount.
      if (_moTimer) return;
      _moTimer = setTimeout(function () {
        _moTimer = null;
        hidePageSlots();
      }, 80);
      return;
    }
    if (_moTimer) return;
    _moTimer = setTimeout(function () {
      _moTimer = null;
      autoMount();
    }, 40);
  });

  function boot() {
    autoMount();
    mo.observe(document.documentElement, { childList: true, subtree: true });
    // DC can remount shortly after first paint — give it a moment, then settle.
    setTimeout(function () {
      autoMount();
      _settled = true;
    }, 1200);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

  window.AzarianPromoBanner = { mount: mount, injectStyles: injectStyles };
})();
