const dashLinks = document.querySelectorAll("[data-dash-link]");
const dashSections = document.querySelectorAll("[data-dash-section]");
const welcomeUser = document.querySelector("[data-welcome-user]");
const logoutBtn = document.querySelector("[data-logout]");

if (welcomeUser) {
  welcomeUser.textContent = sessionStorage.getItem("dairyFarmUser") || "Farm Manager";
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
    window.location.href = "login.html";
  });
}
