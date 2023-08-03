import { isEmpty } from "./validators.js";

// Boton de envio
const submitButton = document.querySelector(".submitData");
// inputs que se muestran
let inputs = document.querySelectorAll(".form-input-container.next input");
const nextInputs = document.querySelectorAll(
  ".form-input-container.next input"
);
// formulario
const myForm = document.getElementById("register-form");

let isFormValid = true;

// evento al hacer click al btn de enviar form
submitButton.addEventListener("click", (e) => {
  e.preventDefault();

  if (window.location.pathname === "/cambiar-contrasena")
    inputs = document.querySelectorAll(".form-input-container.current input");

  // Verificamos que ningun input este vacío
  for (const input of inputs) {
    if (isEmpty(input)) {
      alert("¡Error! Todos los campos son obligatorios.");
      window.location.href = window.location.pathname;
      isFormValid = false;
      break;
    }
  }

  // validamos las contraseñas de ser necesario
  try {
    const passwordField = document.getElementById("password");
    const confirmPasswordField = document.getElementById("confirmPassword");

    if (
      passwordField &&
      confirmPasswordField &&
      passwordField.value !== confirmPasswordField.value
    ) {
      isFormValid = false;
      alert("¡Error! Las contraseñas no coinciden");
      window.location.href = window.location.pathname;
    }
  } catch (error) {}

  if (isFormValid) myForm.submit();
});
