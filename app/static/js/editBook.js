try {
  const editBook_button = document.getElementById("edit-book"); // lapiz de editar
  const modalEditBook = document.getElementById("editBook-Modal"); // modal
  const modalClose = document.getElementById("closeBook-modal");

  editBook_button.addEventListener("click", (e) => {
    // obtenemos todos los datos del libro que almacenamos en el atr
    let bookData = JSON.parse(editBook_button.getAttribute("bookData"));

    // mostramos el modal window
    modalEditBook.style.display = "flex";
    document.body.classList.add("editBook-modal-open");

    // agregamos los datos a la pantalla modal
    document.getElementById("title").value = bookData.titulo;
    document.getElementById("author").value = bookData["autor"];
    document.getElementById("genre").value = bookData["genero"];
    document.getElementById("publishDate").value =
      bookData["ano_publicacion"].split(" ")[0];
    document.getElementById("availability").value = bookData["disponibilidad"];
    document.getElementById("imageURL").value = bookData["imagen_Url"];
    document.getElementById("totalOfCopies").value = bookData["copias_totales"];
    document.getElementById("description").value = bookData["descripcion"];

    // Crear un nuevo elemento script
    const script = document.createElement("script");
    script.src = "../static/js/doubleModalForm.js";
    script.type = "module";
    // Agregar el script al final del body para cargarlo
    document.body.appendChild(script);
  });

  modalClose.addEventListener(
    "click",
    (e) => (window.location.href = window.location.pathname)
  );
} catch (err) {
  console.log(err);
}
