const loginForm = document.querySelector("#loginForm");

function setFieldError(field, message) {
  const wrapper = field.closest(".form-field");
  const error = wrapper ? wrapper.querySelector(".error-message") : null;
  if (error) error.textContent = message;
  field.setAttribute("aria-invalid", message ? "true" : "false");
}

document.querySelectorAll(".toggle-password").forEach((button) => {
  button.addEventListener("click", () => {
    const input = document.querySelector(button.dataset.target);
    if (!input) return;
    input.type = input.type === "password" ? "text" : "password";
    button.textContent = input.type === "password" ? "Show" : "Hide";
  });
});

if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = loginForm.querySelector("#email");
    const password = loginForm.querySelector("#password");
    let valid = true;

    setFieldError(email, "");
    setFieldError(password, "");

    if (!email.value.trim()) {
      setFieldError(email, "Email is required.");
      valid = false;
    } else if (!email.validity.valid) {
      setFieldError(email, "Enter a valid email address.");
      valid = false;
    }

    if (!password.value.trim()) {
      setFieldError(password, "Password is required.");
      valid = false;
    }

    if (!valid) return;
    sessionStorage.setItem("dairyFarmUser", email.value.trim());
    window.location.href = "dashboard.html";
  });
}
