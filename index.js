//NAV-BAR

//Cambiar de color de fondo al scrollear en la barra de navegacion
window.addEventListener('scroll', function () {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 0) {
    navbar.classList.add('scrolling');
  } else {
    navbar.classList.remove('scrolling');
  }
});


//CARROUSEL

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
  let iconUser = document.getElementById('iconUser');
  let nameUser = document.getElementById('nameUser');

  if (userLS) {
    let nameLS = userLS.name;
    if (iconUser) {
      iconUser.style.display = 'none';
    }
    nameUser.innerHTML = '';

    let userNameText = document.createElement('span');
    userNameText.id = 'userNameText';
    userNameText.textContent = nameLS;

    let logoutLink = document.createElement('a');
    logoutLink.href = '#';
    logoutLink.id = 'logoutLink';
    logoutLink.textContent = '- Salir';

    logoutLink.addEventListener('click', logoutUser);

    nameUser.appendChild(userNameText);
    nameUser.appendChild(logoutLink);
  } else {
    if (iconUser) {
      iconUser.style.display = 'inline';
    }
    nameUser.innerHTML = '';
    const token = localStorage.getItem('token');
    if (token) {
      nameUser.href = '/index.html';
    } else {
      nameUser.href = '/pages/login.html';
    }

    nameUser.innerHTML = '<i id="iconUser" class="fa-solid fa-user"></i>';
  }
}

function loginCheck(event) {
  event.preventDefault();
  let user = { name: 'NombreUsuario' };
  localStorage.setItem('users', JSON.stringify(user));
  window.location.href = '/index.html';
}

function logoutUser() {
  localStorage.clear();
  window.location.href = '/pages/login.html';
}

document.addEventListener('DOMContentLoaded', nameUser);



//CARRITO

document.addEventListener('DOMContentLoaded', () => {
  //Actualizar numero en el carrito
  const updateCartItemCount = () => {
    const cartItemCountElement = document.getElementById('cartItemCount');
    const cart = JSON.parse(localStorage.getItem('cart')) || {};  //Recupera datos del carrito en local storage
    const totalItems = Object.values(cart).reduce((acc, curr) => acc + curr, 0);  //Calcular numero de articulos en el carrito

    cartItemCountElement.textContent = totalItems;
  };

  //Mostrar productos en el carrito
  const displayCart = () => {
    const cartItemsElement = document.getElementById('cart-items');
    cartItemsElement.innerHTML = ''; //Limpio el contenido anterior

    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    let totalAmount = 0;

    //Obtener el precio de cada producto
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

    //Crear segun el id los datos del producto
    for (const productId in cart) {
      const productElement = document.createElement('article');
      productElement.classList.add('cart-article');

      const productImageContainer = document.createElement('div');
      productImageContainer.classList.add('cart-left');

      const productImage = document.createElement('img');
      productImage.src = `../assets/img/product-${productId}.png`;
      productImage.alt = productId;
      productImage.classList.add('cart-image');

      const productDetails = document.createElement('div');
      productDetails.classList.add('cart-right');

      const productName = document.createElement('h3');
      productName.textContent = productId.charAt(0).toUpperCase() + productId.slice(1);

      const productQuantity = document.createElement('p');
      productQuantity.textContent = `Cantidad: ${cart[productId]}`;

      //Obtener el precio de cada producto + Calculo total
      const productPrice = document.createElement('p');
      const pricePerItem = getProductPrice(productId);
      const totalProductPrice = pricePerItem * cart[productId];
      productPrice.textContent = `Importe: $${totalProductPrice.toFixed(2)}`;

      totalAmount += totalProductPrice;

      //Datos del producto
      productDetails.appendChild(productName);
      productDetails.appendChild(productQuantity);
      productDetails.appendChild(productPrice);

      //Contenedor imagen
      productImageContainer.appendChild(productImage); //Añadir imagen al contendor
      productElement.appendChild(productImageContainer); //Añadir el contenedor al articulo
      productElement.appendChild(productDetails);

      cartItemsElement.appendChild(productElement);
    }

    //Actualizar el importe total
    document.getElementById('total-amount').textContent = totalAmount.toFixed(2);
  };


  //Añadir productos al carrito
  const addToCart = (event) => {
    const productId = event.target.closest('.product').dataset.productId;
    let cart = JSON.parse(localStorage.getItem('cart')) || {};
    cart[productId] = (cart[productId] || 0) + 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartItemCount();
    displayCart();
    alert(`${productId} ha sido agregado al carrito.`);
  };

  //Evento para "Comprar"
  const buyButtons = document.querySelectorAll('.buy-button');
  buyButtons.forEach(button => {
    button.addEventListener('click', addToCart);
  });

  // Actualizar numero de articulos y mostrarlo en el carrito al cargar la pantalla
  updateCartItemCount();
  displayCart();
});

var axios = require('axios');

function seeCart() {
  const getCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Authorization': `Bearer ${token}`,
      };
      const response = await axios.get("http://localhost:3000/cart", { headers });
      console.log(response.data);
    } catch (error) {
      if (error.response.status === 403) {
        localStorage.removeItem('token');
        const token = localStorage.getItem('token');
        if (!token) {
          window.location.href = "http://127.0.0.1:5500/pages/login.html";
          console.log("Token eliminado del localStorage debido a un error 403");
        }
      } else {
        console.error("Error al obtener los carritos:", error);
      }
    }
  }
  getCart();

}


function exit(){
  const token = localStorage.getItem('token')
  const userName = localStorage.getItem('userName')
  localStorage.removeItem('token');
  localStorage.removeItem('userName');
}