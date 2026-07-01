const registerForm = document.querySelector("#registerForm");
const phoneInput = document.querySelector("#phone");

function goWithLoader(href) {
  if (window.StacklyPageLoader) {
    window.StacklyPageLoader.navigate(href);
    return;
  }
  window.location.href = href;
}

function showError(field, message) {
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

function sanitizePhoneInput(value) {
  return value.replace(/\D+/g, "");
}

if (phoneInput) {
  phoneInput.addEventListener("input", () => {
    const sanitized = sanitizePhoneInput(phoneInput.value);
    if (phoneInput.value !== sanitized) {
      phoneInput.value = sanitized;
    }
  });
}

if (registerForm) {
  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const fields = {
      first: registerForm.querySelector("#firstName"),
      last: registerForm.querySelector("#lastName"),
      email: registerForm.querySelector("#email"),
      phone: registerForm.querySelector("#phone"),
      password: registerForm.querySelector("#password"),
      confirm: registerForm.querySelector("#confirmPassword"),
      terms: registerForm.querySelector("#terms")
    };
    let valid = true;

    Object.values(fields).forEach((field) => {
      if (field && field.type !== "checkbox") showError(field, "");
    });

    ["first", "last", "email", "phone", "password", "confirm"].forEach((key) => {
      if (!fields[key].value.trim()) {
        showError(fields[key], "This field is required.");
        valid = false;
      }
    });

    if (fields.email.value && !fields.email.validity.valid) {
      showError(fields.email, "Enter a valid email address.");
      valid = false;
    }

    const phoneValue = sanitizePhoneInput(fields.phone.value.trim());
    if (!/^\d{10,15}$/.test(phoneValue)) {
      showError(fields.phone, "Enter a valid phone number using 10 to 15 digits only.");
      valid = false;
    }

    const passwordError = getPasswordError(fields.password.value);
    if (passwordError) {
      showError(fields.password, passwordError);
      valid = false;
    }

    if (fields.password.value && fields.confirm.value && fields.password.value !== fields.confirm.value) {
      showError(fields.confirm, "Passwords do not match.");
      valid = false;
    }

    const termsError = registerForm.querySelector("#termsError");
    if (!fields.terms.checked) {
      termsError.textContent = "Accept the farm data policy to continue.";
      valid = false;
    } else {
      termsError.textContent = "";
    }

    if (!valid) return;
    localStorage.setItem("dairyFarmRegisteredUser", fields.email.value.trim());
    localStorage.setItem("dairyFarmRegisteredPassword", fields.password.value);
    goWithLoader("login.html");
  });
}
