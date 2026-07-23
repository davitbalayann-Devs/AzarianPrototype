/*
  Orbital Image Wheel — vanilla port of orbital-image-wheel.tsx
  Driven ONLY by HORIZONTAL scroll (trackpad side-swipe / Shift+wheel / mouse-drag).
  Vertical page scroll passes straight through — it never drives the wheel.
  Infinite loop: scroll position wraps by one empty cycle (no card DOM clones);
  start seated mid-track so both directions keep going forever.
*/
(function () {
  "use strict";
  if (window.AzarianOrbitalWheel) return;

  // Card aspect (Figma 507x314 — landscape).
  var CARD_RATIO = 314 / 507;
  // Phase offset: 0 => card index 0 is focused at scroll progress 0.
  var PHASE_OFFSET = 0;

  function clamp(v, lo, hi) { return Math.min(hi, Math.max(lo, v)); }

  function shortestAngleDistance(a, b) {
    var full = Math.PI * 2;
    var raw = ((a - b + Math.PI) % full) - Math.PI;
    return Math.abs(raw < -Math.PI ? raw + full : raw);
  }

  function applyScrollSensitivity(progress, sensitivity) {
    var s = clamp(sensitivity, 0.25, 1.6);
    return Math.pow(clamp(progress, 0, 1), 1 / s);
  }

  function getFocusedIndex(progress, total, turns, currentIndex, hysteresis) {
    if (total <= 0 || turns <= 0) return 0;
    var phaseRaw = total * (PHASE_OFFSET + progress * turns);
    var phase = ((phaseRaw % total) + total) % total;
    if (currentIndex < 0) return Math.round(phase) % total;
    var next = currentIndex;
    var delta = phase - next;
    if (delta > total / 2) delta -= total;
    if (delta < -total / 2) delta += total;
    var threshold = 0.5 + clamp(hysteresis == null ? 0.18 : hysteresis, 0, 0.35);
    while (delta > threshold) { next = (next + 1) % total; delta -= 1; }
    while (delta < -threshold) { next = (next - 1 + total) % total; delta += 1; }
    return next;
  }

  // Returns the RAW scroll progress (0..1) at which `index` is focused.
  // Inverts applyScrollSensitivity so a click lands on the exact card.
  function getSnapProgress(index, total, turns, sensitivity, currentProgress) {
    if (total <= 0 || turns <= 0) return clamp(currentProgress, 0, 1);
    var safe = ((index % total) + total) % total;
    var s = clamp(sensitivity, 0.25, 1.6);
    var nearest = clamp(currentProgress, 0, 1);
    var minDistance = Infinity;
    for (var cycle = Math.floor(-turns - 2); cycle <= Math.ceil(turns + 2); cycle++) {
      var appliedP = (safe / total + cycle - PHASE_OFFSET) / turns;
      if (appliedP < 0 || appliedP > 1) continue;
      var raw = Math.pow(appliedP, s);
      var distance = Math.abs(raw - currentProgress);
      if (distance < minDistance) { minDistance = distance; nearest = raw; }
    }
    if (!Number.isFinite(minDistance)) {
      var ap = clamp((safe / total - PHASE_OFFSET) / turns, 0, 1);
      return clamp(Math.pow(ap, s), 0, 1);
    }
    return nearest;
  }

  // Character-by-character reveal (mirrors <MotionSubtitle/>).
  // Words stay intact (only spaces break); the exiting line cross-fades in
  // place; total reveal is time-boxed so long descriptions don't crawl.
  function animateSubtitle(el, text, opts) {
    opts = opts || {};
    var direction = opts.direction === "bottom" ? "bottom" : "top";
    var speed = clamp(opts.speed == null ? 1 : opts.speed, 0.3, 3);
    var baseStagger = clamp(opts.stagger == null ? 0.014 : opts.stagger, 0, 0.08);
    var speedFactor = 1 / speed;
    var dirY = direction === "bottom" ? 10 : -10;
    var exitY = direction === "bottom" ? -3 : 3;

    el.style.position = "relative";

    var chars = Array.from(text || "");
    // Keep the whole line's reveal within ~0.62s no matter how long it is.
    var stagger = chars.length > 1 ? Math.min(baseStagger, 0.62 / chars.length) : baseStagger;

    var lives = el.querySelectorAll('[data-oiw-sub-live="live"]');
    Array.prototype.forEach.call(lives, function (prev) {
      prev.setAttribute("data-oiw-sub-live", "exit");
      prev.style.position = "absolute";
      prev.style.left = "0";
      prev.style.right = "0";
      prev.style.transition = "opacity " + (0.2 * speedFactor) + "s ease, transform " + (0.2 * speedFactor) + "s ease, filter " + (0.2 * speedFactor) + "s ease";
      prev.style.opacity = "0";
      prev.style.transform = "translateY(" + exitY + "px)";
      prev.style.filter = "blur(4px)";
      setTimeout(function () { try { prev.remove(); } catch (e) {} }, 260 * speedFactor);
    });

    var wrap = document.createElement("span");
    wrap.setAttribute("data-oiw-sub-live", "live");
    wrap.style.cssText = "display:block;text-align:center;white-space:normal;";
    var i = 0;
    var words = (text || "").split(" ");
    words.forEach(function (word, wi) {
      var wspan = document.createElement("span");
      wspan.style.cssText = "display:inline-block;white-space:nowrap;";
      Array.from(word).forEach(function (ch) {
        var s = document.createElement("span");
        s.textContent = ch;
        s.style.cssText = "display:inline-block;opacity:0;transform:translateY(" + dirY + "px);filter:blur(6px);";
        var idx = i;
        wspan.appendChild(s);
        requestAnimationFrame(function () {
          s.style.transition = "opacity " + (0.26 * speedFactor) + "s ease, transform " + (0.26 * speedFactor) + "s ease, filter " + (0.26 * speedFactor) + "s ease";
          s.style.transitionDelay = (idx * stagger * speedFactor) + "s";
          s.style.opacity = "1";
          s.style.transform = "translateY(0)";
          s.style.filter = "blur(0)";
        });
        i++;
      });
      wrap.appendChild(wspan);
      if (wi < words.length - 1) wrap.appendChild(document.createTextNode(" "));
    });
    el.appendChild(wrap);
  }

  function mount(root, images, userOpts) {
    if (!root || !images || !images.length) return function () {};
    var opts = userOpts || {};
    var turns = clamp(opts.turns == null ? 1 : opts.turns, 0.2, 4);
    var blur = clamp(opts.blur == null ? 4 : opts.blur, 0, 36);
    var dim = clamp(opts.dim == null ? 40 : opts.dim, 0, 100);
    var brightnessBoost = clamp(opts.brightnessBoost == null ? 30 : opts.brightnessBoost, 0, 120);
    var darknessStrength = clamp(opts.darknessStrength == null ? 1.05 : opts.darknessStrength, 0.2, 3);
    var minSaturation = clamp(opts.minSaturation == null ? 55 : opts.minSaturation, 0, 100);
    var saturationStrength = clamp(opts.saturationStrength == null ? 0.6 : opts.saturationStrength, 0.2, 3);
    var focusSpread = clamp(opts.focusSpread == null ? 0.34 : opts.focusSpread, 0.08, 0.8);
    var scaleEffect = clamp(opts.scaleEffect == null ? 0.06 : opts.scaleEffect, 0, 0.3);
    var scrollSensitivity = clamp(opts.scrollSensitivity == null ? 0.7 : opts.scrollSensitivity, 0.25, 1.6);
    var scrollPages = clamp(opts.scrollPages == null ? 3.4 : opts.scrollPages, 1.5, 8);
    var maxCardH = clamp(opts.maxCardHeight == null ? 400 : opts.maxCardHeight, 200, 620);
    // Empty scroll cycles (not DOM clones). Integer `turns` ⇒ progress 0 ≡ 1 visually,
    // so we can teleport scrollLeft by one cycle with no seam.
    var loopCycles = Math.max(3, Math.round(opts.loopCycles == null ? 3 : opts.loopCycles));
    turns = Math.max(1, Math.round(turns));

    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion:reduce)").matches;

    root.innerHTML = "";
    root.classList.add("oiw");

    var scroller = document.createElement("div");
    scroller.className = "oiw-scroller";
    scroller.setAttribute("data-oiw-scroller", "");
    scroller.setAttribute("tabindex", "0");
    scroller.setAttribute("role", "region");
    scroller.setAttribute("aria-label", "Our values — scroll sideways to explore");

    var rail = document.createElement("div");
    rail.className = "oiw-rail";

    var stage = document.createElement("div");
    stage.className = "oiw-stage";

    var head = document.createElement("h2");
    head.className = "oiw-heading";
    head.textContent = opts.heading || "What we believe, and how it shows up in the work";

    var viewport = document.createElement("div");
    viewport.className = "oiw-viewport";

    var wheel = document.createElement("div");
    wheel.className = "oiw-wheel";
    wheel.setAttribute("data-oiw-wheel", "");

    var wheelInner = document.createElement("div");
    wheelInner.className = "oiw-wheel-inner";

    images.forEach(function (img, i) {
      var fig = document.createElement("figure");
      fig.className = "oiw-item";
      fig.setAttribute("data-oiw-item", String(i));
      var media = document.createElement("div");
      media.className = "oiw-item-media";
      media.style.backgroundImage = "url(" + JSON.stringify(img.src).slice(1, -1) + ")";
      media.setAttribute("role", "img");
      media.setAttribute("aria-label", img.alt || img.label || ("Image " + (i + 1)));
      fig.appendChild(media);
      wheelInner.appendChild(fig);
    });
    wheel.appendChild(wheelInner);
    viewport.appendChild(wheel);

    var caption = document.createElement("div");
    caption.className = "oiw-caption";

    var sub = document.createElement("div");
    sub.className = "oiw-subtitle";
    sub.setAttribute("data-oiw-sub", "");
    sub.setAttribute("aria-live", "polite");

    var pillsViewport = document.createElement("div");
    pillsViewport.className = "oiw-pills-viewport";

    var pillsTrack = document.createElement("div");
    pillsTrack.className = "oiw-pills-track";
    pillsTrack.setAttribute("data-oiw-pills", "");

    var startPad = document.createElement("span");
    startPad.className = "oiw-pill-pad";
    startPad.setAttribute("aria-hidden", "true");
    pillsTrack.appendChild(startPad);

    images.forEach(function (img, i) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "oiw-pill";
      btn.setAttribute("data-oiw-pill", String(i));
      btn.textContent = img.label || img.alt || ("Value " + (i + 1));
      pillsTrack.appendChild(btn);
    });

    var endPad = document.createElement("span");
    endPad.className = "oiw-pill-pad";
    endPad.setAttribute("aria-hidden", "true");
    pillsTrack.appendChild(endPad);

    pillsViewport.appendChild(pillsTrack);
    caption.appendChild(sub);
    caption.appendChild(pillsViewport);

    stage.appendChild(head);
    stage.appendChild(viewport);
    stage.appendChild(caption);
    rail.appendChild(stage);
    scroller.appendChild(rail);
    root.appendChild(scroller);

    // Off-screen measurer used to reserve worst-case caption height so the
    // focused card never collides with the longest subtitle.
    var measurer = document.createElement("div");
    measurer.setAttribute("aria-hidden", "true");
    measurer.style.cssText = "position:absolute;left:-99999px;top:0;visibility:hidden;pointer-events:none;";
    stage.appendChild(measurer);

    var longestSub = images.reduce(function (a, img) {
      var t = img.subtitle || img.alt || "";
      return t.length > a.length ? t : a;
    }, "");

    var cards = Array.prototype.slice.call(wheel.querySelectorAll(".oiw-item"));
    var pills = Array.prototype.slice.call(pillsTrack.querySelectorAll(".oiw-pill"));
    var previousActive = -1;
    var activeIndex = 0;
    var animatingScroll = false;
    var scrollTween = null;
    // Geometry computed by layout(), consumed by applyState().
    var geo = { radius: 800, itemW: 380, itemH: 235, focusCenterY: 300, cyclePx: 0 };

    function subtitleWidth(vw) { return Math.min(900, Math.max(240, vw * 0.9)); }

    function measureCaptionHeight(vw) {
      var cs = window.getComputedStyle(sub);
      measurer.style.width = subtitleWidth(vw) + "px";
      measurer.style.fontFamily = cs.fontFamily;
      measurer.style.fontSize = cs.fontSize;
      measurer.style.fontWeight = cs.fontWeight;
      measurer.style.lineHeight = cs.lineHeight;
      measurer.style.padding = "0 20px";
      measurer.style.boxSizing = "border-box";
      measurer.style.whiteSpace = "normal";
      measurer.style.textAlign = "center";
      measurer.textContent = longestSub;
      var subH = measurer.offsetHeight || 44;
      var pillsH = pillsViewport.offsetHeight || 58;
      return subH + pillsH;
    }

    function layout() {
      var vw = stage.clientWidth || window.innerWidth || 1200;
      var vh = stage.clientHeight || window.innerHeight || 800;

      // One visual lap = scrollPages × viewport. Repeat empty track N times for
      // infinite wrap headroom (no duplicated cards — phase already mods by N).
      var cyclePx = Math.max(1, Math.round(vw * scrollPages));
      rail.style.width = (vw + cyclePx * loopCycles) + "px";
      geo.cyclePx = cyclePx;

      // --- Bottom band: caption (worst-case subtitle) + pills ---
      var captionBottom = clamp(vh * 0.035, 16, 48);
      var captionGap = clamp(vh * 0.022, 14, 24);
      caption.style.bottom = captionBottom + "px";
      caption.style.gap = captionGap + "px";
      var captionContentH = measureCaptionHeight(vw);
      var safety = clamp(vh * 0.02, 8, 22);
      var captionBand = captionBottom + captionContentH + safety;

      // --- Top band: heading (measured, wraps naturally) ---
      var headingBand = head.offsetTop + head.offsetHeight;
      var topGap = clamp(vh * 0.02, 8, 26);
      var availTop = headingBand + topGap;
      var availBottom = vh - captionBand;
      var availH = Math.max(120, availBottom - availTop);

      // --- Card size: fill the available band, capped, then width-clamped ---
      var itemH = clamp(Math.min(availH, maxCardH), 150, maxCardH);
      var itemW = itemH / CARD_RATIO;
      var maxW = vw * 0.9;
      if (itemW > maxW) { itemW = maxW; itemH = itemW * CARD_RATIO; }

      // Focus (top) card, biased slightly up within the free band.
      var slack = Math.max(0, availH - itemH);
      var focusCenterY = availTop + itemH / 2 + slack * 0.42;

      // Radius controls how far neighbours fan out to the sides / below.
      var radius = clamp(Math.max(vw * 0.6, itemW * 1.75), 460, 1600);
      var wheelSize = radius * 2;

      geo.radius = radius;
      geo.itemW = itemW;
      geo.itemH = itemH;
      geo.focusCenterY = focusCenterY;

      // Wheel: top edge at focusCenterY => the top card's centre lands there.
      wheel.style.width = wheelSize + "px";
      wheel.style.height = wheelSize + "px";
      wheel.style.top = focusCenterY + "px";
      wheel.style.bottom = "auto";

      cards.forEach(function (card) {
        card.style.width = itemW + "px";
        card.style.height = itemH + "px";
      });
    }

    var wrappingScroll = false;

    function cycleLength() {
      if (geo.cyclePx) return geo.cyclePx;
      var max = Math.max(1, scroller.scrollWidth - scroller.clientWidth);
      return Math.max(1, max / loopCycles);
    }

    // Keep scrollLeft inside the middle band so both directions stay infinite.
    // Teleport by exactly one cycle — visuals match because turns is integer.
    function wrapScrollIfNeeded() {
      if (wrappingScroll) return false;
      var cycle = cycleLength();
      var max = Math.max(1, scroller.scrollWidth - scroller.clientWidth);
      var left = scroller.scrollLeft;
      var lo = cycle * 0.55;
      var hi = max - cycle * 0.55;
      if (left < lo) {
        wrappingScroll = true;
        scroller.scrollLeft = left + cycle;
        wrappingScroll = false;
        return true;
      }
      if (left > hi) {
        wrappingScroll = true;
        scroller.scrollLeft = left - cycle;
        wrappingScroll = false;
        return true;
      }
      return false;
    }

    function progressFromScroll() {
      var cycle = cycleLength();
      var within = ((scroller.scrollLeft % cycle) + cycle) % cycle;
      return within / cycle;
    }

    function scrollBaseForProgress() {
      var cycle = cycleLength();
      var cur = scroller.scrollLeft;
      var base = Math.floor(cur / cycle) * cycle;
      var minBase = cycle;
      var maxBase = cycle * (loopCycles - 2);
      if (base < minBase) base = minBase;
      if (base > maxBase) base = maxBase;
      return base;
    }

    function setScrollProgress(p, animate) {
      var cycle = cycleLength();
      var target = scrollBaseForProgress() + clamp(p, 0, 1) * cycle;
      if (!animate || reduce) {
        wrappingScroll = true;
        scroller.scrollLeft = target;
        wrappingScroll = false;
        applyState(progressFromScroll());
        return;
      }
      if (scrollTween) cancelAnimationFrame(scrollTween);
      animatingScroll = true;
      var from = scroller.scrollLeft;
      var t0 = performance.now();
      var dur = 580;
      function step(now) {
        var t = clamp((now - t0) / dur, 0, 1);
        var e = 1 - Math.pow(1 - t, 3);
        wrappingScroll = true;
        scroller.scrollLeft = from + (target - from) * e;
        wrappingScroll = false;
        applyState(progressFromScroll());
        if (t < 1) scrollTween = requestAnimationFrame(step);
        else {
          animatingScroll = false;
          wrapScrollIfNeeded();
        }
      }
      scrollTween = requestAnimationFrame(step);
    }

    function centerPills(index) {
      var first = pills[0];
      var last = pills[pills.length - 1];
      var active = pills[index];
      if (!first || !last || !active) return;
      var vpW = pillsViewport.clientWidth;
      startPad.style.width = Math.max(0, vpW / 2 - first.offsetWidth / 2) + "px";
      endPad.style.width = Math.max(0, vpW / 2 - last.offsetWidth / 2) + "px";
      var activeCenter = active.offsetLeft + active.offsetWidth / 2;
      var targetX = Math.round(vpW / 2 - activeCenter);
      if (pillsTrack.scrollWidth <= vpW) {
        targetX = Math.round((vpW - pillsTrack.scrollWidth) / 2);
      } else {
        var minX = vpW - pillsTrack.scrollWidth;
        targetX = Math.round(clamp(targetX, minX, 0));
      }
      pillsTrack.style.transform = "translate3d(" + targetX + "px,0,0)";
      pills.forEach(function (btn, i) {
        var dist = Math.abs(i - index);
        btn.classList.toggle("is-active", i === index);
        btn.style.opacity = dist === 0 ? "1" : dist === 1 ? "0.7" : dist === 2 ? "0.45" : "0.28";
        btn.style.transform = dist === 0 ? "scale(1)" : "scale(0.96)";
        btn.setAttribute("aria-current", i === index ? "true" : "false");
      });
    }

    function applyState(rawProgress) {
      var R = geo.radius;
      var p = applyScrollSensitivity(rawProgress, scrollSensitivity);
      var rotation = -p * turns * Math.PI * 2;
      var focusedIndex = getFocusedIndex(p, cards.length, turns, previousActive);
      var topAnchor = -Math.PI / 2;
      var focusArc = Math.PI * focusSpread;

      cards.forEach(function (card, index) {
        var base = (index / cards.length) * Math.PI * 2 - Math.PI / 2;
        var theta = base + rotation;
        var x = Math.cos(theta) * R;
        var y = Math.sin(theta) * R;
        var distanceToFocus = shortestAngleDistance(theta, topAnchor);
        var focusIntensity = clamp(distanceToFocus / focusArc, 0, 1);
        var darkIntensity = clamp(focusIntensity * darknessStrength, 0, 1);
        var saturationIntensity = clamp(focusIntensity * saturationStrength, 0, 1);
        var currentBlur = darkIntensity * blur;
        var peakBrightness = clamp(100 + brightnessBoost, 100, 220);
        var currentBrightness = dim + (1 - darkIntensity) * (peakBrightness - dim);
        var currentSaturation = minSaturation + (1 - saturationIntensity) * (100 - minSaturation);
        var currentScale = 1 - darkIntensity * scaleEffect;
        var drift = clamp(x / R, -1, 1);
        var tilt = drift * 8;
        var depth = clamp((1 - focusIntensity) * 100, 0, 100);

        card.style.transform =
          "translate3d(" + x.toFixed(2) + "px," + y.toFixed(2) + "px,0) translate(-50%,-50%) rotate(" +
          tilt.toFixed(2) + "deg) scale(" + currentScale.toFixed(4) + ")";
        card.style.filter =
          "blur(" + currentBlur.toFixed(2) + "px) brightness(" + currentBrightness.toFixed(1) +
          "%) saturate(" + currentSaturation.toFixed(1) + "%)";
        card.style.zIndex = String(Math.round(depth));
      });

      // During a pill-click tween the caption/pill target is set up-front in
      // onPillClick; only rotate the wheel here (no intermediate churn).
      // During manual scroll (drag / native pan) update the caption live.
      if (!animatingScroll && focusedIndex !== previousActive) {
        previousActive = focusedIndex;
        activeIndex = focusedIndex;
        var img = images[focusedIndex];
        animateSubtitle(sub, img.subtitle || img.alt || "", { direction: "top", speed: 1, stagger: 0.012 });
        centerPills(focusedIndex);
      }
    }

    function onPillClick(i) {
      var cur = progressFromScroll();
      var target = getSnapProgress(i, images.length, turns, scrollSensitivity, cur);
      previousActive = i;
      activeIndex = i;
      var img = images[i];
      animateSubtitle(sub, img.subtitle || img.alt || "", { direction: "top", speed: 1, stagger: 0.012 });
      centerPills(i);
      setScrollProgress(target, true);
    }

    pills.forEach(function (btn, i) {
      btn.addEventListener("click", function () { onPillClick(i); });
    });

    function onScroll() {
      if (wrappingScroll) return;
      wrapScrollIfNeeded();
      if (!animatingScroll) applyState(progressFromScroll());
    }

    // Mouse drag → horizontal scroll (touch uses native pan-x; wheel stays vertical/page).
    var dragging = false, dragStartX = 0, dragStartScroll = 0, dragPointer = null;
    function onPointerDown(e) {
      if (e.pointerType && e.pointerType !== "mouse") return;
      if (e.target && e.target.closest && e.target.closest(".oiw-pills-viewport")) return;
      dragging = true;
      dragStartX = e.clientX;
      dragStartScroll = scroller.scrollLeft;
      dragPointer = e.pointerId;
      if (scrollTween) { cancelAnimationFrame(scrollTween); animatingScroll = false; }
      try { scroller.setPointerCapture(e.pointerId); } catch (_) {}
      scroller.classList.add("is-grabbing");
    }
    function onPointerMove(e) {
      if (!dragging) return;
      wrappingScroll = true;
      scroller.scrollLeft = dragStartScroll - (e.clientX - dragStartX);
      wrappingScroll = false;
      if (wrapScrollIfNeeded()) {
        dragStartScroll = scroller.scrollLeft;
        dragStartX = e.clientX;
      }
      applyState(progressFromScroll());
    }
    function onPointerUp() {
      if (!dragging) return;
      dragging = false;
      scroller.classList.remove("is-grabbing");
      try { scroller.releasePointerCapture(dragPointer); } catch (_) {}
      wrapScrollIfNeeded();
    }

    // Keyboard access (left/right when the region is focused) — wraps forever.
    function onKey(e) {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      e.preventDefault();
      var dir = e.key === "ArrowRight" ? 1 : -1;
      var next = (activeIndex + dir + images.length) % images.length;
      onPillClick(next);
    }

    var resizeRaf = null;
    function onResize() {
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(function () {
        var p = progressFromScroll();
        layout();
        // Re-seat in the middle cycle at the same modular progress.
        wrappingScroll = true;
        scroller.scrollLeft = cycleLength() + p * cycleLength();
        wrappingScroll = false;
        applyState(progressFromScroll());
        centerPills(activeIndex);
      });
    }

    layout();
    // Start mid-loop so both directions are immediately infinite.
    wrappingScroll = true;
    scroller.scrollLeft = cycleLength() + cycleLength() * 0.5;
    wrappingScroll = false;
    previousActive = -1;
    applyState(progressFromScroll());

    scroller.addEventListener("scroll", onScroll, { passive: true });
    scroller.addEventListener("pointerdown", onPointerDown);
    scroller.addEventListener("pointermove", onPointerMove);
    scroller.addEventListener("pointerup", onPointerUp);
    scroller.addEventListener("pointercancel", onPointerUp);
    scroller.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () { onResize(); });
    }

    return function dispose() {
      scroller.removeEventListener("scroll", onScroll);
      scroller.removeEventListener("pointerdown", onPointerDown);
      scroller.removeEventListener("pointermove", onPointerMove);
      scroller.removeEventListener("pointerup", onPointerUp);
      scroller.removeEventListener("pointercancel", onPointerUp);
      scroller.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      if (scrollTween) cancelAnimationFrame(scrollTween);
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
    };
  }

  window.AzarianOrbitalWheel = { mount: mount };
})();
