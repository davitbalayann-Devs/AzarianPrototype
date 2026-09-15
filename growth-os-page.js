/* ============================================================================
 * Azarian Growth Agency — Growth OS page
 * Dedicated platform page: hero console · stats · model shift · agents ·
 * supervision · effect · in practice · for PE · close CTA.
 * ============================================================================ */
(function () {
  "use strict";

  var ACCENT = "#1BFED1";
  var AGENTS = [
    { cat: "market", tag: "MARKET INTEL", t: "Market Intelligence", b: "Scans funding events, acquisitions, and competitor moves across your portfolio in real time." },
    { cat: "market", tag: "MARKET INTEL", t: "Deal Flow Monitor", b: "Watches trigger events across each company's competitive landscape and alerts you first." },
    { cat: "perf", tag: "PERFORMANCE", t: "Performance Reporter", b: "Pulls live SEO, paid media, and content metrics on demand and frames them for the board." },
    { cat: "perf", tag: "PERFORMANCE", t: "Lead Qualifier", b: "Scores and routes inbound leads before a human touches them, so pipeline stays clean." },
    { cat: "content", tag: "CONTENT & SEO", t: "Content Engine", b: "Researches, briefs, and writes SEO content autonomously, ready for senior review." },
    { cat: "content", tag: "CONTENT & SEO", t: "GEO Specialist", b: "Optimizes each brand for AI search across Perplexity, ChatGPT, and Google AI Overviews." },
    { cat: "content", tag: "CONTENT & SEO", t: "Content Auditor", b: "Runs quarterly topical authority audits and returns a full, prioritized action queue." },
    { cat: "revenue", tag: "REVENUE & CRM", t: "Call Intelligence", b: "Ingests every sales call and extracts coaching signals and deal risk automatically." },
    { cat: "revenue", tag: "REVENUE & CRM", t: "Account Manager", b: "Flags renewal risk, upsell signals, and client health before it shows up in the numbers." },
    { cat: "revenue", tag: "REVENUE & CRM", t: "TAM Builder", b: "Maps total addressable market and builds target account lists for each company." }
  ];

  var FILTERS = [
    { id: "all", label: "All functions" },
    { id: "market", label: "Market intel" },
    { id: "perf", label: "Performance" },
    { id: "content", label: "Content & SEO" },
    { id: "revenue", label: "Revenue & CRM" }
  ];

  var PRACTICES = [
    {
      q: "What's the performance across our three portfolio cos this month?",
      tag: "COMPARATIVE SUMMARY",
      a: "Pulls live metrics from all three, formats a side-by-side, and flags the outlier before your call.",
      meta: "Delivered in seconds"
    },
    {
      q: "We just acquired a company. Who are their top 3 competitors?",
      tag: "COMPETITIVE INTELLIGENCE",
      a: "Maps rivals, keyword gaps, and where the new asset is losing share. Full report in under two minutes.",
      meta: "Ready for the first board meeting"
    },
    {
      q: "Write a post targeting CFOs at mid-market PE-backed companies.",
      tag: "CONTENT ENGINE",
      a: "Researched, briefed, SEO and GEO optimized, and ready to publish. No brief handoff, no queue.",
      meta: "Draft in minutes"
    }
  ];

  var STYLE_ID = "agn-gos-styles";
  var STYLE_VER = "20260916-1";

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function injectStyles() {
    var existing = document.getElementById(STYLE_ID);
    if (existing && existing.getAttribute("data-ver") === STYLE_VER) return;
    if (existing) existing.remove();
    var css = [
      "[data-gos-page]{--gos:" + ACCENT + ";background:transparent !important;color:#fff;font-family:'Poppins',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;-webkit-font-smoothing:antialiased;}",
      "[data-gos-reveal]{opacity:0;translate:0 28px;transition:opacity .7s cubic-bezier(.16,.84,.44,1),translate .7s cubic-bezier(.16,.84,.44,1);}",
      "[data-gos-reveal].is-in{opacity:1;translate:0 0;}",

      /* Hero */
      ".gos-hero{position:relative;min-height:100vh;min-height:100dvh;display:flex;align-items:flex-end;padding:calc(140px + var(--agn-top-banner,0px)) 40px 80px;box-sizing:border-box;overflow:hidden;isolation:isolate;background:radial-gradient(90% 70% at 70% 10%,#0C4E56 0%,#0A2E49 40%,#081226 78%);}",
      ".gos-hero-grid{position:absolute;inset:0;z-index:0;pointer-events:none;opacity:.45;background-image:linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px);background-size:64px 64px;mask-image:radial-gradient(80% 70% at 60% 30%,#000,transparent 78%);-webkit-mask-image:radial-gradient(80% 70% at 60% 30%,#000,transparent 78%);}",
      ".gos-hero-inner{position:relative;z-index:1;width:100%;max-width:1312px;margin:0 auto;display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);gap:48px;align-items:end;}",
      ".gos-hero-copy{display:flex;flex-direction:column;gap:22px;}",
      ".gos-kicker{margin:0;font-size:13px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--gos);}",
      ".gos-hero-title{margin:0;font-size:clamp(36px,4.6vw,64px);font-weight:700;line-height:1.08;letter-spacing:-.03em;color:#fff;max-width:16ch;}",
      ".gos-hero-lead{margin:0;font-size:18px;line-height:1.5;color:#C0C7CC;max-width:42ch;}",
      ".gos-hero-cta{display:flex;flex-wrap:wrap;gap:12px;}",
      ".gos-hero-cta .agn-btn{box-shadow:0 12px 34px -10px rgba(31,201,160,.55);}",

      /* Live console */
      ".gos-console{position:relative;border:1px solid rgba(255,255,255,.12);border-radius:20px;background:rgba(8,18,38,.72);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);overflow:hidden;box-shadow:0 40px 80px -40px rgba(0,0,0,.7);}",
      ".gos-console-bar{display:flex;align-items:center;gap:8px;padding:14px 16px;border-bottom:1px solid rgba(255,255,255,.08);}",
      ".gos-console-dot{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.2);}",
      ".gos-console-dot:nth-child(1){background:#ff5f57;}",
      ".gos-console-dot:nth-child(2){background:#febc2e;}",
      ".gos-console-dot:nth-child(3){background:#28c840;}",
      ".gos-console-label{margin-left:8px;font-size:12px;font-weight:500;letter-spacing:.04em;color:#8FA0B5;}",
      ".gos-console-body{padding:18px 18px 22px;display:flex;flex-direction:column;gap:14px;min-height:280px;}",
      ".gos-console-line{display:flex;gap:10px;align-items:flex-start;opacity:0;transform:translateY(8px);animation:gosConsoleIn .55s cubic-bezier(.16,.84,.44,1) forwards;}",
      ".gos-console-line:nth-child(1){animation-delay:.35s;}",
      ".gos-console-line:nth-child(2){animation-delay:1.1s;}",
      ".gos-console-line:nth-child(3){animation-delay:1.85s;}",
      ".gos-console-line:nth-child(4){animation-delay:2.55s;}",
      ".gos-console-prompt{flex:0 0 auto;font-size:12px;font-weight:600;color:var(--gos);line-height:1.45;}",
      ".gos-console-text{margin:0;font-size:13px;line-height:1.5;color:#EBEDEF;}",
      ".gos-console-text em{font-style:normal;color:#8FA0B5;}",
      ".gos-console-pill{align-self:flex-start;margin:0;padding:6px 10px;border-radius:999px;font-size:11px;font-weight:600;letter-spacing:.04em;color:var(--gos);background:rgba(27,254,209,.12);}",
      "@keyframes gosConsoleIn{to{opacity:1;transform:none;}}",

      /* Shared layout */
      ".gos-wrap{max-width:1160px;margin:0 auto;padding:0 40px;box-sizing:border-box;}",
      ".gos-sec{padding:110px 0;}",
      ".gos-sec-title{margin:0;font-size:clamp(28px,3.4vw,44px);font-weight:700;line-height:1.12;letter-spacing:-.02em;color:#fff;max-width:22ch;}",
      ".gos-sec-sub{margin:16px 0 0;font-size:16px;line-height:1.6;color:#AEB9CC;max-width:62ch;}",

      /* Stats */
      ".gos-stats{padding:72px 0;background:radial-gradient(120% 120% at 80% 0%,#12315e 0%,#0B1B38 55%,#081226 100%);}",
      ".gos-stats-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:20px;}",
      ".gos-stat{border-left:2px solid color-mix(in srgb,var(--gos) 45%,transparent);padding:4px 0 4px 22px;}",
      ".gos-stat-k{margin:0;font-size:clamp(36px,4vw,56px);font-weight:800;letter-spacing:-.03em;line-height:1;color:#fff;}",
      ".gos-stat-v{margin:12px 0 0;font-size:14px;line-height:1.4;color:#AEB9CC;}",

      /* Model shift */
      ".gos-shift{background:transparent;}",
      ".gos-shift-grid{margin-top:48px;display:grid;grid-template-columns:1fr 1fr;gap:20px;}",
      ".gos-shift-col{padding:28px 26px;border-radius:18px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.03);}",
      ".gos-shift-col--new{border-color:color-mix(in srgb,var(--gos) 35%,rgba(255,255,255,.1));background:linear-gradient(180deg,rgba(27,254,209,.08),rgba(255,255,255,.02));}",
      ".gos-shift-label{margin:0 0 18px;font-size:12px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#8FA0B5;}",
      ".gos-shift-col--new .gos-shift-label{color:var(--gos);}",
      ".gos-shift-list{margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:14px;}",
      ".gos-shift-list li{display:grid;grid-template-columns:28px 1fr;gap:12px;align-items:start;}",
      ".gos-shift-num{font-size:13px;font-weight:700;color:rgba(255,255,255,.35);line-height:1.5;}",
      ".gos-shift-col--new .gos-shift-num{color:var(--gos);}",
      ".gos-shift-list p{margin:0;font-size:15px;line-height:1.5;color:#EBEDEF;}",
      ".gos-shift-foot{margin:20px 0 0;font-size:14px;line-height:1.45;color:#8FA0B5;}",
      ".gos-shift-col--new .gos-shift-foot{color:var(--gos);}",

      /* Agents */
      ".gos-agents{background:radial-gradient(140% 90% at 20% 0%,#12315e 0%,#0B1B38 48%,#081226 100%);}",
      ".gos-filters{margin:36px 0 28px;display:flex;flex-wrap:wrap;gap:8px;}",
      ".gos-filter{appearance:none;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.03);color:#C0C7CC;font:inherit;font-size:13px;font-weight:500;padding:10px 14px;border-radius:999px;cursor:pointer;transition:border-color .25s,color .25s,background .25s;}",
      ".gos-filter.is-on{border-color:color-mix(in srgb,var(--gos) 50%,transparent);background:rgba(27,254,209,.1);color:#fff;}",
      ".gos-agent-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;}",
      ".gos-agent{padding:22px 20px;border-radius:16px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.03);transition:opacity .3s,transform .3s,border-color .3s;}",
      ".gos-agent.is-hide{display:none;}",
      ".gos-agent:hover{border-color:rgba(255,255,255,.22);transform:translateY(-2px);}",
      ".gos-agent-tag{margin:0 0 10px;font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--gos);}",
      ".gos-agent h3{margin:0;font-size:18px;font-weight:600;line-height:1.25;color:#fff;}",
      ".gos-agent p{margin:10px 0 0;font-size:14px;line-height:1.5;color:#AEB9CC;}",
      ".gos-agent-note{margin:22px 0 0;font-size:14px;color:#8FA0B5;}",

      /* Supervision */
      ".gos-sup-grid{margin-top:48px;display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:40px;align-items:start;}",
      ".gos-stack{display:flex;flex-direction:column;gap:10px;}",
      ".gos-stack-row{display:flex;align-items:center;gap:14px;padding:18px 18px;border-radius:14px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.03);}",
      ".gos-stack-row:nth-child(1){border-color:color-mix(in srgb,var(--gos) 40%,transparent);background:rgba(27,254,209,.08);}",
      ".gos-stack-mark{width:10px;height:10px;border-radius:50%;background:rgba(255,255,255,.25);flex:0 0 auto;}",
      ".gos-stack-row:nth-child(1) .gos-stack-mark{background:var(--gos);box-shadow:0 0 0 6px rgba(27,254,209,.12);}",
      ".gos-stack-row strong{display:block;font-size:15px;font-weight:600;color:#fff;}",
      ".gos-stack-row span{display:block;margin-top:2px;font-size:13px;color:#8FA0B5;}",
      ".gos-feats{display:flex;flex-direction:column;gap:18px;}",
      ".gos-feat{padding-bottom:18px;border-bottom:1px solid rgba(255,255,255,.08);}",
      ".gos-feat:last-child{border-bottom:0;padding-bottom:0;}",
      ".gos-feat h3{margin:0;font-size:18px;font-weight:600;color:#fff;}",
      ".gos-feat p{margin:8px 0 0;font-size:14px;line-height:1.55;color:#AEB9CC;}",

      /* Effect */
      ".gos-effect{background:radial-gradient(120% 100% at 50% 0%,#1a1650 0%,#12103a 45%,#081226 100%);}",
      ".gos-effect-panel{margin-top:40px;padding:28px;border-radius:20px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.03);}",
      ".gos-effect-top{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px;margin-bottom:24px;}",
      ".gos-effect-toggle{display:inline-flex;align-items:center;gap:12px;}",
      ".gos-effect-toggle span{font-size:14px;font-weight:500;color:#AEB9CC;}",
      ".gos-effect-toggle span.is-on{color:#fff;}",
      ".gos-switch{position:relative;width:52px;height:30px;border:none;border-radius:999px;background:rgba(255,255,255,.16);cursor:pointer;padding:0;transition:background .3s;}",
      ".gos-switch[aria-checked='true']{background:color-mix(in srgb,var(--gos) 55%,#0B1B38);}",
      ".gos-switch i{position:absolute;top:3px;left:3px;width:24px;height:24px;border-radius:50%;background:#fff;transition:transform .3s cubic-bezier(.16,.84,.44,1);}",
      ".gos-switch[aria-checked='true'] i{transform:translateX(22px);}",
      ".gos-chart{width:100%;height:220px;display:block;}",
      ".gos-chart path{fill:none;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;transition:d .8s cubic-bezier(.16,.84,.44,1),stroke .4s;}",
      ".gos-chart .gos-chart-before{stroke:rgba(255,255,255,.28);}",
      ".gos-chart .gos-chart-after{stroke:var(--gos);opacity:0;transition:opacity .4s;}",
      ".gos-effect-panel.is-after .gos-chart-after{opacity:1;}",
      ".gos-effect-panel.is-after .gos-chart-before{opacity:.25;}",
      ".gos-effect-stats{margin-top:24px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;}",
      ".gos-effect-stat{padding:16px;border-radius:12px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);}",
      ".gos-effect-stat b{display:block;font-size:28px;font-weight:700;letter-spacing:-.02em;color:#fff;}",
      ".gos-effect-stat span{display:block;margin-top:6px;font-size:13px;color:#8FA0B5;}",

      /* Practice */
      ".gos-practice-grid{margin-top:42px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;}",
      ".gos-ask{padding:24px 22px;border-radius:18px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.03);display:flex;flex-direction:column;gap:14px;min-height:100%;}",
      ".gos-ask-q{margin:0;font-size:15px;font-weight:500;line-height:1.45;color:#fff;}",
      ".gos-ask-q::before{content:'› ';color:var(--gos);font-weight:700;}",
      ".gos-ask-tag{margin:0;font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--gos);}",
      ".gos-ask-a{margin:0;font-size:14px;line-height:1.55;color:#AEB9CC;flex:1;}",
      ".gos-ask-meta{margin:0;font-size:13px;font-weight:500;color:var(--gos);}",
      ".gos-ask-meta::before{content:'● ';}",

      /* For PE */
      ".gos-pe{background:radial-gradient(120% 100% at 50% 0%,#12315e 0%,#0B1B38 50%,#081226 100%);}",
      ".gos-pe-badge{display:inline-flex;margin:0 0 18px;padding:8px 12px;border-radius:999px;border:1px solid color-mix(in srgb,var(--gos) 35%,transparent);font-size:12px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--gos);background:rgba(27,254,209,.08);}",
      ".gos-pe-grid{margin-top:42px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;}",
      ".gos-pe-card{padding:24px 22px;border-top:2px solid color-mix(in srgb,var(--gos) 45%,transparent);}",
      ".gos-pe-card .gos-pe-n{margin:0 0 12px;font-size:13px;font-weight:700;color:var(--gos);}",
      ".gos-pe-card h3{margin:0;font-size:20px;font-weight:600;line-height:1.25;color:#fff;}",
      ".gos-pe-card p{margin:12px 0 0;font-size:14px;line-height:1.55;color:#AEB9CC;}",

      /* Close */
      ".gos-close{padding:40px 40px 120px;}",
      ".gos-close-card{container-type:inline-size;max-width:1312px;margin:0 auto;padding:clamp(40px,6cqi,72px) clamp(28px,4cqi,56px);border-radius:24px;text-align:center;background:linear-gradient(174deg,#0B1B38 58%,#081226 92%);border:1px solid rgba(255,255,255,.12);box-shadow:0 53px 127px -63px rgba(0,0,0,.8);}",
      ".gos-close-card h2{margin:0 auto;max-width:18ch;font-size:clamp(28px,4.2cqi,48px);font-weight:700;line-height:1.12;letter-spacing:-.02em;color:#fff;}",
      ".gos-close-card p{margin:18px auto 0;max-width:52ch;font-size:16px;line-height:1.6;color:#C0C7CC;}",
      ".gos-close-card .agn-btn{margin-top:28px;box-shadow:0 12px 34px -10px rgba(31,201,160,.55);}",
      ".gos-close-foot{margin:28px 0 0;font-size:13px;color:#8FA0B5;}",

      "@media(max-width:960px){",
        ".gos-hero{padding:calc(112px + var(--agn-top-banner,0px)) 16px 56px;align-items:stretch;}",
        ".gos-hero-inner{grid-template-columns:1fr;gap:32px;}",
        ".gos-hero-title{max-width:none;font-size:34px;}",
        ".gos-hero-lead{font-size:16px;}",
        ".gos-wrap{padding:0 16px;}",
        ".gos-sec{padding:72px 0;}",
        ".gos-stats{padding:48px 0;}",
        ".gos-stats-grid{grid-template-columns:1fr 1fr;gap:18px;}",
        ".gos-stat-k{font-size:32px;}",
        ".gos-shift-grid,.gos-agent-grid,.gos-sup-grid,.gos-practice-grid,.gos-pe-grid,.gos-effect-stats{grid-template-columns:1fr;}",
        ".gos-close{padding:24px 16px 80px;}",
      "}",
      "@media(prefers-reduced-motion:reduce){",
        "[data-gos-reveal]{opacity:1 !important;translate:none !important;transition:none !important;}",
        ".gos-console-line{opacity:1 !important;transform:none !important;animation:none !important;}",
      "}"
    ].join("");
    var s = document.createElement("style");
    s.id = STYLE_ID;
    s.setAttribute("data-ver", STYLE_VER);
    s.textContent = css;
    (document.head || document.documentElement).appendChild(s);
  }

  function heroHTML() {
    return "" +
      '<section class="gos-hero" data-cursor-theme="dark">' +
        '<div class="gos-hero-grid" aria-hidden="true"></div>' +
        '<div class="gos-hero-inner">' +
          '<div class="gos-hero-copy" data-gos-reveal>' +
            '<p class="gos-kicker">Growth OS</p>' +
            '<h1 class="gos-hero-title">The growth engine that runs every portfolio company at once.</h1>' +
            '<p class="gos-hero-lead">Growth OS is the AI operating system underneath every AGA engagement. 150+ specialized agents, each supervised by a senior operator who owns the outcome, reporting in the language your investment committee already speaks.</p>' +
            '<div class="gos-hero-cta">' +
              '<a class="agn-btn" href="#cta" data-magnetic="true">See it live</a>' +
              '<a class="agn-btn agn-btn--ghost" href="#agents" data-magnetic="true">Explore the agents</a>' +
            "</div>" +
          "</div>" +
          '<div class="gos-console" data-gos-reveal data-gos-delay="120" aria-label="Live Growth OS console">' +
            '<div class="gos-console-bar" aria-hidden="true"><span class="gos-console-dot"></span><span class="gos-console-dot"></span><span class="gos-console-dot"></span><span class="gos-console-label">LIVE · PORTFOLIO QUERY</span></div>' +
            '<div class="gos-console-body">' +
              '<div class="gos-console-line"><span class="gos-console-prompt">OP ›</span><p class="gos-console-text">What\'s stalling growth in Company B this week?</p></div>' +
              '<div class="gos-console-line"><span class="gos-console-prompt">OS ›</span><p class="gos-console-text">Routing to Performance Reporter + Call Intelligence…</p></div>' +
              '<div class="gos-console-line"><span class="gos-console-prompt">OS ›</span><p class="gos-console-text">Paid CAC up <em>22%</em>. Two sales calls flagged deal risk. SEO flat. Full brief ready.</p></div>' +
              '<div class="gos-console-line"><p class="gos-console-pill">Answered in 1.8s · board-ready</p></div>' +
            "</div>" +
          "</div>" +
        "</div>" +
      "</section>";
  }

  function statsHTML() {
    var items = [
      ["150+", "specialized agents live"],
      ["50+", "MCP data connectors"],
      ["48h", "to go live per company"],
      ["24/7", "always-on monitoring"]
    ];
    return '<section class="gos-stats" data-cursor-theme="dark"><div class="gos-wrap"><div class="gos-stats-grid">' +
      items.map(function (it, i) {
        return '<div class="gos-stat" data-gos-reveal data-gos-delay="' + (i * 70) + '"><p class="gos-stat-k">' + esc(it[0]) + '</p><p class="gos-stat-v">' + esc(it[1]) + "</p></div>";
      }).join("") +
    "</div></div></section>";
  }

  function shiftHTML() {
    var oldSteps = [
      "Sign the agency, wait out a 60-day onboarding",
      "Weekly status calls that report activity, not revenue",
      "Analysts rebuild the same deck by hand every month",
      "Quarterly reviews, then hope the spend compounds"
    ];
    var newSteps = [
      "Connect the portfolio company to Growth OS",
      "Agents are live in 48 hours across SEO, paid, CRM, and calls",
      "Data flows in real time, framed for a growth investor",
      "Growth compounds from week one, visible every day"
    ];
    var list = function (steps, foot, neu) {
      return '<div class="gos-shift-col' + (neu ? " gos-shift-col--new" : "") + '" data-gos-reveal>' +
        '<p class="gos-shift-label">' + (neu ? "The Growth OS model" : "The old model") + "</p>" +
        '<ol class="gos-shift-list">' +
          steps.map(function (s, i) {
            return "<li><span class=\"gos-shift-num\">0" + (i + 1) + "</span><p>" + esc(s) + "</p></li>";
          }).join("") +
        "</ol>" +
        '<p class="gos-shift-foot">' + esc(foot) + "</p>" +
      "</div>";
    };
    return '<section class="gos-sec gos-shift" data-cursor-theme="dark"><div class="gos-wrap">' +
      '<h2 class="gos-sec-title" data-gos-reveal>Most agencies bill hours. Growth OS compounds from week one.</h2>' +
      '<p class="gos-sec-sub" data-gos-reveal data-gos-delay="80">The traditional agency model burns your hold period on onboarding and status calls. Growth OS connects to a portfolio company and starts producing inside 48 hours, with data flowing to your board the same week.</p>' +
      '<div class="gos-shift-grid">' +
        list(oldSteps, "Months of ramp before the first real signal reaches the board.", false) +
        list(newSteps, "Live in 48 hours. Board-ready from the first week, not the first quarter.", true) +
      "</div></div></section>";
  }

  function agentsHTML() {
    var filters = FILTERS.map(function (f, i) {
      return '<button type="button" class="gos-filter' + (i === 0 ? " is-on" : "") + '" data-gos-filter="' + esc(f.id) + '">' + esc(f.label) + "</button>";
    }).join("");
    var cards = AGENTS.map(function (a) {
      return '<article class="gos-agent" data-gos-agent data-cat="' + esc(a.cat) + '">' +
        '<p class="gos-agent-tag">' + esc(a.tag) + "</p>" +
        "<h3>" + esc(a.t) + "</h3>" +
        "<p>" + esc(a.b) + "</p>" +
      "</article>";
    }).join("");
    return '<section class="gos-sec gos-agents" id="agents" data-cursor-theme="dark"><div class="gos-wrap">' +
      '<h2 class="gos-sec-title" data-gos-reveal>A fleet of specialists, not one generalist bot.</h2>' +
      '<p class="gos-sec-sub" data-gos-reveal data-gos-delay="80">Each agent is trained for one growth function and connected to live systems. Ten of the network shown here.</p>' +
      '<div class="gos-filters" data-gos-reveal data-gos-delay="120">' + filters + "</div>" +
      '<div class="gos-agent-grid" data-gos-reveal data-gos-delay="160">' + cards + "</div>" +
      '<p class="gos-agent-note">Showing 10 of the network. 150+ agents live, new ones deployed as your portfolio\'s needs grow.</p>' +
    "</div></section>";
  }

  function supervisionHTML() {
    return '<section class="gos-sec" data-cursor-theme="dark"><div class="gos-wrap">' +
      '<h2 class="gos-sec-title" data-gos-reveal>Autonomous where it\'s safe. Human where it counts.</h2>' +
      '<p class="gos-sec-sub" data-gos-reveal data-gos-delay="80">Speed without judgment is a liability in a portfolio. Every agent runs under a senior operator who owns the outcome and answers to your growth number. The AI does the volume. The human owns the call.</p>' +
      '<div class="gos-sup-grid">' +
        '<div class="gos-stack" data-gos-reveal data-gos-delay="100">' +
          '<div class="gos-stack-row"><span class="gos-stack-mark"></span><div><strong>Senior operator</strong><span>owns the outcome</span></div></div>' +
          '<div class="gos-stack-row"><span class="gos-stack-mark"></span><div><strong>150+ agents</strong><span>working in parallel, under supervision</span></div></div>' +
          '<div class="gos-stack-row"><span class="gos-stack-mark"></span><div><strong>50+ live connectors</strong><span>CRM, GA4, Search Console, Ads, call intel, market data</span></div></div>' +
        "</div>" +
        '<div class="gos-feats" data-gos-reveal data-gos-delay="160">' +
          '<div class="gos-feat"><h3>Separate memory per brand</h3><p>Each portfolio company runs in full isolation. No cross-contamination of data, context, or strategy between brands.</p></div>' +
          '<div class="gos-feat"><h3>Institutional memory that stays</h3><p>Every call, campaign, and insight is stored and searchable. A new operator onboards to years of context in minutes.</p></div>' +
          '<div class="gos-feat"><h3>Always-on, never asleep</h3><p>Ranking drops, content decay, competitor moves. Growth OS catches them before you\'re on a call about them.</p></div>' +
        "</div>" +
      "</div></div></section>";
  }

  function effectHTML() {
    return '<section class="gos-sec gos-effect" id="effect" data-cursor-theme="dark"><div class="gos-wrap">' +
      '<h2 class="gos-sec-title" data-gos-reveal>The trajectory changes when the engine takes over.</h2>' +
      '<p class="gos-sec-sub" data-gos-reveal data-gos-delay="80">Same business, same months, a different curve. Toggle Growth OS on to see the shape of growth once the engine goes live.</p>' +
      '<div class="gos-effect-panel" data-gos-effect data-gos-reveal data-gos-delay="120">' +
        '<div class="gos-effect-top">' +
          '<div class="gos-effect-toggle">' +
            '<span data-gos-label-before class="is-on">Before</span>' +
            '<button type="button" class="gos-switch" data-gos-switch role="switch" aria-checked="false" aria-label="Toggle Growth OS effect"><i></i></button>' +
            '<span data-gos-label-after>Growth OS</span>' +
          "</div>" +
        "</div>" +
        '<svg class="gos-chart" viewBox="0 0 640 220" preserveAspectRatio="none" aria-hidden="true">' +
          '<path class="gos-chart-before" d="M20 180 C120 170 220 160 320 140 C420 120 520 110 620 95"></path>' +
          '<path class="gos-chart-after" d="M20 180 C110 175 200 150 300 100 C400 45 500 35 620 18"></path>' +
        "</svg>" +
        '<div class="gos-effect-stats">' +
          '<div class="gos-effect-stat"><b>3.5</b><span>month payback period</span></div>' +
          '<div class="gos-effect-stat"><b>5.5x</b><span>LTV over CAC</span></div>' +
          '<div class="gos-effect-stat"><b>87%</b><span>acquisition cost cut</span></div>' +
        "</div>" +
      "</div></div></section>";
  }

  function practiceHTML() {
    return '<section class="gos-sec" data-cursor-theme="dark"><div class="gos-wrap">' +
      '<h2 class="gos-sec-title" data-gos-reveal>Ask it like you\'d ask an operating partner.</h2>' +
      '<div class="gos-practice-grid">' +
        PRACTICES.map(function (p, i) {
          return '<article class="gos-ask" data-gos-reveal data-gos-delay="' + (i * 90) + '">' +
            '<p class="gos-ask-q">' + esc(p.q) + "</p>" +
            '<p class="gos-ask-tag">' + esc(p.tag) + "</p>" +
            '<p class="gos-ask-a">' + esc(p.a) + "</p>" +
            '<p class="gos-ask-meta">' + esc(p.meta) + "</p>" +
          "</article>";
        }).join("") +
      "</div></div></section>";
  }

  function peHTML() {
    var pillars = [
      ["01", "Consistent across the portfolio", "The same standard of growth leadership at every company you own. One system, one bar, no dependence on who you happened to hire locally."],
      ["02", "Reported in your language", "Ask for the numbers and Growth OS pulls, formats, and frames them the way a growth investor reads them. CAC, LTV, payback, share of voice."],
      ["03", "Built to hand off at exit", "Every system is designed to be owned by the operating team after we leave. You build enterprise value, not agency dependence."]
    ];
    return '<section class="gos-sec gos-pe" data-cursor-theme="dark"><div class="gos-wrap">' +
      '<p class="gos-pe-badge" data-gos-reveal>Enterprise-grade. Agency-priced.</p>' +
      '<h2 class="gos-sec-title" data-gos-reveal>The intelligence layer of an in-house team, without the headcount.</h2>' +
      '<p class="gos-sec-sub" data-gos-reveal data-gos-delay="80">You get a data and growth function that scales across the whole portfolio, without the hires, the overhead, or the six-month ramp. Growth OS is what AGA brings to every engagement. It\'s not a feature. It\'s the foundation.</p>' +
      '<div class="gos-pe-grid">' +
        pillars.map(function (p, i) {
          return '<article class="gos-pe-card" data-gos-reveal data-gos-delay="' + (100 + i * 80) + '">' +
            '<p class="gos-pe-n">' + esc(p[0]) + "</p>" +
            "<h3>" + esc(p[1]) + "</h3>" +
            "<p>" + esc(p[2]) + "</p>" +
          "</article>";
        }).join("") +
      "</div></div></section>";
  }

  function closeHTML() {
    return '<section class="gos-close" data-cursor-theme="dark">' +
      '<div class="gos-close-card" data-gos-reveal>' +
        "<h2>See Growth OS run against your portfolio.</h2>" +
        "<p>Bring one portfolio company. We'll connect it live and show you what real-time growth intelligence looks like, framed for your investment committee.</p>" +
        '<a class="agn-btn" href="#cta" data-magnetic="true">Book a demo</a>' +
        '<p class="gos-close-foot">Azarian Growth Agency / Growth OS — a platform under the people.</p>' +
      "</div>" +
    "</section>";
  }

  function setupReveal(root, store) {
    var nodes = Array.prototype.slice.call(root.querySelectorAll("[data-gos-reveal]"));
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    if (reduce) {
      nodes.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    var pending = nodes.slice();
    var onScroll = function () {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      pending = pending.filter(function (el) {
        if (el.getBoundingClientRect().top < vh * 0.88) {
          var delay = parseInt(el.getAttribute("data-gos-delay") || "0", 10);
          setTimeout(function () { el.classList.add("is-in"); }, delay);
          return false;
        }
        return true;
      });
      if (!pending.length) {
        window.removeEventListener("scroll", onScroll, true);
        window.removeEventListener("resize", onScroll);
      }
    };
    onScroll();
    if (pending.length) {
      window.addEventListener("scroll", onScroll, { passive: true, capture: true });
      window.addEventListener("resize", onScroll);
      store.revealCleanup = function () {
        window.removeEventListener("scroll", onScroll, true);
        window.removeEventListener("resize", onScroll);
      };
    }
  }

  function setupFilters(root) {
    var btns = Array.prototype.slice.call(root.querySelectorAll("[data-gos-filter]"));
    var cards = Array.prototype.slice.call(root.querySelectorAll("[data-gos-agent]"));
    if (!btns.length) return;
    btns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-gos-filter");
        btns.forEach(function (b) { b.classList.toggle("is-on", b === btn); });
        cards.forEach(function (card) {
          var cat = card.getAttribute("data-cat");
          card.classList.toggle("is-hide", id !== "all" && cat !== id);
        });
      });
    });
  }

  function setupEffect(root) {
    var panel = root.querySelector("[data-gos-effect]");
    var sw = root.querySelector("[data-gos-switch]");
    if (!panel || !sw) return;
    var before = root.querySelector("[data-gos-label-before]");
    var after = root.querySelector("[data-gos-label-after]");
    sw.addEventListener("click", function () {
      var on = sw.getAttribute("aria-checked") !== "true";
      sw.setAttribute("aria-checked", on ? "true" : "false");
      panel.classList.toggle("is-after", on);
      if (before) before.classList.toggle("is-on", !on);
      if (after) after.classList.toggle("is-on", on);
    });
  }

  function build(root) {
    injectStyles();
    var mount = root.querySelector("[data-gos-mount]");
    if (!mount) return;
    mount.innerHTML = "" +
      heroHTML() +
      statsHTML() +
      shiftHTML() +
      agentsHTML() +
      supervisionHTML() +
      effectHTML() +
      practiceHTML() +
      peHTML() +
      closeHTML();
    var store = { revealCleanup: null };
    root.__gosStore = store;
    setupReveal(mount, store);
    setupFilters(mount);
    setupEffect(mount);
    // Sections are injected after load — re-apply hash scroll once mount exists.
    if (location.hash) {
      var target = mount.querySelector(location.hash);
      if (target) {
        requestAnimationFrame(function () {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    }
  }

  function destroy(root) {
    var store = root && root.__gosStore;
    if (store && store.revealCleanup) store.revealCleanup();
    var mount = root && root.querySelector("[data-gos-mount]");
    if (mount) mount.innerHTML = "";
    if (root) root.__gosStore = null;
  }

  window.AGA_GROWTH_OS_PAGE = { build: build, destroy: destroy };
})();
