try {
  const reserveBook_Button = document.getElementById("reserve-book"); // btn
  const modalReserveBook = document.getElementById("reserveBook-Modal"); // contenedor
  const modalClose = document.getElementById("closeReserve-modal"); // btn de cerrar
  const addBook_Button_2 = document.getElementById("add-book-i");

  reserveBook_Button.addEventListener("click", (e) => {
    // obtener los datos de book del att book-title
    const bookTitle = reserveBook_Button.getAttribute("book-title");
    const userEmail = reserveBook_Button.getAttribute("userEmail");

    modalReserveBook.style.display = "flex";
    document.body.classList.add("addBook-modal-open");
    // agregar los datos a la pantalla modal
    document.getElementById("userEmail").value = userEmail;
    document.getElementById("bookName").value = bookTitle;

    // Crear un nuevo elemento script
    const script = document.createElement("script");
    script.src = "../static/js/doubleModalForm.js";
    script.type = "module";
    // Agregar el script al final del body para cargarlo
    document.body.appendChild(script);

    modalClose.addEventListener("click", (e) => {
      console.log("clicked")((window.location.href = window.location.pathname));
    });
  });
} catch (err) {
  console.log(err);
}
