const dashLinks = document.querySelectorAll("[data-dash-link]");
const dashSections = document.querySelectorAll("[data-dash-section]");
const welcomeUser = document.querySelector("[data-welcome-user]");
const dashboardEmail = document.querySelector("[data-dashboard-email]");
const logoutBtn = document.querySelector("[data-logout]");

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
