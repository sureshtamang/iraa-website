const serviceMenuItems = [
  { href: "audit.html", title: "Audit & Assurance", description: "Statutory, internal, and control review." },
  { href: "tax.html", title: "Corporate Tax & VAT", description: "Tax compliance, VAT, and transfer pricing." },
  { href: "business-setup.html", title: "Business Setup", description: "UAE company formation and launch guidance." },
  { href: "accounting-bookkeeping.html", title: "Accounting & Bookkeeping", description: "Recurring finance support and reporting." },
  { href: "risk-regulatory-advisory.html", title: "Risk & Regulatory Advisory", description: "Model risk, validation, and AI governance." },
  { href: "india-uae-advisory.html", title: "India-UAE Advisory", description: "Cross-border structuring and NRI planning." },
  { href: "private-advisory.html", title: "Private Advisory", description: "Residency, wealth, wills, and succession." }
];

const aboutMenuItems = [
  { href: "about.html", title: "About IRAA Global", description: "Firm story, positioning, and philosophy." },
  { href: "company.html", title: "Company Structure", description: "Affiliated entities and legal structure." },
  { href: "our-team.html", title: "Our Team", description: "Meet the wider advisory and support team." },
  { href: "why-choose-us.html", title: "Why Choose Us", description: "See what makes the firm distinct." },
  { href: "careers.html", title: "Careers", description: "Explore opportunities to join IRAA Global." }
];

const siteScript = document.currentScript || document.querySelector('script[src$="assets/js/site.js"]');
const siteRoot = (() => {
  const scriptSrc = siteScript?.getAttribute("src") || "";
  const match = scriptSrc.match(/^(.*)assets\/js\/site\.js(?:\?.*)?$/);
  return match ? match[1] : "";
})();

function isSiteRelativePath(value) {
  return Boolean(value) && !value.startsWith("#") && !value.startsWith("//") && !/^[a-z][a-z0-9+.-]*:/i.test(value);
}

function siteUrl(path) {
  return isSiteRelativePath(path) ? `${siteRoot}${path}` : path;
}

function resolveSitePaths(scope) {
  scope.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href");

    if (isSiteRelativePath(href)) {
      link.setAttribute("href", siteUrl(href));
    }
  });

  scope.querySelectorAll("img[src]").forEach((image) => {
    const src = image.getAttribute("src");

    if (isSiteRelativePath(src)) {
      image.setAttribute("src", siteUrl(src));
    }
  });
}

const currentPage = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const indiaUaeNavLink = Array.from(siteNav?.querySelectorAll("a") || []).find((link) => {
  return (link.getAttribute("href") || "").endsWith("india-uae-advisory.html");
});

function mountSharedFooter() {
  const footer = document.querySelector(".footer");

  if (!footer) {
    return;
  }

  footer.innerHTML = `
    <div class="container">
      <div class="footer__masthead">
        <a class="footer__brandmark" href="index.html" aria-label="IRAA Global home">
          <img class="footer__brandmark-logo" src="assets/img/logo-transparent.svg" alt="IRAA Global logo">
        </a>
      </div>

      <div class="footer__grid">
        <div class="footer__col">
          <div class="footer__contact-list">
            <p>503 Mustafawi Carpet Building,<br>Sharaf DG Metro Exit 1,<br>Dubai, United Arab Emirates</p>
            <a href="tel:+971569210222">+971 56 921 0222</a>
            <a href="tel:+971506779455">+971 50 677 9455</a>
            <a href="mailto:info@iraaglobal.com">info@iraaglobal.com</a>
          </div>
          <div class="footer__social footer__social--contact" aria-label="Social media links">
            <a class="footer__social-link" href="https://ae.linkedin.com/company/iraaglobal" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A1.97 1.97 0 0 0 3.25 5c0 1.08.84 1.94 1.97 1.94h.03A1.96 1.96 0 0 0 7.28 5 1.97 1.97 0 0 0 5.25 3ZM20.75 12.98c0-3.47-1.85-5.08-4.32-5.08-1.99 0-2.88 1.1-3.38 1.87V8.5H9.67c.04.84 0 11.5 0 11.5h3.38v-6.42c0-.34.03-.68.12-.92.27-.68.9-1.38 1.94-1.38 1.36 0 1.9 1.04 1.9 2.56V20H20.4v-6.99Z"/></svg>
            </a>
            <a class="footer__social-link" href="https://www.instagram.com/iraaglobal" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.75 3h8.5A4.75 4.75 0 0 1 21 7.75v8.5A4.75 4.75 0 0 1 16.25 21h-8.5A4.75 4.75 0 0 1 3 16.25v-8.5A4.75 4.75 0 0 1 7.75 3Zm0 1.7A3.05 3.05 0 0 0 4.7 7.75v8.5a3.05 3.05 0 0 0 3.05 3.05h8.5a3.05 3.05 0 0 0 3.05-3.05v-8.5A3.05 3.05 0 0 0 16.25 4.7h-8.5Zm8.9 1.28a1.07 1.07 0 1 1 0 2.14 1.07 1.07 0 0 1 0-2.14ZM12 7.6A4.4 4.4 0 1 1 7.6 12 4.4 4.4 0 0 1 12 7.6Zm0 1.7A2.7 2.7 0 1 0 14.7 12 2.7 2.7 0 0 0 12 9.3Z"/></svg>
            </a>
            <a class="footer__social-link" href="https://www.facebook.com/iraaglobal" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.62 21v-7.76h2.61l.39-3.02h-3V8.3c0-.88.25-1.47 1.5-1.47h1.6V4.13a21.2 21.2 0 0 0-2.33-.12c-2.31 0-3.89 1.41-3.89 4v2.23H8v3.02h2.5V21h3.12Z"/></svg>
            </a>
            <a class="footer__social-link" href="https://www.youtube.com/@iraa.global" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.56 7.17a2.8 2.8 0 0 0-1.97-1.98C17.85 4.7 12 4.7 12 4.7s-5.85 0-7.59.49a2.8 2.8 0 0 0-1.97 1.98A29 29 0 0 0 2 12a29 29 0 0 0 .44 4.83 2.8 2.8 0 0 0 1.97 1.98c1.74.49 7.59.49 7.59.49s5.85 0 7.59-.49a2.8 2.8 0 0 0 1.97-1.98A29 29 0 0 0 22 12a29 29 0 0 0-.44-4.83ZM10.08 15.02V8.98L15.27 12l-5.19 3.02Z"/></svg>
            </a>
          </div>
        </div>

        <div class="footer__col">
          <h3 class="footer__title">Services</h3>
          <div class="footer__list">
            <a href="audit.html">Audit &amp; Assurance</a>
            <a href="tax.html">Corporate Tax &amp; VAT</a>
            <a href="business-setup.html">Business Setup</a>
            <a href="accounting-bookkeeping.html">Accounting &amp; Bookkeeping</a>
            <a href="risk-regulatory-advisory.html">Risk &amp; Regulatory Advisory</a>
            <a href="india-uae-advisory.html">India-UAE Advisory</a>
            <a href="private-advisory.html">Private Advisory</a>
          </div>
        </div>

        <div class="footer__col">
          <h3 class="footer__title">Company</h3>
          <div class="footer__list">
            <a href="about.html">About The Firm</a>
            <a href="company.html">Company Structure</a>
            <a href="our-team.html">Our Team</a>
            <a href="why-choose-us.html">Why Choose Us</a>
            <a href="careers.html">Careers</a>
            <a href="blog.html">Insights</a>
            <a href="contact.html">Contact Us</a>
          </div>
        </div>

        <div class="footer__col">
          <h3 class="footer__title">Quick Actions</h3>
          <div class="footer__list">
            <a href="contact.html">Company Profile</a>
            <a href="contact.html">Presskit and Brand</a>
            <a href="consultation/">Book Consultation</a>
            <a href="consultation/">Appointment</a>
            <a href="contact.html">Cost Calculator</a>
            <a href="activities-finder/">Business Activities Checker</a>
            <a href="https://share.google/u3N4MPB7iI90cxNE3" target="_blank" rel="noopener noreferrer">Get Direction</a>
            <a href="https://g.page/r/CYyKTedOLYR8EBM/review" target="_blank" rel="noopener noreferrer">Rate Us Now</a>
          </div>
        </div>
      </div>

      <div class="footer__bottom">
        <div class="footer__disclosure">
          <p>&copy; <span class="js-year">2026</span> Copyright owned by one or more of the Iraa Global entities. All rights reserved.</p>
          <p>Iraa Global refers to the holding entity, Iraa Global LLC FZ, which owns and manages the IRAA brand and oversees its associated entities. Iraa Global LLC FZ does not directly provide services to clients.</p>
          <p>The IRAA brand operates through a network of affiliated entities, all registered in Dubai Mainland, including IRAA Accountants LLC, IRAA Management Consultants LLC, IRAA Properties LLC, and Rays and Insight Chartered Accountants LLC (partner firm). Each entity is a separate legal entity and operates independently.</p>
          <p>For more information about the structure of Iraa Global and its affiliated entities, please visit <a href="company.html">www.iraaglobal.com/company</a>.</p>
        </div>
        <div class="footer__legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Cookie Policy</a>
          <a href="#">Terms &amp; Conditions</a>
          <a href="sitemap.xml">Sitemap</a>
        </div>
      </div>
    </div>
  `;

  resolveSitePaths(footer);
}

mountSharedFooter();

if (indiaUaeNavLink) {
  indiaUaeNavLink.remove();
}

function enhanceNavDropdown(label, href, items) {
  if (!siteNav) {
    return null;
  }

  const link = Array.from(siteNav.querySelectorAll("a")).find((candidate) => {
    return (candidate.getAttribute("href") || "").endsWith(href);
  });

  if (!link) {
    return null;
  }

  const dropdown = document.createElement("div");
  dropdown.className = "nav-dropdown";

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "nav-dropdown__toggle";
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-haspopup", "true");
  toggle.innerHTML = `
    <span>${label}</span>
    <svg class="nav-dropdown__icon" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M5.2 7.4a.75.75 0 0 1 1.06.02L10 11.3l3.74-3.88a.75.75 0 1 1 1.08 1.04l-4.28 4.44a.75.75 0 0 1-1.08 0L5.18 8.46a.75.75 0 0 1 .02-1.06Z"></path>
    </svg>
  `;

  const menu = document.createElement("div");
  menu.className = "nav-dropdown__menu";

  items.forEach((item) => {
    const itemPage = item.href.split("#")[0].toLowerCase();
    const menuLink = document.createElement("a");
    menuLink.className = "nav-dropdown__item";
    menuLink.href = siteUrl(item.href);
    if (itemPage === currentPage) {
      menuLink.setAttribute("aria-current", "page");
      toggle.dataset.current = "true";
    }
    menuLink.innerHTML = `<strong>${item.title}</strong><span>${item.description}</span>`;
    menu.appendChild(menuLink);
  });

  dropdown.append(toggle, menu);
  link.replaceWith(dropdown);

  return { dropdown, toggle };
}

const navDropdowns = [
  enhanceNavDropdown("Services", "services.html", serviceMenuItems),
  enhanceNavDropdown("About", "about.html", aboutMenuItems)
].filter(Boolean);

function setDropdownOpen(activeDropdown, isOpen) {
  navDropdowns.forEach((entry) => {
    const shouldOpen = entry === activeDropdown ? isOpen : false;
    entry.dropdown.classList.toggle("is-open", shouldOpen);
    entry.toggle.setAttribute("aria-expanded", String(shouldOpen));
  });
}

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navDropdowns.forEach((entry) => {
        entry.dropdown.classList.remove("is-open");
        entry.toggle.setAttribute("aria-expanded", "false");
      });
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 980) {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }

    navDropdowns.forEach((entry) => {
      entry.dropdown.classList.remove("is-open");
      entry.toggle.setAttribute("aria-expanded", "false");
    });
  });
}

navDropdowns.forEach((entry) => {
  entry.toggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = entry.dropdown.classList.contains("is-open");
    setDropdownOpen(entry, !isOpen);
  });
});

document.addEventListener("click", (event) => {
  const clickedInsideDropdown = navDropdowns.some((entry) => entry.dropdown.contains(event.target));
  if (!clickedInsideDropdown) {
    setDropdownOpen(null, false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setDropdownOpen(null, false);
  }
});

function animateMetricValue(node) {
  const rawValue = node.textContent.trim();
  const match = rawValue.match(/^(\D*)(\d+)(.*)$/);

  if (!match) {
    return;
  }

  const [, prefix, numericValue, suffix] = match;
  const target = Number.parseInt(numericValue, 10);

  if (!Number.isFinite(target)) {
    return;
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    node.textContent = `${prefix}${target}${suffix}`;
    return;
  }

  const durationMs = 1400;
  const startTime = performance.now();

  function step(now) {
    const progress = Math.min((now - startTime) / durationMs, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.max(1, Math.round(target * eased));
    node.textContent = `${prefix}${current}${suffix}`;

    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      node.textContent = `${prefix}${target}${suffix}`;
    }
  }

  node.textContent = `${prefix}0${suffix}`;
  window.requestAnimationFrame(step);
}

function initMetricsCountUp() {
  const metricNodes = Array.from(document.querySelectorAll(".metrics-band .stat-card strong"));

  if (metricNodes.length === 0) {
    return;
  }

  let hasAnimated = false;

  const runAnimation = () => {
    if (hasAnimated) {
      return;
    }

    hasAnimated = true;
    metricNodes.forEach((node) => {
      animateMetricValue(node);
    });
  };

  if (!("IntersectionObserver" in window)) {
    runAnimation();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const isVisible = entries.some((entry) => entry.isIntersecting);

      if (isVisible) {
        runAnimation();
        observer.disconnect();
      }
    },
    {
      threshold: 0.35
    }
  );

  const metricsBand = document.querySelector(".metrics-band");

  if (metricsBand) {
    observer.observe(metricsBand);
  }
}

initMetricsCountUp();

function initHomepageEffects() {
  if (!document.body.classList.contains("home-page")) {
    return;
  }

  const revealGroups = [
    ".metrics-band .stat-card",
    ".page-intro > *",
    ".section .grid-3 > *",
    ".pillars > *",
    ".pillars__list > *",
    ".brand-strip__layout > *",
    ".logo-grid .logo-card",
    ".testimonial-shell > *",
    ".testimonial-shell__grid > *",
    ".cta-banner > *"
  ];

  const revealNodes = [];
  const seen = new Set();

  revealGroups.forEach((selector) => {
    document.querySelectorAll(selector).forEach((node, index) => {
      if (seen.has(node)) {
        return;
      }

      seen.add(node);
      node.setAttribute("data-reveal", "");
      node.style.setProperty("--reveal-delay", `${Math.min(index * 70, 280)}ms`);
      revealNodes.push(node);
    });
  });

  if (revealNodes.length === 0) {
    return;
  }

  document.body.classList.add("reveal-ready");

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealNodes.forEach((node) => {
      node.classList.add("is-visible");
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  revealNodes.forEach((node) => {
    observer.observe(node);
  });
}

initHomepageEffects();

function initHeroSlider() {
  const slider = document.querySelector("[data-hero-slider]");

  if (!slider) {
    return;
  }

  const slides = Array.from(slider.querySelectorAll("[data-hero-slide]"));
  const dots = Array.from(slider.querySelectorAll("[data-hero-dot]"));

  if (slides.length < 2) {
    return;
  }

  let currentIndex = slides.findIndex((slide) => slide.classList.contains("is-active"));

  if (currentIndex < 0) {
    currentIndex = 0;
  }

  let intervalId = null;
  let dragStartX = 0;
  let isDragging = false;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function render(index) {
    currentIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === currentIndex);
    });

    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === currentIndex;
      dot.classList.toggle("is-active", isActive);
      if (isActive) {
        dot.setAttribute("aria-current", "true");
      } else {
        dot.removeAttribute("aria-current");
      }
    });
  }

  function stopAutoPlay() {
    if (intervalId) {
      window.clearInterval(intervalId);
      intervalId = null;
    }
  }

  function startAutoPlay() {
    if (prefersReducedMotion) {
      return;
    }

    stopAutoPlay();
    intervalId = window.setInterval(() => {
      render(currentIndex + 1);
    }, 5500);
  }

  slider.addEventListener("mouseenter", stopAutoPlay);
  slider.addEventListener("mouseleave", startAutoPlay);

  dots.forEach((dot, dotIndex) => {
    dot.addEventListener("click", () => {
      stopAutoPlay();
      render(dotIndex);
      startAutoPlay();
    });
  });

  slider.addEventListener("pointerdown", (event) => {
    dragStartX = event.clientX;
    isDragging = true;
    slider.classList.add("is-dragging");
    stopAutoPlay();
  });

  slider.addEventListener("pointerup", (event) => {
    if (!isDragging) {
      return;
    }

    const deltaX = event.clientX - dragStartX;
    isDragging = false;
    slider.classList.remove("is-dragging");

    if (Math.abs(deltaX) > 55) {
      render(deltaX < 0 ? currentIndex + 1 : currentIndex - 1);
    }

    startAutoPlay();
  });

  slider.addEventListener("pointerleave", () => {
    if (!isDragging) {
      return;
    }

    isDragging = false;
    slider.classList.remove("is-dragging");
    startAutoPlay();
  });

  slider.addEventListener("pointercancel", () => {
    isDragging = false;
    slider.classList.remove("is-dragging");
    startAutoPlay();
  });

  render(currentIndex);
  startAutoPlay();
}

initHeroSlider();

function initCookieBanner() {
  const consentKey = "iraa_cookie_consent_v1";

  if (window.localStorage.getItem(consentKey)) {
    return;
  }

  const banner = document.createElement("aside");
  banner.className = "cookie-banner";
  banner.setAttribute("role", "dialog");
  banner.setAttribute("aria-live", "polite");
  banner.setAttribute("aria-label", "Cookie preferences");
  banner.innerHTML = `
    <div class="cookie-banner__content">
      <div class="cookie-banner__copy">
        <h3>Cookie preferences</h3>
        <p>We use cookies to improve performance and remember preferences.</p>
      </div>
      <div class="cookie-banner__actions">
        <button class="cookie-banner__manage" type="button">Manage Choices</button>
        <button class="btn btn--gold cookie-banner__accept" type="button">Accept All Cookies</button>
      </div>
    </div>
    <div class="cookie-banner__panel" hidden>
      <div class="cookie-banner__option">
        <div>
          <strong>Essential Cookies</strong>
          <span>Required for core site functionality and always enabled.</span>
        </div>
        <span class="cookie-banner__status">Always On</span>
      </div>
      <div class="cookie-banner__option">
        <div>
          <strong>Analytics Cookies</strong>
          <span>Help us understand visits and improve the site experience.</span>
        </div>
        <label class="cookie-toggle" aria-label="Toggle analytics cookies">
          <input class="cookie-toggle__input" type="checkbox">
          <span class="cookie-toggle__track"></span>
        </label>
      </div>
      <div class="cookie-banner__panel-actions">
        <button class="cookie-banner__essential" type="button">Only Essential</button>
        <button class="btn btn--gold cookie-banner__save" type="button">Save Preferences</button>
      </div>
    </div>
  `;

  function saveConsent(value) {
    window.localStorage.setItem(consentKey, JSON.stringify(value));
    document.documentElement.dataset.cookieConsent = value.analytics ? "all" : "essential";
    banner.remove();
  }

  const manageButton = banner.querySelector(".cookie-banner__manage");
  const acceptButton = banner.querySelector(".cookie-banner__accept");
  const essentialButton = banner.querySelector(".cookie-banner__essential");
  const saveButton = banner.querySelector(".cookie-banner__save");
  const panel = banner.querySelector(".cookie-banner__panel");
  const analyticsToggle = banner.querySelector(".cookie-toggle__input");

  manageButton?.addEventListener("click", () => {
    const isHidden = panel.hasAttribute("hidden");
    panel.toggleAttribute("hidden");
    manageButton.textContent = isHidden ? "Hide Choices" : "Manage Choices";
  });

  acceptButton?.addEventListener("click", () => {
    saveConsent({ essential: true, analytics: true });
  });

  essentialButton?.addEventListener("click", () => {
    analyticsToggle.checked = false;
    saveConsent({ essential: true, analytics: false });
  });

  saveButton?.addEventListener("click", () => {
    saveConsent({ essential: true, analytics: analyticsToggle.checked });
  });

  document.body.appendChild(banner);
}

initCookieBanner();

document.querySelectorAll(".js-year").forEach((node) => {
  node.textContent = String(new Date().getFullYear());
});


