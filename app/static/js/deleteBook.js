try {
  const deleteButton = document.getElementById("delete-book");

  deleteButton.addEventListener("click", (e) => {
    let result = window.confirm("¿Seguro que desea continuar?");
    if (result) window.location.href = window.location.pathname + "/eliminar";
  });
} catch (err) {
  console.log(err);
}
