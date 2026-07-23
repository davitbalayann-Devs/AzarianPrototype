/*
  Glass Surface — vanilla port of the GlassSurface React component.
  Applies an SVG chromatic-displacement backdrop-filter (real refractive glass)
  on Chromium; falls back to blur+saturate elsewhere. Returns { dispose, update }.
*/
(function () {
  "use strict";
  if (window.AzarianGlass) return;

  var uid = 0;

  function supportsSVGFilters() {
    if (typeof window === "undefined" || typeof document === "undefined") return false;
    var ua = navigator.userAgent;
    var isWebkit = /Safari/.test(ua) && !/Chrome/.test(ua) && !/Chromium/.test(ua);
    var isFirefox = /Firefox/.test(ua);
    if (isWebkit || isFirefox) return false;
    var div = document.createElement("div");
    div.style.backdropFilter = "url(#x)";
    return div.style.backdropFilter !== "";
  }
  var SVG_OK = supportsSVGFilters();

  function displacementMap(w, h, radius, o) {
    var edge = Math.min(w, h) * (o.borderWidth * 0.5);
    var svg =
      '<svg viewBox="0 0 ' + w + " " + h + '" xmlns="http://www.w3.org/2000/svg">' +
      "<defs>" +
      '<linearGradient id="r" x1="100%" y1="0%" x2="0%" y2="0%"><stop offset="0%" stop-color="#0000"/><stop offset="100%" stop-color="red"/></linearGradient>' +
      '<linearGradient id="b" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#0000"/><stop offset="100%" stop-color="blue"/></linearGradient>' +
      "</defs>" +
      '<rect x="0" y="0" width="' + w + '" height="' + h + '" fill="black"/>' +
      '<rect x="0" y="0" width="' + w + '" height="' + h + '" rx="' + radius + '" fill="url(#r)"/>' +
      '<rect x="0" y="0" width="' + w + '" height="' + h + '" rx="' + radius + '" fill="url(#b)" style="mix-blend-mode:' + o.mixBlendMode + '"/>' +
      '<rect x="' + edge + '" y="' + edge + '" width="' + (w - edge * 2) + '" height="' + (h - edge * 2) + '" rx="' + radius + '" fill="hsl(0 0% ' + o.brightness + "% / " + o.opacity + ')" style="filter:blur(' + o.blur + 'px)"/>' +
      "</svg>";
    return "data:image/svg+xml," + encodeURIComponent(svg);
  }

  function apply(el, userOpts) {
    var o = Object.assign(
      {
        borderRadius: 40, borderWidth: 0.07, brightness: 50, opacity: 0.93, blur: 11,
        displace: 0.4, saturation: 1, distortionScale: -140,
        redOffset: 0, greenOffset: 10, blueOffset: 20, xChannel: "R", yChannel: "G",
        mixBlendMode: "difference",
      },
      userOpts || {}
    );

    el.classList.add("glass-surface", SVG_OK ? "glass-surface--svg" : "glass-surface--fallback");
    el.style.setProperty("--glass-saturation", o.saturation);

    if (!SVG_OK) {
      return {
        update: function () {},
        setRadius: function () {},
        dispose: function () {
          el.classList.remove("glass-surface", "glass-surface--svg", "glass-surface--fallback");
        },
      };
    }

    var id = "agn-glass-" + ++uid;
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("aria-hidden", "true");
    svg.style.cssText = "position:absolute;width:0;height:0;overflow:hidden;pointer-events:none;";
    svg.innerHTML =
      '<defs><filter id="' + id + '" color-interpolation-filters="sRGB" x="0%" y="0%" width="100%" height="100%">' +
      '<feImage x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="map"/>' +
      '<feDisplacementMap in="SourceGraphic" in2="map" result="dR"/>' +
      '<feColorMatrix in="dR" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="R"/>' +
      '<feDisplacementMap in="SourceGraphic" in2="map" result="dG"/>' +
      '<feColorMatrix in="dG" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="G"/>' +
      '<feDisplacementMap in="SourceGraphic" in2="map" result="dB"/>' +
      '<feColorMatrix in="dB" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="B"/>' +
      '<feBlend in="R" in2="G" mode="screen" result="RG"/>' +
      '<feBlend in="RG" in2="B" mode="screen" result="out"/>' +
      '<feGaussianBlur in="out" stdDeviation="' + o.displace + '"/>' +
      "</filter></defs>";
    document.body.appendChild(svg);

    var feImage = svg.querySelector("feImage");
    var disps = svg.querySelectorAll("feDisplacementMap");
    var offsets = [o.redOffset, o.greenOffset, o.blueOffset];
    for (var i = 0; i < disps.length; i++) {
      disps[i].setAttribute("scale", String(o.distortionScale + offsets[i]));
      disps[i].setAttribute("xChannelSelector", o.xChannel);
      disps[i].setAttribute("yChannelSelector", o.yChannel);
    }

    el.style.backdropFilter = "url(#" + id + ") saturate(" + o.saturation + ")";
    el.style.webkitBackdropFilter = "url(#" + id + ") saturate(" + o.saturation + ")";

    var curRadius = o.borderRadius;
    function update() {
      var rect = el.getBoundingClientRect();
      var w = Math.max(1, Math.round(rect.width)) || 300;
      var h = Math.max(1, Math.round(rect.height)) || 200;
      var href = displacementMap(w, h, Math.min(curRadius, Math.min(w, h) / 2), o);
      feImage.setAttribute("href", href);
      feImage.setAttributeNS("http://www.w3.org/1999/xlink", "href", href);
    }
    function setRadius(r) { curRadius = r; update(); }
    update();

    var ro = null;
    if (window.ResizeObserver) {
      ro = new ResizeObserver(function () { update(); });
      ro.observe(el);
    }

    return {
      update: update,
      setRadius: setRadius,
      dispose: function () {
        if (ro) ro.disconnect();
        try { svg.remove(); } catch (e) {}
        el.style.backdropFilter = "";
        el.style.webkitBackdropFilter = "";
        el.classList.remove("glass-surface", "glass-surface--svg", "glass-surface--fallback");
      },
    };
  }

  window.AzarianGlass = { apply: apply, supported: SVG_OK };
})();
