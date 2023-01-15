const menuBtn = document.querySelector(".menu");
const navegacion = document.querySelector(".navegacion");
const imagenes = document.querySelectorAll("img");
const btnTodos = document.querySelector(".todos");
const btnCarnes = document.querySelector(".carnes");
const btnPizzas = document.querySelector(".pizzas");
const btnPostres = document.querySelector(".postres");
const btnBebidas = document.querySelector(".bebidas");
const contenedorPlatos = document.querySelector(".platos");
const menuLinks = document.querySelectorAll('.navegacion a[href^="#"]');

document.addEventListener("DOMContentLoaded", () => {
  eventos();
  platos();
});

const eventos = () => {
  menuBtn.addEventListener("click", abrirMenu);
};

const abrirMenu = () => {
  navegacion.classList.remove("ocultar");
  botonCerrar();
};

const botonCerrar = () => {
  const btnCerrar = document.createElement("p");
  const overlay= document.createElement("div");
  overlay.classList.add("pantalla-completa");
  const body = document.querySelector("body");
  body.appendChild(overlay);
  btnCerrar.textContent = "x";
  btnCerrar.classList.add("btn-cerrar");
  navegacion.appendChild(btnCerrar);
  cerrarMenu(btnCerrar,overlay,menuLinks);
};

const cerrarMenu = (boton, overlay) => {
  boton.addEventListener("click", () => {
    navegacion.classList.add("ocultar");
    boton.remove();
    overlay.remove();
  });

  overlay.onclick = function () {
    navegacion.classList.add("ocultar");
    boton.remove();
    overlay.remove();
  };

  menuLinks.forEach(menuLink => {
    menuLink.addEventListener("click", function(){
        navegacion.classList.add("ocultar");
        boton.remove();
        overlay.remove();
    });
  });

};


const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const imagen = entry.target;
      imagen.src = imagen.dataset.src;
      observer.unobserve(imagen);
    }
  });
});

imagenes.forEach((imagen) => {
  observer.observe(imagen);
});

const platos = () => {
  let platosArreglo = [];
  const platos = document.querySelectorAll(".plato");
  platos.forEach((plato) => (platosArreglo = [...platosArreglo, plato]));

  const carnes = platosArreglo.filter(
    (carne) => carne.getAttribute("data-plato") === "carne"
  );
  const pizzas = platosArreglo.filter(
    (pizza) => pizza.getAttribute("data-plato") === "pizza"
  );
  const postres = platosArreglo.filter(
    (postre) => postre.getAttribute("data-plato") === "postre"
  );
  const bebidas = platosArreglo.filter(
    (bebida) => bebida.getAttribute("data-plato") === "bebida"
  );

  mostrarPlatos(carnes, pizzas, postres, bebidas, platosArreglo);
};

const mostrarPlatos = (carnes, pizzas, postres, bebidas, todos) => {
  btnCarnes.addEventListener("click", () => {
    limpiarHtml(contenedorPlatos);
    carnes.forEach((carne) => contenedorPlatos.appendChild(carne));
  });
  btnPizzas.addEventListener("click", () => {
    limpiarHtml(contenedorPlatos);
    pizzas.forEach((pizza) => contenedorPlatos.appendChild(pizza));
  });
  btnPostres.addEventListener("click", () => {
    limpiarHtml(contenedorPlatos);
    postres.forEach((postre) => contenedorPlatos.appendChild(postre));
  });
  btnBebidas.addEventListener("click", () => {
    limpiarHtml(contenedorPlatos);
    bebidas.forEach((bebida) => contenedorPlatos.appendChild(bebida));
  });
  btnTodos.addEventListener("click", () => {
    limpiarHtml(contenedorPlatos);
    todos.forEach((todo) => contenedorPlatos.appendChild(todo));
  });
};

const limpiarHtml = (contenedor) => {
  while (contenedor.firstChild) {
    contenedor.removeChild(contenedor.firstChild);
  }
};



