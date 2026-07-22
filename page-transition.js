/* ============================================================================
   Azarian · Page-transition overlay
   A full-screen "staggered wipe" inspired by React Bits' Staggered Menu
   open/close animation (the layered panels), repurposed as a page transition.

   Flow:
     • Click an internal link  → panels sweep IN from the right (staggered),
       covering the whole screen, then the browser navigates.
     • On the new page's load   → panels sweep OUT to the left (staggered),
       uncovering the freshly-loaded page.

   Each panel is COLOURED FROSTED GLASS: a translucent brand tint plus a
   backdrop blur, so mid-transition you see the page behind blurred through the
   colour instead of a flat opaque block.

   Vanilla JS + Web Animations API — no dependencies. Shared by every page
   (loaded from the <head> of each .dc.html), so the cover on the leaving page
   and the reveal on the arriving page are two halves of one continuous wipe.
   ========================================================================== */
(function () {
  'use strict';
  if (window.__agnPageTransition) return;
  window.__agnPageTransition = true;

  // back layer → front layer. Translucent GRADIENTS built on the SAME radial
  // shape as the Home-page hero (ellipse 120% 110% at 80% 0%, #12315e→#0B1B38→
  // #081226): the front/main panel is that exact hero gradient; the two behind it
  // reuse the same shape with a teal / hero-purple tint at the origin. With the
  // backdrop blur (in CSS) each reads as coloured frosted glass.
  var COLORS = [
    'radial-gradient(ellipse 120% 110% at 80% 0%, rgba(31,201,160,0.52) 0%, rgba(16,70,96,0.56) 55%, rgba(8,18,38,0.6) 100%)',
    'radial-gradient(ellipse 120% 110% at 80% 0%, rgba(43,33,112,0.62) 0%, rgba(20,26,71,0.66) 55%, rgba(8,18,38,0.7) 100%)',
    'radial-gradient(ellipse 120% 110% at 80% 0%, rgba(18,49,94,0.72) 0%, rgba(11,27,56,0.74) 55%, rgba(8,18,38,0.76) 100%)'
  ];
  var DUR = 390;      // per-panel travel time (ms)
  var STAGGER = 140;  // delay between panels on COVER (staggered sweep in)
  var REVEAL_STAGGER = 60; // delay between panels on REVEAL — tiny, so they leave near-simultaneously
  var EASE = 'cubic-bezier(.16,1,.3,1)'; // ≈ GSAP power4.out
  var FLAG = 'agn-pt-reveal';
  var OFF = 'translateX(101%)';  // parked off-screen right (1% guards seams)
  var COVER = 'translateX(0%)';
  var GONE = 'translateX(-101%)'; // exited off-screen left

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion:reduce)').matches;

  // ---- styles ----
  var style = document.createElement('style');
  style.textContent =
    '.agn-pt{position:fixed;inset:0;z-index:2147483000;pointer-events:none;overflow:hidden;}' +
    '.agn-pt.is-active{pointer-events:auto;}' +
    '.agn-pt__panel{position:absolute;inset:0;transform:translateX(101%);opacity:0;' +
      'backdrop-filter:blur(22px) saturate(1.2);-webkit-backdrop-filter:blur(22px) saturate(1.2);' +
      'will-change:transform,opacity;}';
  (document.head || document.documentElement).appendChild(style);

  // ---- overlay DOM ----
  var overlay = document.createElement('div');
  overlay.className = 'agn-pt';
  overlay.setAttribute('aria-hidden', 'true');
  var panels = COLORS.map(function (c, i) {
    var p = document.createElement('div');
    p.className = 'agn-pt__panel';
    p.style.background = c;
    p.style.zIndex = String(i + 1);
    overlay.appendChild(p);
    return p;
  });
  var LAST = panels.length - 1;

  function mount() {
    var host = document.body || document.documentElement;
    if (overlay.parentNode !== host) host.appendChild(overlay);
  }
  function park() {
    overlay.classList.remove('is-active');
    panels.forEach(function (p) { p.style.transform = OFF; p.style.opacity = '0'; });
  }
  function setCovered() {
    overlay.classList.add('is-active');
    panels.forEach(function (p) { p.style.transform = COVER; p.style.opacity = '1'; });
  }
  mount();

  // ---- cover: frosted panels sweep in from the right, then `done` ----
  function cover(done) {
    mount();
    overlay.classList.add('is-active');
    if (reduce) { setCovered(); done && done(); return; }
    var finished = false;
    var finish = function () { if (finished) return; finished = true; done && done(); };
    panels.forEach(function (p, i) {
      var a = p.animate([
        { transform: OFF, opacity: 0 },
        { transform: COVER, opacity: 1 }
      ], { duration: DUR, delay: i * STAGGER, easing: EASE, fill: 'forwards' });
      if (i === LAST) a.onfinish = finish;
    });
    setTimeout(finish, DUR + STAGGER * LAST + 140); // safety net
  }

  // ---- reveal: frosted panels exit to the left almost together (tiny stagger) ----
  function reveal() {
    mount();
    if (reduce) { park(); return; }
    setCovered();
    void overlay.offsetWidth; // flush the covered state before animating out
    panels.forEach(function (p, i) {
      var a = p.animate([
        { transform: COVER, opacity: 1 },
        { transform: GONE, opacity: 0 }
      ], { duration: DUR, delay: (LAST - i) * REVEAL_STAGGER, easing: EASE, fill: 'forwards' });
      if (i === 0) a.onfinish = park; // index 0 leaves last → clean up then
    });
  }

  // ---- navigation ----
  var navigating = false;
  function go(href) {
    if (navigating) return;
    navigating = true;
    cover(function () {
      try { sessionStorage.setItem(FLAG, '1'); } catch (e) {}
      window.location.href = href;
    });
  }
  window.__agnPageGo = go; // exposed so other scripts can trigger the same wipe

  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a || a.hasAttribute('download')) return;
    if (a.target && a.target !== '_self' && a.target !== '') return;
    var raw = a.getAttribute('href');
    if (!raw || raw.charAt(0) === '#' || /^(mailto:|tel:|javascript:)/i.test(raw)) return;
    var url;
    try { url = new URL(raw, window.location.href); } catch (err) { return; }
    if (url.origin !== window.location.origin) return;     // external link
    if (url.pathname === window.location.pathname) return;  // same page (let hash/scroll work)
    // internal page navigation → play the wipe
    e.preventDefault();
    e.stopImmediatePropagation(); // beat other click handlers (e.g. the nav logo)
    go(url.href);
  }, true);

  // ---- arrival: if we came here through the wipe, cover instantly then reveal ----
  var flagged = false;
  try { flagged = sessionStorage.getItem(FLAG) === '1'; } catch (e) {}
  if (flagged) {
    try { sessionStorage.removeItem(FLAG); } catch (e) {}
    setCovered(); // hide the loading/rendering page immediately
    var revealed = false;
    var doReveal = function () { if (revealed) return; revealed = true; reveal(); };
    var schedule = function () { requestAnimationFrame(function () { setTimeout(doReveal, 96); }); };
    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule);
    setTimeout(doReveal, 1600); // fallback if load is slow / already fired
  }
})();
