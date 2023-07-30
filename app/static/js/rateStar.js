try {
  const stars = document.querySelectorAll(".fa-star");
  const rateNumber = document.querySelector(".rate-number");

  // carga la calificacion en el p
  if (rateNumber.innerHTML !== 0) {
    for (let i = 0; i < parseInt(rateNumber.innerHTML); i++) {
      stars[i].className = "fa-solid fa-star";
    }
  }

  // mouse por encima de las estrellas
  const mouseOverStars = (e) => {
    let value = e.target.getAttribute("value");
    for (let i = 0; i < value; i++) {
      stars[i].className = "fa-solid fa-star";
    }
  };

  // mouse por fuera de las estrellas
  const mouseOutStars = (e) => {
    for (let i = parseInt(rateNumber.innerHTML); i < stars.length; i++)
      stars[i].className = "fa-regular fa-star";
  };

  // al hacer click a una estrella
  const mouseClickedStar = (e) => {
    let value = e.target.getAttribute("value");

    rateNumber.textContent = value;

    for (let i = 0; i < stars.length; i++) {
      stars[i].removeEventListener("mouseover", mouseOverStars);
      stars[i].removeEventListener("mouseout", mouseOutStars);
    }

    for (let i = 0; i < value; i++) {
      stars[i].className = "fa-solid fa-star";
    }

    for (let i = value; i < stars.length; i++) {
      stars[i].className = "fa-regular fa-star";
    }
  };

  // agregando los eventos a cada estrella
  stars.forEach((star) => {
    star.addEventListener("mouseover", mouseOverStars);
    star.addEventListener("mouseout", mouseOutStars);
    star.addEventListener("click", mouseClickedStar);
  });
} catch (err) {
  console.log(err);
}
