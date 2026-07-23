/*
  Azarian Growth Agency — shared Footer (single source of truth).

  Usage on any page:
    <footer class="ft" data-agn-footer data-cursor-theme="dark"></footer>
    <script src="./footer.js" defer></script>
*/
(function () {
  "use strict";
  if (window.AzarianFooter) return;

  var STYLE_ID = "agn-footer-styles";

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    var css = [
      ".ft{background:radial-gradient(120% 130% at 50% 0%,#12315e 0%,#0B1B38 55%,#081226 100%);color:#AEB9CC;padding:clamp(56px,6vw,72px) 40px 40px;}",
      ".ft-inner{max-width:1160px;margin:0 auto;}",
      ".ft-cols{display:grid;grid-template-columns:repeat(5,1fr);gap:32px;}",
      ".ft-col h4{margin:0 0 20px;font-family:'Poppins',system-ui,sans-serif;font-weight:700;font-size:18px;color:#fff;}",
      ".ft-col ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:14px;}",
      ".ft-col a{font-family:'Poppins',system-ui,sans-serif;font-size:15px;color:#AEB9CC;text-decoration:none;transition:color .25s ease;}",
      ".ft-col a:hover{color:#1BFED1;}",
      ".ft-div{height:1px;background:rgba(255,255,255,.1);margin:clamp(36px,4vw,48px) 0 28px;}",
      ".ft-bottom{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:22px;}",
      ".ft-brand{display:flex;flex-direction:column;gap:4px;}",
      ".ft-brand-row{display:flex;align-items:center;gap:12px;}",
      ".ft-brand-row img{height:38px;width:auto;display:block;}",
      ".ft-brand-name{font-family:'Poppins',system-ui,sans-serif;font-weight:700;font-size:20px;color:#fff;}",
      ".ft-brand-name em{font-style:normal;color:#1BFED1;}",
      ".ft-brand-tag{font-family:'Poppins',system-ui,sans-serif;font-size:13px;color:#5A6678;letter-spacing:.02em;padding-left:50px;}",
      ".ft-meta{display:flex;align-items:center;gap:20px;flex-wrap:wrap;justify-content:flex-end;}",
      ".ft-copy{font-size:14px;color:#8894A5;}",
      ".ft-socials{display:flex;gap:10px;}",
      ".ft-socials a{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;color:#AEB9CC;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);transition:color .25s ease,border-color .25s ease;}",
      ".ft-socials a:hover{color:#1BFED1;border-color:rgba(27,254,209,.5);}",
      ".ft-legal{display:flex;gap:16px;font-size:14px;align-items:center;}",
      ".ft-legal a{color:#AEB9CC;text-decoration:none;}",
      ".ft-legal a:hover{color:#1BFED1;}",
      ".ft-legal-sep{width:1px;height:16px;background:#3a4658;flex:none;}",
      ".ft-logo-m{display:none;}",
      ".ft-social-m{display:none;}",
      ".ft-social-d{display:block;}",
      ".ft-meta-foot{display:flex;align-items:center;gap:20px;flex-wrap:wrap;}",
      "@media(max-width:960px){",
        ".ft{padding:24px 16px;color:#fff;}",
        ".ft-inner{max-width:none;}",
        ".ft-cols{grid-template-columns:1fr;gap:32px;}",
        ".ft-col h4{margin:0 0 16px;font-size:20px;line-height:24px;font-weight:700;color:#eff6fe;}",
        ".ft-col ul{gap:14px;}",
        ".ft-col a{font-size:14px;font-weight:500;color:#fff;}",
        ".ft-div{height:1px;background:#1b3f61;margin:64px 0 0;}",
        ".ft-bottom{flex-direction:column;align-items:flex-start;justify-content:flex-start;gap:10px;margin-top:0;padding-top:24px;width:100%;}",
        ".ft-brand{display:none;}",
        ".ft-logo-m{display:block;width:337px;max-width:100%;height:58px;object-fit:contain;object-position:left center;}",
        ".ft-meta{flex-direction:column;align-items:flex-start;justify-content:flex-start;gap:18px;width:100%;}",
        ".ft-copy{font-size:14px;line-height:20px;color:#fff;max-width:100%;}",
        ".ft-meta-foot{flex-direction:column;align-items:flex-start;gap:10px;width:100%;}",
        ".ft-socials{gap:14px;}",
        ".ft-socials a{width:24px;height:24px;border:none;background:transparent;color:#fff;padding:0;display:grid;place-items:center;overflow:hidden;}",
        ".ft-social-d{display:none;}",
        ".ft-social-m{display:block;width:24px;height:24px;}",
        ".ft-legal{gap:12px;align-items:center;font-size:14px;}",
        ".ft-legal a{font-family:'Poppins',system-ui,sans-serif;font-weight:500;color:#fff;}",
        ".ft-legal-sep{width:1px;height:21px;background:#1b3f61;}",
      "}",
    ].join("");
    var style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = css;
    (document.head || document.documentElement).appendChild(style);
  }

  function col(title, links) {
    var items = links.map(function (t) {
      return "<li><a href=\"#\">" + t + "</a></li>";
    }).join("");
    return "<div class=\"ft-col\"><h4>" + title + "</h4><ul>" + items + "</ul></div>";
  }

  function mount(el) {
    if (!el || el.getAttribute("data-agn-footer-ready")) return;
    injectStyles();
    el.classList.add("ft");
    if (!el.getAttribute("data-cursor-theme")) el.setAttribute("data-cursor-theme", "dark");
    el.innerHTML =
      '<div class="ft-inner">' +
        '<div class="ft-cols">' +
          col("Digital Advertising", [
            "Diagnostic Services","Paid Search Marketing","Google Ads Agency","Facebook Ads Agency",
            "Amazon Ads Agency","Social Media Marketing","Search Engine Marketing","Yelp Marketing Agency",
          ]) +
          col("Website Optimization", [
            "Social Media Marketing","E-commerce Solutions","Graphic Design Services","Mobile App Development",
            "Content Management Systems","Digital Marketing Analytics","User Interface Design","Email Marketing Solutions",
          ]) +
          col("Growth &amp; Strategy", [
            "Content Creation","Payment Gateway Integration","Logo Design","Cross-Platform Solutions",
            "WordPress Development","Web Analytics Setup","Wireframing and Prototyping","Campaign Management",
          ]) +
          col("Industries", [
            "Brand Strategy","Inventory Management","Brand Identity","User Experience Design",
            "Custom CMS Solutions","Performance Measurement","Usability Testing","Subscriber Segmentation",
          ]) +
          col("Who We Are", [
            "Influencer Collaborations","Customer Support Systems","Marketing Materials","App Store Optimization",
            "Theme and Plugin Development","Reporting Dashboards","Interaction Design","Analytics and Reporting",
          ]) +
        "</div>" +
        '<div class="ft-div"></div>' +
        '<div class="ft-bottom">' +
          '<img class="ft-logo-m" src="assets/footer/logo-horizontal-on-dark.svg" alt="Azarian Growth Agency" width="337" height="58" draggable="false">' +
          '<div class="ft-brand">' +
            '<div class="ft-brand-row">' +
              '<img src="assets/logo.svg" alt="Azarian Growth Agency" draggable="false">' +
              '<span class="ft-brand-name">Azarian<em>Growth</em>Agency</span>' +
            "</div>" +
            '<span class="ft-brand-tag">data-driven | full-funnel</span>' +
          "</div>" +
          '<div class="ft-meta">' +
            '<span class="ft-copy">© Copyright © 2026. Azarian Growth Agency. All rights reserved.</span>' +
            '<div class="ft-meta-foot">' +
              '<div class="ft-socials">' +
                '<a href="#" aria-label="Instagram"><img class="ft-social-m" src="assets/footer/social-ig.svg" alt="" width="24" height="24" draggable="false"><svg class="ft-social-d" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none"></circle></svg></a>' +
                '<a href="#" aria-label="Facebook"><img class="ft-social-m" src="assets/footer/social-fb.svg" alt="" width="24" height="24" draggable="false"><svg class="ft-social-d" width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V6h-3c-2 0-3.5 1.5-3.5 3.5V11H8v3h2.5v7h3v-7H16l.5-3h-3V9.8c0-.5.3-.8.8-.8z"></path></svg></a>' +
                '<a href="#" aria-label="YouTube"><img class="ft-social-m" src="assets/footer/social-yt.svg" alt="" width="24" height="24" draggable="false"><svg class="ft-social-d" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="2.5" y="6" width="19" height="12" rx="3.5"></rect><path d="M10.5 9.2l4.2 2.8-4.2 2.8z" fill="currentColor" stroke="none"></path></svg></a>' +
                '<a href="#" aria-label="LinkedIn"><img class="ft-social-m" src="assets/footer/social-li.svg" alt="" width="24" height="24" draggable="false"><svg class="ft-social-d" width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M6.5 8.5V18H4V8.5zM5.25 4.5A1.5 1.5 0 1 1 5.24 7.5a1.5 1.5 0 0 1 .01-3zM9 8.5h2.4v1.3c.4-.7 1.4-1.5 2.8-1.5 2.3 0 3.3 1.4 3.3 3.9V18h-2.5v-4.9c0-1.3-.5-2-1.5-2s-1.6.7-1.6 2V18H9z"></path></svg></a>' +
                '<a href="#" aria-label="X"><img class="ft-social-m" src="assets/footer/social-x.svg" alt="" width="24" height="24" draggable="false"><svg class="ft-social-d" width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 3h3l-6.6 7.6L21.7 21h-5.9l-4.2-5.5L6.6 21H3.5l7-8.1L2.6 3h6l3.8 5z"></path></svg></a>' +
              "</div>" +
              '<div class="ft-legal"><a href="#">Privacy Policy</a><span class="ft-legal-sep" aria-hidden="true"></span><a href="#">Security Policy</a></div>' +
            "</div>" +
          "</div>" +
        "</div>" +
      "</div>";
    el.setAttribute("data-agn-footer-ready", "1");
  }

  function autoMount() {
    var nodes = document.querySelectorAll("[data-agn-footer]");
    for (var i = 0; i < nodes.length; i++) mount(nodes[i]);
  }

  var mo = new MutationObserver(function () { autoMount(); });
  function boot() {
    autoMount();
    mo.observe(document.documentElement, { childList: true, subtree: true });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

  window.AzarianFooter = { mount: mount, autoMount: autoMount };
})();
