import { useEffect } from "react";
import "./styles.css";
import { mountLegacyActivityFinder } from "./legacy";

const legacyMarkup = `<div id="intro" role="status" aria-label="Loading UAE Authority Activity Finder">
  <div class="intro-panel">
    <div class="intro-frame intro-brand-frame">
      <img class="intro-logo" src="assets/images/logo-transparent.svg" alt="Innovation Gurus">
      <div class="intro-title">UAE Authority Activity Finder</div>
    </div>
    <div class="intro-frame intro-icons-frame">
      <div class="activity-loader" aria-hidden="true">
        <span class="activity-icon"><svg viewBox="0 0 24 24"><path d="M6 7h12l-1 13H7L6 7Z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg></span>
        <span class="activity-icon"><svg viewBox="0 0 24 24"><path d="M4 19V5"/><path d="M4 19h16"/><path d="M8 16v-5"/><path d="M12 16V8"/><path d="M16 16v-3"/></svg></span>
        <span class="activity-icon"><svg viewBox="0 0 24 24"><rect x="5" y="5" width="14" height="14" rx="2"/><path d="M9 1v4"/><path d="M15 1v4"/><path d="M9 19v4"/><path d="M15 19v4"/><path d="M1 9h4"/><path d="M1 15h4"/><path d="M19 9h4"/><path d="M19 15h4"/></svg></span>
        <span class="activity-icon"><svg viewBox="0 0 24 24"><path d="M8 3v18"/><path d="M16 3v18"/><path d="M4 8h16"/><path d="M4 16h16"/></svg></span>
        <span class="activity-icon"><svg viewBox="0 0 24 24"><path d="M3 21V9l6 4V9l6 4V5h6v16H3Z"/><path d="M7 21v-3"/><path d="M12 21v-3"/><path d="M17 21v-3"/></svg></span>
      </div>
      <div class="activity-loading-text">Loading activities</div>
    </div>
    <div class="intro-frame intro-slogan-frame">
      <div class="intro-slogan">Find the right business activity</div>
    </div>
    <div class="intro-progress" aria-hidden="true"><span></span></div>
  </div>
</div>
<div id="landing">
  <section class="landing-card" aria-label="Business activity search">
    <div class="landing-kicker">UAE Authority Activity Finder</div>
    <h1 class="landing-title">Find the right business activity</h1>
    <div class="landing-search">
      <input id="landingSearch" type="search" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="Search Name, Description , Code" aria-label="Search Name, Description , Code">
      <button id="landingBtn" type="button">Search</button>
    </div>
    
    <div class="quick-activities" aria-label="Major activity searches">
      <div class="quick-row quick-row-4">
        <button class="quick-chip" type="button" data-search="trading">Trading</button>
        <button class="quick-chip" type="button" data-search="consulting">Consulting</button>
        <button class="quick-chip" type="button" data-search="technology">Technology</button>
        <button class="quick-chip" type="button" data-search="restaurant">Restaurant</button>
      </div>
      <div class="quick-row quick-row-5">
        <button class="quick-chip" type="button" data-search="manufacturing">Manufacturing</button>
        <button class="quick-chip" type="button" data-search="construction">Construction</button>
        <button class="quick-chip" type="button" data-search="real estate">Real Estate</button>
        <button class="quick-chip" type="button" data-search="logistics">Logistics</button>
        <button class="quick-chip" type="button" data-search="tourism">Tourism</button>
      </div>
      <div class="quick-row quick-row-3">
        <button class="quick-chip" type="button" data-search="education">Education</button>
        <button class="quick-chip" type="button" data-search="healthcare">Healthcare</button>
        <button class="quick-chip" type="button" data-search="media">Media</button>
      </div>
    </div>
    <div class="landing-tools">
      <span>100 sample activities</span>
      <span>&bull;</span>
      <span>19 authority zones</span>
      <span>&bull;</span>
      <button id="browseAll" type="button">Browse all activities</button>
    </div>
  </section>
</div>
<div id="app">
<header>
  <div class="header-top">
    <div class="brand-mark">
      <img class="brand-logo" src="assets/images/logo-transparent.svg" alt="Iraa Global">
      <div class="brand-copy">
        <div class="brand-name">Activity Finder</div>
        <div class="brand-desc">UAE Authority Activity Finder</div>
      </div>
    </div>
    <div class="nav-actions">
      <button class="btn" id="savedBookmarksBtn" type="button">♥ Saved <span class="saved-count" id="savedCount">0</span></button>
      <button class="btn" id="homeBtn">Home</button>
    </div>
  </div>
  <div class="header-title">
    <h1>Activity Finder</h1>
    <div class="header-search-wrap">
      <input id="topSearch" class="top-search" type="search" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="Search Name, Description , Code" aria-label="Search Name, Description , Code">
    </div>
    <div class="sub">100 sample activities &middot; 19 authorities &middot; generated 2026-04-28</div>
  </div>
  <div class="actions"><button class="btn hamburger-btn" id="filterToggle" type="button" aria-label="Open filters" aria-controls="filterPanel" aria-expanded="false"><span></span><span></span><span></span></button></div>
</header>
<div class="layout">
  <aside id="filterPanel" aria-label="Filters">
    <div class="filter-mobile-head"><strong>Filters</strong><button class="btn" id="filterClose" type="button" aria-label="Close filters">Close</button></div>
    <div class="control"><button class="btn green" id="clearBtn" type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4l16 16"/><path d="M20 4L4 20"/></svg><span>Clear Filters</span></button></div>
    <div class="control"><label for="authority">Authority Zone</label><select id="authority"></select></div>
    <div class="control"><label for="license">License Type</label><select id="license"></select></div>
    <div class="control"><label for="type">Activity Type</label><select id="type"></select></div>
    <div class="control"><label for="category">Category</label><select id="category"></select></div>
    <div class="control"><label for="regulation">Regulation</label><select id="regulation"></select></div>
    <div class="control"><label for="review">Review Status</label><select id="review"></select></div>
    <div class="control"><label>Authority Zones</label><div class="zones" id="zones"></div></div>
  </aside>
  <main>
    <section class="stats">
      <div class="stat"><span>Visible Results</span><strong id="visibleCount">0</strong></div>
      <div class="stat"><span>Authority Zones</span><strong id="zoneCount">0</strong></div>
      <div class="stat"><span>Regulated / Approval</span><strong id="regulatedCount">0</strong></div>
      <div class="stat"><span>Review Flags</span><strong id="reviewCount">0</strong></div>
    </section>
    <section class="panel">
      <div class="panel-head"><h2>Activities</h2><span class="pill" id="rangeText"></span></div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>♥</th><th data-sort="authority">Authority</th><th data-sort="code">Code</th><th data-sort="name">Activity Name</th><th data-sort="license">License Type</th><th data-sort="type">Activity Type</th><th data-sort="regulation">Regulation</th><th data-sort="review">Review</th><th>Description</th></tr></thead>
          <tbody id="rows"></tbody>
        </table>
        <div class="empty" id="empty" hidden>No matching activities.</div>
      </div>
      <div class="pager"><div id="pageText"></div><div class="pager-controls"><select id="pageSize"><option>25</option><option selected>50</option><option>100</option><option>200</option></select><button class="btn" id="prev">Previous</button><button class="btn" id="next">Next</button></div></div>
    </section>
  </main>
</div>
<div id="filterOverlay" class="filter-overlay" aria-hidden="true"></div>
<aside class="drawer" id="drawer" aria-hidden="true"><div class="drawer-head"><div><h3 id="detailTitle"></h3><span class="pill" id="detailSub"></span></div><button class="btn" id="close">Close</button></div><div class="drawer-body"><div class="detail-actions" id="detailActions"></div><dl id="detail"></dl></div></aside>
<section id="savedPage" class="bookmark-page" aria-label="Saved bookmark page">
  <div class="bookmark-window">
    <div class="bookmark-window-head">
      <div>
        <h2>♥ Saved Bookmarks</h2>
        <div class="sub"><span id="bookmarkSub">0 saved</span> &middot; Export, print PDF, or share by WhatsApp.</div>
      </div>
      <div class="bookmark-actions">
        <button class="btn primary" id="bookmarkExcel" type="button">Export Excel</button>
        <button class="btn" id="bookmarkPdf" type="button">Export PDF</button>
        <button class="btn" id="bookmarkWhatsApp" type="button">Share WhatsApp</button>
        <button class="btn" id="bookmarkClear" type="button">Clear Bookmarks</button>
        <button class="btn" id="bookmarkClose" type="button">Back</button>
      </div>
    </div>
    <div class="bookmark-window-body"><div class="bookmark-panel-list" id="bookmarkList"></div></div>
  </div>
</section>
</div>
<section id="versionPage" class="version-page" aria-label="Version log page">
  <div class="version-card">
    <div class="version-card-head">
      <div>
        <h2>Version Log</h2>
        <div class="sub">Current version: v1.6.3 &middot; Updated 2026-04-29</div>
      </div>
      <button class="btn" id="versionBackBtn" type="button">Back</button>
    </div>
    <div class="version-card-body">
      <article class="version-item">
        <h3>v1.6.3 - About Page and Activity Rows</h3>
        <ul>
          <li>Updated landing activity shortcuts into three rows: 4 activities, 5 activities, and 3 activities.</li>
          <li>Added a footer-linked About page explaining the system, purpose, features, value, use cases, and technical classification.</li>
        </ul>
      </article>
      <article class="version-item">
        <h3>v1.6.1 - Bookmark Page Fix</h3>
        <ul>
          <li>Fixed saved bookmark page display issue by keeping the app container visible while showing the full bookmark window.</li>
          <li>Added heart bookmark button for each activity.</li>
          <li>Removed bookmark tag requirement; bookmarks now save instantly.</li>
          <li>Saved bookmarks now open in a full-page bookmark window with formatted table view.</li>
          <li>Added Excel export, PDF print export, and WhatsApp sharing for saved bookmarks.</li>
        </ul>
      </article>
      <article class="version-item">
        <h3>v1.4.0 - Mobile Filter Drawer</h3>
        <ul>
          <li>Added hamburger icon to open filters on mobile screens.</li>
          <li>Filters are hidden by default on mobile and open as a slide-in panel.</li>
          <li>Added tap-outside overlay and left-swipe gesture to close the filter panel.</li>
        </ul>
      </article>
      <article class="version-item">
        <h3>v1.3.0 - Footer Legal Pages</h3>
        <ul>
          <li>Renamed the file and app title to Activity Finder.</li>
          <li>Moved the version link to the right side of the footer with Privacy, Terms & Conditions, and Legal links.</li>
          <li>Added complete in-page Privacy Policy, Terms & Conditions, and Legal Notice pages.</li>
        </ul>
      </article>
      <article class="version-item">
        <h3>v1.2.0 - Centered Search Layout</h3>
        <ul>
          <li>Removed the Code / Name / Description label row above the dashboard search.</li>
          <li>Centered the dashboard search area on the results page.</li>
          <li>Removed the duplicate sidebar search field so search is handled only from the centered top search.</li>
        </ul>
      </article>
      <article class="version-item">
        <h3>v1.1.0 - Search and Footer Version Log</h3>
        <ul>
          <li>Disabled search autocomplete behavior and removed live suggestion dropdowns.</li>
          <li>Updated search text to: Search Name, Description , Code.</li>
          <li>Added this footer-linked version log page with update details.</li>
        </ul>
      </article>
    </div>
  </div>
</section>

<section id="aboutPage" class="version-page" aria-label="About system page">
  <div class="version-card">
    <div class="version-card-head"><div><h2>About Activity Finder</h2><div class="sub">UAE Business Activity Intelligence &amp; Search System</div></div><button class="btn policy-back" type="button">Back</button></div>
    <div class="version-card-body">
      <article class="version-item"><h3>🧠 What this system is</h3><p>This is a web-based UAE Business Activity Intelligence &amp; Search System.</p><p>More specifically, it is a client-facing decision support tool that helps users identify, filter, and validate the correct business activities across UAE authorities.</p><p>It is not just a search tool — it is a structured activity discovery engine built on aggregated authority datasets.</p></article>
      <article class="version-item"><h3>⚙️ Core Purpose</h3><ul><li>Help consultants and sales teams quickly find the correct activity.</li><li>Reduce manual authority checking.</li><li>Improve accuracy in license recommendations.</li><li>Provide preliminary compliance visibility for regulation, approvals, and related checks.</li></ul></article>
      <article class="version-item"><h3>🚀 Key Features</h3><ul><li><strong>Smart Search Engine:</strong> Search by activity name, description, or code using a pre-indexed client-side dataset with multi-keyword matching.</li><li><strong>Advanced Filtering System:</strong> Filter by authority zone, license type, activity type, category, regulation, and review status.</li><li><strong>Authority Zone Selector:</strong> Quickly select zones such as RAKEZ, DMCC, IFZA, and others with activity counts per zone.</li><li><strong>Live Analytics Dashboard:</strong> View visible results, authority coverage, regulated activities, and review flags.</li><li><strong>Activity Data Table:</strong> Review authority, code, activity name, license type, regulation status, review flag, and description.</li><li><strong>Bookmarking System:</strong> Save activities and export shortlists to Excel, PDF, or WhatsApp.</li><li><strong>Detailed Activity Drawer:</strong> Open structured details such as approvals, NOCs, documents, capital, restrictions, and source reference.</li><li><strong>Export System:</strong> Convert filtered results and bookmarks into operational deliverables.</li><li><strong>Mobile-Optimized Filter Panel:</strong> Use hamburger filters, slide-in panel behavior, and touch gestures.</li><li><strong>Fully Client-Side Architecture:</strong> No API required; data is embedded in the HTML DATA array and can run offline.</li></ul></article>
      <article class="version-item"><h3>🧩 Advanced Value</h3><ul><li><strong>Decision Support System:</strong> Helps decide which activity to use, which authority fits, and what approvals may be needed.</li><li><strong>Pre-Validation Layer:</strong> Fields such as review, regulation, and approval required provide early compliance signals.</li><li><strong>Multi-Authority Aggregation:</strong> Combines free zones, mainland, and specialized zones in one searchable interface.</li></ul></article>
      <article class="version-item"><h3>💼 Real Use Cases</h3><ul><li><strong>Business Setup Consultant:</strong> Find correct activities faster and reduce rejection risk from wrong codes.</li><li><strong>Sales Team:</strong> Show client options live and export shortlists instantly.</li><li><strong>Internal Knowledge Tool:</strong> Replace scattered Excel sheets and standardize recommendations.</li><li><strong>Client Self-Service Tool:</strong> Let clients explore options before consulting.</li></ul></article>
      <article class="version-item"><h3>🏗️ System Type</h3><p>You can describe Activity Finder as a frontend web application, static data dashboard, search and filtering engine, decision support tool, micro BI tool, and knowledge system.</p></article>
    </div>
  </div>
</section>
<section id="privacyPage" class="version-page" aria-label="Privacy policy page">
  <div class="version-card">
    <div class="version-card-head"><div><h2>Privacy Policy</h2><div class="sub">Activity Finder &middot; Effective 2026-04-28</div></div><button class="btn policy-back" type="button">Back</button></div>
    <div class="version-card-body">
      <article class="version-item">
        <h3>v1.6.3 - About Page and Activity Rows</h3>
        <ul>
          <li>Updated landing activity shortcuts into three rows: 4 activities, 5 activities, and 3 activities.</li>
          <li>Added a footer-linked About page explaining the system, purpose, features, value, use cases, and technical classification.</li>
        </ul>
      </article>
      <article class="version-item"><h3>Information Used</h3><p>Activity Finder uses the activity records included inside this HTML file to help users search business activities by name, description, code, authority, license type, category, regulation, and review status.</p></article>
      <article class="version-item"><h3>Search Privacy</h3><p>Search text is processed locally in the browser against the embedded activity dataset. This version does not send search keywords to an external server.</p></article>
      <article class="version-item"><h3>Exports</h3><p>When users export CSV, the file is generated locally from the currently filtered results. Users are responsible for checking exported information before operational or legal use.</p></article>
      <article class="version-item"><h3>Data Accuracy</h3><p>The dashboard may include sample, extracted, or review-flagged records. Activity details should be verified with the relevant authority before license submission or client advice.</p></article>
    </div>
  </div>
</section>
<section id="termsPage" class="version-page" aria-label="Terms and conditions page">
  <div class="version-card">
    <div class="version-card-head"><div><h2>Terms &amp; Conditions</h2><div class="sub">Activity Finder &middot; Effective 2026-04-28</div></div><button class="btn policy-back" type="button">Back</button></div>
    <div class="version-card-body">
      <article class="version-item">
        <h3>v1.6.3 - About Page and Activity Rows</h3>
        <ul>
          <li>Updated landing activity shortcuts into three rows: 4 activities, 5 activities, and 3 activities.</li>
          <li>Added a footer-linked About page explaining the system, purpose, features, value, use cases, and technical classification.</li>
        </ul>
      </article>
      <article class="version-item"><h3>Purpose</h3><p>Activity Finder is provided as a business activity search and reference interface. It is intended to speed up preliminary research and filtering.</p></article>
      <article class="version-item"><h3>No Final Approval Guarantee</h3><p>Search results do not guarantee license approval, authority acceptance, pricing, facility eligibility, or document sufficiency. Final decisions remain with the relevant UAE authority or regulator.</p></article>
      <article class="version-item"><h3>User Responsibility</h3><p>Users must verify activity codes, descriptions, required approvals, NOCs, fees, and compliance obligations before relying on the information for applications, proposals, or client communication.</p></article>
      <article class="version-item"><h3>Permitted Use</h3><p>The page may be used for internal research, comparison, filtering, and export of activity records. Unauthorized redistribution of proprietary datasets or branding is not permitted unless separately approved.</p></article>
    </div>
  </div>
</section>
<section id="legalPage" class="version-page" aria-label="Legal notice page">
  <div class="version-card">
    <div class="version-card-head"><div><h2>Legal Notice</h2><div class="sub">Activity Finder &middot; Effective 2026-04-28</div></div><button class="btn policy-back" type="button">Back</button></div>
    <div class="version-card-body">
      <article class="version-item">
        <h3>v1.6.3 - About Page and Activity Rows</h3>
        <ul>
          <li>Updated landing activity shortcuts into three rows: 4 activities, 5 activities, and 3 activities.</li>
          <li>Added a footer-linked About page explaining the system, purpose, features, value, use cases, and technical classification.</li>
        </ul>
      </article>
      <article class="version-item"><h3>Ownership</h3><p>The interface design, compiled dashboard structure, and local search workflow are provided for authorized business use. Logos, authority names, and third-party references remain the property of their respective owners.</p></article>
      <article class="version-item"><h3>Regulatory Disclaimer</h3><p>This page is not an official government, free zone, or regulatory authority portal. It does not replace official authority portals, circulars, forms, or written confirmations.</p></article>
      <article class="version-item"><h3>Liability</h3><p>The information is provided on an as-is basis for reference. No liability is accepted for losses arising from outdated, incomplete, misclassified, or incorrectly extracted activity information.</p></article>
      <article class="version-item"><h3>Version</h3><p>Current release: v1.4.0. Users should confirm they are using the latest approved version before sharing outputs or making license recommendations.</p></article>
    </div>
  </div>
</section>
<footer class="site-footer">
  <div class="footer-brand"><img class="footer-logo" src="assets/images/logo-transparent.svg" alt="Innovation Gurus"><span>Activity Finder</span></div>
  <div class="footer-links"><span class="footer-version">v1.6.3</span><button class="footer-link" id="versionLogBtn" type="button">Version</button><button class="footer-link" id="aboutBtn" type="button">About</button><button class="footer-link" id="privacyBtn" type="button">Privacy</button><button class="footer-link" id="termsBtn" type="button">Terms &amp; Conditions</button><button class="footer-link" id="legalBtn" type="button">Legal</button></div>
</footer>`;

export default function App() {
  useEffect(() => {
    document.body.classList.add("intro-active");
    mountLegacyActivityFinder();
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: legacyMarkup }} />;
}
