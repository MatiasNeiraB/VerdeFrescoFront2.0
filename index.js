//NAV-BAR

window.addEventListener('scroll', function () {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 0) {
    navbar.classList.add('scrolling');
  } else {
    navbar.classList.remove('scrolling');
  }
});


//CARROUSELL

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


//USER NAME

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


//CARRITO

//Función para actualizar el número de artículos en el carrito
document.addEventListener('DOMContentLoaded', () => {
  const updateCartItemCount = () => {
  const cartItemCountElement = document.getElementById('cartItemCount');
  
  //Recuperar el carrito del localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || {};
  
  //Calcular el número total de artículos en el carrito  
  const totalItems = Object.values(cart).reduce((acc, curr) => acc + curr, 0);
  
  //Actualizar el contenido del elemento con el número total de artículos
  cartItemCountElement.textContent = totalItems;
  };

  // Función para mostrar los productos en el carrito
const displayCart = () => {
  const cartItemsElement = document.getElementById('cart-items');
  cartItemsElement.innerHTML = ''; // Limpiar el contenido anterior

  const cart = JSON.parse(localStorage.getItem('cart')) || {};
  let totalAmount = 0;

  //Función para obtener el precio de cada producto
  const getProductPrice = (productId) => {
      const prices = {
          apio: 320,
          zanahoria: 220,
          tomate: 350,
          ajo: 400,
          limon: 200,
          naranja: 250,
          frambuesa: 550
      };

      return prices[productId] || 0;
  };

  for (const productId in cart) {
      const productElement = document.createElement('article');
      productElement.classList.add('cart-article');

      const productImageContainer = document.createElement('div');
      productImageContainer.classList.add('cart-left');

      const productImage = document.createElement('img');
      productImage.src = `../assets/img/product-${productId}.png`;
      productImage.alt = productId;
      productImage.classList.add('cart-image'); // Nueva clase para las imágenes

      const productDetails = document.createElement('div');
      productDetails.classList.add('cart-right');

      const productName = document.createElement('h3');
      productName.textContent = productId.charAt(0).toUpperCase() + productId.slice(1);

      const productQuantity = document.createElement('p');
      productQuantity.textContent = `Cantidad: ${cart[productId]}`;

      // Obtener el precio de cada producto y calcular el total
      const productPrice = document.createElement('p');
      const pricePerItem = getProductPrice(productId);
      const totalProductPrice = pricePerItem * cart[productId];
      productPrice.textContent = `Importe: $${totalProductPrice.toFixed(2)}`;

      totalAmount += totalProductPrice;

      productDetails.appendChild(productName);
      productDetails.appendChild(productQuantity);
      productDetails.appendChild(productPrice);

      productImageContainer.appendChild(productImage); // Añadir la imagen al contenedor
      productElement.appendChild(productImageContainer); // Añadir el contenedor al artículo
      productElement.appendChild(productDetails);

      cartItemsElement.appendChild(productElement);
  }

  // Actualizar el importe total
  document.getElementById('total-amount').textContent = totalAmount.toFixed(2);
};




  // Función para agregar productos al carrito
  const addToCart = (event) => {
      const productId = event.target.closest('.product').dataset.productId;
      let cart = JSON.parse(localStorage.getItem('cart')) || {};
      cart[productId] = (cart[productId] || 0) + 1;
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartItemCount();
      displayCart();
      alert(`${productId} ha sido agregado al carrito.`);
  };

  // Seleccionar todos los botones "Comprar" y agregar el evento click
  const buyButtons = document.querySelectorAll('.buy-button');
  buyButtons.forEach(button => {
    button.addEventListener('click', addToCart);
  });

  // Actualizar el número de artículos y mostrar el carrito al cargar la página
  updateCartItemCount();
  displayCart();
});
