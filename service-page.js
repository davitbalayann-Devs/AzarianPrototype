/*
  Azarian Growth Agency — shared Service Page engine (single source of truth).

  ONE template, SIX services. Each service .dc.html file is identical except its
  filename; the slug is derived from the filename (service-<slug>.dc.html) and the
  matching content is pulled from AGA_SERVICES below. Structure and block count are
  the same across all six pages, but accent color, hero tint, copy and imagery
  change per service so switching between them never feels like the same page.

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
  // Each service keeps the same shell: hero · why · how · what · final CTA.
  var SERVICES = {
    "strategic-growth-diagnostic": {
      num: "01",
      tag: "Diagnostic",
      accent: "#1BFED1",
      grain: ["#0C4E56", "#0A2E49", "#081226"],
      title: "Strategic Growth Diagnostic",
      lead: "A six-week, board-ready commercial assessment that maps every marketing dollar to closed revenue. Most businesses that grew through founder relationships hit a point where nobody inside can explain why the spend is not turning into growth. The diagnostic answers that question with numbers, not opinions. Our growth-diagnostic-conductor agent runs the analysis in parallel across your full stack. Our senior team interprets it and presents it. You get 150 to 200 prioritized findings, the revenue impact of each, and a 30-60-90 day roadmap your board can underwrite.",
      cta: "Book the Strategic Growth Diagnostic",
      stats: [
        { k: "150–200", v: "prioritized findings" },
        { k: "6 wks", v: "to a board-ready deliverable" },
        { k: "30-60-90", v: "day roadmap" }
      ],
      whyTitle: "Why Operators Choose the Diagnostic",
      why: [
        { t: "We lead with findings, not a pitch", b: "Most agencies open with what they want to sell you. We open with what your data actually says. Every diagnostic starts with raw analysis of your ad accounts, analytics, CRM, and email systems, pulled live from your connected platforms. We show you exactly where revenue is leaking before we say a word about what to do next. Paid means independent. You are not sitting through an audit designed to end in a retainer." },
        { t: "Every claim comes with a specific number", b: "We do not tell you your email 'needs improvement.' We document that a share of your paid leads never received a single automation email because a CRM field was set wrong, and we put a dollar figure on the gap. We do not say your ad account 'could be better.' We show you what percentage of your spend is going to keywords that will never convert. Specificity is the difference between a diagnostic and a surface-level audit." },
        { t: "Full funnel, because that is where leads disappear", b: "Your Google Ads account does not exist in isolation, and neither does your SEO, your email, your CRM, or your landing pages. We trace the entire path from first impression to closed revenue, including the handoffs between systems where most leads vanish. When a large share of your paid leads never make it from your marketing platform into your sales CRM, fixing one channel solves nothing." },
        { t: "Built for operators, not marketers", b: "If you are a CEO, CFO, COO, or operating partner, you do not need someone to explain what an impression is. You need someone to tell you your real cost to acquire a customer, why it is higher than your target, and what it would take to close the gap. We frame everything in revenue, unit economics, and contribution margin, because those are the numbers driving your decisions and the numbers your board expects to see." },
        { t: "We find what your current team cannot see", b: "When you are in day-to-day operations, systemic problems are invisible. Your marketing team reports on the metrics they own. Your agencies report on the channels they run. Nobody connects the two. That gap is where the money leaks. The diagnostic surfaces the mismatches between systems, the attribution gaps across platforms, and the process failures that quietly kill leads between the click and the close." },
        { t: "The diagnostic becomes your roadmap", b: "The deliverable is not a slide deck of general advice. It is a prioritized, implementation-ready document: specific findings, quantified impact, clear next steps, organized by timeline. Immediate actions, 90-day initiatives, and 6 to 12 month priorities. You can hand it to your internal team, your current agencies, or ours, and start executing the same week." },
        { t: "Transparent methodology", b: "Every finding lists its data source, date range, and method. You can verify anything we report. We document our assumptions and cite our sources. This is trust through proof, not trust through promises." }
      ],
      whyAnim: ["find", "num", "funnel", "dash", "mag", "road", "check"],
      howTitle: "How the Diagnostic Works",
      howIntro: "The diagnostic runs in ten steps over four to eight weeks. We never make changes to your live accounts during this phase.",
      steps: [
        { t: "Discovery and scope", b: "A working session on your business model, revenue goals, and the specific pressure your leadership is under. A departed CMO, underperforming agencies, a board asking questions nobody can answer. We identify the trigger and scope the work around it. You leave with a clear document defining what we cover, what access we need, and when you get the deliverable." },
        { t: "Platform access and data collection", b: "We request read access to your ad platforms, analytics, CRM, email platform, tag manager, and any system that touches your funnel. We also ask for internal reports and financial context so we can work in your unit economics, not generic benchmarks." },
        { t: "Paid media deep dive", b: "A system-deep audit of your paid accounts: campaign structure, quality score distribution, bid strategy, geographic and device performance, competitor activity, and creative. We calculate cost per lead by campaign, by keyword tier, and over time, and we flag exactly where spend is being wasted." },
        { t: "Analytics and conversion path", b: "We map the full conversion path from first session to form fill or call, find the drop-off points, and measure conversion at each stage. We check your form flow, trust signals, and the handoff from conversion to sales. If your tracking is not firing correctly, that surfaces here." },
        { t: "CRM and data flow audit", b: "This is where the biggest surprises live. We trace a lead from form submission to customer or to drop-off. We check whether your CRM receives every marketing lead, whether source attribution is accurate, whether lifecycle stages are set correctly, and whether sales is actually working the leads marketing generates. A single misconfigured field can quietly block a large share of your leads from ever entering a nurture sequence." },
        { t: "Email and lifecycle assessment", b: "We audit your automation flows, deliverability health, list hygiene, and engagement. We check whether leads are entering nurture, whether automation rules are filtering out qualified prospects, and whether the system was ever properly connected. Companies told their email 'does not work' usually have a plumbing problem, not a content problem." },
        { t: "Competitive and SEO assessment", b: "We benchmark your organic performance, domain authority, backlink profile, and content coverage against your top competitors. We find keyword gaps, content types you are missing, and technical issues holding you back. For regulated industries like financial services, insurance, and healthcare, we factor in the compliance constraints that shape content strategy." },
        { t: "Tracking infrastructure review", b: "We audit your tag manager, conversion tracking, cross-domain setup, and data layer. We check whether enhanced conversions and server-side tracking are live and configured correctly. When ad blockers and browser changes can cause meaningful underreporting, unreliable data makes every downstream decision suspect." },
        { t: "Findings and impact quantification", b: "We compile everything into a structured deliverable. Each finding carries the data point, the business impact in dollars or percentage terms, the root cause, and the recommended fix. We prioritize by revenue impact and organize into immediate, 90-day, and 6 to 12 month timelines. The result is a 150 to 200 item roadmap your leadership and board use to decide where to invest and whether your current vendors are earning their fees." },
        { t: "Executive presentation", b: "We present to your leadership in a focused session: the most critical findings, their financial impact, and the path forward. This is a strategic discussion, not a sales pitch. The deliverable is board-ready, with executive summaries, unit economics, and competitive analysis that meet investor-grade standards." }
      ],
      whatTitle: "What You Get",
      what: [
        { t: "Revenue leak identification", b: "The specific dollars your marketing is leaving on the table, from automation failures to CRM sync gaps to misattributed conversions, with a monthly cost attached to each leak." },
        { t: "Channel performance benchmarking", b: "Every active channel measured against benchmarks and against your own history. Which channels deliver, which underperform, and which are taking credit for results they did not produce. Corrected tracking sometimes reveals a channel written off as dead is actually your cheapest source." },
        { t: "True customer acquisition cost", b: "Most companies undercount CAC by a wide margin. We calculate your real cost to acquire a paying customer, tie it to lifetime value and payback period, and give you the full unit economics picture instead of a channel-level vanity number." },
        { t: "Conversion funnel analysis", b: "Every step from first touch to closed revenue, the exact points where prospects drop off, and the revenue cost of each drop. Conversion rates can vary many times over across segments when targeting is aimed at the wrong tier, and we find where that is happening." },
        { t: "Competitive gap assessment", b: "Your organic visibility, paid investment, domain authority, content coverage, and referral network against your direct competitors. Where you lead, where you trail, and what it takes to close each gap. For PE-backed companies this feeds directly into valuation and exit-readiness discussions." }
      ],
      finalTitle: "Six weeks to a roadmap your board can underwrite",
      finalBody: "Six weeks. A board-ready deliverable. A 150 to 200 item prioritized roadmap. The same diagnostic methodology we have run for portfolio companies that could not explain why a large, healthy-looking business was not converting spend into growth. If that sounds like your business, this is where it starts."
    },

    "fractional-cmo": {
      num: "02",
      tag: "Leadership",
      accent: "#4F8CFF",
      grain: ["#123C7A", "#0B3358", "#081226"],
      title: "Fractional CMO",
      lead: "Senior marketing leadership in seat from day one, reporting at board level on pipeline contribution, CAC trajectory, and EBITDA impact. When a private equity firm builds a business by combining several smaller ones, the result usually has revenue and no digital infrastructure to scale it. That is the gap a Fractional CMO fills. You get a senior operator running the marketing function, backed by Growth OS handling the execution layer, without the cost, the timeline, or the wrong-hire risk of a full-time CMO search. Thirty-day exit clause. No severance exposure.",
      cta: "Book the Strategic Growth Diagnostic",
      stats: [
        { k: "Day 1", v: "senior leadership in seat" },
        { k: "90-day", v: "milestones for the PE clock" },
        { k: "30-day", v: "exit clause, no severance" }
      ],
      whyTitle: "Why Portfolio Companies Choose This Model",
      why: [
        { t: "Faster than a hire, more useful than a consultant", b: "A full-time CMO takes six to twelve months to recruit and onboard, carries real wrong-hire risk, and draws full salary from day one regardless of output. A consultant hands you a deck and leaves. Our Fractional CMO embeds in the business, builds the infrastructure, runs the engine, and reports to the board at the cadence your sponsor expects." },
        { t: "The team that ran your diagnostic runs the retainer", b: "Every engagement starts with the Strategic Growth Diagnostic, and the same senior operators who ran it execute the roadmap. No handoff to junior account managers. No relearning your business. Everything the diagnostic uncovered carries straight into the work." },
        { t: "Growth OS underneath", b: "Our Fractional CMO does not work alone. They supervise Growth OS: specialized agents handling paid media analysis, content production, email lifecycle, attribution reporting, and lead qualification, the work that used to eat 30 to 40 hours of analyst time a week. The senior layer makes the calls. The agent layer does the volume. Your business gets both." },
        { t: "Board reporting on operator metrics", b: "We do not report on impressions or reach. We report on pipeline contribution, CAC trajectory, LTV-to-CAC ratio, payback period, contribution margin, and EBITDA impact, on the cadence and to the standard your sponsor expects. The numbers that drive business decisions, not the ones that fill a dashboard." },
        { t: "Vendor and agency oversight", b: "Most portfolio companies run several agencies with no strategic layer connecting their work to revenue. Our Fractional CMO manages those vendors, holds them to business outcomes, and either rationalizes the spend or replaces the agencies. You stop paying for execution that is not tied to results. We handle this directly so you do not have to manage the transition yourself." },
        { t: "Built for the PE timeline", b: "Designed for compressed hold periods, with measurable milestones at 90-day intervals. We do not run multi-quarter discovery before producing anything. The roadmap already exists. The work starts in week one." },
        { t: "Thirty-day exit clause", b: "If we are not delivering, you exit in 30 days with no severance and no lock-in. A full-time hire carries months of severance risk plus the cost of finding a replacement. We carry the risk that our work produces outcomes, on the timeline you need it." }
      ],
      whyAnim: ["speed", "check", "agents", "dash", "net", "road", "shield"],
      howTitle: "How the Engagement Runs",
      howIntro: "",
      steps: [
        { t: "Diagnostic first, always", b: "Every Fractional CMO engagement begins with the Strategic Growth Diagnostic. Six weeks, board-ready, 150 to 200 findings. The diagnostic tells us whether your business needs a Fractional CMO at all, and if so, what the first 90 days should be. We do not take a retainer without it. It is how we know what we are signing up for, and how you know we are working in your interest." },
        { t: "Engagement scoping", b: "After the diagnostic we scope the retainer to the findings. The default is a full Fractional CMO who runs the marketing function. Two lighter options exist for businesses that need less: strategic advisory, where we guide and your team executes, and strategy plus execution, where we own strategy and oversight while your team handles channel work. Most portfolio companies land on the full model." },
        { t: "First 30 days, stabilize and quick wins", b: "We execute the immediate wins the diagnostic surfaced. Pricing and segmentation adjustments, channel corrections, CRM fixes, attribution repairs. The no-regret moves that produce visible results fast and build trust with the board." },
        { t: "Days 30 to 90, infrastructure build", b: "We rebuild whatever the diagnostic flagged as broken. CRM architecture, attribution chains, lead routing, marketing automation, server-side tracking, and a board reporting cadence. The agents we deploy depend on the findings. Senior team supervises every layer." },
        { t: "Months 3 to 12, operate and optimize", b: "The engine runs. Monthly cross-channel reporting on a fixed cadence. A daily intelligence brief to your team on their own data. Senior team handles strategy, board presentations, vendor management, and the judgment calls agents cannot make. Marketing operates as a revenue lever, not a cost center." },
        { t: "Quarterly board reviews", b: "Every quarter we present at board level on pipeline contribution, CAC trajectory, LTV-to-CAC, payback period, and EBITDA impact. Investor-grade reporting tied to the value creation plan. Your sponsor sees the marketing section of the plan being delivered." }
      ],
      whatTitle: "What You Get",
      what: [
        { t: "Senior strategic leadership", b: "A CMO-level operator in seat, in board meetings, challenging agencies, managing vendors, and directing your team. The person who built your diagnostic runs the retainer." },
        { t: "Growth OS deployed in your business", b: "The agents the diagnostic identified, installed and running against your data. Configured for your business, not a generic template." },
        { t: "Board-ready monthly reporting", b: "Pipeline contribution, CAC by channel, LTV-to-CAC, contribution margin, and revenue attribution. Investor-grade, on the cadence your sponsor expects." },
        { t: "Vendor and agency oversight", b: "We manage your existing agencies, hold them to outcomes, and rationalize or replace the spend. You stop paying for execution disconnected from results." },
        { t: "Quarterly strategy refresh", b: "Every quarter the roadmap is refreshed against actual performance. What works scales. What does not gets cut. The strategy stays tied to the value creation plan." }
      ],
      finalTitle: "Senior marketing leadership, in seat from day one",
      finalBody: "Senior marketing leadership in seat from day one. Growth OS running underneath. Board-ready reporting on the metrics your sponsor tracks. The diagnostic comes first. The Fractional CMO retainer is what the findings make the case for."
    },

    "paid-media-demand-generation": {
      num: "03",
      tag: "Demand",
      accent: "#F7B733",
      grain: ["#5D3F12", "#4A2414", "#1D184B"],
      title: "Paid Media & Demand Generation",
      lead: "Paid media that reports to revenue, not impressions, and outbound that lands because the timing is right. The platforms have absorbed the campaign-management layer most agencies sold as their core service. Google AI Max, Meta Advantage+, and Amazon's own AI surfaces now run the mechanics. The edge that remains is the strategic layer: budget allocation across channels, creative and signal quality, attribution you can trust, and connecting every dollar to a closed customer. Our paid-media-buyer agent runs the platform work. Our senior team makes the calls the automation cannot. Our outreach agents watch for the moment a prospect actually needs you.",
      cta: "Book the Strategic Growth Diagnostic",
      stats: [
        { k: "CAC · LTV", v: "not ROAS vanity" },
        { k: "5+", v: "channels, budget follows results" },
        { k: "Daily", v: "signal-based outbound" }
      ],
      whyTitle: "Why Our Paid Media and Demand Gen Is Different",
      why: [
        { t: "Attribution first, spend second", b: "Before we manage a dollar, we audit your tracking: tag manager, enhanced conversions, server-side tracking, cross-domain setup, and CRM source attribution. Ad blockers and browser protections cause meaningful conversion underreporting, so server-side tracking is not optional. If the data is unreliable, every decision built on it is suspect. We fix this first." },
        { t: "Tied to CAC and LTV, not ROAS", b: "Most agencies report ROAS because the platforms make it easy to surface. We report CAC, LTV, payback period, and contribution margin, because those decide whether the marketing is actually profitable. ROAS without attribution is a vanity number." },
        { t: "We work with the platform automation, not against it", b: "AI Max, Advantage+, and Amazon's automated surfaces are not going away, and the agencies fighting them are losing. We design campaigns to feed the automation the conversion signals and creative variety it needs to optimize, then intervene at the strategic layer where it makes the wrong call. When targeting collapses to the machine, creative becomes the lever, and senior copywriters own that." },
        { t: "Channel-agnostic budget allocation", b: "We have no stake in spending your budget on any one platform. The agent tracks performance across Google, Meta, LinkedIn, TikTok, and Amazon. The senior team moves money to what is working. If one channel outperforms another for your business, the budget follows the result, not our preference." },
        { t: "Account health monitored continuously", b: "Wasted spend hides in quality score distribution, audience saturation, frequency, and branded-search cannibalization. The agent tracks these continuously, surfaces problems, and prioritizes fixes by financial impact rather than by whichever metric is easiest to move." },
        { t: "Signal-based outreach, not spray and pray", b: "Generic cold outreach gets almost no reply. Outreach timed to a real event in the prospect's business does far better. Our deal-flow-monitor agent watches PE acquisitions, funding rounds, executive changes, and named-account triggers every morning and posts the angle. For a PE operating partner, that means we can reach out the moment a platform is being built or a new tuck-in closes, with a message that shows we understand their thesis, not a generic pitch of someone else's problem." },
        { t: "Every external call briefed before it starts", b: "Our pre-call-research agent reads the calendar, spots external meetings in the next hour, and posts a research brief on the company and the person. You walk into every conversation already knowing the account, the platform strategy, and the angle." }
      ],
      whyAnim: ["attn", "scale", "agents", "budget", "pulse", "radar", "cal"],
      howTitle: "How the Program Runs",
      howIntro: "",
      steps: [
        { t: "Attribution and tracking audit", b: "We audit the tracking infrastructure before touching a campaign. Tag manager, enhanced conversions, server-side tracking, cross-domain, CRM sync. We fix what is broken and document what needs a rebuild. Everything that follows depends on this foundation." },
        { t: "Account and channel audit", b: "The paid-media-buyer agent audits every active account across search, social, and marketplace: structure, quality scores, bid strategy, audience saturation, creative, and competitor activity. Output is a prioritized fix list ranked by financial impact." },
        { t: "Strategic restructure", b: "We rebuild campaign structure on the findings: account architecture, conversion goal hierarchy, audience signals, bid strategy, and budget allocation across channels. The agent executes. Senior media buyers validate every move." },
        { t: "Creative and signal system", b: "Senior copywriters supply the creative and the variants. The agent rotates them and tests against conversion, not engagement. Hypothesis-driven testing, where only the variable under test changes between versions, so you learn something from every result." },
        { t: "Signal-based outbound", b: "Senior strategists define the segments and the trigger events worth acting on. The deal-flow-monitor and account-intelligence agents watch for them and enrich every prospect. Sequences match the signal, so a fresh acquisition gets a different opener than a missed quarter. Replies route to a person, never to a bot pretending to be one." },
        { t: "Daily monitoring, weekly optimization, monthly reporting", b: "The agent monitors account health daily and flags issues to Slack. The senior team optimizes weekly: budget reallocation, audience expansion, creative refresh, outbound tuning. The performance-reporter agent generates monthly cross-channel reports tied to pipeline contribution and CAC." }
      ],
      whatTitle: "What You Get",
      what: [
        { t: "Tracking infrastructure that works", b: "Attribution audit and rebuild across tag manager, enhanced conversions, server-side tracking, cross-domain, and CRM source attribution." },
        { t: "Account audit and restructure", b: "Complete audit across search, paid social, and marketplace, with a strategic restructure executed by the agent under senior supervision." },
        { t: "Creative testing system", b: "Hypothesis-driven testing run continuously. Senior copywriters supply variants. Winners scale, losers archive. No random shuffling." },
        { t: "Cross-channel budget allocation", b: "Channel-agnostic management. Money moves to what works and away from what does not. The agent tracks, the senior team decides." },
        { t: "Signal-based outbound engine", b: "Daily deal-flow monitoring, enriched target lists, signal-matched sequences, and pre-call briefs on every external meeting." },
        { t: "Monthly reporting tied to pipeline", b: "Pipeline contribution by channel, CAC trajectory, LTV-to-CAC, and contribution margin. The metrics your board cares about." }
      ],
      finalTitle: "Paid media that reports to revenue",
      finalBody: "Paid media that reports to revenue and outbound that lands because the timing and the angle are right. Run by agents at the platform layer, supervised by senior operators at the strategy layer. The diagnostic tells you whether your current paid media is actually working before we touch a campaign."
    },

    "seo-content": {
      num: "04",
      tag: "Search & Content",
      accent: "#34E0A1",
      grain: ["#0D5842", "#0A3F4D", "#081226"],
      title: "SEO & Content",
      lead: "Content built to rank on Google, get cited inside ChatGPT and Claude, and move pipeline. Buyers no longer type a query into Google and click ten blue links. They ask an AI assistant, get a synthesized answer, and decide on what the model says. If your brand is not in that answer, you do not exist for that buyer. We work both engines at once: traditional SEO for the queries that still go through Google, and generative engine optimization for the ones moving to AI. Our agents handle the volume of research, production, and tracking. Our senior editors and strategists carry the substance.",
      cta: "Book the Strategic Growth Diagnostic",
      stats: [
        { k: "SEO + GEO", v: "both engines at once" },
        { k: "8–12", v: "assets from every pillar" },
        { k: "Quarterly", v: "AI citation tracking" }
      ],
      whyTitle: "Why Our SEO and Content Is Different",
      why: [
        { t: "SEO and GEO together, because search split in two", b: "The queries that still go through Google get real technical and on-page SEO. The queries moving to ChatGPT, Claude, Perplexity, and Gemini get generative engine optimization. Getting cited by a model takes different work than ranking a page: long-form authoritative content, structured data, original research, and clear entity definitions the model can quote. The content that wins in one engine often wins in the other, so we build for both from the start." },
        { t: "Content tied to your ICP, not your category", b: "Your buyer is an operator. A PE operating partner thinks in hold periods, platforms, tuck-ins, and the digital infrastructure gap that appears when several businesses merge. A portfolio CEO thinks in CAC, LTV, and payback period. We write at that level, in the language they actually use, not at the level of a generic agency blog chasing top-of-funnel awareness. Content that speaks to the wrong problem tells an operator you do not understand their business, and they move on." },
        { t: "Thought leadership built on a model we run ourselves", b: "Our own leadership has run a publishing program for years across LinkedIn, a webinar series, and a podcast. We did not learn this from a textbook. We learned it by running it and watching what produced pipeline versus what produced empty engagement. We apply the same model to your executives: the agents handle research and drafts, senior editors and the executive's actual voice carry the rest." },
        { t: "Full technical layer, not just on-page", b: "Most SEO stops at keywords. We audit tag manager, conversion tracking, schema, structured data, internal linking, crawl budget, and Core Web Vitals. The technical layer is where SEO usually fails, and it is the part most agencies skip because the client cannot see it." },
        { t: "Link-building through real relationships", b: "The link industry has been corrupted by guest-post farms and paid networks that destroy authority faster than they build it. We do none of that. We identify publications, podcasts, and operator-audience platforms where a mention actually moves authority, then earn the placement. Ten high-authority links move rankings. A hundred low-authority links do not." },
        { t: "Local where the business has a service area", b: "For businesses with physical service areas, local is its own discipline: Google Business Profile, the local pack, review velocity, and citation consistency. We run it as a continuous program and report on calls and form submissions, not just rankings." },
        { t: "Tied to pipeline, not traffic", b: "We report on what content actually moves: which pages drive demo bookings, which pieces get cited by sales in live deals, which assets convert. Ranking third for a keyword that drives no qualified traffic is not a win. Traffic is the means. Pipeline is the end." }
      ],
      whyAnim: ["engines", "target", "cast", "stack", "net", "pin", "funnel"],
      howTitle: "How the SEO and Content Program Runs",
      howIntro: "",
      steps: [
        { t: "Technical and citation audit", b: "The seo-specialist agent runs a full technical audit: speed, Core Web Vitals, schema, crawl, indexation, internal linking. The geo-specialist agent queries the major AI assistants against your categories and competitors to see how they describe your space, who they cite, and where your brand sits. Two baselines, one picture." },
        { t: "Competitive and keyword gap analysis", b: "We benchmark your organic visibility against your top competitors. Keyword gaps where they rank and you do not. Content types they publish that you are missing. The citation sources the AI assistants pull from in your space. This becomes the blueprint." },
        { t: "Content roadmap", b: "The content-strategist agent turns the analysis into a prioritized roadmap: topics, depth, data to publish, and entity definitions to anchor. Prioritized by the queries where you can realistically rank or become a cited source in the next 90 days. Checked against your existing calendar so there is zero overlap." },
        { t: "Production", b: "The content-writer agent produces drafts at the depth the brief demands. Senior editors refine voice, sharpen the argument, and add the perspective an agent cannot. Subject matter experts review for accuracy. Structured data and schema get added. Every piece is built to be both rankable on Google and quotable by a model." },
        { t: "Distribution and repurposing", b: "Each pillar piece publishes on your site and generates derivative assets: LinkedIn posts and carousels, email sequences, and sales enablement. One pillar becomes eight to twelve assets without rebriefing each one. For executive thought leadership, the pillar runs under the executive's name in their voice." },
        { t: "Link-building and authority", b: "The outreach and account-intelligence agents identify publications and podcasts worth pursuing in your category. Senior outreach handles the relationships. Toxic links in your existing profile get flagged for disavow. We report on the rankings that improve, not the link count." },
        { t: "Tracking and iteration", b: "The geo-specialist agent re-runs the baseline queries quarterly to track citation share over time. The performance-reporter agent ties organic performance to pipeline. The strategy adjusts based on what is getting cited and what is converting." }
      ],
      whatTitle: "What You Get",
      what: [
        { t: "Technical audit and fix plan", b: "Full technical SEO audit with a prioritized fix list, plus an AI citation baseline showing how the major assistants describe your category today." },
        { t: "Content roadmap for two engines", b: "A prioritized calendar tied to both Google rankings and AI citation potential, built for your specific ICP, with no overlap with your existing content." },
        { t: "Pillar content and derivative pipeline", b: "Long-form authoritative content produced by the agents, refined by senior editors, with each pillar generating eight to twelve derivative assets." },
        { t: "Executive thought leadership", b: "Voice-calibrated publishing under your executives' names, built on the model we run for ourselves, tied to inbound demos and named-account warming." },
        { t: "Link-building and local", b: "Signal-based outreach to real publications, and, where relevant, a local search program tied to calls and forms." },
        { t: "Reporting tied to pipeline", b: "Organic performance and citation share reported against pipeline contribution, CAC, and conversion, not just rankings." }
      ],
      finalTitle: "Built to rank on Google and get cited by AI",
      finalBody: "Content built to rank on Google, get cited inside AI assistants, and move pipeline. Produced at the volume the agents enable, refined to the quality the senior team requires, tied to the metrics your board cares about. The diagnostic shows you where the gaps are before we write a word."
    },

    "website-conversion-optimization": {
      num: "05",
      tag: "Web & CRO",
      accent: "#C08BFF",
      grain: ["#4B2F72", "#243B73", "#4D1E53"],
      title: "Website & Conversion Optimization",
      lead: "A website is conversion infrastructure, not a brochure. For a business built through founder relationships, or several of them merged together, the site is often the first place the missing digital infrastructure shows. We build for what converts in production, not what looks good in a deck: fast pages, a clear conversion path, SEO and AI-search readiness from day one, the analytics to measure whether any of it works, and the brand and messaging to carry it. Our agents run the production layer. Senior designers, developers, and CRO strategists make the calls that determine whether the page actually performs.",
      cta: "Book the Strategic Growth Diagnostic",
      stats: [
        { k: "Single-goal", v: "conversion-first pages" },
        { k: "Day 1", v: "analytics + AI-search ready" },
        { k: "Full-funnel", v: "hypothesis-driven CRO" }
      ],
      whyTitle: "Why Our Web and CRO Work Is Different",
      why: [
        { t: "Attribution first, testing second", b: "Most CRO programs fail because the attribution underneath is broken. A test 'wins' on platform-reported conversions but does not move pipeline. We audit tracking before we test anything. If the data is unreliable, every result is suspect." },
        { t: "Conversion-first information architecture", b: "Every page is designed around a single conversion goal. The architecture follows the buyer's actual decision path, not the agency's preferred page categories. Multi-goal pages dilute conversion, so we do not build them. Senior CRO strategists own the structure." },
        { t: "Hypothesis-driven testing, not random", b: "Every test starts with a hypothesis grounded in real user behavior: where users drop off, which friction points cost the most pipeline, which trust signals are missing. We test the highest-impact hypotheses first. No random button-color tests, and no multi-month windows that produce results obsolete by the time they ship." },
        { t: "Built for two search engines from day one", b: "Pages are structured to rank on Google and earn citations from AI assistants. The seo-specialist and geo-specialist agents review every page before launch. Structured data, schema, and entity clarity are built in from the start, not bolted on later." },
        { t: "Analytics infrastructure at launch", b: "Tag manager, enhanced conversions, server-side tracking, cross-domain, and CRM source attribution are implemented and tested before launch, not three months later when the reporting falls apart. This is exactly the infrastructure that is missing when a portfolio company has grown without it." },
        { t: "Brand tied to pipeline, not awards", b: "Brand work that wins design awards but does not move pipeline is work your board will not pay for. We lead with positioning, not visual identity: how the operator audience recognizes you, messaging that survives translation into ads and sales decks, and assets your team can actually use without us in the room. For a PE-backed buy-and-build, brand sequencing matters, because premature rebranding destroys equity and late rebranding compounds confusion. We have run that playbook." },
        { t: "Full funnel, not just the landing page", b: "Landing pages get the attention because they are visible, but the biggest wins are often deeper: form flow, checkout abandonment, sales handoff friction, and follow-up speed. We test where the revenue actually lives, and we track every result through to pipeline, not platform conversions." }
      ],
      whyAnim: ["attn", "page", "ab", "engines", "data", "target", "funnel"],
      howTitle: "How the Web and CRO Engagement Works",
      howIntro: "",
      steps: [
        { t: "Discovery and audit", b: "We audit your current site if one exists: performance, conversion paths, analytics integrity, SEO health, and brand consistency. Discovery covers the business model, conversion goals, ICP, and technical requirements for where the site needs to go." },
        { t: "Positioning and information architecture", b: "Senior strategists lock positioning and messaging before design starts. Senior CRO strategists design the architecture around the buyer's decision path. Every page maps to a goal, and every conversion path is mapped before anyone opens a design tool." },
        { t: "Design, copy, and build", b: "Senior designers create the visual system that expresses the positioning. The content-writer and landing-page-specialist agents produce page-level work under senior copy and design direction. Senior developers handle the build, with page speed and Core Web Vitals as launch criteria, not afterthoughts." },
        { t: "Analytics and tracking implementation", b: "Tag manager, enhanced conversions, server-side tracking, cross-domain, and CRM source attribution implemented and tested before launch. The reporting is only as reliable as this foundation." },
        { t: "QA and launch", b: "Full QA against speed, Core Web Vitals, conversion tracking, mobile, and accessibility. The CMS and template structure are built for iteration, so the testing program can run from day one rather than waiting for a redesign." },
        { t: "Continuous conversion optimization", b: "We map the funnel from first touch to closed revenue and quantify each drop-off in revenue terms. Senior strategists turn the findings into testable hypotheses. The landing-page-specialist agent builds variants and runs the cycles. Winners scale to related pages. Losers archive with documented learnings. The senior team makes the scale decision on pipeline impact, not platform conversion lift." }
      ],
      whatTitle: "What You Get",
      what: [
        { t: "Positioning and messaging framework", b: "Audience definition, differentiation, and voice locked before design, so the visual work expresses substance rather than replacing it." },
        { t: "Conversion-first website and pages", b: "Custom build, no template shortcuts, structured around the buyer's decision path and ready to rank on Google and in AI search from day one." },
        { t: "Analytics and tracking infrastructure", b: "The full tracking stack implemented before launch, the same infrastructure that is usually missing when a business has scaled without it." },
        { t: "Hypothesis-driven CRO program", b: "Full-funnel testing grounded in user behavior, run at the agent layer, interpreted by senior strategists against pipeline." },
        { t: "Usable brand system", b: "Positioning, visual identity, and guidelines your in-house team can actually maintain, sequenced correctly for consolidation contexts." }
      ],
      finalTitle: "A website built as conversion infrastructure",
      finalBody: "Websites built as conversion infrastructure, brand tied to pipeline, and CRO that moves the business rather than the platform conversion rate. Senior direction above the agent layer, built for iteration from launch. The diagnostic identifies where the biggest conversion wins are hiding before we build or test a thing."
    },

    "marketing-analytics-reporting": {
      num: "06",
      tag: "Analytics",
      accent: "#38BDF8",
      grain: ["#0E4F6A", "#123C7A", "#0A2D47"],
      title: "Marketing Analytics & Reporting",
      lead: "One source of truth for marketing performance, tied to pipeline, board-ready every month. When a business is big but nobody inside can explain how the marketing actually works, the problem is almost always the numbers. GA4 says one thing, the CRM says another, the ad platforms say a third, and no one trusts any of it. We reconcile the data into one set of numbers your board can stand behind. Our performance-reporter agent pulls live from your connected systems in parallel and generates the operational layer. Our senior team handles the strategic synthesis the agent cannot: what the numbers mean and what to do next.",
      cta: "Book the Strategic Growth Diagnostic",
      stats: [
        { k: "1", v: "reconciled source of truth" },
        { k: "Monthly", v: "board-ready, days after close" },
        { k: "Daily", v: "intelligence brief" }
      ],
      whyTitle: "Why Our Reporting Is Different",
      why: [
        { t: "One source of truth", b: "GA4, your CRM, and your ad platforms each report a different number. We reconcile them, identify the discrepancies, and produce one set of figures your board can trust. Attribution gaps closed, cross-channel double-counting eliminated, server-side tracking where data integrity demands it." },
        { t: "Tied to pipeline and unit economics", b: "We do not report impressions, clicks, or engagement rate. We report CAC, LTV, payback period, LTV-to-CAC, contribution margin, pipeline velocity, and revenue attribution by channel. The metrics that decide whether the marketing is profitable, and the ones your board and your sponsor actually read." },
        { t: "The reporting layer AI is absorbing, done right", b: "Anything that looks like a recurring dashboard or a weekly PDF is being absorbed by automation. What used to take an analyst 30 to 40 hours a week now runs autonomously. The defensible deliverable is the synthesis layer connecting metrics to decisions, and that is where our senior team sits, above the agent." },
        { t: "Board-ready every month", b: "Executive summary, channel-level performance, unit economics movement, competitive benchmarking, and forward-looking recommendations, in the investor-grade format your sponsor expects at the quarterly board meeting. Delivered within days of month-end, not weeks." },
        { t: "Daily intelligence on top of monthly reporting", b: "The briefer agent generates a daily brief to your team: pipeline movement, account activity, anomalies in the data, and the top opportunities. Your team starts each morning with the operational picture. The monthly report handles the strategic one." },
        { t: "Tracking infrastructure handled", b: "Most reporting fails because the tracking underneath is broken. Before we generate a single report, we audit tag manager, enhanced conversions, server-side tracking, cross-domain, and CRM sync. The reporting is only as good as the data beneath it." },
        { t: "The platform underneath, explained plainly", b: "Growth OS is our proprietary agent platform: specialized agents wired into the systems your team already uses, with a memory layer that retains every finding, meeting, and account interaction so the agents get smarter about your business every week. We did not add AI to an agency. We built the platform and run the agency on it. The reporting is where you see it working first." }
      ],
      whyAnim: ["merge", "scale", "agents", "dash", "cal", "attn", "net"],
      howTitle: "How the Reporting Engagement Runs",
      howIntro: "",
      steps: [
        { t: "Tracking audit", b: "Before we report on anything, we audit your tag manager, conversion tracking, enhanced conversions, server-side tracking, cross-domain setup, and CRM source attribution. We fix what is broken and document what needs a rebuild. Everything that follows depends on this." },
        { t: "Source system integration", b: "We connect Growth OS to your ad platforms, analytics, CRM, and email platform. The performance-reporter agent reads from every source in parallel rather than one report at a time." },
        { t: "Reporting framework design", b: "Senior strategists design the framework around your business model: which metrics matter, at what cadence, and which comparisons actually drive decisions. This becomes the monthly template." },
        { t: "Monthly production", b: "The performance-reporter agent generates the monthly report on a fixed cadence. Senior strategists review it, add the strategic synthesis, sharpen the recommendations, and deliver. The report ships within a few business days of month-end." },
        { t: "Daily intelligence briefs", b: "The briefer agent posts a daily brief to your team: pipeline movement, account activity, anomalies, and opportunities. The operational picture, every morning, without anyone asking for it." },
        { t: "Quarterly strategy refresh", b: "Every quarter the framework is reviewed against business needs. New metrics added where the strategy demands them, old ones retired where they no longer drive decisions. The system stays tied to what actually matters for your business." }
      ],
      whatTitle: "What You Get",
      what: [
        { t: "Tracking audit and fix plan", b: "A complete audit of your tracking infrastructure with a prioritized fix list. The foundation that determines whether the reporting is reliable." },
        { t: "Monthly board-ready reports", b: "Cross-channel reports generated by the agent, synthesized by senior strategists, in investor-grade format, delivered within days of month-end." },
        { t: "Daily intelligence briefs", b: "Daily briefs from the briefer agent: pipeline movement, account activity, anomalies, opportunities. The operational picture every morning." },
        { t: "One reconciled source of truth", b: "GA4, CRM, and ad platform data reconciled into one set of numbers, with the discrepancies identified and the double-counting removed." },
        { t: "Quarterly strategy refresh", b: "The reporting framework reviewed quarterly, with metrics added, removed, or refined based on what is actually driving decisions." }
      ],
      finalTitle: "One source of truth, board-ready every month",
      finalBody: "One source of truth for marketing performance, pulled live from your connected systems, synthesized by the senior team, board-ready every month. The reporting that decides whether your sponsor sees marketing as a revenue lever or a cost center. The diagnostic is where you see it in action for the first time."
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

  // Capability deck copy + imagery (matches Home 04 Capabilities cards).
  var CAPABILITIES = {
    "strategic-growth-diagnostic": {
      img: "capability-01.png",
      blurb: "Where every engagement starts. A paid, system-deep review that produces board-ready findings and a prioritized 90-day action plan. Not a free audit."
    },
    "fractional-cmo": {
      img: "capability-02.png",
      blurb: "Senior marketing leadership embedded in your team. Owns the growth number, attends leadership meetings, reports in financial metrics your board can act on."
    },
    "paid-media-demand-generation": {
      img: "capability-03.png",
      blurb: "Paid search, paid social, and programmatic managed against CAC and LTV targets, not click-through rates."
    },
    "seo-content": {
      img: "capability-04.png",
      blurb: "Organic visibility built for the long game. GEO-optimized content that surfaces in AI search alongside traditional rankings."
    },
    "website-conversion-optimization": {
      img: "capability-05.png",
      blurb: "A/B testing and UX analysis measured against pipeline and revenue, not just form fills."
    },
    "marketing-analytics-reporting": {
      img: "capability-06.png",
      blurb: "Full-funnel attribution, CAC/LTV tracking, and dashboards built for executive review, not marketing meetings."
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
  // ---- one-time CSS -------------------------------------------------------
  var STYLE_ID = "agn-svc-styles";
  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    var css = [
      "[data-svc-page]{--svc:" + A + ";background:#081226;color:#fff;font-family:'Poppins',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;-webkit-font-smoothing:antialiased;position:relative;width:100%;overflow-x:clip;}",
      ".svc-wrap{max-width:1160px;margin:0 auto;padding:0 40px;box-sizing:border-box;position:relative;z-index:1;}",
      "[data-reveal]{opacity:0;translate:0 28px;transition:opacity .7s cubic-bezier(.16,.84,.44,1),translate .7s cubic-bezier(.16,.84,.44,1);}",

      /* ---- HERO ---- */
      ".svc-hero-scroll{position:relative;z-index:0;height:100vh;height:100lvh;}",
      ".svc-hero-spacer{height:100vh;height:100lvh;pointer-events:none;}",
      ".svc-hero-scroll ~ *{position:relative;z-index:2;}",
      ".svc-hero{position:fixed;inset:0;width:100%;height:100%;min-height:100vh;min-height:100dvh;min-height:100lvh;overflow:hidden;display:flex;align-items:center;box-sizing:border-box;isolation:isolate;transform-origin:50% 42%;will-change:transform;}",
      ".svc-hero::after{content:'';position:absolute;inset:0;z-index:0;pointer-events:none;background:#04101f;opacity:var(--hero-veil,0);}",
      ".svc-hero-layer{position:relative;width:100%;padding:211px 0 120px;min-height:100vh;min-height:100svh;min-height:100dvh;display:flex;align-items:center;box-sizing:border-box;transform-origin:50% 50%;will-change:transform,filter,opacity;}",
      ".svc-hero-glow{position:absolute;inset:0;z-index:-2;pointer-events:none;background:radial-gradient(90% 80% at 12% -12%,color-mix(in srgb,var(--svc) 26%,transparent) 0%,transparent 58%),radial-gradient(70% 90% at 50% 0%,rgba(255,255,255,.045),transparent 62%),linear-gradient(180deg,rgba(8,18,38,.10) 0%,rgba(8,18,38,.22) 100%);}",
      ".svc-grainient{position:absolute;inset:0;z-index:-3;pointer-events:none;overflow:hidden;}",
      ".svc-grainient canvas{display:block;width:100%;height:100%;opacity:.92;mix-blend-mode:screen;}",
      ".svc-hero-grid{position:absolute;inset:0;z-index:-1;pointer-events:none;opacity:.5;background-image:linear-gradient(rgba(255,255,255,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.045) 1px,transparent 1px);background-size:64px 64px;mask-image:radial-gradient(90% 70% at 50% 20%,#000,transparent 78%);-webkit-mask-image:radial-gradient(90% 70% at 50% 20%,#000,transparent 78%);}",
      ".svc-hero-copy{max-width:1138px;margin:0 auto;text-align:center;}",
      ".svc-title{margin:0;font-size:clamp(44px,5.1vw,72px);font-weight:700;line-height:1.19;letter-spacing:-.02em;color:#fff;}",
      ".svc-lead{margin:12px auto 0;font-size:16px;line-height:1.375;color:#C0C7CC;max-width:1138px;}",
      ".svc-hero-cta{display:flex;justify-content:center;gap:14px;margin-top:32px;}",
      ".svc-hero-cta .agn-btn{min-width:285px;justify-content:center;box-shadow:0 12px 34px -10px color-mix(in srgb,var(--svc) 52%,transparent);}",
      ".svc-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:30px;}",
      ".svc-stat{border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:33px 21px;background:rgba(255,255,255,.03);text-align:center;min-height:127px;display:flex;flex-direction:column;align-items:center;justify-content:center;box-sizing:border-box;}",
      ".svc-stat b{display:block;font-size:32px;font-weight:700;line-height:1.125;color:#fff;letter-spacing:-.01em;}",
      ".svc-stat span{display:block;margin-top:4px;font-size:14px;line-height:1.5;color:#8FA0B5;max-width:100%;}",

      /* ---- generic section head ---- */
      ".svc-sec{position:relative;padding:96px 0;}",
      ".svc-sec + .svc-sec{padding-top:0;}",
      ".svc-sechead{max-width:760px;}",
      ".svc-kicker{display:inline-flex;align-items:center;gap:10px;font-size:13px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--svc);}",
      ".svc-kicker::before{content:'';width:26px;height:1px;background:var(--svc);opacity:.7;}",
      ".svc-h2{margin:16px 0 0;font-size:clamp(28px,3.6vw,44px);font-weight:700;line-height:1.1;letter-spacing:-.02em;color:#fff;}",
      ".svc-sub{margin:16px 0 0;font-size:16px;line-height:1.6;color:#AEB9CC;}",

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
      ".svc-how{position:relative;padding:130px 0;background:radial-gradient(120% 110% at 72% 42%,color-mix(in srgb,var(--svc) 18%,#12315e) 0%,#0B1B38 54%,#081226 100%);overflow:hidden;}",
      ".svc-how::before{content:'';position:absolute;inset:0;pointer-events:none;background:radial-gradient(65% 55% at 74% 36%,color-mix(in srgb,var(--svc) 18%,transparent),transparent 70%);opacity:.9;}",
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
      ".svc-what-edge--left{left:0;background:linear-gradient(90deg,rgba(8,18,38,.82),rgba(8,18,38,0));-webkit-mask-image:linear-gradient(90deg,#000 0%,transparent 100%);mask-image:linear-gradient(90deg,#000 0%,transparent 100%);}",
      ".svc-what-edge--right{right:0;background:linear-gradient(270deg,rgba(8,18,38,.82),rgba(8,18,38,0));-webkit-mask-image:linear-gradient(270deg,#000 0%,transparent 100%);mask-image:linear-gradient(270deg,#000 0%,transparent 100%);}",
      "@media(prefers-reduced-motion:reduce){.svc-what-track{transform:none !important;}}",

      /* ---- Explore other services (capability cards) ---- */
      ".svc-explore{padding:64px 0;overflow:visible;}",
      ".svc-explore-head{margin:0 0 24px;padding:0 40px;text-align:center;font-size:13.7px;font-weight:600;letter-spacing:.17em;text-transform:uppercase;color:#8FA0B5;box-sizing:border-box;}",
      ".svc-explore-marquee{position:relative;overflow:visible;padding:16px 0;}",
      ".svc-explore-viewport{width:100%;overflow-x:hidden;overflow-y:visible;cursor:grab;padding:0 clamp(24px,4vw,64px);box-sizing:border-box;}",
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
      ".svc-explore-badge{position:relative;z-index:2;display:inline-flex;align-items:center;justify-content:center;padding:5px 14px;border-radius:99px;background:rgba(0,0,0,.1);border:1px solid rgba(255,255,255,.1);backdrop-filter:blur(28px);-webkit-backdrop-filter:blur(28px);font-size:11px;color:#FAFAFB;font-weight:400;width:fit-content;}",
      ".svc-explore-text{position:relative;z-index:2;display:flex;flex-direction:column;gap:7px;}",
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
        ".svc-hero-layer{padding:136px 0 56px;min-height:100vh;min-height:100svh;min-height:100dvh;transform:none !important;filter:none !important;opacity:1 !important;}",
        ".svc-title{font-size:42px;line-height:1.12;}",
        ".svc-lead{max-width:100%;font-size:15px;line-height:1.6;}",
        ".svc-hero-cta{margin-top:24px;}",
        ".svc-hero-cta .agn-btn{min-width:0;width:100%;}",
        ".svc-stats{grid-template-columns:1fr;gap:12px;margin-top:22px;}",
        ".svc-stat{min-height:0;padding:24px 18px;}",
        ".svc-stat b{font-size:28px;}",
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
        ".svc-explore-badge{padding:4px 12px;font-size:10px;}",
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
      "}"
    ].join("");
    var s = document.createElement("style");
    s.id = STYLE_ID;
    s.textContent = css;
    (document.head || document.documentElement).appendChild(s);
  }

  // ---- HTML builders ------------------------------------------------------
  function heroHTML(d) {
    var stats = d.stats.map(function (s) {
      return '<div class="svc-stat"><b>' + esc(s.k) + '</b><span>' + esc(s.v) + '</span></div>';
    }).join("");
    return '' +
      '<div class="svc-hero-scroll" data-hero-scroll>' +
        '<div class="svc-hero-spacer" data-hero-spacer aria-hidden="true"></div>' +
        '<header class="svc-hero" data-hero-pin>' +
          '<div class="svc-hero-layer" data-hero-layer>' +
            '<div class="svc-grainient" aria-hidden="true" data-grainient data-colors="' + esc((d.grain || []).join("|")) + '"><canvas></canvas></div>' +
            '<div class="svc-hero-glow" aria-hidden="true"></div>' +
            '<div class="svc-hero-grid" aria-hidden="true"></div>' +
            '<div class="svc-wrap">' +
              '<div class="svc-hero-copy" data-reveal>' +
                '<h1 class="svc-title">' + esc(d.title) + '</h1>' +
                '<p class="svc-lead">' + esc(d.lead) + '</p>' +
                '<div class="svc-hero-cta">' +
                  '<a class="agn-btn" href="#cta" data-magnetic="true">' + esc(d.cta) + '</a>' +
                '</div>' +
                '<div class="svc-stats">' + stats + '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</header>' +
      '</div>';
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

  function howHTML(d) {
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
                  '<stop offset="0" stop-color="' + esc(d.accent) + '" stop-opacity="0"></stop>' +
                  '<stop offset="0.55" stop-color="' + esc(d.accent) + '" stop-opacity="0.45"></stop>' +
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
      '<span class="svc-explore-badge">' + esc(s.num) + '/06</span>' +
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
        '<a class="agn-btn" href="#cta" data-magnetic="true">' + esc(d.cta) + '</a>' +
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

  function setupHeroCover(root, store) {
    var wrap = root.querySelector("[data-hero-scroll]");
    var pin = root.querySelector("[data-hero-pin]");
    var layer = root.querySelector("[data-hero-layer]");
    if (!wrap || !pin || !layer) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion:reduce)").matches) return;

    var clamp = function (v, lo, hi) { return Math.min(hi, Math.max(lo, v)); };
    var easeOutCubic = function (t) { return 1 - Math.pow(1 - t, 3); };
    var lastKey = "";

    var apply = function () {
      if (window.matchMedia && window.matchMedia("(max-width:640px)").matches) {
        pin.style.display = "";
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
      var p = easeOutCubic(raw);
      var key = raw.toFixed(4);
      if (key === lastKey) return raw;
      lastKey = key;

      var scale = 1 + p * 0.22;
      var y = p * 28;
      var veil = p * 0.55;
      var blur = p < 0.01 ? 0 : p * 16;

      pin.style.transform = "none";
      pin.style.filter = "none";
      pin.style.opacity = "1";
      pin.style.setProperty("--hero-veil", veil.toFixed(3));
      pin.style.display = raw >= 0.999 ? "none" : "";
      pin.style.visibility = "";
      pin.style.pointerEvents = raw > 0.2 ? "none" : "";
      layer.style.transform = "translate3d(0," + y.toFixed(2) + "px,0) scale(" + scale.toFixed(4) + ")";
      layer.style.filter = blur < 0.05 ? "none" : "blur(" + blur.toFixed(2) + "px)";
      layer.style.opacity = Math.max(0, 1 - p * 0.35).toFixed(3);
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
      pin.style.pointerEvents = "";
      pin.style.setProperty("--hero-veil", "0");
      layer.style.transform = "";
      layer.style.filter = "";
      layer.style.opacity = "";
    };
  }

  // React Bits "Tilted Card" — compact vanilla spring port.
  function setupTilt(root, store) {
    var fine = window.matchMedia && window.matchMedia("(pointer:fine)").matches;
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    if (!fine || reduce) return;
    var nodes = Array.prototype.slice.call(root.querySelectorAll("[data-tilt]"));
    var AMP = 10, SCALE = 1.03;
    nodes.forEach(function (node) {
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
      var onMove = function (e) {
        var r = node.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        target.ry = px * AMP * 2;
        target.rx = -py * AMP * 2;
        kick();
      };
      var onEnter = function () { node.classList.add("is-tilting"); target.s = SCALE; kick(); };
      var onLeave = function () { node.classList.remove("is-tilting"); target.rx = 0; target.ry = 0; target.s = 1; kick(); };
      node.addEventListener("mousemove", onMove);
      node.addEventListener("mouseenter", onEnter);
      node.addEventListener("mouseleave", onLeave);
      store.tiltCleanups.push(function () {
        node.removeEventListener("mousemove", onMove);
        node.removeEventListener("mouseenter", onEnter);
        node.removeEventListener("mouseleave", onLeave);
        if (raf) cancelAnimationFrame(raf);
        node.style.transform = "";
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
      var delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (!delta) return;
      e.preventDefault();
      offset += delta;
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
      heroHTML(d) + whyHTML(d) + howHTML(d) + whatHTML(d) + switchHTML(slug) + finalHTML(d);

    var store = { revealRaf: null, tlRaf: null, heroCoverRaf: null, tiltCleanups: [], grainientCleanups: [], timelineCleanup: null, heroCoverCleanup: null, whatCleanup: null, exploreCleanup: null };
    setupHeroCover(mount, store);
    setupGrainient(mount, store);
    setupReveal(mount, store);
    setupTilt(mount, store);
    setupTimeline(mount, store);
    setupWhatMarquee(mount, store);
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
    if (store.exploreCleanup) store.exploreCleanup();
    if (store.heroCoverCleanup) store.heroCoverCleanup();
    if (store.grainientCleanups) store.grainientCleanups.forEach(function (fn) { try { fn(); } catch (e) {} });
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
