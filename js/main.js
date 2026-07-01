document.querySelectorAll("[data-year]").forEach((item) => {
  item.textContent = new Date().getFullYear();
});

document.querySelectorAll("[data-newsletter]").forEach((form) => {
  let successTimer = null;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = form.querySelector("input");
    const message = form.querySelector(".success-message");

    if (successTimer) {
      window.clearTimeout(successTimer);
      successTimer = null;
    }

    if (message) message.textContent = "";

    if (!input.value.trim()) {
      input.setCustomValidity("Please enter your email address.");
      input.reportValidity();
      return;
    }

    input.setCustomValidity("");

    if (!input.checkValidity()) {
      input.reportValidity();
      return;
    }

    if (message) message.textContent = "Subscription confirmed. Thank you for subscribing.";
    form.reset();
    successTimer = window.setTimeout(() => {
      if (message) message.textContent = "";
      successTimer = null;
    }, 2000);
  });
});
