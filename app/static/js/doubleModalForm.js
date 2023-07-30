import { isEmpty } from "./validators.js";

const modalEdit = document.getElementById("editBook-Modal");
const modalReserve = document.getElementById("reserveBook-Modal");
const editBook_button = document.getElementById("edit-book");

// botones e inputs
const nextButton = document.getElementById("next"); // Siguiente pagina
let inputs, currentInputsDiv, nextInputsDiv, nextInputs, submitButton, modal, myForm;

// Verificamos el modal abierto
if (modalEdit.style.display !== "none") modal = modalEdit;
else if (modalReserve.style.display !== "none") modal = modalReserve;

// Asignamos los datos
inputs = modal.querySelectorAll(".form-input-container.current input"); // Campo Input .current
currentInputsDiv = modal.querySelectorAll(".form-input-container.current"); // Div de los input .current
submitButton = modal.querySelector(".submitData"); // boton de enviar
nextInputsDiv = modal.querySelectorAll(".form-input-container.next"); // Div de los input .next (los ocultos)
nextInputs = modal.querySelectorAll(".form-input-container.next input"); // Campo Input .next
myForm = modal.querySelector('form')

// Manejando evento click
nextButton.addEventListener("click", (e) => {
  // evitamos que se envie el form
  e.preventDefault();

  // Verificamos que TODOS los campos tengan algun valor
  for (const input of inputs) {
    // Algun campo NO tiene datos
    if (isEmpty(input)) {
      console.log("vacio");
      alert("¡Error! Todos los campos son obligatorios.");
      window.location.href = window.location.pathname;
      break;
    } else if (!isEmpty(input))
      for (const input of currentInputsDiv) input.style.display = "none";
  }

  // Mostramos los campos ocultos ya que todos los campos tiene un valores
  for (const input of nextInputsDiv) input.style.display = "flex";
  for (const input of nextInputs) input.required = true;

  nextButton.style.display = "none";
  submitButton.style.display = "flex";
});

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  for (const input of nextInputs) {
    // Algun campo NO tiene datos
    if (isEmpty(input)) {
      alert("¡Error! Todos los campos son obligatorios.");
      window.location.href = window.location.pathname;
      break;
    }
  }
  // se envia el form
  let result = window.confirm("¿Seguro que desea continuar?");
  if (result) myForm.submit();
});
