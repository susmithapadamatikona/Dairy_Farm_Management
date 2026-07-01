const passwordEyeOpen = `
  <path d="M2 12s3.75-7 10-7 10 7 10 7-3.75 7-10 7-10-7-10-7Z"></path>
  <circle cx="12" cy="12" r="2.7" fill="currentColor" stroke="none"></circle>
`;

const passwordEyeClosed = `
  <path d="M2 2l20 20"></path>
  <path d="M3.6 7.5C2.1 8.9 1 10.5 1 12c2 4.4 6.1 7.5 11 7.5 1.7 0 3.3-.3 4.8-1"></path>
  <path d="M7.2 6.2A11.4 11.4 0 0 1 12 5c5 0 9 3.1 11 7.5-.8 1.8-2.2 3.5-4.1 5"></path>
  <circle cx="12" cy="12" r="2.7" fill="currentColor" stroke="none"></circle>
`;

const demoCredentials = {
  email: "manager@stackly.com",
  password: "Stackly@123",
};

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

function getPasswordError(password) {
  if (password.length < 8) {
    return "Use at least 8 characters.";
  }

  if (!/[a-z]/.test(password)) {
    return "Include at least one lowercase letter.";
  }

  if (!/[A-Z]/.test(password)) {
    return "Include at least one uppercase letter.";
  }

  if (!/\d/.test(password)) {
    return "Include at least one number.";
  }

  if (!/[^\w\s]/.test(password)) {
    return "Include at least one special character.";
  }

  return "";
}

function setPasswordToggleState(button, input) {
  const isVisible = input.type === "text";
  const icon = button.querySelector(".icon-eye");

  button.setAttribute("aria-label", isVisible ? "Hide password" : "Show password");
  button.setAttribute("aria-pressed", isVisible ? "true" : "false");
  button.title = isVisible ? "Hide password" : "Show password";

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
    const rememberMe = loginForm.querySelector("#rememberMe");
    const rememberError = loginForm.querySelector("#rememberError");
    let valid = true;
    const enteredEmail = email.value.trim();
    const enteredPassword = password.value;
    const registeredEmail = localStorage.getItem("dairyFarmRegisteredUser");
    const registeredPassword = localStorage.getItem("dairyFarmRegisteredPassword");
    const hasRegisteredAccount = Boolean(registeredEmail && registeredPassword);
    const matchesCredentials = hasRegisteredAccount
      ? enteredEmail === registeredEmail && enteredPassword === registeredPassword
      : enteredEmail === demoCredentials.email && enteredPassword === demoCredentials.password;

    setFieldError(role, "");
    setFieldError(email, "");
    setFieldError(password, "");
    if (rememberError) rememberError.textContent = "";

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
    } else {
      const passwordError = getPasswordError(enteredPassword);
      if (passwordError) {
        setFieldError(password, passwordError);
        valid = false;
      } else if (!matchesCredentials) {
        setFieldError(password, "Incorrect email or password.");
        valid = false;
      }
    }

    if (!rememberMe.checked) {
      if (rememberError) rememberError.textContent = "Please check Remember me to continue.";
      valid = false;
    }

    if (!valid) return;
    sessionStorage.setItem("dairyFarmRole", role.value);
    sessionStorage.setItem("dairyFarmUser", enteredEmail);
    goWithLoader("dashboard.html");
  });
}
