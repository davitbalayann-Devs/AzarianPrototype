/*
  Azarian Growth Agency — shared Contact / CTA section (single source of truth).

  Usage on any page:
    <section id="cta" data-agn-cta data-cursor-theme="dark"></section>
    <script src="./cta.js" defer></script>
  (Load after button.js so the submit CTA gets .agn-btn + magnetic.)
*/
(function () {
  "use strict";
  if (window.AzarianCta) return;

  var STYLE_ID = "agn-cta-styles";

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    var css = [
      "#cta.agn-cta,[data-agn-cta].agn-cta{",
        "position:relative;background:radial-gradient(120% 130% at 50% 120%,#12315e 0%,#0B1B38 50%,#081226 100%);",
        "padding:140px 40px;color:#fff;overflow:hidden;",
      "}",
      ".agn-cta-glow{position:absolute;inset:0;background:radial-gradient(60% 60% at 50% 0%,rgba(31,201,160,.12),transparent 70%);pointer-events:none;}",
      ".cf-wrap{position:relative;max-width:1000px;margin:0 auto;}",
      ".cf-head{text-align:center;max-width:760px;margin:0 auto;}",
      ".cf-title{margin:0;font-family:'Poppins',system-ui,sans-serif;font-weight:700;font-size:clamp(30px,4.4vw,48px);line-height:1.1;letter-spacing:-.02em;color:#fff;}",
      ".cf-sub{margin:16px auto 0;max-width:720px;font-family:'Poppins',system-ui,sans-serif;font-weight:400;font-size:clamp(15px,1.3vw,17px);line-height:1.6;color:#AEB9CC;}",
      ".cf-card{margin-top:clamp(30px,4vw,44px);background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.09);border-radius:28px;padding:clamp(24px,3vw,40px);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);display:flex;flex-direction:column;gap:20px;box-shadow:0 40px 90px -50px rgba(0,0,0,.7);}",
      ".cf-row{display:grid;grid-template-columns:1fr 1fr;gap:20px;}",
      ".cf-field{display:flex;flex-direction:column;gap:10px;}",
      ".cf-label{font-family:'Poppins',system-ui,sans-serif;font-weight:600;font-size:15px;color:#fff;}",
      ".cf-input,.cf-textarea{width:100%;box-sizing:border-box;border-radius:14px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.05);color:#fff;font-family:'Poppins',system-ui,sans-serif;font-size:15px;outline:none;transition:border-color .25s ease,background .25s ease;}",
      ".cf-input{height:54px;padding:0 18px;}",
      ".cf-textarea{padding:16px 18px;min-height:130px;resize:vertical;line-height:1.5;}",
      ".cf-input::placeholder,.cf-textarea::placeholder{color:#8894A5;}",
      ".cf-input:focus,.cf-textarea:focus{border-color:rgba(27,254,209,.55);background:rgba(255,255,255,.07);}",
      "#cta .agn-btn,.agn-cta .agn-btn{align-self:center;margin-top:6px;}",
      ".cf-note{margin:0;align-self:center;font-family:'Poppins',system-ui,sans-serif;font-weight:400;font-size:14px;line-height:1.4;color:#AEB9CC;text-align:center;}",
      "@media(max-width:960px){",
        "#cta.agn-cta,[data-agn-cta].agn-cta{padding:32px 16px !important;}",
        "#cta .cf-wrap,.agn-cta .cf-wrap{max-width:none;display:flex;flex-direction:column;gap:32px;}",
        "#cta .cf-head,.agn-cta .cf-head{max-width:none;}",
        "#cta .cf-title,.agn-cta .cf-title{font-size:20px;line-height:24px;letter-spacing:0;font-weight:700;}",
        "#cta .cf-sub,.agn-cta .cf-sub{margin:8px 0 0;max-width:none;font-size:12px;line-height:17px;color:#aeb9cc;}",
        "#cta .cf-card,.agn-cta .cf-card{margin-top:0;border-radius:20px;padding:24px 12px;gap:0;background:rgba(255,255,255,.1);border:none;box-shadow:none;backdrop-filter:blur(22px);-webkit-backdrop-filter:blur(22px);}",
        "#cta .cf-row,.agn-cta .cf-row{grid-template-columns:1fr;gap:14px;}",
        "#cta .cf-row + .cf-row,.agn-cta .cf-row + .cf-row{margin-top:14px;}",
        "#cta .cf-row + .cf-field,.agn-cta .cf-row + .cf-field{margin-top:14px;}",
        "#cta .cf-field,.agn-cta .cf-field{gap:3px;}",
        "#cta .cf-label,.agn-cta .cf-label{font-size:14px;font-weight:600;padding-left:16px;box-sizing:border-box;}",
        "#cta .cf-input,#cta .cf-textarea,.agn-cta .cf-input,.agn-cta .cf-textarea{border-radius:18px;border:1px solid rgba(205,228,252,.2);background:rgba(255,255,255,.06);font-size:12px;line-height:17px;}",
        "#cta .cf-input,.agn-cta .cf-input{height:50px;padding:0 16px;}",
        "#cta .cf-textarea,.agn-cta .cf-textarea{height:121px;min-height:121px;padding:16px;resize:none;}",
        "#cta .cf-input::placeholder,#cta .cf-textarea::placeholder,.agn-cta .cf-input::placeholder,.agn-cta .cf-textarea::placeholder{color:rgba(255,255,255,.5);}",
        "#cta .agn-btn,.agn-cta .agn-btn{align-self:stretch;width:100%;margin-top:20px;box-sizing:border-box;padding:16px 24px;font-size:16px;font-weight:600;color:#063b6d;box-shadow:0 12px 34px -10px rgba(31,201,160,.6);}",
        "#cta .cf-note,.agn-cta .cf-note{align-self:stretch;margin-top:12px;font-size:14px;line-height:normal;color:#aeb9cc;}",
      "}",
    ].join("");
    var style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = css;
    (document.head || document.documentElement).appendChild(style);
  }

  function wireForm(form) {
    if (!form || form.__agnCtaWired) return;
    form.__agnCtaWired = true;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      if (!btn) return;
      var prev = btn.textContent;
      btn.textContent = "Message sent — we'll be in touch";
      btn.disabled = true;
      setTimeout(function () {
        btn.textContent = prev;
        btn.disabled = false;
        form.reset();
      }, 4000);
    });
  }

  function mount(el) {
    if (!el || el.getAttribute("data-agn-cta-ready")) return;
    injectStyles();
    el.classList.add("agn-cta");
    if (!el.id) el.id = "cta";
    if (!el.getAttribute("data-cursor-theme")) el.setAttribute("data-cursor-theme", "dark");
    el.innerHTML =
      '<div class="agn-cta-glow" aria-hidden="true"></div>' +
      '<div class="cf-wrap">' +
        '<div class="cf-head" data-reveal data-reveal-delay="60" style="opacity:0;translate:0 28px;transition:opacity .7s cubic-bezier(.16,.84,.44,1),translate .7s cubic-bezier(.16,.84,.44,1);">' +
          '<h2 class="cf-title">Start with a conversation,<br>not a commitment</h2>' +
          '<p class="cf-sub">Every engagement begins with a 30-minute call where we listen to what you are dealing with and help you determine whether a Strategic Growth Diagnostic is the right next step. No pitch deck. No pressure.</p>' +
        "</div>" +
        '<form class="cf-card" data-contact-form data-reveal data-reveal-delay="140" style="opacity:0;translate:0 28px;transition:opacity .7s cubic-bezier(.16,.84,.44,1),translate .7s cubic-bezier(.16,.84,.44,1);">' +
          '<div class="cf-row">' +
            '<label class="cf-field"><span class="cf-label">First Name*</span><input class="cf-input" type="text" name="firstName" placeholder="Enter Your First Name" required></label>' +
            '<label class="cf-field"><span class="cf-label">Last Name*</span><input class="cf-input" type="text" name="lastName" placeholder="Enter Your Last Name" required></label>' +
          "</div>" +
          '<div class="cf-row">' +
            '<label class="cf-field"><span class="cf-label">Your Email*</span><input class="cf-input" type="email" name="email" placeholder="Enter Your Email" required></label>' +
            '<label class="cf-field"><span class="cf-label">Company Name *</span><input class="cf-input" type="text" name="company" placeholder="Enter Your Company Name" required></label>' +
          "</div>" +
          '<label class="cf-field"><span class="cf-label">Tell us more about your growth goals and challenges</span><textarea class="cf-textarea" name="message" placeholder="How can we help you?"></textarea></label>' +
          '<button class="agn-btn" type="submit" data-magnetic="true">Start the Conversation</button>' +
          '<p class="cf-note">We respond to every inquiry within one business day.</p>' +
        "</form>" +
      "</div>";
    el.setAttribute("data-agn-cta-ready", "1");
    wireForm(el.querySelector("[data-contact-form]"));
    if (window.AzarianButton && typeof window.AzarianButton.bindMagnetic === "function") {
      window.AzarianButton.bindMagnetic(el);
    }
    // Self-reveal: page setupScrollFx may have already stopped before we mounted.
    revealMount(el);
  }

  function revealMount(root) {
    var nodes = root.querySelectorAll("[data-reveal]");
    if (!nodes.length) return;
    var pending = Array.prototype.slice.call(nodes);
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      pending.forEach(function (el) {
        el.style.opacity = "1";
        el.style.translate = "0 0";
      });
      return;
    }
    var tick = function () {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      pending = pending.filter(function (el) {
        if (el.getBoundingClientRect().top < vh * 0.9) {
          var delay = parseInt(el.getAttribute("data-reveal-delay") || "0", 10);
          el.animate(
            [{ opacity: 0, translate: "0 28px" }, { opacity: 1, translate: "0 0" }],
            { duration: 720, delay: delay, easing: "cubic-bezier(.16,.84,.44,1)", fill: "forwards" }
          );
          return false;
        }
        return true;
      });
      if (pending.length) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  function autoMount() {
    var nodes = document.querySelectorAll("[data-agn-cta]");
    for (var i = 0; i < nodes.length; i++) mount(nodes[i]);
  }

  var mo = new MutationObserver(function () { autoMount(); });
  function boot() {
    autoMount();
    mo.observe(document.documentElement, { childList: true, subtree: true });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

  window.AzarianCta = { mount: mount, autoMount: autoMount };
})();
