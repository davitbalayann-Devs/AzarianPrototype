/*
  Azarian Growth Agency — shared Service Page engine (single source of truth).

  ONE template, SIX services. Each service .dc.html file is identical except its
  filename; the slug is derived from the filename (service-<slug>.dc.html) and the
  matching content is pulled from SERVICES below. Pages share hero · flexible sections
  (list · prose · steps) · explore · final CTA; accent color and copy change per service.

  Usage on a service page:
    <div ref="{{ setRoot }}" data-svc-page> ... <main data-service-mount></main> ... </div>
    <script src="../service-page.js"></script>
  and in the page logic:
    componentDidMount(){ window.AGA_SERVICE_PAGE.build(this.rootEl); }
*/
(function () {
  "use strict";
  if (window.AGA_SERVICE_PAGE) return;

  var A = "#1BFED1"; // brand teal

  // ---- Content ------------------------------------------------------------
  // PE-forward copy. Each page: hero + flexible sections (list · prose · steps) · explore · final CTA.
  var SERVICES = {
    "strategic-growth-diagnostic": {
      num: "01",
      tag: "Diagnostic",
      accent: "#1BFED1",
      grain: ["#0C4E56", "#0A2E49", "#081226"],
      title: "Portfolio Growth Diagnostic",
      heroHeadline: "Is your portfolio company's marketing engine built to scale, or just running?",
      lead: "A structured, AI-powered commercial assessment that maps every channel, dollar, and handoff to closed revenue.",
      cta: "Book the Diagnostic",
      finalCta: "Start the Diagnostic",
      stats: [
        { k: "AI-powered", v: "commercial audit" },
        { k: "30-60-90", v: "execution roadmap" },
        { k: "Board-ready", v: "findings deck" },
        { k: "Days", v: "not weeks to deliver" }
      ],
      story: "Most PE-backed businesses spend on marketing without knowing what's actually driving revenue. You're inheriting a marketing org built on founder instinct and agency relationships, not systems. Before you invest in growth, you need to know exactly what's broken and what it will cost to fix. That's what this diagnostic answers. It works as pre-acquisition commercial due diligence, a post-close baseline, or a platform carve-out assessment.",
      pillarsTitle: "Due diligence, not a marketing audit.",
      pillars: [
        { label: "01", t: "Kickoff", b: "We scope around your hold period, revenue targets, and the specific gaps your team is asking about.", anim: "funnel" },
        { label: "02", t: "Data pull", b: "Read access to ad platforms, CRM, analytics, email, and tag manager. Nothing invasive, nothing slow.", anim: "num" },
        { label: "03", t: "AI analysis", b: "Growth OS agents run parallel analysis across every connected system simultaneously.", anim: "road" },
        { label: "04", t: "Senior review + delivery", b: "Our team interprets the data, builds the findings report, and presents it to your leadership team.", anim: "dash" }
      ],
      sections: [],
      finalTitle: "Know what's broken before you invest in growth.",
      finalBody: "Get the diagnostic that reads like due diligence, not a marketing report.",
      getsTitle: "What you walk away with",
      gets: [
        { t: "Full-funnel audit", b: "We map every channel end to end. Paid, SEO, email, CRM, and analytics all sit in one view. Nothing hides in a silo. Hand-offs between teams become visible. You see where demand enters, where it stalls, and where revenue actually closes.", img: "svc-get/diag-01.png" },
        { t: "Quantified revenue impact", b: "Every gap gets a dollar figure. We show what each leak costs you. You see the size of the prize before you spend. Priorities stop being opinions. The investment case for each fix is already in the numbers.", img: "svc-get/diag-02.png" },
        { t: "30-60-90 roadmap", b: "We hand you a sequenced plan. The highest-impact moves come first. Your operators execute from day one. Owners, timelines, and dependencies are clear. Momentum replaces another backlog of ideas.", img: "svc-get/diag-03.png" },
        { t: "Board-ready presentation", b: "We translate findings into thesis language. Your board reads value, not vanity metrics. It's a deck you can present as is. Risks, upside, and next steps land in one narrative. No rewrite before the next IC.", img: "svc-get/diag-04.png" },
        { t: "True revenue attribution", b: "We trace every channel to closed revenue. No last-click guesswork. You learn what actually moves the number. Assisted paths and dark influencers surface. Budget follows proof, not habit.", img: "svc-get/diag-05.png" }
      ],
      contactTitle: "Start with a conversation, not a commitment",
      contactBody: "Every engagement begins with a scoping call built around your hold period and targets."
    },

    "fractional-cmo": {
      num: "02",
      tag: "Leadership",
      accent: "#4F8CFF",
      grain: ["#123C7A", "#0B3358", "#081226"],
      title: "Fractional CMO",
      heroHeadline: "Senior marketing leadership, without the full-time cost or the six-month search.",
      lead: "We embed a senior growth leader in your business in weeks, aligned to the revenue targets in your model.",
      cta: "Talk to Us",
      stats: [
        { k: "Weeks", v: "to embed, not quarters" },
        { k: "Operator", v: "not an advisor" },
        { k: "3x", v: "leverage via Growth OS" },
        { k: "Board-level", v: "reporting from day one" }
      ],
      story: "PE-backed companies often don't have the time or budget to recruit a $300K-plus CMO, and even when they do, onboarding takes quarters. A Fractional CMO from AGA is a working operator, not an advisor. They own your marketing strategy, manage your team and agencies, build the reporting layer your board expects, and drive toward the revenue targets in your model. This isn't a staffing solution. It's a leadership layer with an AI operating system underneath.",
      pillarsTitle: "Full-time CMO power at fractional cost.",
      pillars: [
        { label: "01", t: "Strategy ownership", b: "Marketing strategy tied directly to your investment thesis and hold timeline.", anim: "target" },
        { label: "02", t: "Team and vendor control", b: "Full ownership of the internal team and every existing agency relationship.", anim: "speed" },
        { label: "03", t: "Board accountability", b: "Board-level reporting and KPI ownership, aligned to EBITDA and exit criteria.", anim: "agents" },
        { label: "04", t: "Scale and hire", b: "Org design and hiring as you grow, with Growth OS agents augmenting every function.", anim: "shield" }
      ],
      sections: [],
      finalTitle: "Senior marketing leadership, in seat from day one.",
      finalBody: "Get a working operator, not another advisor deck.",
      getsTitle: "What's included",
      gets: [
        { t: "Thesis-aligned strategy", b: "We build the plan around your investment thesis. Every play maps to your hold timeline. Marketing finally moves toward the model. Channel choices follow the exit math. Activity that doesn't serve the thesis gets cut.", img: "svc-get/cmo-01.png" },
        { t: "Team and vendor ownership", b: "One senior leader owns all of it. Internal team and outside agencies included. You get a single point of accountability. Conflicting briefs stop competing for attention. Execution stays tight across the stack.", img: "svc-get/cmo-02.png" },
        { t: "Board reporting and KPIs", b: "We install the reporting layer your board expects. Every number ties to EBITDA and exit criteria. No more scrambling before a QBR. Trends, risks, and asks arrive in one package. Leadership reads progress without translation.", img: "svc-get/cmo-03.png" },
        { t: "Hiring and org design", b: "We build the team as you scale. The right roles at the right time. You reach exit with an org that holds. Role charters and succession are designed in. Capability compounds instead of resetting every hire.", img: "svc-get/cmo-04.png" },
        { t: "Growth OS access", b: "AI agents run behind your CMO. Research, reporting, content, and monitoring, all automated. One leader operates at the leverage of a full team. Throughput rises without headcount spikes. Judgment stays human where it matters.", img: "svc-get/cmo-05.png" }
      ],
      contactTitle: "Start with a conversation, not a commitment",
      contactBody: "Tell us where the marketing org stands today and we'll scope the fit."
    },

    "paid-media-demand-generation": {
      num: "03",
      tag: "Demand",
      accent: "#F7B733",
      grain: ["#5D3F12", "#4A2414", "#1D184B"],
      title: "Paid Media & Demand Gen",
      heroHeadline: "Every paid dollar tracked to pipeline. No exceptions.",
      lead: "Campaigns built around your CAC target, conversion economics, and the unit economics in your model.",
      cta: "Get a Paid Media Assessment",
      stats: [
        { k: "Every dollar", v: "tracked to pipeline" },
        { k: "CAC + margin", v: "not vanity metrics" },
        { k: "Real-time", v: "AI anomaly detection" },
        { k: "P&L language", v: "your CFO can read" }
      ],
      story: "Most paid media relationships produce dashboards full of impressions. We produce revenue. We build campaigns around your financial model, not platform defaults: CAC by channel, LTV by cohort, contribution margin by campaign, all tracked and reported in terms your CFO can read. Growth OS agents run real-time monitoring and anomaly detection across your accounts, so nothing breaks quietly.",
      pillarsTitle: "Built for the model, not the platform.",
      pillars: [
        { label: "01", t: "Search and video", b: "Google Search, Performance Max, and YouTube, structured to CAC targets.", anim: "attn" },
        { label: "02", t: "Social and display", b: "Meta, LinkedIn, and programmatic display for B2B and B2C.", anim: "scale" },
        { label: "03", t: "Full-funnel testing", b: "From creative to landing page to CRM handoff.", anim: "pulse" },
        { label: "04", t: "AI monitoring", b: "Growth OS catches budget waste, creative fatigue, and conversion drops early.", anim: "budget" }
      ],
      sections: [],
      finalTitle: "Stop paying for impressions. Start paying for pipeline.",
      finalBody: "Get paid media accountable to your operating model.",
      getsTitle: "What you get",
      gets: [
        { t: "Senior-run campaigns", b: "Practitioners build and manage every account. No juniors learning on your budget. The people who plan it are the people who run it. Strategy and execution stay in one seat. Feedback loops close in days, not monthly reviews.", img: "svc-get/paid-01.png" },
        { t: "AI budget optimization", b: "Growth OS watches your spend in real time. Waste and creative fatigue get caught early. Budget flows to what's working. Alerts land before the weekly check-in. You stop paying for decay you haven't noticed yet.", img: "svc-get/paid-02.png" },
        { t: "Weekly P&L reporting", b: "You get numbers your CFO can read. Revenue, pipeline, and cost per acquisition. No impressions dressed up as results. Channel contribution is explicit. Decisions land on contribution, not vanity volume.", img: "svc-get/paid-03.png" },
        { t: "Full attribution", b: "We trace every dollar first click to closed deal. The full path stays visible. You always know which channel earned the revenue. Assisted touches stop disappearing. Reallocation becomes a deliberate move.", img: "svc-get/paid-04.png" },
        { t: "Margin-first structure", b: "Campaigns are built around contribution margin. Not platform defaults, not vanity reach. Every play answers to the operating model. Creative, bids, and audiences inherit the same constraint. Scale only follows efficient units.", img: "svc-get/paid-05.png" }
      ],
      contactTitle: "Start with a conversation, not a commitment",
      contactBody: "Send us your accounts and we'll show you where the spend is leaking."
    },

    "seo-content": {
      num: "04",
      tag: "Search & Content",
      accent: "#34E0A1",
      grain: ["#0D5842", "#0A3F4D", "#081226"],
      title: "SEO & Content",
      heroHeadline: "Organic traffic that compounds, and converts.",
      lead: "For a multi-year hold, organic search is one of the highest-ROI investments in the first 12 months.",
      cta: "Get an SEO Assessment",
      stats: [
        { k: "Compounding", v: "organic demand" },
        { k: "12 months", v: "high-ROI window" },
        { k: "AI engines", v: "GEO built in" },
        { k: "Revenue", v: "attributed to organic" }
      ],
      story: "Paid media stops the moment you stop paying. SEO builds durable demand. We build the technical foundation and compound it with topical authority content mapped to buyer intent. Most agencies write content. We build a compounding organic asset, one that reduces paid dependence over a hold period and increases enterprise value at exit through demonstrated demand generation infrastructure.",
      pillarsTitle: "A compounding asset, not blog posts.",
      pillars: [
        { label: "01", t: "Technical foundation", b: "Crawlability, Core Web Vitals, and site architecture, fixed first.", anim: "stack" },
        { label: "02", t: "Topical authority", b: "Content mapped to how your buyers actually search.", anim: "cast" },
        { label: "03", t: "Built for AI search", b: "Optimized for Google and the AI answer engines: Perplexity, ChatGPT, Gemini.", anim: "engines" },
        { label: "04", t: "Conversion architecture", b: "Internal linking and conversion paths throughout every asset.", anim: "target" }
      ],
      sections: [],
      finalTitle: "Build demand that keeps working after the spend stops.",
      finalBody: "Get organic infrastructure that raises enterprise value at exit.",
      getsTitle: "What it produces",
      gets: [
        { t: "Compounding traffic", b: "Organic demand builds month over month. Your reliance on paid spend drops. The asset keeps working long after launch. Rankings and topical coverage stack over the hold. Each quarter starts from a higher base.", img: "svc-get/seo-01.png" },
        { t: "Shorter sales cycles", b: "Authority content does the early selling. Buyers arrive already convinced. Deals close faster and with less friction. Sales inherits trust instead of cold education. Objection handling shrinks before the first call.", img: "svc-get/seo-02.png" },
        { t: "Cross-channel assets", b: "Every piece works in more than one place. Paid, email, and sales all draw from it. One investment pays across the funnel. Briefs stay consistent from search to outreach. Production cost amortizes instead of resetting.", img: "svc-get/seo-03.png" },
        { t: "Visible in AI search", b: "We optimize for the answer engines, not just Google. Perplexity, ChatGPT, and Gemini cite you. We track that citation rate as it grows. Structure and authority earn inclusion. You stay present where buyers now ask.", img: "svc-get/seo-04.png" },
        { t: "Revenue reporting", b: "We tie organic to pipeline, page by page. You see the sessions and the revenue behind them. Growth stays accountable to the model. Content priorities follow closed deals. Vanity traffic loses the argument.", img: "svc-get/seo-05.png" }
      ],
      contactTitle: "Start with a conversation, not a commitment",
      contactBody: "We'll audit where your organic stands and what the 12-month upside looks like."
    },

    "website-conversion-optimization": {
      num: "05",
      tag: "Web & CRO",
      accent: "#C08BFF",
      grain: ["#4B2F72", "#243B73", "#4D1E53"],
      title: "Website & Conversion",
      heroHeadline: "Traffic without conversion is just cost.",
      lead: "Your site was built to look credible, not to convert. We fix that, without a full rebuild.",
      cta: "Get a CRO Audit",
      stats: [
        { k: "No rebuild", v: "required to fix it" },
        { k: "30 days", v: "to first quick wins" },
        { k: "Data-led", v: "not aesthetic preference" },
        { k: "Revenue", v: "influenced by CRO" }
      ],
      story: "For most PE-backed companies, the website is an afterthought. It was built to look credible, not to convert. We don't sell websites. We fix the conversion problem: we start with the data, identify the highest-impact changes, and move fast. In most cases we find quick wins within the first 30 days, then longer-term tests compound on top. PE-backed companies don't have six months for a rebrand.",
      pillarsTitle: "Fix conversion, not the brand.",
      pillars: [
        { label: "01", t: "Full CRO audit", b: "Pages, forms, CTAs, and messaging hierarchy, all reviewed against intent.", anim: "page" },
        { label: "02", t: "Highest-leverage first", b: "Homepage, service pages, and primary conversion paths, rewritten first.", anim: "ab" },
        { label: "03", t: "Testing on real data", b: "A/B and multivariate tests where traffic volume supports them.", anim: "attn" },
        { label: "04", t: "Post-launch monitoring", b: "Growth OS flags conversion drops before they become revenue problems.", anim: "data" }
      ],
      sections: [],
      finalTitle: "Turn the traffic you already pay for into pipeline.",
      finalBody: "Get a CRO fix that moves in weeks, not a six-month rebrand.",
      getsTitle: "What to expect",
      gets: [
        { t: "Quick wins in 30 days", b: "We fix the obvious leaks first. Form friction and misplaced CTAs go early. You see conversion move inside the first month. Momentum funds the harder tests. The site starts earning while the roadmap deepens.", img: "svc-get/cro-01.png" },
        { t: "Landing page builds", b: "We build pages made to convert. Each one is matched to a paid campaign. Traffic lands somewhere built to close. Message match holds from ad to form. Waste from generic destinations drops fast.", img: "svc-get/cro-02.png" },
        { t: "Conversion-led UX", b: "Every change answers to a metric. We follow the data, not personal taste. Design serves conversion, not the other way around. Hierarchy, proof, and path stay deliberate. Pretty that doesn't convert doesn't ship.", img: "svc-get/cro-03.png" },
        { t: "Tests you can trust", b: "We test where traffic supports it. Results come with statistical significance. You act on evidence, not opinion. Losers get killed cleanly. Winners scale with confidence.", img: "svc-get/cro-04.png" },
        { t: "Revenue influence", b: "We trace lift back to each change. You see which fixes moved the number. Nothing ships on a hunch. Pipeline and revenue sit next to the experiment. CRO becomes an operating lever, not a redesign hobby.", img: "svc-get/cro-05.png" }
      ],
      contactTitle: "Start with a conversation, not a commitment",
      contactBody: "Share your top pages and we'll point to the conversions you're losing."
    },

    "marketing-analytics-reporting": {
      num: "06",
      tag: "Analytics",
      accent: "#38BDF8",
      grain: ["#0E4F6A", "#123C7A", "#0A2D47"],
      title: "Marketing Analytics",
      heroHeadline: "If you can't measure it, you can't manage it. Neither can your board.",
      lead: "We build the analytics layer that ties marketing spend to revenue, so you always know what's working.",
      cta: "Talk to Us About Reporting",
      stats: [
        { k: "One layer", v: "every source connected" },
        { k: "Multi-touch", v: "attribution modeling" },
        { k: "Speaks CFO", v: "CAC, LTV, payback" },
        { k: "Never dark", v: "we maintain it" }
      ],
      story: "Most portfolio companies have data. Almost none have clean, connected, board-ready reporting. We build the measurement infrastructure from scratch if it doesn't exist, then connect every source into a single reporting layer that speaks CFO. Most portfolio companies have data everywhere and insight nowhere. We build the system that turns scattered platform data into board-ready revenue intelligence, and then we maintain it so it never goes dark.",
      pillarsTitle: "Data everywhere. Insight nowhere — fixed.",
      pillars: [
        { label: "01", t: "Build the foundation", b: "GA4, GTM, CRM attribution, and channel tagging, configured from scratch.", anim: "merge" },
        { label: "02", t: "Connect every source", b: "Paid, organic, email, CRM, and product, into one reporting layer.", anim: "funnel" },
        { label: "03", t: "Report in revenue", b: "Marketing's contribution to pipeline, not metrics in isolation.", anim: "dash" },
        { label: "04", t: "Install before the QBR", b: "CAC, LTV, payback, and channel ROAS, tied to the model.", anim: "radar" }
      ],
      sections: [],
      finalTitle: "Stop flying blind. Run marketing like an operating function.",
      finalBody: "Get board-ready revenue intelligence that never goes dark.",
      getsTitle: "What gets fixed",
      gets: [
        { t: "Siloed tools", b: "We connect every platform into one layer. Paid, organic, email, and CRM stop reporting apart. You get a single source of truth. Definitions align across teams. Debates shift from whose dashboard to what to do.", img: "svc-get/ana-01.png" },
        { t: "Attribution that stalls", b: "We model past the click. The path runs all the way to closed revenue. You learn what earned the deal, not just the visit. Multi-touch views replace last-click myths. Budget follows the full journey.", img: "svc-get/ana-02.png" },
        { t: "Metrics your CFO can't use", b: "We rebuild reporting in the language of the board. CAC, LTV, and payback, tied to the model. Every number is one you can act on. Marketing stops translating under pressure. The IC gets the same frame every time.", img: "svc-get/ana-03.png" },
        { t: "Manual reporting", b: "We automate the weekly and monthly packages. Your analysts stop rebuilding decks by hand. The reports arrive on their own. Time moves from assembly to insight. Consistency holds even when the team is thin.", img: "svc-get/ana-04.png" },
        { t: "Real-time anomalies", b: "Growth OS watches the data around the clock. Issues get flagged before they cost you. You stop finding out a month late. Thresholds and context travel with the alert. Operators intervene while the window is still open.", img: "svc-get/ana-05.png" }
      ],
      contactTitle: "Start with a conversation, not a commitment",
      contactBody: "Tell us what you're measuring today and we'll show you the gaps."
    }
  };

  // Order = card order in Home "04 Capabilities"; also the switcher order.
  var ORDER = [
    "strategic-growth-diagnostic",
    "fractional-cmo",
    "paid-media-demand-generation",
    "seo-content",
    "website-conversion-optimization",
    "marketing-analytics-reporting"
  ];
  var FILE = function (slug) { return "service-" + slug + ".dc.html"; };

  // Shared blog strip (Figma 23008:3410) — same cards on every service page.
  var BLOGS = [
    {
      t: "Investor's Insight on Building and Scaling Startup Ecosystems",
      date: "Apr 23, 2026",
      read: "9 min read",
      img: "svc-blog/blog-01.png",
      href: "#"
    },
    {
      t: "The Board Member's Guide to Asking the Right Marketing Questions",
      date: "Apr 23, 2026",
      read: "9 min read",
      img: "svc-blog/blog-02.png",
      href: "#"
    },
    {
      t: "Agencies Report Activity. Your Board Needs Outcomes. How to Close the Reporting Gap.",
      date: "May 15, 2026",
      read: "7 min read",
      img: "svc-blog/blog-03.png",
      href: "#"
    },
    {
      t: "Marketing Reports Impressions. Finance Needs Unit Economics. Here Is How to Bridge the Gap.",
      date: "June 10, 2026",
      read: "12 min read",
      img: "svc-blog/blog-04.png",
      href: "#"
    },
    {
      t: "The Rise of Autonomous AI Agents: A Growth Marketer's Guide to OpenClaw, Agent Zero, and What's Next",
      date: "July 5, 2026",
      read: "8 min read",
      img: "svc-blog/blog-05.png",
      href: "#"
    }
  ];

  // Capability deck copy + imagery (matches Home 04 Capabilities cards).
  var CAPABILITIES = {
    "strategic-growth-diagnostic": {
      img: "capability-01.png",
      blurb: "A structured, AI-powered commercial assessment that maps every channel, dollar, and handoff to closed revenue."
    },
    "fractional-cmo": {
      img: "capability-02.png",
      blurb: "We embed a senior growth leader in your business in weeks, aligned to the revenue targets in your model."
    },
    "paid-media-demand-generation": {
      img: "capability-03.png",
      blurb: "Campaigns built around your CAC target, conversion economics, and the unit economics in your model."
    },
    "seo-content": {
      img: "capability-04.png",
      blurb: "For a multi-year hold, organic search is one of the highest-ROI investments in the first 12 months."
    },
    "website-conversion-optimization": {
      img: "capability-05.png",
      blurb: "Your site was built to look credible, not to convert. We fix that, without a full rebuild."
    },
    "marketing-analytics-reporting": {
      img: "capability-06.png",
      blurb: "We build the analytics layer that ties marketing spend to revenue, so you always know what's working."
    }
  };

  // ---- helpers ------------------------------------------------------------
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function two(n) { return (n < 10 ? "0" : "") + n; }

  function slugFromLocation() {
    var path = "";
    try { path = decodeURIComponent(location.pathname || ""); } catch (e) { path = location.pathname || ""; }
    var base = (path.split("/").pop() || "").replace(/\.dc\.html?$/i, "").replace(/\.html?$/i, "");
    base = base.replace(/^service-/, "");
    return SERVICES[base] ? base : ORDER[0];
  }

  var CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="4 12.5 9.5 18 20 6"></polyline></svg>';
  var ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>';
  var GRAINIENT_VERTEX = [
    "#version 300 es",
    "in vec2 position;",
    "void main(){",
    "  gl_Position = vec4(position, 0.0, 1.0);",
    "}"
  ].join("\n");
  var GRAINIENT_FRAGMENT = [
    "#version 300 es",
    "precision highp float;",
    "uniform vec2 iResolution;",
    "uniform float iTime;",
    "uniform float uTimeSpeed;",
    "uniform float uColorBalance;",
    "uniform float uWarpStrength;",
    "uniform float uWarpFrequency;",
    "uniform float uWarpSpeed;",
    "uniform float uWarpAmplitude;",
    "uniform float uBlendAngle;",
    "uniform float uBlendSoftness;",
    "uniform float uRotationAmount;",
    "uniform float uNoiseScale;",
    "uniform float uGrainAmount;",
    "uniform float uGrainScale;",
    "uniform float uGrainAnimated;",
    "uniform float uContrast;",
    "uniform float uGamma;",
    "uniform float uSaturation;",
    "uniform vec2 uCenterOffset;",
    "uniform float uZoom;",
    "uniform vec3 uColor1;",
    "uniform vec3 uColor2;",
    "uniform vec3 uColor3;",
    "out vec4 fragColor;",
    "#define S(a,b,t) smoothstep(a,b,t)",
    "mat2 Rot(float a){float s=sin(a),c=cos(a);return mat2(c,-s,s,c);}",
    "vec2 hash(vec2 p){p=vec2(dot(p,vec2(2127.1,81.17)),dot(p,vec2(1269.5,283.37)));return fract(sin(p)*43758.5453);}",
    "float noise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.0-2.0*f);float n=mix(mix(dot(-1.0+2.0*hash(i+vec2(0.0,0.0)),f-vec2(0.0,0.0)),dot(-1.0+2.0*hash(i+vec2(1.0,0.0)),f-vec2(1.0,0.0)),u.x),mix(dot(-1.0+2.0*hash(i+vec2(0.0,1.0)),f-vec2(0.0,1.0)),dot(-1.0+2.0*hash(i+vec2(1.0,1.0)),f-vec2(1.0,1.0)),u.x),u.y);return 0.5+0.5*n;}",
    "void mainImage(out vec4 o, vec2 C){",
    "  float t=iTime*uTimeSpeed;",
    "  vec2 uv=C/iResolution.xy;",
    "  float ratio=iResolution.x/iResolution.y;",
    "  vec2 tuv=uv-0.5+uCenterOffset;",
    "  tuv/=max(uZoom,0.001);",
    "  float degree=noise(vec2(t*0.1,tuv.x*tuv.y)*uNoiseScale);",
    "  tuv.y*=1.0/ratio;",
    "  tuv*=Rot(radians((degree-0.5)*uRotationAmount+180.0));",
    "  tuv.y*=ratio;",
    "  float frequency=uWarpFrequency;",
    "  float ws=max(uWarpStrength,0.001);",
    "  float amplitude=uWarpAmplitude/ws;",
    "  float warpTime=t*uWarpSpeed;",
    "  tuv.x+=sin(tuv.y*frequency+warpTime)/amplitude;",
    "  tuv.y+=sin(tuv.x*(frequency*1.5)+warpTime)/(amplitude*0.5);",
    "  vec3 colLav=uColor1;",
    "  vec3 colOrg=uColor2;",
    "  vec3 colDark=uColor3;",
    "  float b=uColorBalance;",
    "  float s=max(uBlendSoftness,0.0);",
    "  mat2 blendRot=Rot(radians(uBlendAngle));",
    "  float blendX=(tuv*blendRot).x;",
    "  float edge0=-0.3-b-s;",
    "  float edge1=0.2-b+s;",
    "  float v0=0.5-b+s;",
    "  float v1=-0.3-b-s;",
    "  vec3 layer1=mix(colDark,colOrg,S(edge0,edge1,blendX));",
    "  vec3 layer2=mix(colOrg,colLav,S(edge0,edge1,blendX));",
    "  vec3 col=mix(layer1,layer2,S(v0,v1,tuv.y));",
    "  vec2 grainUv=uv*max(uGrainScale,0.001);",
    "  if(uGrainAnimated>0.5){grainUv+=vec2(iTime*0.05);}",
    "  float grain=fract(sin(dot(grainUv,vec2(12.9898,78.233)))*43758.5453);",
    "  col+=(grain-0.5)*uGrainAmount;",
    "  col=(col-0.5)*uContrast+0.5;",
    "  float luma=dot(col,vec3(0.2126,0.7152,0.0722));",
    "  col=mix(vec3(luma),col,uSaturation);",
    "  col=pow(max(col,0.0),vec3(1.0/max(uGamma,0.001)));",
    "  col=clamp(col,0.0,1.0);",
    "  o=vec4(col,1.0);",
    "}",
    "void main(){",
    "  vec4 o=vec4(0.0);",
    "  mainImage(o,gl_FragCoord.xy);",
    "  fragColor=o;",
    "}"
  ].join("\n");

  // React Bits Specular Button — rim shader (vanilla WebGL2 port).
  var SPECULAR_PAD = 20;
  var SPECULAR_VERT = [
    "#version 300 es",
    "in vec2 position;",
    "void main(){",
    "  gl_Position=vec4(position,0.0,1.0);",
    "}"
  ].join("\n");
  var SPECULAR_FRAG = [
    "#version 300 es",
    "precision highp float;",
    "uniform vec2 uCenter;",
    "uniform vec2 uHalfSize;",
    "uniform float uRadius;",
    "uniform float uAngle;",
    "uniform float uPx;",
    "uniform vec3 uLineColor;",
    "uniform vec3 uBaseColor;",
    "uniform float uIntensity;",
    "uniform float uShineSize;",
    "uniform float uShineFade;",
    "uniform float uThickness;",
    "uniform float uBaseWidth;",
    "out vec4 fragColor;",
    "float sdRoundedRect(vec2 p,vec2 b,float r){",
    "  vec2 q=abs(p)-b+r;",
    "  return length(max(q,0.0))+min(max(q.x,q.y),0.0)-r;",
    "}",
    "float shapeSDF(vec2 p){return sdRoundedRect(p,uHalfSize,uRadius);}",
    "float gaussianLine(float d,float sigma){",
    "  float x=d/(sigma+1e-6);",
    "  float k=mix(1.0,1.6,smoothstep(0.0,1.5,x));",
    "  return exp(-k*x*x);",
    "}",
    "void main(){",
    "  vec2 p=gl_FragCoord.xy-uCenter;",
    "  float d=shapeSDF(p);",
    "  vec2 L=vec2(cos(uAngle),sin(uAngle));",
    "  float base=(1.0-smoothstep(0.0,uBaseWidth,abs(d)))*0.45;",
    "  vec2 nEll=normalize(p/(uHalfSize*uHalfSize)+1e-6);",
    "  float phi=acos(clamp(abs(dot(nEll,L)),0.0,1.0));",
    "  float rim=1.0-smoothstep(uShineSize-uShineFade,uShineSize+uShineFade+1e-4,phi);",
    "  float line=gaussianLine(d,uThickness);",
    "  float edgeClamp=1.0-smoothstep(0.5*uPx,3.0*uPx,abs(d));",
    "  float hi=line*rim*edgeClamp*uIntensity;",
    "  vec3 col=uBaseColor*base+uLineColor*hi;",
    "  float a=clamp(base+hi,0.0,1.0);",
    "  fragColor=vec4(col,a);",
    "}"
  ].join("\n");

  // ---- one-time CSS -------------------------------------------------------
  var STYLE_ID = "agn-svc-styles";
  var STYLE_VER = "20260916-1";
  function injectStyles() {
    var existing = document.getElementById(STYLE_ID);
    if (existing && existing.getAttribute("data-ver") === STYLE_VER) return;
    if (existing) existing.remove();
    var css = [
      "[data-svc-page]{--svc:" + A + ";background:transparent !important;color:#fff;font-family:'Poppins',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;-webkit-font-smoothing:antialiased;position:relative;width:100%;overflow-x:clip;}",
      ".svc-wrap{max-width:1160px;margin:0 auto;padding:0 40px;box-sizing:border-box;position:relative;z-index:1;}",
      "[data-reveal]{opacity:0;translate:0 28px;transition:opacity .7s cubic-bezier(.16,.84,.44,1),translate .7s cubic-bezier(.16,.84,.44,1);}",

      /* ---- HERO (Figma 23003:3081) ---- */
      ".svc-hero-scroll{position:relative;z-index:0;height:100vh;height:100lvh;}",
      ".svc-hero-spacer{height:100vh;height:100lvh;pointer-events:none;}",
      ".svc-hero-scroll ~ *{position:relative;z-index:2;}",
      ".svc-hero{position:fixed;inset:0;width:100%;height:100%;min-height:100vh;min-height:100dvh;min-height:100lvh;overflow:hidden;display:flex;align-items:stretch;box-sizing:border-box;isolation:isolate;transform-origin:50% 42%;will-change:transform;z-index:0;}",
      ".svc-hero::after{content:'';position:absolute;inset:0;z-index:0;pointer-events:none;background:#04101f;opacity:var(--hero-veil,0);}",
      ".svc-hero-layer{position:relative;width:100%;padding:calc(120px + var(--agn-top-banner,0px)) 64px 80px;min-height:100vh;min-height:100svh;min-height:100dvh;display:flex;align-items:flex-end;box-sizing:border-box;transform-origin:50% 42%;will-change:transform,filter,opacity;}",
      ".svc-hero-glow{position:absolute;inset:0;z-index:-2;pointer-events:none;background:radial-gradient(90% 80% at 12% -12%,color-mix(in srgb,var(--svc) 26%,transparent) 0%,transparent 58%),radial-gradient(70% 90% at 50% 0%,rgba(255,255,255,.045),transparent 62%),linear-gradient(180deg,rgba(8,18,38,.10) 0%,rgba(8,18,38,.22) 100%);}",
      ".svc-grainient{position:absolute;inset:0;z-index:-3;pointer-events:none;overflow:hidden;}",
      ".svc-grainient canvas{display:block;width:100%;height:100%;opacity:.92;mix-blend-mode:screen;}",
      ".svc-hero-grid{position:absolute;inset:0;z-index:-1;pointer-events:none;opacity:.5;background-image:linear-gradient(rgba(255,255,255,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.045) 1px,transparent 1px);background-size:64px 64px;mask-image:radial-gradient(90% 70% at 50% 20%,#000,transparent 78%);-webkit-mask-image:radial-gradient(90% 70% at 50% 20%,#000,transparent 78%);}",
      ".svc-hero-mark{position:absolute;left:50%;top:calc(102px + var(--agn-top-banner,0px));z-index:0;width:100%;max-width:100%;margin:0;padding:0 16px;box-sizing:border-box;transform:translateX(-50%);transform-origin:center top;font-size:181px;font-weight:700;line-height:1;letter-spacing:-.02em;text-align:center;white-space:nowrap;color:rgba(255,255,255,.1);pointer-events:none;user-select:none;}",
      ".svc-hero-mark.is-shiny{-webkit-text-fill-color:transparent;color:transparent;background-image:linear-gradient(120deg,rgba(255,255,255,.1) 0%,rgba(255,255,255,.1) 35%,rgba(255,255,255,.2) 50%,rgba(255,255,255,.1) 65%,rgba(255,255,255,.1) 100%);background-size:200% auto;background-position:150% center;-webkit-background-clip:text;background-clip:text;animation:svc-shiny-text 2.4s linear infinite;}",
      ".svc-hero-inner{position:relative;z-index:1;width:100%;max-width:1312px;margin:0 auto;display:flex;flex-direction:column;gap:72px;}",
      ".svc-hero-copy{width:100%;display:flex;flex-direction:column;align-items:center;gap:24px;text-align:center;}",
      ".svc-hero-text{width:100%;display:flex;flex-direction:column;gap:10px;overflow:visible;}",
      ".svc-title{margin:0;font-size:48px;font-weight:700;line-height:1.083;letter-spacing:-.02em;color:#fff;}",
      ".svc-title.fold-text{display:block;font-size:48px;color:#fff;line-height:1.083;letter-spacing:-.02em;}",
      ".svc-lead{margin:0 auto;font-size:18px;line-height:1.35;color:#C0C7CC;max-width:920px;}",
      ".svc-lead.fold-text{display:block;font-size:18px;color:#C0C7CC;line-height:1.35;letter-spacing:0;overflow:visible;}",
      ".svc-hero-cta{display:flex;justify-content:center;gap:14px;margin:0;}",
      ".svc-hero-cta .agn-btn{min-width:0;justify-content:center;box-shadow:0 12px 34px -10px color-mix(in srgb,var(--svc) 52%,transparent);}",
      ".svc-stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;width:100%;overflow:visible;}",
      ".svc-stat{position:relative;border:1px solid rgba(255,255,255,.1);border-radius:16.867px;padding:33px 21px;background:rgba(255,255,255,.03);text-align:center;min-height:127px;display:flex;flex-direction:column;align-items:center;justify-content:center;box-sizing:border-box;overflow:visible;isolation:isolate;box-shadow:inset 0 1px 0 rgba(255,255,255,.04);}",
      ".svc-stat-fx{position:absolute;inset:-20px;pointer-events:none;z-index:1;}",
      ".svc-stat-fx canvas{display:block;width:100%;height:100%;}",
      ".svc-stat-label{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;gap:4px;}",
      ".svc-stat-k{display:block;font-size:32px;font-weight:700;line-height:36px;color:#fff;letter-spacing:-.01em;}",
      ".svc-stat-v{display:block;margin-top:0;font-size:14px;font-weight:400;line-height:1.35;color:#8FA0B5;max-width:100%;}",
      ".svc-stat[data-animated-content]{visibility:hidden;will-change:transform,opacity;}",
      ".svc-stat[data-animated-content].is-ac-ready{visibility:visible;}",
      "@keyframes svc-shiny-text{0%{background-position:150% center;}100%{background-position:-50% center;}}",
      "@media(prefers-reduced-motion:reduce){.svc-stat-fx{display:none;}.svc-stat[data-animated-content]{visibility:visible !important;transform:none !important;opacity:1 !important;}.svc-hero-mark.is-shiny{animation:none;background:none;-webkit-text-fill-color:rgba(255,255,255,.1);color:rgba(255,255,255,.1);}}",

      /* ---- FoldText (React Bits) ---- */
      "@property --fold-crease{syntax:'<number>';inherits:true;initial-value:0;}",
      ".fold-text{display:inline-block;color:var(--fold-text-color,currentColor);font-size:var(--fold-text-font-size);font-weight:var(--fold-text-font-weight,inherit);line-height:inherit;letter-spacing:inherit;}",
      ".fold-text-sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;}",
      ".fold-text-visual{display:inline;}",
      ".fold-text-whitespace{display:inline;}",
      ".fold-text-segment{display:inline-block;line-height:inherit;perspective:var(--fold-perspective,700px);transform-style:preserve-3d;vertical-align:baseline;}",
      ".fold-text-piece{position:relative;display:inline-block;color:inherit;line-height:inherit;transform-style:preserve-3d;backface-visibility:hidden;will-change:transform,opacity;opacity:0;transform:rotateX(-92deg);transform-origin:50% 0%;--fold-crease:.55;}",
      ".fold-text-piece.is-folded-in{opacity:1;transform:rotateX(0) rotateY(0);--fold-crease:0;transition:opacity .65s cubic-bezier(.215,.61,.355,1),transform .65s cubic-bezier(.215,.61,.355,1),--fold-crease .65s cubic-bezier(.215,.61,.355,1);}",
      ".fold-text-piece::after{content:'';position:absolute;inset:-.08em -.02em;pointer-events:none;opacity:var(--fold-crease,0);mix-blend-mode:multiply;border-radius:.08em;background:linear-gradient(180deg,rgba(0,0,0,.58) 0%,rgba(0,0,0,.22) 42%,rgba(255,255,255,.26) 100%);}",
      ".fold-text-piece[data-fold-hinge='bottom']::after{background:linear-gradient(0deg,rgba(0,0,0,.58) 0%,rgba(0,0,0,.22) 42%,rgba(255,255,255,.26) 100%);}",
      ".fold-text-piece[data-fold-hinge='left']{transform:rotateY(92deg);transform-origin:0% 50%;}",
      ".fold-text-piece[data-fold-hinge='left']::after{background:linear-gradient(90deg,rgba(0,0,0,.58) 0%,rgba(0,0,0,.22) 42%,rgba(255,255,255,.26) 100%);}",
      ".fold-text-piece[data-fold-hinge='right']{transform:rotateY(-92deg);transform-origin:100% 50%;}",
      ".fold-text-piece[data-fold-hinge='right']::after{background:linear-gradient(270deg,rgba(0,0,0,.58) 0%,rgba(0,0,0,.22) 42%,rgba(255,255,255,.26) 100%);}",
      "@media(prefers-reduced-motion:reduce){.fold-text-piece{opacity:1 !important;transform:none !important;--fold-crease:0 !important;transition:none !important;}.fold-text-piece::after{opacity:0 !important;}}",

      /* ---- STORY / 02 Reasons (Figma 23003:3103) ---- */
      ".svc-story{position:relative;padding:120px 64px;box-sizing:border-box;overflow:hidden;background:transparent;}",
      ".svc-story-inner{position:relative;z-index:1;max-width:1312px;margin:0 auto;display:flex;align-items:center;justify-content:center;gap:98px;}",
      ".svc-story-text{flex:1 1 0;min-width:0;margin:0;font-size:clamp(22px,2.3vw,32px);line-height:1.5;letter-spacing:-.01em;color:rgba(255,255,255,.2);}",
      ".svc-hl-word{position:relative;display:inline-block;white-space:nowrap;margin-right:.28em;}",
      ".svc-hl-word:last-child{margin-right:0;}",
      ".svc-hl-dim{position:relative;display:inline-block;font-weight:400;color:rgba(255,255,255,.2);will-change:opacity;}",
      ".svc-hl-lit{position:absolute;left:0;top:0;display:inline-block;font-weight:700;color:#fff;opacity:0;pointer-events:none;will-change:opacity;}",
      ".svc-story-mark{flex:0 0 auto;width:min(280px,22vw);aspect-ratio:280/346;opacity:0;transform:translateY(36px) scale(.94);filter:blur(8px);will-change:transform,opacity,filter;transition:none;}",
      ".svc-story-mark.is-in{opacity:.2;transform:translateY(0) scale(1);filter:blur(0);transition:opacity 1.05s cubic-bezier(.16,.84,.44,1),transform 1.05s cubic-bezier(.16,.84,.44,1),filter .9s ease;}",
      ".svc-story-mark img,.svc-story-mark svg{display:block;width:100%;height:100%;object-fit:contain;}",
      "@media(prefers-reduced-motion:reduce){.svc-hl-lit{opacity:1 !important;}.svc-hl-dim{opacity:0 !important;}.svc-story-mark{opacity:.2 !important;transform:none !important;filter:none !important;transition:none !important;}}",

      /* Content scrolls above the fixed blurred hero — no solid section fills */
      ".svc-story ~ .svc-pillars,.svc-story ~ .svc-gets,.svc-story ~ .svc-blogs,.svc-story ~ .svc-content-sec,.svc-story ~ .svc-explore,.svc-story ~ .svc-why,.svc-story ~ .svc-what,.svc-story ~ .svc-how,.svc-story ~ .svc-final{position:relative;z-index:2;background:transparent;}",
      "[data-svc-page] #cta.agn-cta,[data-svc-page] [data-agn-cta].agn-cta{background:transparent !important;}",
      "[data-svc-page] .agn-cta-glow{opacity:0 !important;}",
      "[data-svc-page] .ft,[data-svc-page] [data-agn-footer]{position:relative;z-index:2;}",

      /* ---- GETS / 04 What You Get (Figma 23003:3213 + TiltCard) ---- */
      ".svc-gets{position:relative;padding:120px 64px;box-sizing:border-box;background:transparent;}",
      ".svc-gets-title{margin:0 0 42px;text-align:center;font-size:clamp(32px,3.4vw,48px);font-weight:700;line-height:1.083;color:#fff;}",
      ".svc-gets-grid{display:flex;flex-direction:column;gap:12px;width:100%;max-width:1312px;margin:0 auto;}",
      ".svc-gets-row{display:flex;gap:12px;width:100%;align-items:stretch;}",
      ".svc-get-card{position:relative;flex:1 1 0;min-width:0;min-height:340px;height:auto;padding:28px 1px;border-radius:14px;border:1px solid rgba(255,255,255,.1);box-sizing:border-box;overflow:hidden;background:transparent;backdrop-filter:blur(20px) saturate(1.1);-webkit-backdrop-filter:blur(20px) saturate(1.1);transform-style:preserve-3d;will-change:transform;cursor:default;isolation:isolate;--mx:50%;--my:50%;}",
      ".svc-get-card--wide{flex:1 1 100%;width:100%;}",
      ".svc-get-media{position:absolute;inset:-1px;z-index:0;border-radius:14px;overflow:hidden;pointer-events:none;}",
      ".svc-get-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;pointer-events:none;}",
      ".svc-get-img--base{opacity:.2;filter:blur(16px);transform:scale(1.1);}",
      ".svc-get-reveal{position:absolute;inset:-1px;z-index:1;border-radius:14px;overflow:hidden;pointer-events:none;opacity:0;transition:opacity .4s cubic-bezier(.19,1,.22,1);-webkit-mask-image:radial-gradient(circle 420px at var(--mx) var(--my),#000 0%,#000 22%,rgba(0,0,0,.55) 48%,transparent 72%);mask-image:radial-gradient(circle 420px at var(--mx) var(--my),#000 0%,#000 22%,rgba(0,0,0,.55) 48%,transparent 72%);}",
      ".svc-get-card.is-tilting .svc-get-reveal{opacity:1;}",
      ".svc-get-img--clear{opacity:.2;filter:none;transform:none;}",
      ".svc-get-copy{position:relative;z-index:2;display:flex;flex-direction:column;gap:12px;padding:0 24px;box-sizing:border-box;width:100%;}",
      ".svc-get-copy h3{margin:0;font-size:24px;font-weight:600;line-height:1.2;color:#fff;text-shadow:0 1px 18px rgba(8,18,38,.45);}",
      ".svc-get-copy p{margin:0;font-size:14px;font-weight:400;line-height:1.5;color:#AEB9CC;max-width:62ch;text-shadow:0 1px 14px rgba(8,18,38,.4);}",
      ".svc-get-card--wide .svc-get-copy p{max-width:72ch;}",
      "@media(prefers-reduced-motion:reduce){.svc-get-reveal{opacity:1 !important;-webkit-mask-image:none !important;mask-image:none !important;}.svc-get-img--base{opacity:.28;filter:blur(8px);}}",

      /* ---- BLOGS / 05 Expertise (Figma 23008:3410) — LTR marquee ---- */
      ".svc-blogs{position:relative;padding:80px 0;box-sizing:border-box;background:transparent;overflow:visible;}",
      ".svc-blogs-title{margin:0 0 42px;padding:0 40px;text-align:center;font-size:clamp(28px,3.2vw,42px);font-weight:700;line-height:1;letter-spacing:-.02em;color:#fff;box-sizing:border-box;}",
      ".svc-blogs-marquee{position:relative;overflow:visible;padding:0;}",
      ".svc-blogs-edge{position:absolute;top:0;bottom:0;width:min(120px,12vw);z-index:3;pointer-events:none;}",
      ".svc-blogs-edge--left{left:0;background:linear-gradient(90deg,#021526 0%,rgba(2,21,38,0) 100%);}",
      ".svc-blogs-edge--right{right:0;background:linear-gradient(270deg,#021526 0%,rgba(2,21,38,0) 100%);}",
      ".svc-blogs-viewport{width:100%;overflow-x:hidden;overflow-y:visible;cursor:grab;padding:0 clamp(24px,4vw,64px);box-sizing:border-box;touch-action:pan-y;}",
      ".svc-blogs-viewport.is-dragging{cursor:grabbing;user-select:none;}",
      ".svc-blogs-viewport:focus-visible{outline:2px solid color-mix(in srgb,var(--svc) 70%,transparent);outline-offset:4px;border-radius:12px;}",
      ".svc-blogs-track{display:flex;width:max-content;will-change:transform;padding:8px 0 16px;}",
      ".svc-blogs-group{display:flex;gap:24px;padding-right:24px;align-items:stretch;}",
      ".svc-blog-card{position:relative;flex:0 0 auto;display:flex;flex-direction:column;gap:8px;width:424px;padding:4px 4px 14px;border-radius:16px;box-sizing:border-box;text-decoration:none;color:inherit;background:rgba(255,255,255,.05);border:1px solid rgba(94,169,244,.2);overflow:hidden;cursor:pointer;-webkit-user-drag:none;user-select:none;transition:transform .45s cubic-bezier(.16,1,.3,1),opacity .35s ease,border-color .35s ease,box-shadow .45s ease;}",
      ".svc-blogs-marquee.is-dim .svc-blog-card{opacity:.42;transform:scale(.98);}",
      ".svc-blogs-marquee.is-dim .svc-blog-card.is-focus,.svc-blog-card:hover,.svc-blog-card:focus-visible{opacity:1;transform:translateY(-6px) scale(1.02);border-color:rgba(94,169,244,.42);box-shadow:0 20px 50px -24px rgba(0,0,0,.75);outline:none;}",
      ".svc-blog-cover{position:relative;width:100%;height:190px;border-radius:12px;overflow:hidden;background:#0B1B38;flex:0 0 auto;}",
      ".svc-blog-cover img{width:100%;height:100%;object-fit:cover;display:block;pointer-events:none;}",
      ".svc-blog-body{display:flex;flex-direction:column;gap:12px;padding:0 8px;box-sizing:border-box;width:100%;}",
      ".svc-blog-body h3{margin:0;min-height:92px;max-height:92px;font-size:20px;font-weight:600;line-height:1.2;color:#fff;overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:4;}",
      ".svc-blog-meta{display:flex;align-items:center;gap:8px;font-size:14px;font-weight:400;line-height:1.2;color:#1BFED1;}",
      ".svc-blog-meta-sep{width:1px;align-self:stretch;background:rgba(255,255,255,.3);flex:0 0 auto;}",
      ".svc-blogs-cta{display:flex;justify-content:center;margin-top:42px;padding:0 40px;box-sizing:border-box;}",
      ".svc-blogs-cta .agn-btn{box-shadow:0 12px 34px -10px rgba(31,201,160,.6);}",
      "@media(prefers-reduced-motion:reduce){.svc-blogs-track{transform:none !important;}}",

      /* ---- PILLARS / 03 How Works (Figma 23003:3165) ---- */
      ".svc-pillars{position:relative;padding:130px 40px;box-sizing:border-box;background:transparent;}",
      ".svc-pillars-title{margin:0 auto 60px;max-width:920px;text-align:center;font-size:48px;font-weight:700;line-height:1.125;color:#fff;}",
      ".svc-pillars-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));width:100%;max-width:1360px;margin:0 auto;border-top:1px solid rgba(255,255,255,.1);border-left:1px solid rgba(255,255,255,.1);}",
      ".svc-pillar{display:flex;flex-direction:column;gap:8px;min-height:350px;height:100%;padding:32px 35px;box-sizing:border-box;border-right:1px solid rgba(255,255,255,.1);border-bottom:1px solid rgba(255,255,255,.1);background:transparent;overflow:hidden;}",
      ".svc-pillar-label{margin:0;font-size:14px;font-weight:400;line-height:1.2;color:rgba(255,255,255,.4);white-space:nowrap;}",
      ".svc-pillar-stage{position:relative;flex:1 1 auto;min-height:120px;display:flex;align-items:center;justify-content:center;overflow:hidden;padding:8px 12px;box-sizing:border-box;color:var(--svc);}",
      ".svc-pillar-stage .svc-reason-stage-anim{position:relative;inset:auto;width:100%;height:100%;max-height:150px;display:flex;align-items:center;justify-content:center;}",
      ".svc-pillar-copy{display:flex;flex-direction:column;gap:8px;width:100%;flex:0 0 auto;}",
      ".svc-pillar-copy h3{margin:0;font-size:20px;font-weight:500;line-height:1.25;color:var(--svc);}",
      ".svc-pillar-copy p{margin:0;font-size:14px;font-weight:400;line-height:1.5;color:#EBEDEF;}",

      /* ---- generic section head ---- */
      ".svc-sec{position:relative;padding:96px 0;}",
      ".svc-sec + .svc-sec{padding-top:0;}",
      ".svc-sechead{max-width:760px;}",
      ".svc-kicker{display:inline-flex;align-items:center;gap:10px;font-size:13px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--svc);}",
      ".svc-kicker::before{content:'';width:26px;height:1px;background:var(--svc);opacity:.7;}",
      ".svc-h2{margin:16px 0 0;font-size:clamp(28px,3.6vw,44px);font-weight:700;line-height:1.1;letter-spacing:-.02em;color:#fff;}",
      ".svc-sub{margin:16px 0 0;font-size:16px;line-height:1.6;color:#AEB9CC;}",

      /* ---- flexible content sections (list · prose · steps) ---- */
      ".svc-content-sec{position:relative;padding:96px 0;}",
      ".svc-content-sec + .svc-content-sec{padding-top:0;}",
      ".svc-list-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px;margin-top:48px;}",
      ".svc-list-card{display:flex;gap:16px;align-items:flex-start;padding:24px;border-radius:20px;border:1px solid rgba(255,255,255,.1);background:linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.02));transition:border-color .35s ease,transform .35s ease;}",
      ".svc-list-card:hover{border-color:color-mix(in srgb,var(--svc) 32%,rgba(255,255,255,.1));transform:translateY(-2px);}",
      ".svc-list-mark{flex-shrink:0;width:28px;height:28px;border-radius:999px;background:color-mix(in srgb,var(--svc) 18%,transparent);color:var(--svc);display:grid;place-items:center;margin-top:2px;}",
      ".svc-list-mark svg{width:14px;height:14px;}",
      ".svc-list-card h3{margin:0 0 8px;font-size:18px;font-weight:600;line-height:1.3;color:#fff;}",
      ".svc-list-card p{margin:0;font-size:15px;line-height:1.65;color:#AEB9CC;}",
      ".svc-list-card--titled{flex-direction:column;gap:0;}",
      ".svc-prose-sec{padding:100px 0;}",
      ".svc-prose-sec--alt{background:transparent;}",
      ".svc-prose-block{max-width:720px;margin-top:40px;}",
      ".svc-prose-block p{margin:0 0 20px;font-size:17px;line-height:1.75;color:#AEB9CC;}",
      ".svc-prose-block p:last-child{margin-bottom:0;}",
      ".svc-eyebrow{margin:0 0 14px;font-size:13px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--svc);}",

      /* ---- 02 Reasons ---- */
      ".svc-why{padding:120px 0;}",
      ".svc-reasons-layout{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:32px;align-items:start;}",
      ".svc-reasons-col{display:flex;flex-direction:column;gap:32px;min-width:0;}",
      ".svc-reasons-title{margin:0;min-height:104px;font-size:clamp(34px,3.4vw,48px);font-weight:700;line-height:1.083;color:#fff;letter-spacing:-.02em;}",
      ".svc-reason-card{position:relative;border-radius:23px;border:1px solid rgba(255,255,255,.1);background:linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.02));padding:13px 15px;box-sizing:border-box;overflow:hidden;transition:border-color .35s ease,box-shadow .35s ease,transform .35s ease;}",
      ".svc-reason-card:hover{border-color:color-mix(in srgb,var(--svc) 38%,rgba(255,255,255,.1));box-shadow:0 28px 70px -44px rgba(0,0,0,.75);transform:translateY(-2px);}",
      ".svc-reason-stage{position:relative;height:204px;border-radius:12px;overflow:hidden;background:linear-gradient(135deg,rgba(255,255,255,.12),rgba(255,255,255,.05));border:1px solid rgba(255,255,255,.12);}",
      ".svc-reason-stage::before{content:'';position:absolute;inset:-10% 30% auto -10%;height:120%;background:radial-gradient(circle,color-mix(in srgb,var(--svc) 26%,transparent),transparent 62%);filter:blur(18px);opacity:.95;}",
      ".svc-reason-stage::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(255,255,255,.04),rgba(255,255,255,0));pointer-events:none;}",
      /* micro-animation scenes — one detailed motif per reason card */
      ".svc-reason-stage-anim{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:16px 22px;box-sizing:border-box;color:var(--svc);}",
      ".svc-scene{width:100%;height:100%;max-width:430px;max-height:150px;overflow:visible;}",
      ".svc-reason-stage-anim .mut{fill:rgba(255,255,255,.14);}",
      ".svc-reason-stage-anim .mut2{fill:rgba(255,255,255,.06);}",
      ".svc-reason-stage-anim .mutS{fill:none;stroke:rgba(255,255,255,.2);stroke-width:1.5;}",
      ".svc-reason-stage-anim .acc{fill:var(--svc);}",
      ".svc-reason-stage-anim .accS{fill:none;stroke:var(--svc);stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}",
      ".svc-reason-stage-anim .glow{filter:drop-shadow(0 0 5px color-mix(in srgb,var(--svc) 65%,transparent));}",
      /* utilities */
      ".svc-reason-stage-anim .pc{transform-box:fill-box;transform-origin:center;}",
      ".svc-reason-stage-anim .pb{transform-box:fill-box;transform-origin:bottom;}",
      ".svc-reason-stage-anim .pulse{transform-box:fill-box;transform-origin:center;animation:svcPulse 2.2s ease-in-out infinite;}",
      ".svc-reason-stage-anim .blink{animation:svcBlink 2.4s ease-in-out infinite;}",
      ".svc-reason-stage-anim .rise{transform-box:fill-box;transform-origin:bottom;animation:svcRiseY 1.9s ease-in-out infinite;}",
      ".svc-reason-stage-anim .draw{stroke-dasharray:1;stroke-dashoffset:1;animation:svcDrawIn 3.2s ease-in-out infinite;}",
      ".svc-reason-stage-anim .flt{animation:svcFloatY 3.4s ease-in-out infinite;}",
      ".svc-reason-stage-anim .pop{transform-box:fill-box;transform-origin:center;animation:svcPop 3s ease-in-out infinite;}",
      ".svc-reason-stage-anim .dl1{animation-delay:.2s;}",
      ".svc-reason-stage-anim .dl2{animation-delay:.4s;}",
      ".svc-reason-stage-anim .dl3{animation-delay:.6s;}",
      ".svc-reason-stage-anim .dl4{animation-delay:.8s;}",
      ".svc-reason-stage-anim .dl5{animation-delay:1s;}",
      ".svc-reason-stage-anim .dl6{animation-delay:1.2s;}",
      "@keyframes svcBlink{0%,100%{opacity:.28}50%{opacity:1}}",
      "@keyframes svcPulse{0%,100%{opacity:.5;transform:scale(.74)}50%{opacity:1;transform:scale(1.16)}}",
      "@keyframes svcRiseY{0%,100%{transform:scaleY(.26)}50%{transform:scaleY(1)}}",
      "@keyframes svcSpin{to{transform:rotate(360deg)}}",
      "@keyframes svcSpinR{to{transform:rotate(-360deg)}}",
      "@keyframes svcDrawIn{0%{stroke-dashoffset:1}55%,100%{stroke-dashoffset:0}}",
      "@keyframes svcFloatY{0%,100%{transform:translateY(-3px)}50%{transform:translateY(3px)}}",
      "@keyframes svcPop{0%,20%{opacity:0;transform:scale(.3)}38%,72%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.3)}}",
      /* offset-path travellers */
      "@keyframes svcOffset{0%{offset-distance:0%}55%,100%{offset-distance:100%}}",
      "@keyframes svcOffsetLoop{to{offset-distance:100%}}",
      ".svc-reason-stage-anim .dashdot{offset-path:path('M30 92 L56 74 L82 82 L108 52 L134 60 L158 34');offset-distance:0%;animation:svcOffset 3.2s ease-in-out infinite;}",
      ".svc-reason-stage-anim .attndot{offset-path:path('M28 92 C90 92 100 40 160 40 S250 34 272 30');offset-distance:0%;animation:svcOffsetLoop 2.6s ease-in infinite;}",
      ".svc-reason-stage-anim .ecgdot{offset-path:path('M24 60 L70 60 L84 30 L100 90 L116 60 L276 60');offset-distance:0%;animation:svcOffsetLoop 2.8s linear infinite;}",
      ".svc-reason-stage-anim .datadot{offset-path:path('M64 60 L210 60');offset-distance:0%;animation:svcOffsetLoop 1.7s linear infinite;}",
      ".svc-reason-stage-anim .msrc1{offset-path:path('M26 30 L152 60');offset-distance:0%;animation:svcOffsetLoop 2s linear infinite;}",
      ".svc-reason-stage-anim .msrc2{offset-path:path('M26 60 L152 60');offset-distance:0%;animation:svcOffsetLoop 2s linear infinite;}",
      ".svc-reason-stage-anim .msrc3{offset-path:path('M26 90 L152 60');offset-distance:0%;animation:svcOffsetLoop 2s linear infinite;}",
      /* scene-specific motion */
      ".svc-reason-stage-anim .scanY{animation:svcScanY 3s ease-in-out infinite;}",
      "@keyframes svcScanY{0%{transform:translateY(0)}100%{transform:translateY(88px)}}",
      ".svc-reason-stage-anim .fdrop{animation:svcFDrop 2.4s ease-in infinite;}",
      "@keyframes svcFDrop{0%{transform:translateY(-6px);opacity:0}14%{opacity:1}82%{opacity:1}100%{transform:translateY(86px);opacity:.15}}",
      ".svc-reason-stage-anim .fleak{animation:svcLeak 2.4s ease-in infinite;}",
      "@keyframes svcLeak{0%{transform:translate(0,0);opacity:0}45%{opacity:.9}100%{transform:translate(30px,20px);opacity:0}}",
      ".svc-reason-stage-anim .magx{animation:svcMagX 3.6s ease-in-out infinite;}",
      "@keyframes svcMagX{0%{transform:translateX(-4px)}100%{transform:translateX(120px)}}",
      ".svc-reason-stage-anim .orbit{transform-box:view-box;transform-origin:150px 60px;animation:svcSpin 8s linear infinite;}",
      ".svc-reason-stage-anim .orbit2{transform-box:view-box;transform-origin:150px 60px;animation:svcSpinR 6s linear infinite;}",
      ".svc-reason-stage-anim .tilt{transform-box:view-box;transform-origin:150px 44px;animation:svcTilt 3s ease-in-out infinite;}",
      "@keyframes svcTilt{0%,100%{transform:rotate(-7deg)}50%{transform:rotate(7deg)}}",
      ".svc-reason-stage-anim .budx{animation:svcBudX 3.6s ease-in-out infinite;}",
      "@keyframes svcBudX{0%,18%{transform:translateX(0)}48%,68%{transform:translateX(100px)}100%{transform:translateX(150px)}}",
      ".svc-reason-stage-anim .expand{transform-box:fill-box;transform-origin:center;animation:svcExpand 3s ease-out infinite;}",
      "@keyframes svcExpand{0%{transform:scale(.25);opacity:.85}100%{transform:scale(3.6);opacity:0}}",
      ".svc-reason-stage-anim .fastx{animation:svcRaceF 2.8s ease-in-out infinite;}",
      "@keyframes svcRaceF{0%{transform:translateX(0);opacity:0}10%{opacity:1}55%,100%{transform:translateX(150px);opacity:1}}",
      ".svc-reason-stage-anim .slowx{animation:svcRaceS 2.8s ease-in-out infinite;}",
      "@keyframes svcRaceS{0%{transform:translateX(0);opacity:0}10%{opacity:1}100%{transform:translateX(70px);opacity:1}}",
      ".svc-reason-stage-anim .clkspin{transform-box:view-box;transform-origin:262px 62px;animation:svcSpin 3s linear infinite;}",
      ".svc-reason-stage-anim .pindrop{animation:svcPinDrop 2.8s ease-in-out infinite;}",
      "@keyframes svcPinDrop{0%{transform:translateY(-30px);opacity:0}25%{opacity:1}45%{transform:translateY(0)}60%{transform:translateY(-8px)}75%,100%{transform:translateY(0);opacity:1}}",
      ".svc-reason-stage-anim .curmove{animation:svcCurMove 3s ease-in-out infinite;}",
      "@keyframes svcCurMove{0%{transform:translate(0,0)}45%,100%{transform:translate(-58px,10px)}}",
      ".svc-reason-stage-anim .arrowin{animation:svcArrowIn 2.6s ease-in-out infinite;}",
      "@keyframes svcArrowIn{0%{transform:translate(-70px,-34px);opacity:0}30%{opacity:1}60%,100%{transform:translate(0,0);opacity:1}}",
      ".svc-reason-stage-anim .briefin{animation:svcBriefIn 3.4s ease-in-out infinite;}",
      "@keyframes svcBriefIn{0%{transform:translateX(40px);opacity:0}25%,80%{transform:translateX(0);opacity:1}100%{transform:translateX(40px);opacity:0}}",
      ".svc-reason-stage-anim .fillup{transform-box:fill-box;transform-origin:bottom;animation:svcFillUp 3s ease-in-out infinite;}",
      "@keyframes svcFillUp{0%{transform:scaleY(.12)}70%,100%{transform:scaleY(1)}}",
      "@media(prefers-reduced-motion:reduce){.svc-reason-stage-anim *{animation:none !important;}}",
      ".svc-reason-copy{padding:12px;}",
      ".svc-reason-i{display:block;font-size:16px;font-weight:700;line-height:1;color:var(--svc);}",
      ".svc-reason-copy h3{margin:12px 0 0;font-size:20px;font-weight:600;line-height:1.25;color:#fff;}",
      ".svc-reason-copy p{margin:12px 0 0;font-size:14px;line-height:1.5;color:#AEB9CC;}",

      /* ---- HOW / Process snake ---- */
      ".svc-how{position:relative;padding:130px 0;background:transparent;overflow:hidden;}",
      ".svc-how--inline{margin-top:0;}",
      ".svc-how::before{display:none;}",
      ".svc-how .svc-wrap{position:relative;z-index:1;}",
      ".svc-how-head{max-width:1160px;margin:0 auto 80px;}",
      ".svc-how-head .svc-h2{text-align:center;font-size:clamp(46px,5.4vw,78px);line-height:1.05;}",
      ".svc-how-head .svc-sub{max-width:820px;margin:18px auto 0;text-align:center;}",
      ".svc-process-wrap{position:relative;max-width:1160px;margin:0 auto;}",
      ".svc-process-stage{position:relative;width:1148px;transform-origin:top left;}",
      ".svc-process-svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none;}",
      ".svc-process-path-base{fill:none;stroke:rgba(255,255,255,.09);stroke-width:2;}",
      ".svc-process-path-prog{fill:none;stroke:url(#svcProcTrail);stroke-width:4;stroke-linecap:round;stroke-linejoin:round;filter:drop-shadow(0 0 12px color-mix(in srgb,var(--svc) 32%,transparent));}",
      ".svc-process-baton-glow{fill:color-mix(in srgb,var(--svc) 42%,transparent);}",
      ".svc-process-baton-core{fill:color-mix(in srgb,var(--svc) 70%,#fff 30%);}",
      ".svc-process-card{position:absolute;width:567px;padding:37px;border-radius:36px;box-sizing:border-box;background:rgba(255,255,255,.1);backdrop-filter:blur(17px);-webkit-backdrop-filter:blur(17px);border:1px solid rgba(227,232,239,.2);opacity:.2;transform:translateY(30px) scale(1);filter:blur(7px);will-change:transform,opacity,filter,border-color,box-shadow;}",
      ".svc-process-card.is-active{z-index:2;}",
      ".svc-process-num{display:inline-grid;place-items:center;min-width:58px;height:58px;padding:0 14px;border-radius:999px;background:var(--svc);color:#fff;font-size:16px;font-weight:700;line-height:1;box-shadow:0 0 0 1px rgba(8,18,38,.06);}",
      ".svc-process-card h3{margin:18px 0 0;font-size:23px;font-weight:700;line-height:1.2;color:#fff;}",
      ".svc-process-card p{margin:12px 0 0;font-size:16px;line-height:1.6;color:#EBEDEF;}",

      /* ---- WHAT marquee ---- */
      ".svc-what{position:relative;padding:120px 0;overflow-x:clip;overflow-y:visible;}",
      ".svc-what-title{margin:0;text-align:center;font-size:clamp(34px,4.2vw,48px);font-weight:700;line-height:1.08;color:#fff;letter-spacing:-.02em;}",
      /* Full-bleed marquee — cards enter from the screen edge, capped at 1920.
         Vertical padding lives on the track so hover lift/scale isn't clipped by overflow-x. */
      ".svc-what-marquee{position:relative;z-index:1;width:100%;max-width:1920px;margin:24px auto 0;padding:0;box-sizing:border-box;overflow:visible;}",
      ".svc-what-viewport{position:relative;width:100%;overflow:hidden;cursor:grab;touch-action:pan-y;}",
      ".svc-what-viewport.is-dragging{cursor:grabbing;}",
      ".svc-what-viewport:focus-visible{outline:2px solid color-mix(in srgb,var(--svc) 70%,transparent);outline-offset:4px;border-radius:12px;}",
      ".svc-what-track{display:flex;width:max-content;will-change:transform;padding:28px 0 32px;}",
      ".svc-what-group{display:flex;gap:21px;padding-right:21px;align-items:stretch;}",
      ".svc-what-card{flex:0 0 auto;width:min(360px,78vw);padding:25px;border-radius:23px;box-sizing:border-box;text-align:center;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.1);transition:transform .45s cubic-bezier(.16,1,.3,1),opacity .35s ease,border-color .35s ease,background .35s ease,box-shadow .45s ease;}",
      ".svc-what-marquee.is-dim .svc-what-card{opacity:.42;transform:scale(.98);}",
      ".svc-what-marquee.is-dim .svc-what-card.is-focus,.svc-what-card:hover,.svc-what-card:focus-visible{opacity:1;transform:translateY(-4px) scale(1.02);border-color:color-mix(in srgb,var(--svc) 42%,rgba(255,255,255,.1));background:rgba(255,255,255,.06);box-shadow:0 22px 55px -28px rgba(0,0,0,.75),0 0 0 1px color-mix(in srgb,var(--svc) 24%,transparent);}",
      ".svc-what-card h3{margin:0;font-size:18px;font-weight:700;line-height:1.16;color:#fff;}",
      ".svc-what-card p{margin:12px 0 0;font-size:14px;line-height:1.5;color:#AEB9CC;}",
      ".svc-what-edge{position:absolute;top:0;bottom:0;width:min(120px,12vw);z-index:2;pointer-events:none;-webkit-backdrop-filter:blur(16px) saturate(1.15);backdrop-filter:blur(16px) saturate(1.15);}",
      ".svc-what-edge--left{left:0;background:linear-gradient(90deg,rgba(8,18,38,0),rgba(8,18,38,0));-webkit-mask-image:linear-gradient(90deg,#000 0%,transparent 100%);mask-image:linear-gradient(90deg,#000 0%,transparent 100%);}",
      ".svc-what-edge--right{right:0;background:linear-gradient(270deg,rgba(8,18,38,0),rgba(8,18,38,0));-webkit-mask-image:linear-gradient(270deg,#000 0%,transparent 100%);mask-image:linear-gradient(270deg,#000 0%,transparent 100%);}",
      "@media(prefers-reduced-motion:reduce){.svc-what-track{transform:none !important;}}",

      /* ---- Explore other services (capability cards) ---- */
      ".svc-explore{padding:64px 0;overflow:visible;}",
      ".svc-explore-head{margin:0 0 24px;padding:0 40px;text-align:center;font-size:13.7px;font-weight:600;letter-spacing:.17em;text-transform:uppercase;color:#8FA0B5;box-sizing:border-box;}",
      ".svc-explore-marquee{position:relative;overflow:visible;padding:16px 0;}",
      ".svc-explore-viewport{width:100%;overflow-x:hidden;overflow-y:visible;cursor:grab;padding:0 clamp(24px,4vw,64px);box-sizing:border-box;touch-action:pan-y;}",
      ".svc-explore-viewport.is-dragging{cursor:grabbing;user-select:none;}",
      ".svc-explore-viewport:focus-visible{outline:2px solid color-mix(in srgb,var(--svc) 70%,transparent);outline-offset:4px;border-radius:12px;}",
      ".svc-explore-track{display:flex;width:max-content;will-change:transform;padding:14px 0;}",
      ".svc-explore-group{display:flex;gap:24px;padding-right:24px;align-items:stretch;}",
      ".svc-explore-card{position:relative;flex:0 0 auto;display:flex;flex-direction:column;justify-content:space-between;width:328px;height:316px;padding:19px;border-radius:32px;box-sizing:border-box;text-decoration:none;color:inherit;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);overflow:hidden;cursor:pointer;-webkit-user-drag:none;user-select:none;transition:transform .45s cubic-bezier(.16,1,.3,1),opacity .35s ease,border-color .35s ease,box-shadow .45s ease;}",
      ".svc-explore-marquee.is-dim .svc-explore-card{opacity:.42;transform:scale(.98);}",
      ".svc-explore-marquee.is-dim .svc-explore-card.is-focus,.svc-explore-card:hover,.svc-explore-card:focus-visible{opacity:1;transform:translateY(-6px) scale(1.02);border-color:rgba(255,255,255,.22);box-shadow:0 20px 50px -24px rgba(0,0,0,.75);outline:none;}",
      ".svc-explore-img{position:absolute;inset:5px 6px 5px;border-radius:24px;overflow:hidden;background:#0B1B38;}",
      ".svc-explore-img img{width:100%;height:100%;object-fit:cover;display:block;pointer-events:none;}",
      ".svc-explore-shade{position:absolute;left:6px;right:6px;bottom:5px;height:106px;border-radius:0 0 15px 15px;background:linear-gradient(180deg,rgba(11,27,56,0),#0B1B38);pointer-events:none;}",
      ".svc-explore-text{position:relative;z-index:2;display:flex;flex-direction:column;gap:7px;margin-top:auto;}",
      ".svc-explore-text h3{margin:0;font-size:19px;font-weight:700;line-height:21px;color:#fff;}",
      ".svc-explore-text p{margin:0;font-size:13px;line-height:1.38;color:#C0C7CC;}",
      "@media(prefers-reduced-motion:reduce){.svc-explore-track{transform:none !important;}}",

      /* ---- FINAL CTA band (Figma 22945:3274 · 1312×352) ---- */
      ".svc-final{position:relative;padding:80px 64px;box-sizing:border-box;}",
      ".svc-final-card{container-type:inline-size;container-name:svcfinal;position:relative;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2.439cqi;width:100%;max-width:1312px;margin:0 auto;aspect-ratio:1312/352.108;padding:5.568cqi 3.282cqi;border-radius:2.571cqi;box-sizing:border-box;text-align:center;background:linear-gradient(174deg,#0B1B38 58%,#081226 92%);border:1px solid rgba(255,255,255,.12);box-shadow:0 53px 127px -63px rgba(0,0,0,.8);}",
      ".svc-final-mark{position:absolute;left:50.11%;top:-62.35%;width:46.32%;height:auto;aspect-ratio:1024/927;object-fit:contain;object-position:center;opacity:.2;pointer-events:none;z-index:0;}",
      ".svc-final-copy{position:relative;z-index:1;display:flex;flex-direction:column;gap:1.067cqi;width:100%;}",
      ".svc-final-copy h2{margin:0;font-size:3.214cqi;font-weight:700;line-height:1.12;letter-spacing:-0.064cqi;color:#fff;}",
      ".svc-final-copy p{margin:0;font-size:1.286cqi;font-weight:400;line-height:1.65;color:#C0C7CC;}",
      ".svc-final-card .agn-btn{position:relative;z-index:1;font-size:1.22cqi;padding:1.22cqi 1.83cqi;box-shadow:0 0.915cqi 2.59cqi -0.76cqi rgba(31,201,160,.6);}",

      /* ---- responsive ---- */
      "@media(max-width:960px){",
        ".svc-wrap{padding:0 16px;}",
        ".svc-hero-scroll{height:auto;}",
        ".svc-hero-spacer{display:none;}",
        ".svc-hero{position:relative;left:auto;right:auto;height:auto;min-height:0;transform:none !important;opacity:1 !important;filter:none !important;visibility:visible !important;}",
        ".svc-hero::after{opacity:0 !important;}",
        ".svc-hero-layer{padding:calc(112px + var(--agn-top-banner,0px)) 16px 56px;min-height:100vh;min-height:100svh;min-height:100dvh;align-items:flex-end;transform:none !important;filter:none !important;opacity:1 !important;}",
        ".svc-hero-mark{padding:0 12px;}",
        ".svc-hero-inner{gap:40px;}",
        ".svc-hero-copy{gap:20px;}",
        ".svc-title{font-size:48px;line-height:1.15;}",
        ".svc-lead{max-width:100%;font-size:16px;line-height:1.4;}",
        ".svc-hero-cta{margin:0;width:100%;}",
        ".svc-hero-cta .agn-btn{min-width:0;width:100%;}",
        ".svc-stats{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;}",
        ".svc-stat{min-height:0;padding:24px 16px;}",
        ".svc-stat-k{font-size:24px;line-height:1.2;}",
        ".svc-story{padding:72px 16px;}",
        ".svc-story-inner{flex-direction:column;gap:40px;align-items:flex-start;}",
        ".svc-story-text{font-size:22px;line-height:1.45;}",
        ".svc-story-mark{width:min(180px,46vw);align-self:center;}",
        ".svc-pillars{padding:72px 16px;}",
        ".svc-pillars-title{margin-bottom:32px;font-size:32px;text-align:left;}",
        ".svc-pillars-grid{grid-template-columns:1fr;}",
        ".svc-pillar{min-height:0;padding:24px 20px;}",
        ".svc-pillar-stage{min-height:110px;}",
        ".svc-gets{padding:72px 16px;}",
        ".svc-gets-title{margin-bottom:28px;font-size:32px;text-align:left;}",
        ".svc-gets-row{flex-direction:column;}",
        ".svc-get-card{height:auto;min-height:220px;padding:22px 1px;}",
        ".svc-get-copy h3{font-size:20px;}",
        ".svc-blogs{padding:56px 0;}",
        ".svc-blogs-title{margin-bottom:28px;padding:0 16px;font-size:28px;text-align:left;}",
        ".svc-blogs-edge{display:none;}",
        ".svc-blogs-viewport{overflow-x:auto;overflow-y:visible;-webkit-overflow-scrolling:touch;scrollbar-width:none;padding:0 16px;cursor:auto;}",
        ".svc-blogs-viewport::-webkit-scrollbar{display:none;}",
        ".svc-blogs-track{transform:none !important;width:auto;padding:8px 0;}",
        ".svc-blogs-group[aria-hidden='true']{display:none;}",
        ".svc-blogs-group{padding-right:16px;}",
        ".svc-blog-card{width:min(320px,82vw);}",
        ".svc-blog-cover{height:160px;}",
        ".svc-blog-body h3{min-height:76px;max-height:76px;font-size:17px;-webkit-line-clamp:3;}",
        ".svc-blogs-cta{margin-top:28px;padding:0 16px;}",
        ".svc-sec{padding:56px 0;}",
        ".svc-why{padding:56px 0;}",
        ".svc-reasons-layout,.svc-why-grid{grid-template-columns:1fr;gap:14px;}",
        ".svc-what{padding:56px 0;}",
        ".svc-what-title{font-size:34px;text-align:left;}",
        ".svc-what-marquee{width:100%;max-width:none;margin-top:18px;padding:0;}",
        ".svc-what-edge{display:none;}",
        ".svc-what-viewport{overflow-x:auto;overflow-y:visible;-webkit-overflow-scrolling:touch;scrollbar-width:none;scroll-snap-type:x proximity;cursor:auto;padding:0 16px;box-sizing:border-box;}",
        ".svc-what-viewport::-webkit-scrollbar{display:none;}",
        ".svc-what-track{transform:none !important;width:auto;padding:16px 0;}",
        ".svc-what-group{padding-right:16px;}",
        ".svc-what-group[aria-hidden='true']{display:none;}",
        ".svc-what-card{width:min(320px,82vw);scroll-snap-align:start;}",
        ".svc-explore{padding:48px 0;}",
        ".svc-explore-head{padding:0 16px;font-size:12px;}",
        ".svc-explore-marquee{padding:12px 0;}",
        ".svc-explore-viewport{overflow-x:auto;overflow-y:visible;-webkit-overflow-scrolling:touch;scrollbar-width:none;padding:0 16px;cursor:auto;}",
        ".svc-explore-viewport::-webkit-scrollbar{display:none;}",
        ".svc-explore-track{transform:none !important;width:auto;padding:8px 0;}",
        ".svc-explore-group[aria-hidden='true']{display:none;}",
        ".svc-explore-group{padding-right:16px;}",
        ".svc-explore-card{width:min(280px,78vw);height:272px;padding:16px;border-radius:24px;}",
        ".svc-explore-img{inset:4px 5px;border-radius:20px;}",
        ".svc-explore-shade{left:5px;right:5px;bottom:4px;height:34%;border-radius:0 0 16px 16px;}",
        ".svc-explore-text h3{font-size:17px;line-height:20px;}",
        ".svc-explore-text p{font-size:12px;line-height:1.4;}",
        ".svc-reasons-col{gap:14px;}",
        ".svc-reasons-title{min-height:0;font-size:34px;}",
        ".svc-reason-card{padding:12px;}",
        ".svc-reason-stage{height:150px;}",
        ".svc-how{padding:56px 0;}",
        ".svc-how-head{margin-bottom:28px;}",
        ".svc-how-head .svc-h2{text-align:left;font-size:34px;line-height:1.1;}",
        ".svc-how-head .svc-sub{margin:14px 0 0;text-align:left;max-width:none;}",
        ".svc-process-wrap{height:auto !important;}",
        ".svc-process-stage{width:auto !important;height:auto !important;transform:none !important;display:grid;gap:14px;}",
        ".svc-process-svg{display:none;}",
        ".svc-process-card{position:relative !important;left:auto !important;top:auto !important;width:auto;padding:24px;border-radius:24px;opacity:1 !important;transform:none !important;filter:none !important;}",
        ".svc-process-card h3{margin-top:16px;font-size:20px;}",
        ".svc-process-card p{font-size:14px;line-height:1.6;}",
        ".svc-process-num{min-width:46px;height:46px;font-size:14px;padding:0 12px;}",
        ".svc-final{padding:40px 16px;}",
        ".svc-final-card{max-width:none;aspect-ratio:1312/352.108;padding:5.568cqi 3.282cqi;border-radius:2.571cqi;gap:2.439cqi;}",
        ".svc-final-copy h2{font-size:3.214cqi;line-height:1.12;letter-spacing:-0.064cqi;}",
        ".svc-final-copy p{font-size:1.286cqi;line-height:1.65;}",
        ".svc-final-mark{left:50.11%;top:-62.35%;width:46.32%;}",
        ".svc-list-grid{grid-template-columns:1fr;gap:16px;margin-top:32px;}",
        ".svc-content-sec{padding:64px 0;}",
        ".svc-prose-sec{padding:72px 0;}",
      "}"
    ].join("");
    var s = document.createElement("style");
    s.id = STYLE_ID;
    s.setAttribute("data-ver", STYLE_VER);
    s.textContent = css;
    (document.head || document.documentElement).appendChild(s);
  }

  // ---- HTML builders ------------------------------------------------------
  function foldSegmentsHTML(text, splitBy) {
    var raw = String(text == null ? "" : text);
    var parts = [];
    var pushSeg = function (content) {
      parts.push(
        '<span class="fold-text-segment" data-fold-split="' + esc(splitBy) + '" style="--fold-perspective:700px">' +
          '<span class="fold-text-piece" data-fold-hinge="top">' + esc(content || "\u00A0") + "</span>" +
        "</span>"
      );
    };
    if (splitBy === "word") {
      raw.split(/(\s+)/).forEach(function (part) {
        if (!part) return;
        if (/^\s+$/.test(part)) {
          parts.push('<span class="fold-text-whitespace">' + esc(part.replace(/ /g, "\u00A0")) + "</span>");
        } else {
          pushSeg(part);
        }
      });
    } else {
      Array.from(raw).forEach(function (ch) {
        if (ch === "\n") {
          parts.push("<br>");
          return;
        }
        pushSeg(ch === " " ? "\u00A0" : ch);
      });
    }
    return parts.join("");
  }

  function foldTextHTML(text, opts) {
    var o = opts || {};
    var splitBy = o.splitBy || "char";
    var color = o.color || "#fff";
    var weight = o.weight || "700";
    var fontSize = o.fontSize || "";
    var cls = o.className || "";
    var tag = o.tag || "span";
    var attrs = o.attrs || "";
    var safe = String(text == null ? "" : text);
    var style = "--fold-text-color:" + esc(color) + ";--fold-text-font-weight:" + esc(String(weight));
    if (fontSize) style += ";--fold-text-font-size:" + esc(String(fontSize));
    return "<" + tag + ' class="fold-text ' + esc(cls) + '" data-fold-text data-fold-split="' + esc(splitBy) + '" style="' + style + '"' + (attrs ? " " + attrs : "") + ">" +
      '<span class="fold-text-sr-only">' + esc(safe) + "</span>" +
      '<span class="fold-text-visual" aria-hidden="true">' + foldSegmentsHTML(safe, splitBy) + "</span>" +
    "</" + tag + ">";
  }

  function heroHTML(d) {
    var titleRaw = String(d.title || "");
    var headlineRaw = String(d.heroHeadline || d.title || "");
    var leadRaw = d.lead ? String(d.lead).replace(/\n+/g, " ").trim() : "";
    var stats = (d.stats || []).map(function (s) {
      return '<div class="svc-stat" data-specular data-animated-content>' +
        '<span class="svc-stat-fx" aria-hidden="true"></span>' +
        '<div class="svc-stat-label">' +
          '<b class="svc-stat-k">' + esc(s.k) + "</b>" +
          '<span class="svc-stat-v">' + esc(s.v) + "</span>" +
        "</div>" +
      "</div>";
    }).join("");
    var statsHTML = stats
      ? '<div class="svc-stats">' + stats + "</div>"
      : "";
    var markHTML = titleRaw
      ? '<p class="svc-hero-mark" data-hero-mark aria-hidden="true">' + esc(titleRaw) + "</p>"
      : "";
    var titleHTML = foldTextHTML(headlineRaw, {
      tag: "h1",
      splitBy: "word",
      color: "#fff",
      weight: "700",
      fontSize: "48px",
      className: "svc-title"
    });
    var leadHTML = leadRaw
      ? foldTextHTML(leadRaw, {
          tag: "p",
          splitBy: "word",
          color: "#C0C7CC",
          weight: "400",
          fontSize: "18px",
          className: "svc-lead"
        })
      : "";
    return "" +
      '<div class="svc-hero-scroll" data-hero-scroll>' +
        '<div class="svc-hero-spacer" data-hero-spacer aria-hidden="true"></div>' +
        '<header class="svc-hero" data-hero-pin>' +
          '<div class="svc-hero-layer" data-hero-layer>' +
            '<div class="svc-grainient" aria-hidden="true" data-grainient data-colors="' + esc((d.grain || []).join("|")) + '"><canvas></canvas></div>' +
            '<div class="svc-hero-glow" aria-hidden="true"></div>' +
            '<div class="svc-hero-grid" aria-hidden="true"></div>' +
            markHTML +
            '<div class="svc-hero-inner">' +
              statsHTML +
              '<div class="svc-hero-copy">' +
                '<div class="svc-hero-text" data-fold-card data-fold-delay="480">' +
                  titleHTML +
                  leadHTML +
                "</div>" +
                '<div class="svc-hero-cta" data-reveal data-reveal-delay="120">' +
                  '<a class="agn-btn" href="#cta" data-magnetic="true">' + esc(d.cta) + "</a>" +
                "</div>" +
              "</div>" +
            "</div>" +
          "</div>" +
        "</header>" +
      "</div>";
  }

  function storyWordsHTML(text) {
    var words = String(text || "").trim().split(/\s+/).filter(Boolean);
    return words.map(function (w) {
      var safe = esc(w);
      return '<span class="svc-hl-word" aria-hidden="true">' +
        '<span class="svc-hl-dim">' + safe + "</span>" +
        '<span class="svc-hl-lit">' + safe + "</span>" +
      "</span>";
    }).join("");
  }

  function storyHTML(d) {
    if (!d.story) return "";
    return '<section class="svc-story" id="story" data-svc-story>' +
      '<div class="svc-story-inner">' +
        '<p class="svc-story-text" data-story-text aria-label="' + esc(d.story) + '">' + storyWordsHTML(d.story) + "</p>" +
        '<div class="svc-story-mark" data-story-mark aria-hidden="true">' +
          '<img src="../assets/svc-story-mark.svg" alt="" loading="lazy" draggable="false">' +
        "</div>" +
      "</div>" +
    "</section>";
  }

  function getsCardHTML(item, i, wide) {
    var src = "../assets/" + String(item.img || "").replace(/^\/+/, "");
    return '<article class="svc-get-card' + (wide ? " svc-get-card--wide" : "") + '" data-tilt data-get-card data-reveal data-reveal-delay="' + (50 + i * 40) + '">' +
      '<div class="svc-get-media" aria-hidden="true">' +
        '<img class="svc-get-img svc-get-img--base" src="' + esc(src) + '" alt="" loading="lazy" draggable="false">' +
      "</div>" +
      '<div class="svc-get-reveal" data-get-reveal aria-hidden="true">' +
        '<img class="svc-get-img svc-get-img--clear" src="' + esc(src) + '" alt="" loading="lazy" draggable="false">' +
      "</div>" +
      '<div class="svc-get-copy">' +
        "<h3>" + esc(item.t) + "</h3>" +
        "<p>" + esc(item.b) + "</p>" +
      "</div>" +
    "</article>";
  }

  function getsHTML(d) {
    var items = d.gets || [];
    if (!items.length) return "";
    var top = items.slice(0, 2).map(function (it, i) { return getsCardHTML(it, i, false); }).join("");
    var mid = items.slice(2, 4).map(function (it, i) { return getsCardHTML(it, i + 2, false); }).join("");
    var bottom = items[4] ? getsCardHTML(items[4], 4, true) : "";
    return '<section class="svc-gets" id="gets" data-svc-gets>' +
      '<h2 class="svc-gets-title" data-reveal>' + esc(d.getsTitle || "What You Get") + "</h2>" +
      '<div class="svc-gets-grid">' +
        (top ? '<div class="svc-gets-row">' + top + "</div>" : "") +
        (mid ? '<div class="svc-gets-row">' + mid + "</div>" : "") +
        (bottom ? '<div class="svc-gets-row">' + bottom + "</div>" : "") +
      "</div>" +
    "</section>";
  }

  function blogCardHTML(item) {
    var src = "../assets/" + String(item.img || "").replace(/^\/+/, "");
    var href = item.href || "#";
    return '<a class="svc-blog-card" href="' + esc(href) + '" aria-label="' + esc(item.t) + '" draggable="false">' +
      '<div class="svc-blog-cover"><img src="' + esc(src) + '" alt="" loading="lazy" draggable="false"></div>' +
      '<div class="svc-blog-body">' +
        "<h3>" + esc(item.t) + "</h3>" +
        '<div class="svc-blog-meta">' +
          "<span>" + esc(item.date) + "</span>" +
          '<span class="svc-blog-meta-sep" aria-hidden="true"></span>' +
          "<span>" + esc(item.read) + "</span>" +
        "</div>" +
      "</div>" +
    "</a>";
  }

  function blogsHTML() {
    var cards = BLOGS.map(blogCardHTML).join("");
    return '<section class="svc-blogs" id="blogs" aria-label="Blog articles">' +
      '<h2 class="svc-blogs-title" data-reveal>We put our best expertise forward through</h2>' +
      '<div class="svc-blogs-marquee" data-blogs-marquee>' +
        '<div class="svc-blogs-edge svc-blogs-edge--left" aria-hidden="true"></div>' +
        '<div class="svc-blogs-edge svc-blogs-edge--right" aria-hidden="true"></div>' +
        '<div class="svc-blogs-viewport" data-blogs-viewport tabindex="0" role="region" aria-label="Blog articles">' +
          '<div class="svc-blogs-track" data-blogs-track>' +
            '<div class="svc-blogs-group" data-blogs-group>' + cards + "</div>" +
          "</div>" +
        "</div>" +
      "</div>" +
      '<div class="svc-blogs-cta" data-reveal data-reveal-delay="120">' +
        '<a class="agn-btn" href="#" data-magnetic="true">Read More Articles</a>' +
      "</div>" +
    "</section>";
  }

  function pillarsHTML(d) {
    var items = d.pillars || [];
    if (!items.length) return "";
    var cells = items.map(function (p, i) {
      return '<article class="svc-pillar" data-reveal data-reveal-delay="' + (60 + i * 50) + '">' +
        '<p class="svc-pillar-label">' + esc(p.label || ((i + 1 < 10 ? "0" : "") + (i + 1))) + "</p>" +
        '<div class="svc-pillar-stage" aria-hidden="true">' + stageAnim(p.anim, i) + "</div>" +
        '<div class="svc-pillar-copy">' +
          "<h3>" + esc(p.t) + "</h3>" +
          "<p>" + esc(p.b) + "</p>" +
        "</div>" +
      "</article>";
    }).join("");
    return '<section class="svc-pillars" id="pillars" data-svc-pillars>' +
      '<h2 class="svc-pillars-title" data-reveal>' + esc(d.pillarsTitle || "") + "</h2>" +
      '<div class="svc-pillars-grid">' + cells + "</div>" +
    "</section>";
  }

  function listSectionHTML(sec, idx) {
    var baseDelay = 40 + idx * 20;
    var cards = (sec.items || []).map(function (w, i) {
      var text = esc(w.b || w);
      var titled = w.t ? " svc-list-card--titled" : "";
      var title = w.t ? "<h3>" + esc(w.t) + "</h3>" : '<div class="svc-list-mark" aria-hidden="true">' + CHECK + "</div>";
      return '<article class="svc-list-card' + titled + '" data-reveal data-reveal-delay="' + (baseDelay + i * 35) + '">' +
        title + "<p>" + text + "</p></article>";
    }).join("");
    var sub = sec.sub ? '<p class="svc-sub">' + esc(sec.sub) + "</p>" : "";
    var idAttr = sec.id ? ' id="' + esc(sec.id) + '"' : "";
    return '<section class="svc-content-sec svc-list-sec"' + idAttr + ">" +
      '<div class="svc-wrap">' +
        '<div class="svc-sechead" data-reveal>' +
          '<h2 class="svc-h2">' + esc(sec.title) + "</h2>" + sub +
        "</div>" +
        '<div class="svc-list-grid">' + cards + "</div>" +
      "</div></section>";
  }

  function proseSectionHTML(sec, idx) {
    var alt = idx % 2 === 1 ? " svc-prose-sec--alt" : "";
    var baseDelay = 50 + idx * 20;
    var paras = (sec.paragraphs || []).map(function (p, i) {
      return '<p data-reveal data-reveal-delay="' + (baseDelay + i * 40) + '">' + esc(p) + "</p>";
    }).join("");
    var idAttr = sec.id ? ' id="' + esc(sec.id) + '"' : "";
    return '<section class="svc-content-sec svc-prose-sec' + alt + '"' + idAttr + ">" +
      '<div class="svc-wrap">' +
        '<div class="svc-sechead" data-reveal><h2 class="svc-h2">' + esc(sec.title) + "</h2></div>" +
        '<div class="svc-prose-block">' + paras + "</div>" +
      "</div></section>";
  }

  function sectionsHTML(d) {
    var sections = d.sections || [];
    return sections.map(function (sec, idx) {
      if (sec.type === "list") return listSectionHTML(sec, idx);
      if (sec.type === "prose") return proseSectionHTML(sec, idx);
      if (sec.type === "steps") return stepsSectionHTML(sec, d, idx);
      return "";
    }).join("");
  }

  function stepsSectionHTML(sec, d, idx) {
    var steps = sec.items || [];
    var fake = { howTitle: sec.title, howIntro: sec.sub || "", steps: steps };
    var html = howHTML(fake, d);
    if (idx > 0) {
      html = html.replace('class="svc-how"', 'class="svc-how svc-how--inline"');
    }
    return html;
  }

  // Detailed micro-animation scenes. Each key is a concept; markup fills the stage.
  var SCENE = {
    find: '<svg class="svc-scene" viewBox="0 0 300 120" aria-hidden="true"><rect class="mut2" x="60" y="8" width="146" height="104" rx="10"/><rect class="mutS" x="60" y="8" width="146" height="104" rx="10"/><rect class="mut" x="76" y="24" width="114" height="7" rx="3.5"/><rect class="acc blink" x="76" y="42" width="92" height="7" rx="3.5"/><rect class="mut" x="76" y="60" width="114" height="7" rx="3.5"/><rect class="acc blink dl3" x="76" y="78" width="74" height="7" rx="3.5"/><rect class="mut" x="76" y="96" width="52" height="7" rx="3.5"/><rect class="acc scanY" x="60" y="8" width="146" height="15" rx="6" opacity="0.2"/><circle class="acc pop" cx="220" cy="45" r="6"/><circle class="acc pop dl3" cx="236" cy="81" r="6"/></svg>',
    num: '<svg class="svc-scene" viewBox="0 0 300 120" aria-hidden="true"><rect class="mut2" x="24" y="18" width="68" height="82" rx="10"/><rect class="mutS" x="24" y="18" width="68" height="82" rx="10"/><rect class="acc rise" x="36" y="52" width="9" height="44" rx="3"/><rect class="acc rise dl1" x="50" y="52" width="9" height="44" rx="3"/><rect class="acc rise dl2" x="64" y="52" width="9" height="44" rx="3"/><circle class="acc pulse" cx="58" cy="34" r="5"/><rect class="mut2" x="116" y="18" width="68" height="82" rx="10"/><rect class="mutS" x="116" y="18" width="68" height="82" rx="10"/><rect class="acc rise dl1" x="128" y="52" width="9" height="44" rx="3"/><rect class="acc rise dl2" x="142" y="52" width="9" height="44" rx="3"/><rect class="acc rise dl3" x="156" y="52" width="9" height="44" rx="3"/><circle class="acc pulse dl2" cx="150" cy="34" r="5"/><rect class="mut2" x="208" y="18" width="68" height="82" rx="10"/><rect class="mutS" x="208" y="18" width="68" height="82" rx="10"/><rect class="acc rise dl2" x="220" y="52" width="9" height="44" rx="3"/><rect class="acc rise dl3" x="234" y="52" width="9" height="44" rx="3"/><rect class="acc rise dl4" x="248" y="52" width="9" height="44" rx="3"/><circle class="acc pulse dl4" cx="242" cy="34" r="5"/></svg>',
    funnel: '<svg class="svc-scene" viewBox="0 0 300 120" aria-hidden="true"><path class="mutS" d="M92 16 L208 16 L164 62 L164 100 L136 100 L136 62 Z"/><circle class="acc glow fdrop" cx="150" cy="12" r="5"/><circle class="acc glow fdrop dl3" cx="150" cy="12" r="5"/><circle class="acc glow fdrop dl5" cx="150" cy="12" r="5"/><circle class="acc fleak" cx="150" cy="46" r="4" opacity="0.6"/><circle class="acc pulse" cx="150" cy="104" r="7"/></svg>',
    dash: '<svg class="svc-scene" viewBox="0 0 300 120" aria-hidden="true"><rect class="mut2" x="16" y="14" width="150" height="92" rx="10"/><rect class="mutS" x="16" y="14" width="150" height="92" rx="10"/><path class="mutS" d="M30 92 L56 74 L82 82 L108 52 L134 60 L158 34" opacity="0.6"/><path class="accS draw" pathLength="1" d="M30 92 L56 74 L82 82 L108 52 L134 60 L158 34"/><circle class="acc glow dashdot" r="4"/><rect class="mut2" x="180" y="14" width="104" height="92" rx="10"/><rect class="mutS" x="180" y="14" width="104" height="92" rx="10"/><rect class="acc rise" x="198" y="46" width="14" height="48" rx="4"/><rect class="acc rise dl2" x="224" y="46" width="14" height="48" rx="4"/><rect class="acc rise dl4" x="250" y="46" width="14" height="48" rx="4"/></svg>',
    mag: '<svg class="svc-scene" viewBox="0 0 300 120" aria-hidden="true"><rect class="mut2" x="28" y="16" width="244" height="88" rx="10"/><rect class="mutS" x="28" y="16" width="244" height="88" rx="10"/><circle class="mut" cx="72" cy="42" r="3"/><circle class="mut" cx="108" cy="42" r="3"/><circle class="acc blink" cx="144" cy="42" r="3.5"/><circle class="mut" cx="180" cy="42" r="3"/><circle class="mut" cx="216" cy="42" r="3"/><circle class="mut" cx="72" cy="76" r="3"/><circle class="mut" cx="108" cy="76" r="3"/><circle class="mut" cx="144" cy="76" r="3"/><circle class="mut" cx="180" cy="76" r="3"/><circle class="acc blink dl3" cx="216" cy="76" r="3.5"/><g class="magx"><circle class="accS" cx="70" cy="60" r="18"/><line class="accS" x1="83" y1="73" x2="95" y2="85"/></g></svg>',
    road: '<svg class="svc-scene" viewBox="0 0 300 120" aria-hidden="true"><line class="mutS" x1="30" y1="62" x2="270" y2="62"/><path class="accS draw" pathLength="1" d="M30 62 L270 62"/><rect class="mut" x="55" y="34" width="10" height="18" rx="2"/><rect class="mut" x="125" y="34" width="10" height="18" rx="2"/><rect class="mut" x="195" y="34" width="10" height="18" rx="2"/><circle class="acc pop" cx="60" cy="62" r="7"/><circle class="acc pop dl2" cx="130" cy="62" r="7"/><circle class="acc pop dl4" cx="200" cy="62" r="7"/><circle class="acc pop dl6" cx="255" cy="62" r="7"/></svg>',
    check: '<svg class="svc-scene" viewBox="0 0 300 120" aria-hidden="true"><rect class="mutS" x="46" y="20" width="18" height="18" rx="4"/><path class="accS draw" pathLength="1" d="M50 29 L55 34 L62 24"/><rect class="mut" x="76" y="26" width="130" height="7" rx="3.5"/><rect class="acc blink" x="216" y="24" width="30" height="11" rx="3"/><rect class="mutS" x="46" y="50" width="18" height="18" rx="4"/><path class="accS draw dl2" pathLength="1" d="M50 59 L55 64 L62 54"/><rect class="mut" x="76" y="56" width="130" height="7" rx="3.5"/><rect class="acc blink dl2" x="216" y="54" width="30" height="11" rx="3"/><rect class="mutS" x="46" y="80" width="18" height="18" rx="4"/><path class="accS draw dl4" pathLength="1" d="M50 89 L55 94 L62 84"/><rect class="mut" x="76" y="86" width="130" height="7" rx="3.5"/><rect class="acc blink dl4" x="216" y="84" width="30" height="11" rx="3"/></svg>',
    agents: '<svg class="svc-scene" viewBox="0 0 300 120" aria-hidden="true"><circle class="mutS" cx="150" cy="60" r="52"/><circle class="mutS" cx="150" cy="60" r="32"/><circle class="acc glow pulse" cx="150" cy="60" r="10"/><g class="orbit"><circle class="acc" cx="202" cy="60" r="6"/><circle class="acc" cx="98" cy="60" r="6"/></g><g class="orbit2"><circle class="acc" cx="150" cy="28" r="5"/><circle class="acc" cx="150" cy="92" r="5"/></g></svg>',
    attn: '<svg class="svc-scene" viewBox="0 0 300 120" aria-hidden="true"><path class="mutS" d="M28 92 C90 92 100 40 160 40 S250 34 272 30"/><rect class="mut" x="150" y="16" width="30" height="12" rx="3"/><circle class="acc pop" cx="28" cy="92" r="6"/><circle class="acc pop dl2" cx="160" cy="40" r="6"/><circle class="acc glow pulse" cx="272" cy="30" r="9"/><circle class="acc glow attndot" r="4"/></svg>',
    scale: '<svg class="svc-scene" viewBox="0 0 300 120" aria-hidden="true"><path class="mut" d="M144 44 L156 44 L162 80 L138 80 Z"/><line class="mutS" x1="150" y1="44" x2="150" y2="24"/><circle class="acc pulse" cx="150" cy="20" r="4"/><g class="tilt"><line class="accS" x1="80" y1="44" x2="220" y2="44"/><line class="mutS" x1="80" y1="44" x2="80" y2="60"/><line class="mutS" x1="220" y1="44" x2="220" y2="60"/><circle class="acc" cx="80" cy="70" r="9"/><circle class="acc glow" cx="220" cy="70" r="15"/></g></svg>',
    budget: '<svg class="svc-scene" viewBox="0 0 300 120" aria-hidden="true"><rect class="mut" x="48" y="42" width="20" height="54" rx="4"/><rect class="mut" x="98" y="58" width="20" height="38" rx="4"/><rect class="acc glow rise" x="148" y="24" width="20" height="72" rx="4"/><rect class="mut" x="198" y="64" width="20" height="32" rx="4"/><line class="mutS" x1="40" y1="98" x2="240" y2="98" opacity="0.5"/><g class="budx"><path class="acc" d="M58 22 L48 10 L68 10 Z"/></g></svg>',
    pulse: '<svg class="svc-scene" viewBox="0 0 300 120" aria-hidden="true"><line class="mutS" x1="24" y1="60" x2="276" y2="60" opacity="0.5"/><path class="accS draw" pathLength="1" d="M24 60 L70 60 L84 30 L100 90 L116 60 L276 60"/><circle class="acc glow ecgdot" r="4"/><circle class="acc pop" cx="200" cy="60" r="5"/><circle class="acc pop dl3" cx="240" cy="60" r="5"/></svg>',
    radar: '<svg class="svc-scene" viewBox="0 0 300 120" aria-hidden="true"><circle class="mutS" cx="150" cy="60" r="18"/><circle class="mutS" cx="150" cy="60" r="36"/><circle class="mutS" cx="150" cy="60" r="54"/><line class="mutS" x1="96" y1="60" x2="204" y2="60"/><line class="mutS" x1="150" y1="6" x2="150" y2="114"/><g class="orbit"><line class="accS" x1="150" y1="60" x2="150" y2="8"/></g><circle class="acc pop" cx="188" cy="40" r="5"/><circle class="acc pop dl3" cx="120" cy="88" r="5"/><circle class="acc pop dl5" cx="196" cy="78" r="5"/></svg>',
    cal: '<svg class="svc-scene" viewBox="0 0 300 120" aria-hidden="true"><rect class="mut2" x="30" y="16" width="150" height="90" rx="10"/><rect class="mutS" x="30" y="16" width="150" height="90" rx="10"/><rect class="acc" x="30" y="16" width="150" height="16" rx="8" opacity="0.5"/><circle class="mut" cx="56" cy="52" r="6"/><circle class="mut" cx="86" cy="52" r="6"/><circle class="acc pulse" cx="116" cy="52" r="6"/><circle class="mut" cx="146" cy="52" r="6"/><circle class="mut" cx="56" cy="80" r="6"/><circle class="mut" cx="86" cy="80" r="6"/><circle class="mut" cx="116" cy="80" r="6"/><circle class="mut" cx="146" cy="80" r="6"/><g class="briefin"><rect class="mut2" x="196" y="34" width="80" height="60" rx="8"/><rect class="mutS" x="196" y="34" width="80" height="60" rx="8"/><rect class="acc" x="208" y="46" width="40" height="7" rx="3.5"/><rect class="mut" x="208" y="60" width="56" height="6" rx="3"/><rect class="mut" x="208" y="72" width="48" height="6" rx="3"/></g></svg>',
    engines: '<svg class="svc-scene" viewBox="0 0 300 120" aria-hidden="true"><rect class="mutS" x="24" y="16" width="150" height="24" rx="12"/><circle class="acc" cx="40" cy="28" r="5"/><rect class="mut" x="54" y="24" width="90" height="8" rx="4"/><rect class="acc blink" x="30" y="58" width="120" height="9" rx="4"/><rect class="mut" x="30" y="74" width="96" height="9" rx="4"/><rect class="mut" x="30" y="90" width="80" height="9" rx="4"/><rect class="mut2" x="192" y="24" width="84" height="64" rx="12"/><rect class="mutS" x="192" y="24" width="84" height="64" rx="12"/><path class="mutS" d="M206 88 L206 100 L218 88"/><rect class="mut" x="204" y="38" width="60" height="7" rx="3.5"/><rect class="acc blink dl3" x="204" y="52" width="48" height="7" rx="3.5"/><rect class="mut" x="204" y="66" width="56" height="7" rx="3.5"/></svg>',
    net: '<svg class="svc-scene" viewBox="0 0 300 120" aria-hidden="true"><line class="mutS" x1="150" y1="60" x2="60" y2="28"/><line class="mutS" x1="150" y1="60" x2="240" y2="30"/><line class="mutS" x1="150" y1="60" x2="70" y2="92"/><line class="mutS" x1="150" y1="60" x2="238" y2="90"/><path class="accS draw" pathLength="1" d="M150 60 L240 30"/><circle class="acc glow pulse" cx="150" cy="60" r="9"/><circle class="acc pulse dl1" cx="60" cy="28" r="6"/><circle class="acc pulse dl2" cx="240" cy="30" r="6"/><circle class="acc pulse dl3" cx="70" cy="92" r="6"/><circle class="acc pulse dl4" cx="238" cy="90" r="6"/></svg>',
    ab: '<svg class="svc-scene" viewBox="0 0 300 120" aria-hidden="true"><rect class="mut2" x="40" y="18" width="94" height="84" rx="10"/><rect class="mutS" x="40" y="18" width="94" height="84" rx="10"/><rect class="mut" x="54" y="32" width="66" height="8" rx="4"/><rect class="mut" x="54" y="48" width="50" height="6" rx="3"/><rect class="mut pb" x="54" y="78" width="66" height="16" rx="4"/><rect class="mut2" x="166" y="18" width="94" height="84" rx="10"/><rect class="accS" x="166" y="18" width="94" height="84" rx="10"/><rect class="mut" x="180" y="32" width="66" height="8" rx="4"/><rect class="acc rise" x="180" y="62" width="66" height="32" rx="4"/><path class="accS draw" pathLength="1" d="M210 26 L216 32 L226 20"/></svg>',
    merge: '<svg class="svc-scene" viewBox="0 0 300 120" aria-hidden="true"><line class="mutS" x1="26" y1="30" x2="152" y2="60"/><line class="mutS" x1="26" y1="60" x2="152" y2="60"/><line class="mutS" x1="26" y1="90" x2="152" y2="60"/><circle class="mut" cx="26" cy="30" r="6"/><circle class="mut" cx="26" cy="60" r="6"/><circle class="mut" cx="26" cy="90" r="6"/><line class="accS draw" pathLength="1" d="M162 60 L262 60"/><circle class="acc glow pulse" cx="156" cy="60" r="10"/><circle class="acc msrc1" r="4"/><circle class="acc msrc2 dl2" r="4"/><circle class="acc msrc3 dl4" r="4"/><path class="accS draw dl3" pathLength="1" d="M256 52 L262 58 L272 46"/></svg>',
    cast: '<svg class="svc-scene" viewBox="0 0 300 120" aria-hidden="true"><circle class="accS expand" cx="66" cy="60" r="16"/><circle class="accS expand dl3" cx="66" cy="60" r="16"/><circle class="accS expand dl5" cx="66" cy="60" r="16"/><circle class="acc glow pulse" cx="66" cy="60" r="10"/><circle class="acc pop" cx="210" cy="34" r="5"/><circle class="acc pop dl2" cx="242" cy="60" r="5"/><circle class="acc pop dl4" cx="212" cy="86" r="5"/></svg>',
    shield: '<svg class="svc-scene" viewBox="0 0 300 120" aria-hidden="true"><circle class="accS pulse" cx="150" cy="62" r="46" opacity="0.4"/><path class="acc" d="M150 24 L182 35 V60 C182 80 168 92 150 99 C132 92 118 80 118 60 V35 Z" opacity="0.14"/><path class="mutS" d="M150 20 L186 32 V60 C186 82 170 96 150 104 C130 96 114 82 114 60 V32 Z"/><path class="accS draw" pathLength="1" d="M136 60 L147 71 L166 46"/></svg>',
    speed: '<svg class="svc-scene" viewBox="0 0 300 120" aria-hidden="true"><rect class="mutS" x="30" y="40" width="200" height="10" rx="5"/><rect class="mutS" x="30" y="74" width="200" height="10" rx="5"/><circle class="acc glow fastx" cx="34" cy="45" r="7"/><circle class="mut slowx" cx="34" cy="79" r="7"/><line class="mutS" x1="232" y1="30" x2="232" y2="94"/><circle class="mutS" cx="262" cy="62" r="18"/><g class="clkspin"><line class="accS" x1="262" y1="62" x2="262" y2="48"/></g></svg>',
    stack: '<svg class="svc-scene" viewBox="0 0 300 120" aria-hidden="true"><rect class="acc pop" x="90" y="82" width="120" height="20" rx="6" opacity="0.85"/><rect class="acc pop dl2" x="98" y="58" width="104" height="20" rx="6" opacity="0.85"/><rect class="acc pop dl4" x="106" y="34" width="88" height="20" rx="6" opacity="0.85"/><rect class="mutS" x="90" y="82" width="120" height="20" rx="6"/><rect class="mutS" x="98" y="58" width="104" height="20" rx="6"/><rect class="mutS" x="106" y="34" width="88" height="20" rx="6"/></svg>',
    pin: '<svg class="svc-scene" viewBox="0 0 300 120" aria-hidden="true"><rect class="mut2" x="40" y="14" width="220" height="92" rx="12"/><rect class="mutS" x="40" y="14" width="220" height="92" rx="12"/><line class="mutS" x1="100" y1="14" x2="100" y2="106" opacity="0.4"/><line class="mutS" x1="180" y1="14" x2="180" y2="106" opacity="0.4"/><line class="mutS" x1="40" y1="54" x2="260" y2="54" opacity="0.4"/><circle class="accS pulse" cx="150" cy="80" r="14"/><g class="pindrop"><path class="acc glow" d="M150 40 C136 40 126 51 126 64 C126 80 150 96 150 96 C150 96 174 80 174 64 C174 51 164 40 150 40 Z"/><circle cx="150" cy="63" r="6" fill="#0b1220"/></g><circle class="acc pop" cx="90" cy="40" r="4"/><circle class="acc pop dl3" cx="214" cy="86" r="4"/></svg>',
    page: '<svg class="svc-scene" viewBox="0 0 300 120" aria-hidden="true"><rect class="mut2" x="60" y="12" width="180" height="96" rx="10"/><rect class="mutS" x="60" y="12" width="180" height="96" rx="10"/><line class="mutS" x1="60" y1="30" x2="240" y2="30"/><circle class="mut" cx="72" cy="21" r="3"/><circle class="mut" cx="84" cy="21" r="3"/><circle class="mut" cx="96" cy="21" r="3"/><rect class="mut" x="76" y="42" width="120" height="9" rx="4"/><rect class="mut" x="76" y="58" width="90" height="7" rx="3.5"/><rect class="acc glow pulse" x="76" y="76" width="70" height="20" rx="6"/><g class="curmove"><path class="acc" d="M210 74 L210 92 L216 86 L220 96 L224 94 L220 84 L228 84 Z"/></g></svg>',
    data: '<svg class="svc-scene" viewBox="0 0 300 120" aria-hidden="true"><rect class="mutS" x="40" y="46" width="28" height="28" rx="6"/><path class="accS draw" pathLength="1" d="M48 60 L60 60"/><circle class="acc glow pulse" cx="54" cy="60" r="6"/><line class="mutS" x1="64" y1="60" x2="212" y2="60" opacity="0.4"/><circle class="acc datadot" r="4"/><circle class="acc datadot dl2" r="4"/><circle class="acc datadot dl4" r="4"/><path class="mutS" d="M214 46 h48 v40 a24 8 0 0 1 -48 0 z"/><ellipse class="mutS" cx="238" cy="46" rx="24" ry="8"/><rect class="acc fillup" x="216" y="52" width="44" height="32" rx="2" opacity="0.35"/></svg>',
    target: '<svg class="svc-scene" viewBox="0 0 300 120" aria-hidden="true"><circle class="mutS" cx="150" cy="60" r="46"/><circle class="mutS" cx="150" cy="60" r="30"/><circle class="accS pulse" cx="150" cy="60" r="14"/><circle class="acc glow" cx="150" cy="60" r="5"/><g class="arrowin"><line class="accS" x1="150" y1="60" x2="118" y2="40"/><path class="acc" d="M150 60 L141 55 L146 67 Z"/></g></svg>'
  };
  var SCENE_ORDER = ["find", "num", "funnel", "dash", "mag", "road", "check", "agents", "attn", "scale", "budget", "radar", "engines", "net", "ab", "merge", "cast", "shield"];

  function stageAnim(name, i) {
    var key = (name && SCENE[name]) ? name : SCENE_ORDER[i % SCENE_ORDER.length];
    return '<div class="svc-reason-stage-anim">' + SCENE[key] + '</div>';
  }

  function whyHTML(d) {
    var left = [], right = [];
    var anims = d.whyAnim || [];
    d.why.forEach(function (w, i) {
      var num = two(i + 1);
      var delay = 60 + i * 35;
      var card = '<article class="svc-reason-card" data-reveal data-reveal-delay="' + delay + '">' +
        '<div class="svc-reason-stage">' +
          stageAnim(anims[i] || w.anim, i) +
        '</div>' +
        '<div class="svc-reason-copy">' +
          '<span class="svc-reason-i">' + num + '</span>' +
          '<h3>' + esc(w.t) + '</h3>' +
          '<p>' + esc(w.b) + '</p>' +
        '</div>' +
      '</article>';
      if ((i + 1) % 2 === 0) left.push(card);
      else right.push(card);
    });
    return '<section class="svc-why" id="why">' +
      '<div class="svc-wrap">' +
        '<div class="svc-reasons-layout">' +
          '<div class="svc-reasons-col">' +
            '<h2 class="svc-reasons-title" data-reveal>' + esc(d.whyTitle) + '</h2>' +
            left.join("") +
          '</div>' +
          '<div class="svc-reasons-col">' + right.join("") + '</div>' +
        '</div>' +
      '</div></section>';
  }

  function howHTML(d, svc) {
    var accent = (svc && svc.accent) || "#1BFED1";
    var steps = d.steps || [];
    if (!steps.length) return "";
    var leftX = 0;
    var rightX = 581;
    var cardW = 567;
    var cardPad = 37;
    var titleH = 52;
    var lineH = 25.6;
    var cards = [];
    var points = [];
    var y = 0;
    d.steps.forEach(function (s, i) {
      var left = i % 2 === 0 ? leftX : rightX;
      var bodyLines = Math.max(4, Math.ceil(String(s.b || "").length / 54));
      var h = cardPad * 2 + 58 + titleH + 12 + bodyLines * lineH;
      h = Math.max(244, Math.ceil(h));
      cards.push({
        i: i,
        left: left,
        top: y,
        h: h,
        title: s.t,
        body: s.b
      });
      points.push({
        x: left + cardW / 2,
        y: y + 58 / 2
      });
      y += h + (i % 2 === 0 ? 44 : 26);
    });
    var stageH = Math.max(320, y - 26);
    var path = "";
    points.forEach(function (p, i) {
      if (!i) {
        path += "M " + p.x + " " + p.y;
        return;
      }
      var prev = points[i - 1];
      var mx = (prev.x + p.x) / 2;
      path += " C " + mx + " " + prev.y + " " + mx + " " + p.y + " " + p.x + " " + p.y;
    });
    var cardsHTML = cards.map(function (c) {
      return '<article class="svc-process-card" data-process-card data-i="' + c.i + '" style="left:' + c.left + 'px;top:' + c.top + 'px">' +
        '<span class="svc-process-num">' + two(c.i + 1) + '</span>' +
        '<h3>' + esc(c.title) + '</h3>' +
        '<p>' + esc(c.body) + '</p>' +
      '</article>';
    }).join("");
    var intro = d.howIntro ? '<p class="svc-sub">' + esc(d.howIntro) + '</p>' : '';
    return '<section class="svc-how" id="how" data-process>' +
      '<div class="svc-wrap">' +
        '<div class="svc-how-head" data-reveal>' +
          '<h2 class="svc-h2">' + esc(d.howTitle) + '</h2>' + intro +
        '</div>' +
        '<div class="svc-process-wrap" data-process-wrap>' +
          '<div class="svc-process-stage" data-process-stage style="height:' + stageH + 'px">' +
            '<svg class="svc-process-svg" viewBox="0 0 1148 ' + stageH + '" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
              '<defs>' +
                '<linearGradient id="svcProcTrail" data-process-trail gradientUnits="userSpaceOnUse" x1="' + points[0].x + '" y1="' + points[0].y + '" x2="' + points[0].x + '" y2="' + points[0].y + '">' +
                  '<stop offset="0" stop-color="' + esc(accent) + '" stop-opacity="0"></stop>' +
                  '<stop offset="0.55" stop-color="' + esc(accent) + '" stop-opacity="0.45"></stop>' +
                  '<stop offset="1" stop-color="#FFFFFF" stop-opacity="1"></stop>' +
                '</linearGradient>' +
              '</defs>' +
              '<path class="svc-process-path-base" data-process-path d="' + path + '"></path>' +
              '<path class="svc-process-path-prog" data-process-prog d="' + path + '"></path>' +
              '<circle class="svc-process-baton-glow" data-process-baton-glow cx="' + points[0].x + '" cy="' + points[0].y + '" r="22"></circle>' +
              '<circle class="svc-process-baton-core" data-process-baton cx="' + points[0].x + '" cy="' + points[0].y + '" r="8"></circle>' +
            '</svg>' +
            cardsHTML +
          '</div>' +
        '</div>' +
      '</div></section>';
  }

  function whatCardHTML(w) {
    return '<article class="svc-what-card" tabindex="0">' +
      '<h3>' + esc(w.t) + '</h3>' +
      '<p>' + esc(w.b) + '</p>' +
    '</article>';
  }

  function whatHTML(d) {
    var cards = d.what.map(whatCardHTML).join("");
    return '<section class="svc-what" id="what">' +
      '<div class="svc-wrap">' +
        '<h2 class="svc-what-title" data-reveal>' + esc(d.whatTitle) + '</h2>' +
      '</div>' +
      '<div class="svc-what-marquee" data-what-marquee>' +
        '<div class="svc-what-edge svc-what-edge--left" aria-hidden="true"></div>' +
        '<div class="svc-what-edge svc-what-edge--right" aria-hidden="true"></div>' +
        '<div class="svc-what-viewport" data-what-viewport tabindex="0" role="region" aria-label="' + esc(d.whatTitle) + '">' +
          '<div class="svc-what-track" data-what-track>' +
            '<div class="svc-what-group" data-what-group>' + cards + '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</section>';
  }

  function exploreCardHTML(slug) {
    var s = SERVICES[slug];
    var cap = CAPABILITIES[slug] || {};
    var href = FILE(slug);
    return '<a class="svc-explore-card" href="' + href + '" data-svc-slug="' + esc(slug) + '" aria-label="' + esc(s.title) + '" draggable="false">' +
      '<div class="svc-explore-img"><img src="../assets/capabilities/' + esc(cap.img || "capability-01.png") + '" alt="" loading="lazy" draggable="false"></div>' +
      '<div class="svc-explore-shade" aria-hidden="true"></div>' +
      '<div class="svc-explore-text">' +
        '<h3>' + esc(s.title) + '</h3>' +
        '<p>' + esc(cap.blurb || "") + '</p>' +
      '</div>' +
    '</a>';
  }

  function switchHTML(current) {
    var cards = ORDER.filter(function (slug) { return slug !== current; })
      .map(exploreCardHTML).join("");
    return '<section class="svc-explore" id="explore" aria-label="Explore other services">' +
      '<p class="svc-explore-head" data-reveal>Explore the full engagement</p>' +
      '<div class="svc-explore-marquee" data-explore-marquee>' +
        '<div class="svc-explore-viewport" data-explore-viewport tabindex="0" role="region" aria-label="Other services">' +
          '<div class="svc-explore-track" data-explore-track>' +
            '<div class="svc-explore-group" data-explore-group>' + cards + '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</section>';
  }

  function finalHTML(d) {
    return '<section class="svc-final">' +
      '<div class="svc-final-card" data-reveal>' +
        '<img class="svc-final-mark" src="../assets/svc-final-mark.png?v=2" alt="" aria-hidden="true" draggable="false">' +
        '<div class="svc-final-copy">' +
          '<h2>' + esc(d.finalTitle) + '</h2>' +
          '<p>' + esc(d.finalBody) + '</p>' +
        '</div>' +
        '<a class="agn-btn" href="#cta" data-magnetic="true">' + esc(d.finalCta || d.cta) + '</a>' +
      '</div>' +
    '</section>';
  }

  // ---- interactions -------------------------------------------------------
  // Static-capture mode: when the page is opened for a Figma capture
  // (#figmacapture=... or ?capture=1), skip scroll-driven reveals so every
  // section renders fully visible in one shot. No effect on normal visits.
  function isCapture() {
    try {
      return /figmacapture/i.test(location.hash || "") || /[?&]capture=1\b/.test(location.search || "");
    } catch (e) { return false; }
  }

  // React Bits AnimatedContent — vanilla WAAPI + scroll trigger port.
  // Defaults match the requested stats config:
  // distance=100, direction=vertical, reverse, duration=1.3, ease=power3.out,
  // initialOpacity=0.3, animateOpacity, scale=1.2, threshold=0.5, delay=0
  function setupAnimatedContent(root, store) {
    var nodes = Array.prototype.slice.call(root.querySelectorAll("[data-animated-content]"));
    if (!nodes.length) return;
    var reduce = isCapture() || (window.matchMedia && window.matchMedia("(prefers-reduced-motion:reduce)").matches);
    if (reduce) {
      nodes.forEach(function (el) {
        el.classList.add("is-ac-ready");
        el.style.visibility = "visible";
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    var DISTANCE = 100;
    var REVERSE = true;
    var DURATION = 1300;
    var INITIAL_OPACITY = 0;
    var SCALE = 1.2;
    var THRESHOLD = 0.5; // ScrollTrigger start: top 50%
    var EASE = "cubic-bezier(0.215, 0.61, 0.355, 1)"; // ≈ power3.out
    var offset = REVERSE ? -DISTANCE : DISTANCE;
    var pending = nodes.slice();
    var raf = 0;
    var cleanups = [];

    // Unique staggered delays, shuffled so cards don't enter in lockstep.
    var delays = nodes.map(function (_, i) { return i * 0.26; });
    for (var i = delays.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = delays[i];
      delays[i] = delays[j];
      delays[j] = tmp;
    }
    // Small extra jitter so timing feels organic across reloads.
    nodes.forEach(function (el, idx) {
      var jitter = Math.random() * 0.20;
      el.setAttribute("data-ac-delay", String((delays[idx] + jitter).toFixed(3)));
      el.style.visibility = "visible";
      el.classList.add("is-ac-ready");
      el.style.opacity = String(INITIAL_OPACITY);
      el.style.transform = "translate3d(0," + offset + "px,0) scale(" + SCALE + ")";
    });

    var play = function (el) {
      var delayMs = parseFloat(el.getAttribute("data-ac-delay") || "0") * 1000;
      var anim = el.animate(
        [
          {
            opacity: INITIAL_OPACITY,
            transform: "translate3d(0," + offset + "px,0) scale(" + SCALE + ")"
          },
          {
            opacity: 1,
            transform: "translate3d(0,0,0) scale(1)"
          }
        ],
        {
          duration: DURATION,
          delay: delayMs,
          easing: EASE,
          fill: "forwards"
        }
      );
      cleanups.push(function () {
        try { anim.cancel(); } catch (e) {}
      });
      anim.finished.then(function () {
        el.style.opacity = "1";
        el.style.transform = "none";
        try { anim.cancel(); } catch (e) {}
      }).catch(function () {});
    };

    var tick = function () {
      raf = 0;
      var vh = window.innerHeight || document.documentElement.clientHeight;
      var startY = vh * (1 - THRESHOLD);
      pending = pending.filter(function (el) {
        if (el.getBoundingClientRect().top < startY) {
          play(el);
          return false;
        }
        return true;
      });
      if (pending.length) {
        raf = requestAnimationFrame(function () {
          // keep polling lightly via scroll/resize instead of perpetual raf
        });
      }
    };

    var onScroll = function () {
      if (!pending.length) return;
      var vh = window.innerHeight || document.documentElement.clientHeight;
      var startY = vh * (1 - THRESHOLD);
      pending = pending.filter(function (el) {
        if (el.getBoundingClientRect().top < startY) {
          play(el);
          return false;
        }
        return true;
      });
      if (!pending.length) {
        window.removeEventListener("scroll", onScroll, true);
        window.removeEventListener("resize", onScroll);
      }
    };

    // Initial check (hero stats are usually already in view)
    onScroll();
    if (pending.length) {
      window.addEventListener("scroll", onScroll, { passive: true, capture: true });
      window.addEventListener("resize", onScroll);
    }

    store.animatedContentCleanup = function () {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
      cleanups.forEach(function (fn) { try { fn(); } catch (e) {} });
      cleanups = [];
    };
  }

  function setupFoldStats(root, store) {
    var cards = Array.prototype.slice.call(root.querySelectorAll("[data-fold-card]"));
    if (!cards.length) return;
    var reduce = isCapture() || (window.matchMedia && window.matchMedia("(prefers-reduced-motion:reduce)").matches);
    var timers = [];

    if (reduce) {
      Array.prototype.forEach.call(root.querySelectorAll(".fold-text-piece"), function (p) {
        p.classList.add("is-folded-in");
        p.style.opacity = "1";
        p.style.transform = "none";
        p.style.setProperty("--fold-crease", "0");
      });
      return;
    }

    var playCard = function (card) {
      var pieces = Array.prototype.slice.call(card.querySelectorAll(".fold-text-piece"));
      var baseDelay = parseInt(card.getAttribute("data-fold-delay") || "0", 10);
      pieces.forEach(function (piece, i) {
        var delay = baseDelay + i * 45;
        var t = setTimeout(function () {
          piece.classList.add("is-folded-in");
        }, delay);
        timers.push(t);
      });
    };

    // Hero stats are above the fold — start shortly after mount.
    var start = setTimeout(function () {
      cards.forEach(playCard);
    }, 120);
    timers.push(start);

    store.foldCleanup = function () {
      timers.forEach(function (t) { clearTimeout(t); });
      timers = [];
    };
  }

  function setupReveal(root, store) {
    var reveals = Array.prototype.slice.call(root.querySelectorAll("[data-reveal]"));
    var reduce = isCapture() || (window.matchMedia && window.matchMedia("(prefers-reduced-motion:reduce)").matches);
    if (reduce) {
      reveals.forEach(function (el) { el.style.opacity = "1"; el.style.translate = "0 0"; });
      return;
    }
    var tick = function () {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      reveals = reveals.filter(function (el) {
        if (el.getBoundingClientRect().top < vh * 0.9) {
          var delay = parseInt(el.getAttribute("data-reveal-delay") || "0", 10);
          var anim = el.animate(
            [{ opacity: 0, translate: "0 28px" }, { opacity: 1, translate: "0 0" }],
            { duration: 720, delay: delay, easing: "cubic-bezier(.16,.84,.44,1)", fill: "forwards" }
          );
          anim.finished.then(function () {
            el.style.opacity = "1"; el.style.translate = "0 0";
            try { anim.cancel(); } catch (e) {}
          }).catch(function () {});
          return false;
        }
        return true;
      });
      if (reveals.length) store.revealRaf = requestAnimationFrame(tick);
    };
    store.revealRaf = requestAnimationFrame(tick);
  }

  function hexToVec3(hex) {
    var raw = String(hex || "").replace("#", "").trim();
    if (raw.length === 3) raw = raw.replace(/(.)/g, "$1$1");
    var n = parseInt(raw, 16);
    if (isNaN(n)) return new Float32Array([1, 1, 1]);
    return new Float32Array([
      ((n >> 16) & 255) / 255,
      ((n >> 8) & 255) / 255,
      (n & 255) / 255
    ]);
  }

  function compileShader(gl, type, src) {
    var sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      console.warn("[Grainient] shader compile:", gl.getShaderInfoLog(sh));
      gl.deleteShader(sh);
      return null;
    }
    return sh;
  }

  function setupSpecularStats(root, store) {
    var nodes = Array.prototype.slice.call(root.querySelectorAll("[data-specular]"));
    if (!nodes.length) return;
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    var fine = !window.matchMedia || window.matchMedia("(pointer:fine)").matches;
    if (reduce || !fine) return;

    var RADIUS = 16.867;
    var INTENSITY = 1;
    var SHINE_SIZE = (10 * Math.PI) / 180;
    var SHINE_FADE = (40 * Math.PI) / 180;
    var THICKNESS = 1;
    var SPEED = 0.35;
    var PROXIMITY = 250;
    var lineRGB = hexToVec3("#ffffff");
    var baseRGB = hexToVec3("#525252");
    var instances = [];
    var pointer = { x: 0, y: 0, moved: false };
    var sharedRaf = 0;
    var last = performance.now();

    var onPointerMove = function (e) {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.moved = true;
    };
    window.addEventListener("pointermove", onPointerMove);

    nodes.forEach(function (btn) {
      var fx = btn.querySelector(".svc-stat-fx");
      if (!fx) return;
      var canvas = document.createElement("canvas");
      fx.appendChild(canvas);
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var gl = canvas.getContext("webgl2", {
        alpha: true,
        premultipliedAlpha: true,
        antialias: true,
        powerPreference: "high-performance"
      });
      if (!gl) return;

      gl.clearColor(0, 0, 0, 0);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

      var vs = compileShader(gl, gl.VERTEX_SHADER, SPECULAR_VERT);
      var fs = compileShader(gl, gl.FRAGMENT_SHADER, SPECULAR_FRAG);
      if (!vs || !fs) return;
      var prog = gl.createProgram();
      gl.attachShader(prog, vs);
      gl.attachShader(prog, fs);
      gl.bindAttribLocation(prog, 0, "position");
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        console.warn("[Specular] program link:", gl.getProgramInfoLog(prog));
        return;
      }
      gl.useProgram(prog);

      var buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(0);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

      var U = {
        uCenter: gl.getUniformLocation(prog, "uCenter"),
        uHalfSize: gl.getUniformLocation(prog, "uHalfSize"),
        uRadius: gl.getUniformLocation(prog, "uRadius"),
        uAngle: gl.getUniformLocation(prog, "uAngle"),
        uPx: gl.getUniformLocation(prog, "uPx"),
        uLineColor: gl.getUniformLocation(prog, "uLineColor"),
        uBaseColor: gl.getUniformLocation(prog, "uBaseColor"),
        uIntensity: gl.getUniformLocation(prog, "uIntensity"),
        uShineSize: gl.getUniformLocation(prog, "uShineSize"),
        uShineFade: gl.getUniformLocation(prog, "uShineFade"),
        uThickness: gl.getUniformLocation(prog, "uThickness"),
        uBaseWidth: gl.getUniformLocation(prog, "uBaseWidth")
      };
      gl.uniform1f(U.uPx, dpr);
      gl.uniform1f(U.uBaseWidth, dpr);
      gl.uniform3fv(U.uLineColor, lineRGB);
      gl.uniform3fv(U.uBaseColor, baseRGB);
      gl.uniform1f(U.uShineSize, SHINE_SIZE);
      gl.uniform1f(U.uShineFade, SHINE_FADE);

      var size = { w: 1, h: 1 };
      var resize = function () {
        var rect = btn.getBoundingClientRect();
        var w = Math.max(1, rect.width);
        var h = Math.max(1, rect.height);
        size.w = w;
        size.h = h;
        var cw = Math.max(1, Math.round((w + SPECULAR_PAD * 2) * dpr));
        var ch = Math.max(1, Math.round((h + SPECULAR_PAD * 2) * dpr));
        if (canvas.width !== cw || canvas.height !== ch) {
          canvas.width = cw;
          canvas.height = ch;
        }
        gl.viewport(0, 0, cw, ch);
        gl.useProgram(prog);
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
        gl.uniform2f(U.uCenter, (SPECULAR_PAD + w / 2) * dpr, (SPECULAR_PAD + h / 2) * dpr);
        gl.uniform2f(U.uHalfSize, (w / 2) * dpr, (h / 2) * dpr);
        gl.uniform1f(U.uRadius, Math.min(RADIUS, Math.min(w, h) / 2) * dpr);
        gl.uniform1f(U.uThickness, THICKNESS * dpr);
        gl.uniform1f(U.uPx, dpr);
        gl.uniform1f(U.uBaseWidth, dpr);
      };

      var ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null;
      if (ro) ro.observe(btn);
      resize();

      instances.push({
        btn: btn,
        gl: gl,
        canvas: canvas,
        fx: fx,
        prog: prog,
        buf: buf,
        U: U,
        size: size,
        dpr: dpr,
        resize: resize,
        ro: ro,
        angle: 2.4,
        idleAngle: 2.4,
        bright: 0
      });
    });

    if (!instances.length) {
      window.removeEventListener("pointermove", onPointerMove);
      return;
    }

    var tick = function (now) {
      sharedRaf = requestAnimationFrame(tick);
      var dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      for (var i = 0; i < instances.length; i++) {
        var inst = instances[i];
        var gl = inst.gl;
        var U = inst.U;
        var btn = inst.btn;
        var rect = btn.getBoundingClientRect();
        var cx = rect.left + rect.width / 2;
        var cy = rect.top + rect.height / 2;
        var pointerAngle = null;
        var proximityT = 0;

        if (pointer.moved) {
          var dx = Math.max(rect.left - pointer.x, 0, pointer.x - rect.right);
          var dy = Math.max(rect.top - pointer.y, 0, pointer.y - rect.bottom);
          var dist = Math.hypot(dx, dy);
          if (dist === 0) {
            var nx = (pointer.x - cx) / Math.max(rect.width / 2, 1);
            var ny = (cy - pointer.y) / Math.max(rect.height / 2, 1);
            pointerAngle = Math.atan2(2 / Math.max(rect.height, 1), -2 / Math.max(rect.width, 1)) + nx * 0.3 + ny * 0.15;
          } else {
            pointerAngle = Math.atan2(cy - pointer.y, pointer.x - cx);
          }
          var t = Math.max(0, 1 - dist / Math.max(PROXIMITY, 1));
          proximityT = t * t * (3 - 2 * t);
        }

        inst.idleAngle += SPEED * dt;
        var target = pointerAngle != null ? pointerAngle : inst.idleAngle;
        var diff = ((target - inst.angle + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
        inst.angle += diff * (1 - Math.exp(-dt * 7));
        // Keep a visible idle sweep; intensify when the pointer is near.
        var brightTarget = Math.max(0.55, proximityT);
        inst.bright += (brightTarget - inst.bright) * (1 - Math.exp(-dt * 8));

        gl.useProgram(inst.prog);
        gl.bindBuffer(gl.ARRAY_BUFFER, inst.buf);
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
        gl.viewport(0, 0, inst.canvas.width, inst.canvas.height);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.uniform1f(U.uAngle, inst.angle);
        gl.uniform1f(U.uIntensity, INTENSITY * inst.bright);
        gl.uniform3fv(U.uLineColor, lineRGB);
        gl.uniform3fv(U.uBaseColor, baseRGB);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      }
    };
    sharedRaf = requestAnimationFrame(tick);

    store.specularCleanup = function () {
      if (sharedRaf) cancelAnimationFrame(sharedRaf);
      window.removeEventListener("pointermove", onPointerMove);
      instances.forEach(function (inst) {
        if (inst.ro) inst.ro.disconnect();
        try {
          if (inst.canvas.parentNode === inst.fx) inst.fx.removeChild(inst.canvas);
          var lose = inst.gl.getExtension("WEBGL_lose_context");
          if (lose) lose.loseContext();
        } catch (e) {}
      });
      instances = [];
    };
  }

  function setupGrainient(root, store) {
    var nodes = Array.prototype.slice.call(root.querySelectorAll("[data-grainient]"));
    if (!nodes.length) return;
    nodes.forEach(function (node) {
      var canvas = node.querySelector("canvas");
      if (!canvas) return;
      var gl = canvas.getContext("webgl2", {
        alpha: true,
        antialias: false,
        premultipliedAlpha: true,
        powerPreference: "high-performance",
        desynchronized: true
      });
      if (!gl) return;

      var colors = (node.getAttribute("data-colors") || "").split("|").filter(Boolean);
      if (colors.length < 3) colors = ["#1BFED1", "#12315E", "#4F8CFF"];
      var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion:reduce)").matches;

      var vs = compileShader(gl, gl.VERTEX_SHADER, GRAINIENT_VERTEX);
      var fs = compileShader(gl, gl.FRAGMENT_SHADER, GRAINIENT_FRAGMENT);
      if (!vs || !fs) return;

      var prog = gl.createProgram();
      gl.attachShader(prog, vs);
      gl.attachShader(prog, fs);
      gl.bindAttribLocation(prog, 0, "position");
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        console.warn("[Grainient] program link:", gl.getProgramInfoLog(prog));
        return;
      }
      gl.useProgram(prog);

      var buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        -1, -1, 3, -1, -1, 3
      ]), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(0);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

      var U = {
        iTime: gl.getUniformLocation(prog, "iTime"),
        iResolution: gl.getUniformLocation(prog, "iResolution"),
        uTimeSpeed: gl.getUniformLocation(prog, "uTimeSpeed"),
        uColorBalance: gl.getUniformLocation(prog, "uColorBalance"),
        uWarpStrength: gl.getUniformLocation(prog, "uWarpStrength"),
        uWarpFrequency: gl.getUniformLocation(prog, "uWarpFrequency"),
        uWarpSpeed: gl.getUniformLocation(prog, "uWarpSpeed"),
        uWarpAmplitude: gl.getUniformLocation(prog, "uWarpAmplitude"),
        uBlendAngle: gl.getUniformLocation(prog, "uBlendAngle"),
        uBlendSoftness: gl.getUniformLocation(prog, "uBlendSoftness"),
        uRotationAmount: gl.getUniformLocation(prog, "uRotationAmount"),
        uNoiseScale: gl.getUniformLocation(prog, "uNoiseScale"),
        uGrainAmount: gl.getUniformLocation(prog, "uGrainAmount"),
        uGrainScale: gl.getUniformLocation(prog, "uGrainScale"),
        uGrainAnimated: gl.getUniformLocation(prog, "uGrainAnimated"),
        uContrast: gl.getUniformLocation(prog, "uContrast"),
        uGamma: gl.getUniformLocation(prog, "uGamma"),
        uSaturation: gl.getUniformLocation(prog, "uSaturation"),
        uCenterOffset: gl.getUniformLocation(prog, "uCenterOffset"),
        uZoom: gl.getUniformLocation(prog, "uZoom"),
        uColor1: gl.getUniformLocation(prog, "uColor1"),
        uColor2: gl.getUniformLocation(prog, "uColor2"),
        uColor3: gl.getUniformLocation(prog, "uColor3")
      };

      gl.uniform1f(U.uTimeSpeed, 1.5);
      gl.uniform1f(U.uColorBalance, -0.76);
      gl.uniform1f(U.uWarpStrength, 0.0);
      gl.uniform1f(U.uWarpFrequency, 4.2);
      gl.uniform1f(U.uWarpSpeed, 1.6);
      gl.uniform1f(U.uWarpAmplitude, 31.0);
      gl.uniform1f(U.uBlendAngle, -50.0);
      gl.uniform1f(U.uBlendSoftness, 1.0);
      gl.uniform1f(U.uRotationAmount, 500.0);
      gl.uniform1f(U.uNoiseScale, 1.85);
      gl.uniform1f(U.uGrainAmount, 0.04);
      gl.uniform1f(U.uGrainScale, 3.3);
      gl.uniform1f(U.uGrainAnimated, 0.0);
      gl.uniform1f(U.uContrast, 1.3);
      gl.uniform1f(U.uGamma, 1.0);
      gl.uniform1f(U.uSaturation, 0.7);
      gl.uniform2fv(U.uCenterOffset, new Float32Array([0.05, -0.17]));
      gl.uniform1f(U.uZoom, 0.6);
      gl.uniform3fv(U.uColor1, hexToVec3(colors[0]));
      gl.uniform3fv(U.uColor2, hexToVec3(colors[1]));
      gl.uniform3fv(U.uColor3, hexToVec3(colors[2]));

      gl.clearColor(0, 0, 0, 0);

      var raf = 0;
      var isVisible = true;
      var isPageVisible = !document.hidden;
      var t0 = performance.now();
      var resizeObserver = null;
      var intersectionObserver = null;

      var resize = function () {
        var rect = node.getBoundingClientRect();
        var dpr = Math.min(window.devicePixelRatio || 1, 2);
        var w = Math.max(1, Math.floor(rect.width));
        var h = Math.max(1, Math.floor(rect.height));
        canvas.width = Math.max(1, Math.floor(w * dpr));
        canvas.height = Math.max(1, Math.floor(h * dpr));
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.display = "block";
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(U.iResolution, canvas.width, canvas.height);
      };

      var render = function (now) {
        gl.uniform1f(U.iTime, (now - t0) * 0.001);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        if (!reduce) raf = requestAnimationFrame(render);
      };

      var tryStart = function () {
        if (!reduce && isVisible && isPageVisible && raf === 0) raf = requestAnimationFrame(render);
      };
      var tryStop = function () {
        if (raf !== 0) { cancelAnimationFrame(raf); raf = 0; }
      };
      var onVisibility = function () {
        isPageVisible = !document.hidden;
        if (isPageVisible) tryStart();
        else tryStop();
      };

      resize();
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(node);
      intersectionObserver = new IntersectionObserver(function (entries) {
        isVisible = !!(entries[0] && entries[0].isIntersecting);
        if (isVisible) tryStart();
        else tryStop();
      }, { threshold: 0 });
      intersectionObserver.observe(node);
      document.addEventListener("visibilitychange", onVisibility);
      if (reduce) render(t0);
      else tryStart();
      store.grainientCleanups.push(function () {
        tryStop();
        document.removeEventListener("visibilitychange", onVisibility);
        if (resizeObserver) resizeObserver.disconnect();
        if (intersectionObserver) intersectionObserver.disconnect();
        try { gl.getExtension("WEBGL_lose_context") && gl.getExtension("WEBGL_lose_context").loseContext(); } catch (e) {}
      });
    });
  }

  function setupStoryHighlight(root, store) {
    var section = root.querySelector("[data-svc-story]");
    var textEl = root.querySelector("[data-story-text]");
    var mark = root.querySelector("[data-story-mark]");
    if (!section || !textEl) return;

    var words = Array.prototype.slice.call(textEl.querySelectorAll(".svc-hl-word"));
    var dims = words.map(function (w) { return w.querySelector(".svc-hl-dim"); });
    var lits = words.map(function (w) { return w.querySelector(".svc-hl-lit"); });
    var n = lits.length;
    if (!n) return;

    var reduce = isCapture() || (window.matchMedia && window.matchMedia("(prefers-reduced-motion:reduce)").matches);
    if (reduce) {
      lits.forEach(function (el) { if (el) el.style.opacity = "1"; });
      dims.forEach(function (el) { if (el) el.style.opacity = "0"; });
      if (mark) mark.classList.add("is-in");
      return;
    }

    var clamp = function (v, lo, hi) { return Math.min(hi, Math.max(lo, v)); };
    var smoothstep = function (t) { return t * t * (3 - 2 * t); };
    // Soft ramp across ~4 words so fill feels continuous, not stepwise
    var SOFT = 4.25;
    var raf = 0;
    var lastKey = "";
    var markIn = false;

    var apply = function (progress, markProgress) {
      var key = progress.toFixed(4) + ":" + (markProgress > 0.12 ? "1" : "0");
      if (key === lastKey) return;
      lastKey = key;

      var cursor = progress * (n + SOFT);
      for (var i = 0; i < n; i++) {
        var t = clamp((cursor - i) / SOFT, 0, 1);
        var o = smoothstep(t);
        if (lits[i]) lits[i].style.opacity = String(o);
        // Regular layer fades out of view as bold fills in
        if (dims[i]) dims[i].style.opacity = String(1 - o);
      }

      if (mark && !markIn && markProgress > 0.08) {
        markIn = true;
        mark.classList.add("is-in");
      }
    };

    var measure = function () {
      var rect = textEl.getBoundingClientRect();
      var vh = window.innerHeight || document.documentElement.clientHeight;
      // Mirror ScrollHighlight defaults: start "top center", end "bottom center"
      var start = rect.top + window.scrollY - vh * 0.5;
      var end = rect.bottom + window.scrollY - vh * 0.5;
      var range = Math.max(1, end - start);
      var y = window.scrollY || window.pageYOffset || 0;
      var progress = clamp((y - start) / range, 0, 1);

      var sec = section.getBoundingClientRect();
      var markProgress = clamp(1 - sec.top / (vh * 0.85), 0, 1);
      apply(progress, markProgress);
    };

    var onScroll = function () {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = 0;
        measure();
      });
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    store.storyCleanup = function () {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      lits.forEach(function (el) { if (el) el.style.opacity = ""; });
      dims.forEach(function (el) { if (el) el.style.opacity = ""; });
      if (mark) mark.classList.remove("is-in");
    };
  }

  function setupHeroWatermark(root, store) {
    var mark = root.querySelector("[data-hero-mark]");
    if (!mark) return;

    var BASE = 181; // Figma 23003:3084 at 1440px artboard
    var MIN = 28;
    var PAD = 32;
    var GAP = 12; // sit just below the fixed nav bar
    var raf = 0;

    var placeBelowNav = function () {
      var nav = document.querySelector("[data-agn-nav], nav.agn-nav");
      var layer = mark.offsetParent || mark.parentElement;
      var top = 102; // fallback: desktop nav top 18 + height 72 + gap 12
      if (nav && layer) {
        var navRect = nav.getBoundingClientRect();
        var layerRect = layer.getBoundingClientRect();
        if (navRect.height > 0) {
          top = Math.max(0, Math.round(navRect.bottom - layerRect.top + GAP));
        }
      }
      mark.style.top = top + "px";
    };

    var fit = function () {
      raf = 0;
      placeBelowNav();
      mark.style.fontSize = BASE + "px";
      mark.style.transform = "translateX(-50%)";
      var avail = Math.max(120, (mark.parentElement ? mark.parentElement.clientWidth : window.innerWidth) - PAD);
      var natural = mark.scrollWidth || avail;
      var scale = natural > avail ? avail / natural : 1;
      var size = Math.max(MIN, Math.floor(BASE * scale));
      mark.style.fontSize = size + "px";
      // Final clamp if letter metrics still overflow after rounding
      if (mark.scrollWidth > avail && size > MIN) {
        size = Math.max(MIN, Math.floor(size * (avail / mark.scrollWidth)));
        mark.style.fontSize = size + "px";
      }
    };

    var onResize = function () {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(fit);
    };

    fit();
    // Nav may mount/layout a tick later than the service page
    requestAnimationFrame(fit);
    var refit = setTimeout(fit, 80);
    var refit2 = setTimeout(fit, 520);
    // ShinyText on page-name watermark (no FoldText).
    var shinyT = null;
    var reduce = isCapture() || (window.matchMedia && window.matchMedia("(prefers-reduced-motion:reduce)").matches);
    if (!reduce) {
      shinyT = setTimeout(function () {
        mark.classList.add("is-shiny");
      }, 200);
    }
    window.addEventListener("resize", onResize);
    store.heroMarkCleanup = function () {
      clearTimeout(refit);
      clearTimeout(refit2);
      if (shinyT) clearTimeout(shinyT);
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      mark.classList.remove("is-shiny");
      mark.style.fontSize = "";
      mark.style.transform = "";
      mark.style.top = "";
    };
  }

  function setupHeroCover(root, store) {
    var wrap = root.querySelector("[data-hero-scroll]");
    var pin = root.querySelector("[data-hero-pin]");
    var layer = root.querySelector("[data-hero-layer]");
    if (!wrap || !pin || !layer) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion:reduce)").matches) return;

    var clamp = function (v, lo, hi) { return Math.min(hi, Math.max(lo, v)); };
    var easeOutCubic = function (t) { return 1 - Math.pow(1 - t, 3); };
    var lastKey = "";
    // Once story covers the hero, keep the blurred "receded" state locked
    // until the user scrolls back into the hero viewport.
    var locked = false;

    var apply = function () {
      if (window.matchMedia && window.matchMedia("(max-width:640px)").matches) {
        locked = false;
        pin.style.display = "";
        pin.style.visibility = "";
        pin.style.pointerEvents = "";
        pin.style.setProperty("--hero-veil", "0");
        layer.style.transform = "";
        layer.style.filter = "";
        layer.style.opacity = "";
        return 0;
      }
      var vh = Math.max(1, wrap.offsetHeight || window.innerHeight || 1);
      var top = wrap.getBoundingClientRect().top;
      var raw = clamp((-top) / vh, 0, 1);

      // Latch blur while content is over the hero; release only near top
      if (raw >= 0.72) locked = true;
      if (raw <= 0.08) locked = false;
      var use = locked ? Math.max(raw, 0.92) : raw;
      var p = easeOutCubic(use);
      var key = (locked ? "L" : "U") + use.toFixed(4);
      if (key === lastKey) return raw;
      lastKey = key;

      // Hero recedes into the background (scale down + blur), never unmounts
      var scale = 1 - p * 0.14;
      var y = p * 36;
      var veil = p * 0.42;
      var blur = p < 0.01 ? 0 : 8 + p * 18;

      pin.style.display = "";
      pin.style.visibility = "visible";
      pin.style.transform = "none";
      pin.style.filter = "none";
      pin.style.opacity = "1";
      pin.style.setProperty("--hero-veil", veil.toFixed(3));
      pin.style.pointerEvents = use > 0.18 ? "none" : "";
      layer.style.transform = "translate3d(0," + y.toFixed(2) + "px,0) scale(" + scale.toFixed(4) + ")";
      layer.style.filter = blur < 0.05 ? "none" : "blur(" + blur.toFixed(2) + "px)";
      layer.style.opacity = Math.max(0.55, 1 - p * 0.28).toFixed(3);
      return raw;
    };

    var onScroll = function () {
      if (store.heroCoverRaf) return;
      store.heroCoverRaf = requestAnimationFrame(function () {
        store.heroCoverRaf = null;
        apply();
      });
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    store.heroCoverCleanup = function () {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      pin.style.display = "";
      pin.style.visibility = "";
      pin.style.pointerEvents = "";
      pin.style.setProperty("--hero-veil", "0");
      layer.style.transform = "";
      layer.style.filter = "";
      layer.style.opacity = "";
    };
  }

  // TiltCard-style interaction: 3D spring tilt + image spotlight (replaces white ClippedCircle).
  function setupTilt(root, store) {
    var fine = window.matchMedia && window.matchMedia("(pointer:fine)").matches;
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    if (!fine || reduce) return;
    var nodes = Array.prototype.slice.call(root.querySelectorAll("[data-tilt]"));
    var AMP = 11, SCALE = 1.035;
    nodes.forEach(function (node) {
      var isGet = node.hasAttribute("data-get-card");
      var target = { rx: 0, ry: 0, s: 1 };
      var cur = { rx: 0, ry: 0, s: 1 };
      var raf = null;
      var apply = function () {
        node.style.transform = "perspective(900px) rotateX(" + cur.rx.toFixed(3) + "deg) rotateY(" + cur.ry.toFixed(3) + "deg) scale(" + cur.s.toFixed(3) + ")";
      };
      var step = function () {
        var k = 0.14;
        cur.rx += (target.rx - cur.rx) * k;
        cur.ry += (target.ry - cur.ry) * k;
        cur.s += (target.s - cur.s) * k;
        apply();
        if (Math.abs(target.rx - cur.rx) > 0.01 || Math.abs(target.ry - cur.ry) > 0.01 || Math.abs(target.s - cur.s) > 0.001) {
          raf = requestAnimationFrame(step);
        } else { raf = null; }
      };
      var kick = function () { if (!raf) raf = requestAnimationFrame(step); };
      var setSpotlight = function (e) {
        if (!isGet) return;
        var r = node.getBoundingClientRect();
        var x = ((e.clientX - r.left) / Math.max(1, r.width)) * 100;
        var y = ((e.clientY - r.top) / Math.max(1, r.height)) * 100;
        node.style.setProperty("--mx", x.toFixed(2) + "%");
        node.style.setProperty("--my", y.toFixed(2) + "%");
      };
      var onMove = function (e) {
        var r = node.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        target.ry = px * AMP * 2;
        target.rx = -py * AMP * 2;
        setSpotlight(e);
        kick();
      };
      var onEnter = function (e) {
        node.classList.add("is-tilting");
        target.s = SCALE;
        setSpotlight(e);
        kick();
      };
      var onLeave = function () {
        node.classList.remove("is-tilting");
        target.rx = 0;
        target.ry = 0;
        target.s = 1;
        kick();
      };
      node.addEventListener("mousemove", onMove);
      node.addEventListener("mouseenter", onEnter);
      node.addEventListener("mouseleave", onLeave);
      store.tiltCleanups.push(function () {
        node.removeEventListener("mousemove", onMove);
        node.removeEventListener("mouseenter", onEnter);
        node.removeEventListener("mouseleave", onLeave);
        if (raf) cancelAnimationFrame(raf);
        node.style.transform = "";
        node.style.removeProperty("--mx");
        node.style.removeProperty("--my");
        node.classList.remove("is-tilting");
      });
    });
  }

  // Service process snake: same viewport-centre activation logic as Home 05 Process.
  function setupTimeline(root, store) {
    var section = root.querySelector("[data-process]");
    if (!section) return;
    var wrap = section.querySelector("[data-process-wrap]");
    var stage = section.querySelector("[data-process-stage]");
    var cards = Array.prototype.slice.call(section.querySelectorAll("[data-process-card]"));
    var prog = section.querySelector("[data-process-prog]");
    var baton = section.querySelector("[data-process-baton]");
    var batonGlow = section.querySelector("[data-process-baton-glow]");
    var trail = section.querySelector("[data-process-trail]");
    var n = cards.length;
    if (!wrap || !stage || n < 2 || !prog) return;

    var NAT_W = 1148;
    var NAT_H = stage.offsetHeight || 1200;
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var isMobile = function () { return window.innerWidth <= 960; };
    var clamp = function (v, lo, hi) { return Math.min(hi, Math.max(lo, v)); };
    var lerp = function (a, b, t) { return a + (b - a) * t; };
    var smooth = function (t) { return t * t * (3 - 2 * t); };
    var pathLen = prog.getTotalLength ? prog.getTotalLength() : 0;
    var TAIL = pathLen * 0.17;

    var fit = function () {
      if (isMobile()) {
        stage.style.transform = "";
        wrap.style.height = "";
        return;
      }
      var w = wrap.clientWidth || NAT_W;
      var s = w / NAT_W;
      stage.style.transform = "scale(" + s.toFixed(5) + ")";
      wrap.style.height = (NAT_H * s) + "px";
    };
    fit();
    store.procResize = function () { fit(); };
    window.addEventListener("resize", store.procResize);

    if (isCapture()) {
      cards.forEach(function (card, i) {
        card.style.opacity = i === 0 ? "1" : ".2";
        card.style.transform = i === 0 ? "translateY(0) scale(1.02)" : "translateY(0) scale(1)";
        card.style.filter = "";
      });
      if (pathLen && baton && trail && !isMobile()) {
        var at = 0;
        var pt = prog.getPointAtLength(at);
        baton.setAttribute("cx", pt.x.toFixed(1));
        baton.setAttribute("cy", pt.y.toFixed(1));
        if (batonGlow) {
          batonGlow.setAttribute("cx", pt.x.toFixed(1));
          batonGlow.setAttribute("cy", pt.y.toFixed(1));
        }
      }
      return;
    }

    var tick = function () {
      store.tlRaf = requestAnimationFrame(tick);
      var visRect = section.getBoundingClientRect();
      if (document.hidden || visRect.bottom < 0 || visRect.top > (window.innerHeight || document.documentElement.clientHeight)) return;
      var vh = window.innerHeight || document.documentElement.clientHeight;
      var vc = vh * 0.5;
      var mids = cards.map(function (c) { var r = c.getBoundingClientRect(); return r.top + r.height / 2; });
      var q;
      if (vc <= mids[0]) q = 0;
      else if (vc >= mids[n - 1]) q = n - 1;
      else {
        var k = 0;
        while (k < n - 1 && vc > mids[k + 1]) k++;
        q = k + (vc - mids[k]) / Math.max(1, mids[k + 1] - mids[k]);
      }

      if (!isMobile() && pathLen && baton && !reduce) {
        var at = pathLen * (q / (n - 1));
        var tailAt = Math.max(0, at - TAIL);
        var win = at - tailAt;
        var pt = prog.getPointAtLength(at);
        var tp = prog.getPointAtLength(tailAt);
        baton.setAttribute("cx", pt.x.toFixed(1));
        baton.setAttribute("cy", pt.y.toFixed(1));
        if (batonGlow) {
          batonGlow.setAttribute("cx", pt.x.toFixed(1));
          batonGlow.setAttribute("cy", pt.y.toFixed(1));
        }
        prog.style.strokeDasharray = win.toFixed(1) + " " + (pathLen + 10).toFixed(1);
        prog.style.strokeDashoffset = (-tailAt).toFixed(1);
        if (trail) {
          trail.setAttribute("x1", tp.x.toFixed(1)); trail.setAttribute("y1", tp.y.toFixed(1));
          trail.setAttribute("x2", pt.x.toFixed(1)); trail.setAttribute("y2", pt.y.toFixed(1));
        }
      }

      var activeIdx = Math.round(clamp(q, 0, n - 1));
      cards.forEach(function (card, i) {
        var r = card.getBoundingClientRect();
        var reveal = clamp((vh * 0.99 - r.top) / (vh * 0.24), 0, 1);
        var a = clamp(1 - Math.abs(q - i), 0, 1);
        a = Math.pow(a, 1.7);
        var rv = smooth(reveal);
        var focus = smooth(a);
        var opacity = rv * lerp(0.24, 1, focus);
        var ty = (1 - rv) * 24;
        var sc = 1 + 0.022 * focus;
        var blur = (1 - rv) * (1 - focus) * 7;
        card.style.opacity = opacity.toFixed(3);
        card.style.transform = "translateY(" + ty.toFixed(1) + "px) scale(" + sc.toFixed(4) + ")";
        card.style.filter = blur > 0.05 ? "blur(" + blur.toFixed(2) + "px)" : "none";
        card.style.borderColor = "rgba(" + lerp(227, 255, focus).toFixed(0) + "," + lerp(232, 255, focus).toFixed(0) + "," + lerp(239, 255, focus).toFixed(0) + "," + (0.2 + 0.24 * focus).toFixed(3) + ")";
        card.style.boxShadow = "0 22px 55px -30px rgba(0,0,0,.7), 0 0 0 1px color-mix(in srgb,var(--svc) " + (12 + focus * 20).toFixed(1) + "%, transparent), 0 26px 70px -26px color-mix(in srgb,var(--svc) " + (18 + focus * 22).toFixed(1) + "%, transparent)";
        card.classList.toggle("is-active", i === activeIdx && rv > 0.5);
      });
      if (baton) {
        var hide = (reduce || isMobile()) ? "none" : "";
        baton.style.display = hide;
        if (batonGlow) batonGlow.style.display = hide;
      }
    };
    store.tlRaf = requestAnimationFrame(tick);
    store.timelineCleanup = function () {
      window.removeEventListener("resize", store.procResize);
    };
  }

  // Infinite What You Get marquee: auto-scroll, pause + focus on hover, manual drag/wheel.
  function setupWhatMarquee(root, store) {
    var marquee = root.querySelector("[data-what-marquee]");
    if (!marquee) return;
    var viewport = marquee.querySelector("[data-what-viewport]");
    var track = marquee.querySelector("[data-what-track]");
    var seq = marquee.querySelector("[data-what-group]");
    if (!viewport || !track || !seq) return;

    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var isMobile = function () { return window.innerWidth <= 960; };
    var speed = 42;
    var seqWidth = 0;
    var copies = 1;
    var offset = 0;
    var vel = 0;
    var last = null;
    var raf = null;
    var hovered = false;
    var dragging = false;
    var dragStartX = 0;
    var dragStartOffset = 0;
    var focusCard = null;
    var SMOOTH_TAU = 0.22;

    var ensureCopies = function () {
      while (track.children.length > 1) track.removeChild(track.lastElementChild);
      copies = 1;
      if (isMobile() || reduce || isCapture()) return;
      seqWidth = seq.getBoundingClientRect().width;
      if (seqWidth <= 0) return;
      var want = Math.max(2, Math.ceil(viewport.clientWidth / seqWidth) + 2);
      while (copies < want) {
        track.appendChild(seq.cloneNode(true));
        copies += 1;
      }
    };

    var wrapOffset = function () {
      if (seqWidth <= 0) return;
      offset = (((offset % seqWidth) + seqWidth) % seqWidth);
    };

    var applyTransform = function () {
      wrapOffset();
      track.style.transform = "translate3d(" + (-offset).toFixed(2) + "px,0,0)";
    };

    var setFocus = function (card) {
      focusCard = card || null;
      Array.prototype.forEach.call(track.querySelectorAll(".svc-what-card"), function (c) {
        c.classList.toggle("is-focus", c === focusCard);
      });
      marquee.classList.toggle("is-dim", !!focusCard);
    };

    var targetSpeed = function () {
      if (reduce || isMobile() || isCapture() || dragging) return 0;
      if (hovered || focusCard) return 0;
      return speed;
    };

    var step = function (t) {
      raf = requestAnimationFrame(step);
      if (reduce || isMobile() || isCapture()) return;
      if (last === null) last = t;
      var dt = Math.max(0, t - last) / 1000;
      last = t;
      var ease = 1 - Math.exp(-dt / SMOOTH_TAU);
      vel += (targetSpeed() - vel) * ease;
      if (seqWidth > 0 && !dragging) {
        offset += vel * dt;
        applyTransform();
      }
    };

    ensureCopies();
    applyTransform();
    if (!reduce && !isMobile() && !isCapture()) raf = requestAnimationFrame(step);

    var onResize = function () {
      ensureCopies();
      applyTransform();
    };
    window.addEventListener("resize", onResize);

    var onEnter = function () { hovered = true; };
    var onLeave = function () {
      hovered = false;
      if (!dragging) setFocus(null);
    };
    marquee.addEventListener("pointerenter", onEnter);
    marquee.addEventListener("pointerleave", onLeave);

    var onTrackOver = function (e) {
      var card = e.target.closest ? e.target.closest(".svc-what-card") : null;
      if (card && track.contains(card)) setFocus(card);
    };
    var onTrackFocus = function (e) {
      var card = e.target.closest ? e.target.closest(".svc-what-card") : null;
      if (card && track.contains(card)) setFocus(card);
    };
    track.addEventListener("pointerover", onTrackOver);
    track.addEventListener("focusin", onTrackFocus);

    var onDown = function (e) {
      if (isMobile() || reduce || isCapture()) return;
      if (e.pointerType === "mouse" && e.button !== 0) return;
      dragging = true;
      dragStartX = e.clientX;
      dragStartOffset = offset;
      viewport.classList.add("is-dragging");
      try { viewport.setPointerCapture(e.pointerId); } catch (err) {}
    };
    var onMove = function (e) {
      if (!dragging) return;
      offset = dragStartOffset - (e.clientX - dragStartX);
      applyTransform();
    };
    var onUp = function (e) {
      if (!dragging) return;
      dragging = false;
      viewport.classList.remove("is-dragging");
      try { viewport.releasePointerCapture(e.pointerId); } catch (err) {}
    };
    viewport.addEventListener("pointerdown", onDown);
    viewport.addEventListener("pointermove", onMove);
    viewport.addEventListener("pointerup", onUp);
    viewport.addEventListener("pointercancel", onUp);

    var onWheel = function (e) {
      if (isMobile() || reduce || isCapture()) return;
      var delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (!delta) return;
      e.preventDefault();
      offset += delta;
      applyTransform();
    };
    viewport.addEventListener("wheel", onWheel, { passive: false });

    store.whatCleanup = function () {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      marquee.removeEventListener("pointerenter", onEnter);
      marquee.removeEventListener("pointerleave", onLeave);
      track.removeEventListener("pointerover", onTrackOver);
      track.removeEventListener("focusin", onTrackFocus);
      viewport.removeEventListener("pointerdown", onDown);
      viewport.removeEventListener("pointermove", onMove);
      viewport.removeEventListener("pointerup", onUp);
      viewport.removeEventListener("pointercancel", onUp);
      viewport.removeEventListener("wheel", onWheel);
      track.style.transform = "";
    };
  }

  // Infinite blog marquee: same as explore, but auto-scrolls left → right.
  function setupBlogs(root, store) {
    var marquee = root.querySelector("[data-blogs-marquee]");
    if (!marquee) return;
    var viewport = marquee.querySelector("[data-blogs-viewport]");
    var track = marquee.querySelector("[data-blogs-track]");
    var seq = marquee.querySelector("[data-blogs-group]");
    if (!viewport || !track || !seq) return;

    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var isMobile = function () { return window.innerWidth <= 960; };
    var speed = 36;
    var seqWidth = 0;
    var copies = 1;
    var offset = 0;
    var vel = 0;
    var last = null;
    var raf = null;
    var dragging = false;
    var moved = false;
    var pressing = false;
    var dragStartX = 0;
    var dragStartOffset = 0;
    var focusCard = null;
    var SMOOTH_TAU = 0.22;

    var ensureCopies = function () {
      while (track.children.length > 1) track.removeChild(track.lastElementChild);
      copies = 1;
      if (isMobile() || reduce || isCapture()) return;
      seqWidth = seq.getBoundingClientRect().width;
      if (seqWidth <= 0) return;
      var want = Math.max(2, Math.ceil(viewport.clientWidth / seqWidth) + 2);
      while (copies < want) {
        var clone = seq.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        track.appendChild(clone);
        copies += 1;
      }
    };

    var wrapOffset = function () {
      if (seqWidth <= 0) return;
      offset = (((offset % seqWidth) + seqWidth) % seqWidth);
    };

    var applyTransform = function () {
      wrapOffset();
      track.style.transform = "translate3d(" + (-offset).toFixed(2) + "px,0,0)";
    };

    var setFocus = function (card) {
      var hadFocus = !!focusCard;
      focusCard = card || null;
      Array.prototype.forEach.call(track.querySelectorAll(".svc-blog-card"), function (c) {
        c.classList.toggle("is-focus", c === focusCard);
      });
      marquee.classList.toggle("is-dim", !!focusCard);
      if (!focusCard && hadFocus) {
        vel = speed;
        last = null;
      }
    };

    var cardAtPoint = function (x, y) {
      var el = document.elementFromPoint(x, y);
      if (!el || !el.closest) return null;
      var card = el.closest(".svc-blog-card");
      return card && track.contains(card) ? card : null;
    };

    var syncFocusFromPointer = function (e) {
      if (dragging || isMobile() || reduce || isCapture()) return;
      var card = cardAtPoint(e.clientX, e.clientY);
      if (card !== focusCard) setFocus(card);
    };

    var targetSpeed = function () {
      if (reduce || isMobile() || isCapture() || dragging) return 0;
      if (focusCard) return 0;
      return speed;
    };

    var step = function (t) {
      raf = requestAnimationFrame(step);
      if (reduce || isMobile() || isCapture()) return;
      if (last === null) last = t;
      var dt = Math.max(0, t - last) / 1000;
      last = t;
      var ease = 1 - Math.exp(-dt / SMOOTH_TAU);
      vel += (targetSpeed() - vel) * ease;
      if (seqWidth > 0 && !dragging) {
        // Invert explore direction: content travels left → right.
        offset -= vel * dt;
        applyTransform();
      }
    };

    ensureCopies();
    applyTransform();
    if (!reduce && !isMobile() && !isCapture()) raf = requestAnimationFrame(step);

    var onResize = function () {
      ensureCopies();
      applyTransform();
    };
    window.addEventListener("resize", onResize);

    var onLeave = function () {
      if (!dragging) setFocus(null);
    };
    marquee.addEventListener("pointerleave", onLeave);
    marquee.addEventListener("pointermove", syncFocusFromPointer);

    var goToCard = function (card) {
      if (!card) return;
      var href = card.getAttribute("href");
      if (!href || href === "#") return;
      if (window.__agnPageGo) window.__agnPageGo(href);
      else window.location.href = href;
    };

    track.addEventListener("click", function (e) {
      var card = e.target.closest ? e.target.closest(".svc-blog-card") : null;
      if (!card) return;
      e.preventDefault();
      if (moved) return;
      goToCard(card);
    });

    var onDown = function (e) {
      if (isMobile() || reduce || isCapture()) return;
      if (e.pointerType === "mouse" && e.button !== 0) return;
      pressing = true;
      dragging = false;
      moved = false;
      dragStartX = e.clientX;
      dragStartOffset = offset;
    };
    var onMove = function (e) {
      if (!pressing || isMobile() || reduce || isCapture()) return;
      var dx = e.clientX - dragStartX;
      if (!dragging) {
        if (Math.abs(dx) <= 6) return;
        dragging = true;
        moved = true;
        viewport.classList.add("is-dragging");
        try { viewport.setPointerCapture(e.pointerId); } catch (err) {}
      }
      offset = dragStartOffset - dx;
      applyTransform();
    };
    var onUp = function (e) {
      pressing = false;
      if (dragging) {
        dragging = false;
        viewport.classList.remove("is-dragging");
        try { viewport.releasePointerCapture(e.pointerId); } catch (err) {}
      }
      syncFocusFromPointer(e);
      setTimeout(function () { moved = false; }, 0);
    };
    viewport.addEventListener("pointerdown", onDown);
    viewport.addEventListener("pointermove", onMove);
    viewport.addEventListener("pointerup", onUp);
    viewport.addEventListener("pointercancel", onUp);

    var onWheel = function (e) {
      if (isMobile() || reduce || isCapture()) return;
      // Horizontal-only: ignore vertical wheel so the page can scroll normally.
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      if (!e.deltaX) return;
      e.preventDefault();
      offset += e.deltaX;
      applyTransform();
    };
    marquee.addEventListener("wheel", onWheel, { passive: false, capture: true });

    store.blogsCleanup = function () {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      marquee.removeEventListener("pointerleave", onLeave);
      marquee.removeEventListener("pointermove", syncFocusFromPointer);
      marquee.removeEventListener("wheel", onWheel, { capture: true });
      viewport.removeEventListener("pointerdown", onDown);
      viewport.removeEventListener("pointermove", onMove);
      viewport.removeEventListener("pointerup", onUp);
      viewport.removeEventListener("pointercancel", onUp);
      track.style.transform = "";
    };
  }

  // Infinite explore marquee: auto-scroll, pause + focus on card hover, manual drag/wheel.
  function setupExplore(root, store) {
    var marquee = root.querySelector("[data-explore-marquee]");
    if (!marquee) return;
    var viewport = marquee.querySelector("[data-explore-viewport]");
    var track = marquee.querySelector("[data-explore-track]");
    var seq = marquee.querySelector("[data-explore-group]");
    if (!viewport || !track || !seq) return;

    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var isMobile = function () { return window.innerWidth <= 960; };
    var speed = 36;
    var seqWidth = 0;
    var copies = 1;
    var offset = 0;
    var vel = 0;
    var last = null;
    var raf = null;
    var dragging = false;
    var moved = false;
    var pressing = false;
    var dragStartX = 0;
    var dragStartOffset = 0;
    var focusCard = null;
    var SMOOTH_TAU = 0.22;

    var ensureCopies = function () {
      while (track.children.length > 1) track.removeChild(track.lastElementChild);
      copies = 1;
      if (isMobile() || reduce || isCapture()) return;
      seqWidth = seq.getBoundingClientRect().width;
      if (seqWidth <= 0) return;
      var want = Math.max(2, Math.ceil(viewport.clientWidth / seqWidth) + 2);
      while (copies < want) {
        var clone = seq.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        track.appendChild(clone);
        copies += 1;
      }
    };

    var wrapOffset = function () {
      if (seqWidth <= 0) return;
      offset = (((offset % seqWidth) + seqWidth) % seqWidth);
    };

    var applyTransform = function () {
      wrapOffset();
      track.style.transform = "translate3d(" + (-offset).toFixed(2) + "px,0,0)";
    };

    var setFocus = function (card) {
      var hadFocus = !!focusCard;
      focusCard = card || null;
      Array.prototype.forEach.call(track.querySelectorAll(".svc-explore-card"), function (c) {
        c.classList.toggle("is-focus", c === focusCard);
      });
      marquee.classList.toggle("is-dim", !!focusCard);
      if (!focusCard && hadFocus) {
        vel = speed;
        last = null;
      }
    };

    var cardAtPoint = function (x, y) {
      var el = document.elementFromPoint(x, y);
      if (!el || !el.closest) return null;
      var card = el.closest(".svc-explore-card");
      return card && track.contains(card) ? card : null;
    };

    var syncFocusFromPointer = function (e) {
      if (dragging || isMobile() || reduce || isCapture()) return;
      var card = cardAtPoint(e.clientX, e.clientY);
      if (card !== focusCard) setFocus(card);
    };

    var targetSpeed = function () {
      if (reduce || isMobile() || isCapture() || dragging) return 0;
      if (focusCard) return 0;
      return speed;
    };

    var step = function (t) {
      raf = requestAnimationFrame(step);
      if (reduce || isMobile() || isCapture()) return;
      if (last === null) last = t;
      var dt = Math.max(0, t - last) / 1000;
      last = t;
      var ease = 1 - Math.exp(-dt / SMOOTH_TAU);
      vel += (targetSpeed() - vel) * ease;
      if (seqWidth > 0 && !dragging) {
        offset += vel * dt;
        applyTransform();
      }
    };

    ensureCopies();
    applyTransform();
    if (!reduce && !isMobile() && !isCapture()) raf = requestAnimationFrame(step);

    var onResize = function () {
      ensureCopies();
      applyTransform();
    };
    window.addEventListener("resize", onResize);

    var onLeave = function () {
      if (!dragging) setFocus(null);
    };
    marquee.addEventListener("pointerleave", onLeave);
    marquee.addEventListener("pointermove", syncFocusFromPointer);

    var goToCard = function (card) {
      if (!card) return;
      var href = card.getAttribute("href");
      if (!href) {
        var slug = card.getAttribute("data-svc-slug");
        if (slug) href = FILE(slug);
      }
      if (!href) return;
      if (window.__agnPageGo) window.__agnPageGo(href);
      else window.location.href = href;
    };

    track.addEventListener("click", function (e) {
      var card = e.target.closest ? e.target.closest(".svc-explore-card") : null;
      if (!card) return;
      e.preventDefault();
      if (moved) return;
      goToCard(card);
    });

    var onDown = function (e) {
      if (isMobile() || reduce || isCapture()) return;
      if (e.pointerType === "mouse" && e.button !== 0) return;
      pressing = true;
      dragging = false;
      moved = false;
      dragStartX = e.clientX;
      dragStartOffset = offset;
    };
    var onMove = function (e) {
      if (!pressing || isMobile() || reduce || isCapture()) return;
      var dx = e.clientX - dragStartX;
      if (!dragging) {
        if (Math.abs(dx) <= 6) return;
        dragging = true;
        moved = true;
        viewport.classList.add("is-dragging");
        try { viewport.setPointerCapture(e.pointerId); } catch (err) {}
      }
      offset = dragStartOffset - dx;
      applyTransform();
    };
    var onUp = function (e) {
      pressing = false;
      if (dragging) {
        dragging = false;
        viewport.classList.remove("is-dragging");
        try { viewport.releasePointerCapture(e.pointerId); } catch (err) {}
      }
      syncFocusFromPointer(e);
      setTimeout(function () { moved = false; }, 0);
    };
    viewport.addEventListener("pointerdown", onDown);
    viewport.addEventListener("pointermove", onMove);
    viewport.addEventListener("pointerup", onUp);
    viewport.addEventListener("pointercancel", onUp);

    var onWheel = function (e) {
      if (isMobile() || reduce || isCapture()) return;
      // Horizontal-only: ignore vertical wheel so the page can scroll normally.
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      if (!e.deltaX) return;
      e.preventDefault();
      offset += e.deltaX;
      applyTransform();
    };
    marquee.addEventListener("wheel", onWheel, { passive: false, capture: true });

    store.exploreCleanup = function () {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      marquee.removeEventListener("pointerleave", onLeave);
      marquee.removeEventListener("pointermove", syncFocusFromPointer);
      marquee.removeEventListener("wheel", onWheel, { capture: true });
      viewport.removeEventListener("pointerdown", onDown);
      viewport.removeEventListener("pointermove", onMove);
      viewport.removeEventListener("pointerup", onUp);
      viewport.removeEventListener("pointercancel", onUp);
      track.style.transform = "";
    };
  }

  // ---- public build -------------------------------------------------------
  function build(rootEl, slug) {
    if (!rootEl) return null;
    injectStyles();
    slug = slug || slugFromLocation();
    var d = SERVICES[slug];
    if (!d) return null;

    rootEl.setAttribute("data-svc-page", "");
    rootEl.style.setProperty("--svc", d.accent);
    try { document.title = d.title + " · Azarian Growth Agency"; } catch (e) {}

    var mount = rootEl.querySelector("[data-service-mount]") || rootEl;
    mount.innerHTML =
      heroHTML(d) + storyHTML(d) + pillarsHTML(d) + getsHTML(d) + blogsHTML() + switchHTML(slug) + finalHTML(d);

    var store = { revealRaf: null, tlRaf: null, heroCoverRaf: null, tiltCleanups: [], grainientCleanups: [], timelineCleanup: null, heroCoverCleanup: null, heroMarkCleanup: null, storyCleanup: null, whatCleanup: null, blogsCleanup: null, exploreCleanup: null, specularCleanup: null, foldCleanup: null, animatedContentCleanup: null };
    setupHeroCover(mount, store);
    setupHeroWatermark(mount, store);
    setupStoryHighlight(mount, store);
    setupGrainient(mount, store);
    setupSpecularStats(mount, store);
    setupAnimatedContent(mount, store);
    setupFoldStats(mount, store);
    setupReveal(mount, store);
    setupTilt(mount, store);
    setupTimeline(mount, store);
    setupWhatMarquee(mount, store);
    setupBlogs(mount, store);
    setupExplore(mount, store);
    if (window.AzarianButton && window.AzarianButton.bindMagnetic) {
      try { window.AzarianButton.bindMagnetic(mount); } catch (e) {}
    }

    rootEl.__svcStore = store;
    return store;
  }

  function destroy(rootEl) {
    var store = rootEl && rootEl.__svcStore;
    if (!store) return;
    if (store.revealRaf) cancelAnimationFrame(store.revealRaf);
    if (store.tlRaf) cancelAnimationFrame(store.tlRaf);
    if (store.heroCoverRaf) cancelAnimationFrame(store.heroCoverRaf);
    if (store.timelineCleanup) store.timelineCleanup();
    if (store.whatCleanup) store.whatCleanup();
    if (store.blogsCleanup) store.blogsCleanup();
    if (store.exploreCleanup) store.exploreCleanup();
    if (store.heroCoverCleanup) store.heroCoverCleanup();
    if (store.heroMarkCleanup) store.heroMarkCleanup();
    if (store.storyCleanup) store.storyCleanup();
    if (store.grainientCleanups) store.grainientCleanups.forEach(function (fn) { try { fn(); } catch (e) {} });
    if (store.specularCleanup) store.specularCleanup();
    if (store.animatedContentCleanup) store.animatedContentCleanup();
    if (store.foldCleanup) store.foldCleanup();
    if (store.tiltCleanups) store.tiltCleanups.forEach(function (fn) { try { fn(); } catch (e) {} });
    rootEl.__svcStore = null;
  }

  window.AGA_SERVICE_PAGE = {
    build: build,
    destroy: destroy,
    SERVICES: SERVICES,
    ORDER: ORDER,
    file: FILE,
    slugFromLocation: slugFromLocation
  };
})();
