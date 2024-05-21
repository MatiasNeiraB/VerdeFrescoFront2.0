/*NAV-BAR*/

window.addEventListener('scroll', function () {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 0) {
    navbar.classList.add('scrolling');
  } else {
    navbar.classList.remove('scrolling');
  }
});


/*CARROUSELL*/

document.addEventListener("DOMContentLoaded", function () {
  const carrouselSlide = document.querySelector(".carrousel-slide");
  const carrouselImages = document.querySelectorAll(".carrousel-image");
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");
  let currentIndex = 0;


  function showImage(index) {
    const slideWidth = carrouselImages[0].clientWidth;
    carrouselSlide.style.transform = `translateX(-${index * slideWidth}px)`;
    currentIndex = index;
  }


  showImage(currentIndex);


  prevButton.addEventListener("click", function () {
    currentIndex =
      currentIndex > 0 ? currentIndex - 1 : carrouselImages.length - 1;
    showImage(currentIndex);
  });


  nextButton.addEventListener("click", function () {
    currentIndex =
      currentIndex < carrouselImages.length - 1 ? currentIndex + 1 : 0;
    showImage(currentIndex);
  });
});


/*USER NAME*/

function nameUser() {
  let userLS = JSON.parse(localStorage.getItem('users'));
  let nameLS = userLS.name;
  let iconUser = document.getElementById('iconUser');
  if ( iconUser) {
    iconUser.style.display = 'none';
  let nameUser = document.getElementById('nameUser');
    nameUser.textContent = nameLS;
  } 
}


/*CARRITO*/

/*Agregar productos al carrito*/

document.addEventListener('DOMContentLoaded', () => {
  const updateCartItemCount = () => {
    const cartItemCountElement = document.getElementById('cartItemCount');
    // Recupero el carrito del localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    // Calcular el número total de artículos en el carrito
    const totalItems = Object.values(cart).reduce((acc, curr) => acc + curr, 0);
    // Actualizar el contenido del elemento con el número total de artículos
    cartItemCountElement.textContent = totalItems;
  };

  const addToCart = (event) => {
    const productId = event.target.closest('.product').dataset.productId;
    let cart = JSON.parse(localStorage.getItem('cart')) || {};
    cart[productId] = (cart[productId] || 0) + 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartItemCount();
  };

  const buyButtons = document.querySelectorAll('.buy-button');
  buyButtons.forEach(button => {
    button.addEventListener('click', addToCart);
  });

  updateCartItemCount();
});

/*Agregar cantidad en la barra de navegacion*/

document.addEventListener('DOMContentLoaded', () => {
  // Actualizar el número de artículos en el carrito
  const updateCartItemCount = () => {
      const cartItemCountElement = document.getElementById('cartItemCount');
      // Recuperar el carrito del localStorage
      const cart = JSON.parse(localStorage.getItem('cart')) || {};
      // Calcular el número total de artículos en el carrito
      const totalItems = Object.values(cart).reduce((acc, curr) => acc + curr, 0);
      // Actualizar el contenido del elemento con el número total de artículos
      cartItemCountElement.textContent = totalItems;
  };

  // Llamar a la función para actualizar el número de artículos al cargar la página
  updateCartItemCount();
});
