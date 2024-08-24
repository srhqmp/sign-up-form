function validateRequired(value, errorMessage, label) {
  errorMessage.textContent = value
    ? ""
    : `* ${label.innerText.toLowerCase()} is required`;
}

function validateEmail(value, errorMessage) {
  // https://stackoverflow.com/questions/201323/how-can-i-validate-an-email-address-using-a-regular-expression
  const validEmail = value.match(
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
  );
  errorMessage.textContent = validEmail ? "" : "* email is invalid";
}

function validatePassword() {
  const passwordField = document.querySelector(".field-password");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirm-password");
  const errorMesage = passwordField.querySelector(".error-message");
  confirmPassword.className = "";

  if (confirmPassword.value === password.value) {
    errorMesage.textContent = "";
    password.setCustomValidity("");
    confirmPassword.setCustomValidity("");
  } else {
    errorMesage.textContent = "* passwords do not match";
    password.setCustomValidity("invalid");
    confirmPassword.setCustomValidity("invalid");
  }
}

function updateValue(e) {
  const target = e.target;
  const field = document.querySelector(`.field-${target.id}`);
  const label = field.querySelector("label");
  const errorMessage = field.querySelector(".error-message");

  target.className = "";

  if (target.required) validateRequired(target.value, errorMessage, label);
  if (target.value && target.type === "email")
    validateEmail(target.value, errorMessage);
  if (
    target.value &&
    (target.type === "password" || target.type === "confirm-password")
  )
    validatePassword();
}

[...document.getElementsByTagName("input")].forEach((input) => {
  input.addEventListener("input", updateValue);
});

document
  .querySelector(".submit-button")
  .addEventListener("click", (e) => e.preventDefault());
