/*
  Azarian · Plasma (vanilla WebGL2 port of reactbits Plasma).
  Usage:
    var stop = AzarianPlasma.mount(el, {
      color: '#1BFED1', speed: 0.5, direction: 'forward',
      scale: 2.4, opacity: 0.1, mouseInteractive: true,
      // Perf (defaults tuned for full-bleed hero backgrounds):
      maxDpr: 1, maxDim: 720, fps: 30, steps: 28
    });
*/
(function () {
  "use strict";
  if (window.AzarianPlasma) return;

  var VERT = [
    "#version 300 es",
    "precision highp float;",
    "in vec2 position;",
    "void main(){ gl_Position = vec4(position, 0.0, 1.0); }"
  ].join("\n");

  function buildFrag(steps) {
    var n = Math.max(12, Math.min(60, steps | 0 || 28));
    return [
      "#version 300 es",
      "precision highp float;",
      "uniform vec2 iResolution;",
      "uniform float iTime;",
      "uniform vec3 uCustomColor;",
      "uniform float uUseCustomColor;",
      "uniform float uSpeed;",
      "uniform float uDirection;",
      "uniform float uScale;",
      "uniform float uOpacity;",
      "uniform vec2 uMouse;",
      "uniform float uMouseInteractive;",
      "out vec4 fragColor;",
      "",
      "void mainImage(out vec4 o, vec2 C) {",
      "  vec2 center = iResolution.xy * 0.5;",
      "  C = (C - center) / uScale + center;",
      "  vec2 mouseOffset = (uMouse - center) * 0.0002;",
      "  C += mouseOffset * length(C - center) * step(0.5, uMouseInteractive);",
      "  float i, d, z, T = iTime * uSpeed * uDirection;",
      "  vec3 O, p, S;",
      "  for (vec2 r = iResolution.xy, Q; ++i < " + n + ".; O += o.w/d*o.xyz) {",
      "    p = z*normalize(vec3(C-.5*r,r.y));",
      "    p.z -= 4.;",
      "    S = p;",
      "    d = p.y-T;",
      "    p.x += .4*(1.+p.y)*sin(d + p.x*0.1)*cos(.34*d + p.x*0.05);",
      "    Q = p.xz *= mat2(cos(p.y+vec4(0,11,33,0)-T));",
      "    z+= d = abs(sqrt(length(Q*Q)) - .25*(5.+S.y))/3.+8e-4;",
      "    o = 1.+sin(S.y+p.z*.5+S.z-length(S-p)+vec4(2,1,0,8));",
      "  }",
      "  o.xyz = tanh(O/1e4);",
      "}",
      "",
      "bool finite1(float x){ return !(isnan(x) || isinf(x)); }",
      "vec3 sanitize(vec3 c){",
      "  return vec3(",
      "    finite1(c.r) ? c.r : 0.0,",
      "    finite1(c.g) ? c.g : 0.0,",
      "    finite1(c.b) ? c.b : 0.0",
      "  );",
      "}",
      "",
      "void main() {",
      "  vec4 o = vec4(0.0);",
      "  mainImage(o, gl_FragCoord.xy);",
      "  vec3 rgb = sanitize(o.rgb);",
      "  float intensity = (rgb.r + rgb.g + rgb.b) / 3.0;",
      "  vec3 customColor = intensity * uCustomColor;",
      "  vec3 finalColor = mix(rgb, customColor, step(0.5, uUseCustomColor));",
      "  float alpha = length(rgb) * uOpacity;",
      "  fragColor = vec4(finalColor, alpha);",
      "}"
    ].join("\n");
  }

  function hexToRgb(hex) {
    var m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex || "");
    if (!m) return [1, 0.5, 0.2];
    return [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255];
  }

  function compile(gl, type, src) {
    var sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      console.warn("[Plasma] shader compile:", gl.getShaderInfoLog(sh));
      gl.deleteShader(sh);
      return null;
    }
    return sh;
  }

  function mount(container, opts) {
    if (!container) return function () {};
    opts = opts || {};
    var color = opts.color != null ? opts.color : "#ffffff";
    var speed = opts.speed != null ? opts.speed : 1;
    var direction = opts.direction || "forward";
    var scale = opts.scale != null ? opts.scale : 1;
    var opacity = opts.opacity != null ? opts.opacity : 1;
    var mouseInteractive = opts.mouseInteractive !== false;
    var mouseTarget = opts.mouseTarget || container;
    var maxDpr = opts.maxDpr != null ? opts.maxDpr : 1;
    var maxDim = opts.maxDim != null ? opts.maxDim : 720;
    var fps = opts.fps != null ? opts.fps : 30;
    var steps = opts.steps != null ? opts.steps : 28;
    var frameInterval = 1000 / Math.max(12, Math.min(60, fps));

    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion:reduce)").matches) {
      return function () {};
    }

    var canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    canvas.style.cssText = "display:block;width:100%;height:100%;position:absolute;inset:0;pointer-events:none;";
    container.appendChild(canvas);

    var gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: false,
      premultipliedAlpha: true,
      powerPreference: "low-power",
      desynchronized: true,
    });
    if (!gl) {
      try { container.removeChild(canvas); } catch (e) {}
      return function () {};
    }

    var vs = compile(gl, gl.VERTEX_SHADER, VERT);
    var fs = compile(gl, gl.FRAGMENT_SHADER, buildFrag(steps));
    if (!vs || !fs) return function () {};

    var prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.bindAttribLocation(prog, 0, "position");
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn("[Plasma] program link:", gl.getProgramInfoLog(prog));
      return function () {};
    }
    gl.useProgram(prog);

    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,  3, -1,  -1, 3
    ]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    var uTime = gl.getUniformLocation(prog, "iTime");
    var uRes = gl.getUniformLocation(prog, "iResolution");
    var uColor = gl.getUniformLocation(prog, "uCustomColor");
    var uUseColor = gl.getUniformLocation(prog, "uUseCustomColor");
    var uSpeed = gl.getUniformLocation(prog, "uSpeed");
    var uDir = gl.getUniformLocation(prog, "uDirection");
    var uScale = gl.getUniformLocation(prog, "uScale");
    var uOpacity = gl.getUniformLocation(prog, "uOpacity");
    var uMouse = gl.getUniformLocation(prog, "uMouse");
    var uMouseOn = gl.getUniformLocation(prog, "uMouseInteractive");

    var rgb = hexToRgb(color);
    var dirMul = direction === "reverse" ? -1 : 1;
    gl.uniform3fv(uColor, new Float32Array(rgb));
    gl.uniform1f(uUseColor, color ? 1 : 0);
    gl.uniform1f(uSpeed, speed * 0.4);
    gl.uniform1f(uDir, dirMul);
    gl.uniform1f(uScale, scale);
    gl.uniform1f(uOpacity, opacity);
    gl.uniform1f(uMouseOn, mouseInteractive ? 1 : 0);
    gl.uniform2f(uMouse, 0, 0);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    var mouse = { x: 0, y: 0 };
    var dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
    var renderScale = 1;
    var raf = 0;
    var t0 = performance.now();
    var lastDraw = 0;
    var alive = true;
    var visible = true;
    var contextLost = false;

    function setSize() {
      var rect = container.getBoundingClientRect();
      var w = Math.max(1, Math.floor(rect.width));
      var h = Math.max(1, Math.floor(rect.height));
      var longest = Math.max(w, h);
      renderScale = longest > maxDim ? maxDim / longest : 1;
      var rw = Math.max(1, Math.floor(w * dpr * renderScale));
      var rh = Math.max(1, Math.floor(h * dpr * renderScale));
      if (canvas.width === rw && canvas.height === rh) return;
      canvas.width = rw;
      canvas.height = rh;
      gl.viewport(0, 0, rw, rh);
      gl.uniform2f(uRes, rw, rh);
    }

    function onMove(e) {
      if (!mouseInteractive) return;
      var rect = container.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      gl.uniform2f(uMouse, mouse.x * dpr * renderScale, mouse.y * dpr * renderScale);
    }

    function draw(t) {
      var timeValue = (t - t0) * 0.001;
      if (direction === "pingpong") {
        var pingpongDuration = 10;
        var segmentTime = timeValue % pingpongDuration;
        var isForward = Math.floor(timeValue / pingpongDuration) % 2 === 0;
        var u = segmentTime / pingpongDuration;
        var smooth = u * u * (3 - 2 * u);
        var pingpongTime = isForward ? smooth * pingpongDuration : (1 - smooth) * pingpongDuration;
        gl.uniform1f(uDir, 1);
        gl.uniform1f(uTime, pingpongTime);
      } else {
        gl.uniform1f(uTime, timeValue);
      }
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    function loop(t) {
      if (!alive || contextLost) return;
      if (!visible) {
        raf = 0;
        return;
      }
      if (t - lastDraw >= frameInterval) {
        lastDraw = t;
        draw(t);
      }
      raf = requestAnimationFrame(loop);
    }

    function startLoop() {
      if (!alive || contextLost || raf) return;
      raf = requestAnimationFrame(loop);
    }

    function onLost(e) {
      e.preventDefault();
      contextLost = true;
      cancelAnimationFrame(raf);
      raf = 0;
    }
    function onRestored() {
      contextLost = false;
      if (alive && visible) startLoop();
    }

    var ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(setSize) : null;
    if (ro) ro.observe(container);
    else window.addEventListener("resize", setSize);

    var io = typeof IntersectionObserver !== "undefined"
      ? new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            visible = entry.isIntersecting;
            if (visible) startLoop();
            else {
              cancelAnimationFrame(raf);
              raf = 0;
            }
          });
        }, { threshold: 0 })
      : null;
    if (io) io.observe(container);

    function onVisChange() {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (visible) {
        startLoop();
      }
    }
    document.addEventListener("visibilitychange", onVisChange);

    if (mouseInteractive && mouseTarget) mouseTarget.addEventListener("mousemove", onMove, { passive: true });
    canvas.addEventListener("webglcontextlost", onLost);
    canvas.addEventListener("webglcontextrestored", onRestored);

    setSize();
    startLoop();

    return function dispose() {
      alive = false;
      cancelAnimationFrame(raf);
      raf = 0;
      document.removeEventListener("visibilitychange", onVisChange);
      if (ro) ro.disconnect();
      if (io) io.disconnect();
      else window.removeEventListener("resize", setSize);
      if (mouseInteractive && mouseTarget) mouseTarget.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", onRestored);
      try { container.removeChild(canvas); } catch (e) {}
      try {
        gl.getExtension("WEBGL_lose_context") && gl.getExtension("WEBGL_lose_context").loseContext();
      } catch (e) {}
    };
  }

  window.AzarianPlasma = { mount: mount };
})();
