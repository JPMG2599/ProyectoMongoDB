import { isEmpty } from "./validators.js";

// botones e inputs
const nextButton = document.getElementById("next"); // Siguiente pagina
let inputs,
  currentInputsDiv,
  nextInputsDiv,
  nextInputs,
  submitButton,
  myForm,
  modal;
const modals = document.querySelectorAll(".modal");
const editBook_button = document.getElementById("edit-book");
let isFormValid = true;

// Verificamos el modal abierto
for (const modalOpened of modals)
  if (modalOpened.style.display === "flex") modal = modalOpened;

// Asignamos los datos
inputs = modal.querySelectorAll(".form-input-container.current input"); // Campo Input .current
currentInputsDiv = modal.querySelectorAll(".form-input-container.current"); // Div de los input .current
submitButton = modal.querySelector(".submitData"); // boton de enviar
nextInputsDiv = modal.querySelectorAll(".form-input-container.next"); // Div de los input .next (los ocultos)
nextInputs = modal.querySelectorAll(".form-input-container.next input"); // Campo Input .next
myForm = modal.querySelector("form");

console.log(inputs);
console.log(nextInputs);

// Manejando evento click
nextButton.addEventListener("click", (e) => {
  // evitamos que se envie el form
  e.preventDefault();
  // bandera
  let allFieldsFilled = true;

  // Verificamos que TODOS los campos tengan algun valor
  for (const input of inputs) {
    // Algun campo NO tiene datos
    if (isEmpty(input)) {
      alert("¡Error! Todos los campos son obligatorios");
      window.location.href = window.location.pathname;
      allFieldsFilled = false;
      break;
    }
  }

  // Se ocultan los campos "current"
  if (allFieldsFilled) {
    for (const input of currentInputsDiv) input.style.display = "none";

    // Mostramos los campos ocultos ya que todos los campos tiene un valores
    for (const input of nextInputsDiv) input.style.display = "flex";
    for (const input of nextInputs) input.required = true;

    nextButton.style.display = "none";
    submitButton.style.display = "flex";
  }
});

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  for (const input of nextInputs) {
    // Verificar campos tengan datos EXCEPTO que sea las contraseñas en editarPerfil
    if (
      (input.id === "password" || input.id === "confirmPassword") &&
      window.location.pathname === "/perfil"
    )
      continue;
    else if (isEmpty(input)) {
      alert("¡Error! Todos los campos son obligatorios.");
      window.location.href = window.location.pathname;
      isFormValid = false;
      break;
    }
  }

  // validamos las contraseñas de ser necesario
  try {
    const passwordField = document.getElementById('password');
    const confirmPasswordField = document.getElementById('confirmPassword');

    if ((passwordField && confirmPasswordField) && passwordField.value !== confirmPasswordField.value) {
      isFormValid = false;
      alert("¡Error! Las contraseñas no coinciden");
      window.location.href = window.location.pathname;
      isFormValid = false;
    }
  } catch (error) {}

  // se envia el form
  if (isFormValid) {
    let result = window.confirm("¿Seguro que desea continuar?");
    if (result) myForm.submit();
  }
});