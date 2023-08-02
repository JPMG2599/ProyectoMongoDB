const backButton = document.getElementById("backButton");
const editProfile = document.getElementById("edit-profile");
const modalEditBook = document.getElementById("editProfile-Modal"); // modal
const modalClose = document.getElementById("closeBook-modal");

// boton para devolverse
backButton.addEventListener("click", (e) => history.back());

// boton de editar perfil
editProfile.addEventListener("click", (e) => {
  // obtenemos todos los datos del libro que almacenamos en el atr
  let profileData = JSON.parse(editProfile.getAttribute("data"));

  // mostramos el modal window
  modalEditBook.style.display = "flex";
  document.body.classList.add("editProfile-modal-open");

  // agregamos los datos a la pantalla modal
  document.getElementById("name").value = profileData.nombre;
  document.getElementById("surname").value = profileData.apellido1;
  document.getElementById("userID").value = profileData.cedula;
  document.getElementById("email").value = profileData.correo_electronico;
  document.getElementById("profilePic").value = profileData.fotoPerfil;

  // Crear un nuevo elemento script
  const script = document.createElement("script");
  script.src = "../static/js/doubleModalForm.js";
  script.type = "module";
  // Agregar el script al final del body para cargarlo
  document.body.appendChild(script);
});

// boton cerrar
modalClose.addEventListener(
  "click",
  (e) => (window.location.href = window.location.pathname)
);
