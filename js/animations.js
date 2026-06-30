const animationTargets = [
  "main > section",
  ".section > .container",
  ".page-hero .container",
  ".hero-agri-grid",
  ".hero-agri-copy",
  ".hero-stats-panel",
  ".hero-stats-panel article",
  ".section-head",
  ".split > *",
  ".card",
  ".grid-2 > *",
  ".grid-3 > *",
  ".grid-4 > *",
  ".feature-band",
  ".feature-list li",
  ".activity-list li",
  ".task-list li",
  ".image-stack",
  ".timeline-item",
  ".gallery-grid",
  ".gallery-card",
  ".gallery-grid > img",
  ".about-feature-card",
  ".service-card",
  ".process-step",
  ".product-photo",
  ".product-showcase > div",
  ".product-card",
  ".testimonial-card",
  ".blog-layout > *",
  ".sidebar-box",
  ".home-cta-box",
  ".auth-copy",
  ".auth-card",
  ".dashboard-sidebar",
  ".dashboard-topbar",
  ".dashboard-main [class*='grid-'] > *",
  ".contact-layout > *",
  ".contact-form",
  ".not-found .container",
  ".footer-col",
  ".footer-bottom-inner"
];

document.querySelectorAll(animationTargets.join(",")).forEach((item) => {
  item.classList.add("reveal");
});

const revealItems = document.querySelectorAll(".reveal");

if (window.AOS) {
  revealItems.forEach((item, index) => {
    if (!item.dataset.aos) {
      if (item.classList.contains("fade-left")) {
        item.dataset.aos = "fade-right";
      } else if (item.classList.contains("fade-right")) {
        item.dataset.aos = "fade-left";
      } else if (item.classList.contains("zoom-in")) {
        item.dataset.aos = "zoom-in";
      } else if (item.matches(".page-hero .container, .hero-agri-copy, .auth-copy, .dashboard-sidebar")) {
        item.dataset.aos = "fade-right";
      } else if (item.matches(".image-stack, .auth-card, .contact-form")) {
        item.dataset.aos = "fade-left";
      } else if (item.matches(".hero-stats-panel article, .card, .gallery-card, .gallery-grid > img, .process-step, .product-card, .testimonial-card, .footer-col")) {
        item.dataset.aos = "fade-up";
      } else if (item.matches(".feature-list li, .activity-list li, .task-list li")) {
        item.dataset.aos = "fade-up";
        item.dataset.aosDuration = "600";
      } else {
        item.dataset.aos = "fade-up";
      }
    }

    if (!item.dataset.aosDuration) item.dataset.aosDuration = "720";
    if (!item.dataset.aosEasing) item.dataset.aosEasing = "ease-out-cubic";
    if (!item.dataset.aosOnce) item.dataset.aosOnce = "true";
    if (!item.dataset.aosAnchorPlacement) item.dataset.aosAnchorPlacement = "top-bottom";
    if (!item.dataset.aosDelay && item.closest(".grid-2, .grid-3, .grid-4, .about-feature-grid, .gallery-grid, .process-timeline, .product-grid, .testimonial-grid, .footer-grid, .feature-list, .activity-list, .task-list, .hero-stats-panel")) {
      item.dataset.aosDelay = String((index % 4) * 65);
    }
  });

  AOS.init({
    duration: 720,
    easing: "ease-out-cubic",
    once: true,
    offset: 80,
    mirror: false,
    disableMutationObserver: false
  });

  window.addEventListener("load", () => AOS.refreshHard());
} else if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

document.querySelectorAll(".btn-solid, .btn-outline, .btn-light, .btn-small").forEach((button) => {
  button.addEventListener("click", (event) => {
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.className = "ripple";
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
    button.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
  });
});

const backToTop = document.querySelector(".back-to-top");
if (backToTop) {
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("is-visible", window.scrollY > 520);
  }, { passive: true });

  backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}
