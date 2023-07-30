//import { showCurrentInputs } from "./showHide.js";
import { nextButtonForm } from './formNext.js'

try {
  const addBook_Button = document.getElementById("add-book");
  const modalAddBook = document.getElementById("addBook-Modal");
  const modalClose = document.getElementById("closeBook-modal");
  const addBook_Button_2 = document.getElementById("add-book-i");

  addBook_Button.addEventListener("click", (e) => {
    modalAddBook.style.display = "flex";
    document.body.classList.add("addBook-modal-open");
    nextButtonForm()
  });

  modalClose.addEventListener(
    "click",
    (e) => (window.location.href = window.location.pathname)
  );
} catch (err) {
  console.log(err);
}
