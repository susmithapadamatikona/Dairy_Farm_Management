document.querySelectorAll("[data-year]").forEach((item) => {
  item.textContent = new Date().getFullYear();
});

document.querySelectorAll("[data-newsletter]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = form.querySelector("input");
    const message = form.querySelector(".success-message");
    if (!input.checkValidity()) {
      input.reportValidity();
      return;
    }
    if (message) message.textContent = "Subscription confirmed.";
    form.reset();
  });
});
