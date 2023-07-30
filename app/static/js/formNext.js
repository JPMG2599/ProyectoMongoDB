import { isEmpty } from "./validators.js";

const submitButton = document.querySelector(".submitData"); // enviar form
const currentInputsDiv = document.querySelectorAll(
  ".form-input-container.current"
); // obtener los campos actuales (div .current)
const currentInputs = document.querySelectorAll(
  ".form-input-container.current input"
);
const nextButton = document.getElementById("next"); // Siguiente pagina
const nextInputsDiv = document.querySelectorAll(".form-input-container.next"); // div de inputs ocultos
const nextInputs = document.querySelectorAll(
  ".form-input-container.next input"
); // inputs ocultos

// form con btn de Next
export const nextButtonForm = () => {
  // No todos los forms tienen estos botones/campos
  try {
    const previousButton = document.getElementById("previous"); // vovler al inicio **
    const goBack = document.getElementById("goBack"); // volver al inicio **
  } catch (error) {
    console.log(error);
  }

  // Manejamos el boton next
  nextButton.addEventListener("click", (e) => {
    // evitamos que se envie el form
    e.preventDefault();

    // Verificamos que TODOS los campos tengan algun valor
    for (const input of currentInputs) {
      // Algun campo NO tiene datos
      if (isEmpty(input)) {
        alert("¡Error! Todos los campos son obligatorios.");
        window.location.href = window.location.pathname;
        break;
      }
      // Todos los campos TIENEN datos
      else if (!isEmpty(input))
        for (const input of currentInputsDiv) input.style.display = "none";
    }

    // Mostramos los campos ocultos ya que todos los campos tiene un valores
    for (const input of nextInputsDiv) input.style.display = "flex";
    for (const input of nextInputs) input.required = true;

    nextButton.style.display = "none";
    submitButton.style.display = "flex";

    // ocultando botones de atras
    try {
      document.getElementById("previous").style.display = "none";
      document.getElementById("goBack").style.display = "";
    } catch {}
    console.log(nextInputs);
  });
};

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
});


// form sin btn de Next
export const submitForm = () => {
  // Verificamos que TODOS los campos tengan algun valor
  for (const input of currentInputs) {
    // Algun campo NO tiene datos
    if (isEmpty(input)) {
      alert("¡Error! Todos los campos son obligatorios.");
      window.location.href = window.location.pathname;
      break;
    }
  }
};
