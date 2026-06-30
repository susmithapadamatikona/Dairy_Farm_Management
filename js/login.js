const passwordEyeOpen = `
  <path d="M2.25 12s3.75-6.75 9.75-6.75S21.75 12 21.75 12 18 18.75 12 18.75 2.25 12 2.25 12Z"></path>
  <circle cx="12" cy="12" r="3.25"></circle>
`;

const passwordEyeClosed = `
  <path d="M3 3l18 18"></path>
  <path d="M6.2 6.2C3.8 7.7 2.25 12 2.25 12S6 18.75 12 18.75c1.28 0 2.48-.21 3.57-.57"></path>
  <path d="M9.44 5.3A11.8 11.8 0 0 1 12 5.25C18 5.25 21.75 12 21.75 12a18.3 18.3 0 0 1-2.76 3.96"></path>
`;

const loginForm = document.querySelector("#loginForm");

function goWithLoader(href) {
  if (window.StacklyPageLoader) {
    window.StacklyPageLoader.navigate(href);
    return;
  }
  window.location.href = href;
}

function setFieldError(field, message) {
  const wrapper = field.closest(".form-field");
  const error = wrapper ? wrapper.querySelector(".error-message") : null;
  if (error) error.textContent = message;
  field.setAttribute("aria-invalid", message ? "true" : "false");
}

function setPasswordToggleState(button, input) {
  const isVisible = input.type === "text";
  const icon = button.querySelector(".icon-eye");

  button.setAttribute("aria-label", isVisible ? "Hide password" : "Show password");
  button.setAttribute("aria-pressed", isVisible ? "true" : "false");

  if (icon) {
    icon.innerHTML = isVisible ? passwordEyeOpen : passwordEyeClosed;
  }
}

document.querySelectorAll(".toggle-password").forEach((button) => {
  const input = document.querySelector(button.dataset.target);
  if (input) setPasswordToggleState(button, input);

  button.addEventListener("click", () => {
    if (!input) return;
    input.type = input.type === "password" ? "text" : "password";
    setPasswordToggleState(button, input);
  });
});

if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const role = loginForm.querySelector("#role");
    const email = loginForm.querySelector("#email");
    const password = loginForm.querySelector("#password");
    let valid = true;

    setFieldError(role, "");
    setFieldError(email, "");
    setFieldError(password, "");

    if (!role.value) {
      setFieldError(role, "Please select a role.");
      valid = false;
    }

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
    sessionStorage.setItem("dairyFarmRole", role.value);
    sessionStorage.setItem("dairyFarmUser", email.value.trim());
    goWithLoader("dashboard.html");
  });
}
