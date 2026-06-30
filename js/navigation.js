const currentPage = location.pathname.split("/").pop() || "index.html";
const loaderDuration = 1500;

const pageLoader = (() => {
  const loaderId = "stackly-page-loader";
  let loaderElement = document.getElementById(loaderId);

  const ensureLoader = () => {
    if (loaderElement) return loaderElement;

    loaderElement = document.createElement("div");
    loaderElement.id = loaderId;
    loaderElement.className = "page-loader";
    loaderElement.setAttribute("aria-hidden", "true");
    loaderElement.innerHTML = `
      <div class="page-loader-card" role="status" aria-live="polite" aria-label="Loading Stackly">
        <span class="page-loader-ring" aria-hidden="true"></span>
        <span class="page-loader-logo">
          <img src="assets/images/logo stackly.webp" alt="">
        </span>
        <strong>Loading Stackly</strong>
      </div>
    `;
    document.body.appendChild(loaderElement);
    return loaderElement;
  };

  const show = () => {
    ensureLoader();
    document.body.classList.add("is-loading");
  };

  const hide = () => {
    document.body.classList.remove("is-loading");
  };

  const navigate = (href) => {
    show();
    window.setTimeout(() => {
      window.location.href = href;
    }, loaderDuration);
  };

  return { show, hide, navigate };
})();

window.StacklyPageLoader = pageLoader;

const hideInitialLoader = () => {
  if (!document.body.classList.contains("is-loading")) {
    return;
  }

  window.setTimeout(() => {
    pageLoader.hide();
  }, loaderDuration);
};

window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    pageLoader.hide();
  }
});

if (document.readyState === "complete") {
  hideInitialLoader();
} else {
  window.addEventListener("load", hideInitialLoader);
}

document.querySelectorAll("[data-nav]").forEach((link) => {
  const href = link.getAttribute("href");
  if (href === currentPage) link.classList.add("active");
});

const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navPanel = document.querySelector(".nav-panel");

function setHeaderState() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 12);
}

window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();

document.addEventListener("click", (event) => {
  const link = event.target.closest("a[href]");
  if (!link) return;
  if (
    link.target === "_blank" ||
    link.hasAttribute("download") ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    event.button !== 0
  ) {
    return;
  }

  const href = link.getAttribute("href");
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) {
    return;
  }

  const nextUrl = new URL(href, window.location.href);
  if (nextUrl.origin !== window.location.origin || nextUrl.href === window.location.href) {
    return;
  }

  event.preventDefault();
  pageLoader.navigate(nextUrl.href);
});

if (menuToggle && navPanel) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.classList.toggle("is-open");
    navPanel.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("nav-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navPanel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("is-open");
      navPanel.classList.remove("is-open");
      document.body.classList.remove("nav-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}
