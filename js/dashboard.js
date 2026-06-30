const dashLinks = document.querySelectorAll("[data-dash-link]");
const dashSections = document.querySelectorAll("[data-dash-section]");
const welcomeUser = document.querySelector("[data-welcome-user]");
const dashboardEmail = document.querySelector("[data-dashboard-email]");
const logoutBtn = document.querySelector("[data-logout]");
const dashboardSidebar = document.querySelector(".dashboard-sidebar");
const dashboardBackdrop = document.querySelector(".dashboard-backdrop");
const dashboardMenuToggle = document.querySelector(".dashboard-menu-toggle");

function goWithLoader(href) {
  if (window.StacklyPageLoader) {
    window.StacklyPageLoader.navigate(href);
    return;
  }
  window.location.href = href;
}

if (welcomeUser) {
  welcomeUser.textContent = "Farm Manager";
}

if (dashboardEmail) {
  dashboardEmail.textContent = sessionStorage.getItem("dairyFarmUser") || "Not signed in";
}

dashLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const target = link.dataset.dashLink;
    dashLinks.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
    dashSections.forEach((section) => {
      section.hidden = section.dataset.dashSection !== target;
    });
    if (window.AOS) {
      AOS.refreshHard();
    }
  });
});

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    sessionStorage.removeItem("dairyFarmUser");
    sessionStorage.removeItem("dairyFarmRole");
    goWithLoader("login.html");
  });
}

if (dashboardMenuToggle && dashboardSidebar && dashboardBackdrop) {
  const closeSidebar = () => {
    dashboardSidebar.classList.remove("is-open");
    dashboardBackdrop.hidden = true;
    document.body.classList.remove("dashboard-nav-open");
    dashboardMenuToggle.setAttribute("aria-expanded", "false");
  };

  const openSidebar = () => {
    dashboardSidebar.classList.add("is-open");
    dashboardBackdrop.hidden = false;
    document.body.classList.add("dashboard-nav-open");
    dashboardMenuToggle.setAttribute("aria-expanded", "true");
  };

  dashboardMenuToggle.addEventListener("click", () => {
    const isOpen = dashboardSidebar.classList.contains("is-open");
    if (isOpen) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  dashboardBackdrop.addEventListener("click", closeSidebar);

  dashboardSidebar.querySelectorAll("a, button").forEach((item) => {
    item.addEventListener("click", () => {
      if (window.innerWidth <= 900) {
        closeSidebar();
      }
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      closeSidebar();
    }
  });
}
