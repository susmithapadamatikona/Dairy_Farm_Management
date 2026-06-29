const registerForm = document.querySelector("#registerForm");

function showError(field, message) {
  const wrapper = field.closest(".form-field");
  const error = wrapper ? wrapper.querySelector(".error-message") : null;
  if (error) error.textContent = message;
  field.setAttribute("aria-invalid", message ? "true" : "false");
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

    if (fields.password.value && fields.password.value.length < 6) {
      showError(fields.password, "Use at least 6 characters.");
      valid = false;
    }

    if (fields.confirm.value && fields.password.value !== fields.confirm.value) {
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
    window.location.href = "login.html";
  });
}
