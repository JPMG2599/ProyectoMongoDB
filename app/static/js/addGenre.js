import { isEmpty } from "./validators.js";

const addGenreButton = document.getElementById("add-genre"); // btn para agregar generos
const modalAddGenre = document.getElementById("addGenre-Modal"); // modal de generos
const modalClose = document.getElementById("closeGenre-modal"); // btn para cerrar modal
const submitButton = document.getElementById("addGenre-submit");
const myForm = document.getElementById("genre-form");
let isFormValid = true;

// Al hacer click al btn de agregar genero, muestre el modal
addGenreButton.addEventListener("click", (e) => {
  // mostramos el modal window
  modalAddGenre.style.display = "flex";
  document.body.classList.add("addGenre-modal-open");
});

// boton cerrar
modalClose.addEventListener(
  "click",
  (e) => (window.location.href = window.location.pathname)
);

submitButton.addEventListener("click", (e) => {
  e.preventDefault();

  // obtenemos el valor del campo
  const genreName = document.getElementById("genre-name");

  // Verificamos que el campo no este vacío
  if (isEmpty(genreName)) {
    alert("¡Error! Todos los campos son obligatorios");
    window.location.href = window.location.pathname;
    isFormValid = false;
  }

  // se envia el form
  if (isFormValid) if (window.confirm("¿Seguro que desea continuar?")) myForm.submit();
});
