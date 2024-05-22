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
    nameUser.href = './pages/login.html';
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
  const updateCartItemCount = () => {
  const cartItemCountElement = document.getElementById('cartItemCount');
  const cart = JSON.parse(localStorage.getItem('cart')) || {}; 
  const totalItems = Object.values(cart).reduce((acc, curr) => acc + curr, 0);
  
  cartItemCountElement.textContent = totalItems;
  };

  const displayCart = () => {
  const cartItemsElement = document.getElementById('cart-items');
  cartItemsElement.innerHTML = '';

  const cart = JSON.parse(localStorage.getItem('cart')) || {};
  let totalAmount = 0;

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
      productImage.classList.add('cart-image');

      const productDetails = document.createElement('div');
      productDetails.classList.add('cart-right');

      const productName = document.createElement('h3');
      productName.textContent = productId.charAt(0).toUpperCase() + productId.slice(1);

      const productQuantity = document.createElement('p');
      productQuantity.textContent = `Cantidad: ${cart[productId]}`;

      const productPrice = document.createElement('p');
      const pricePerItem = getProductPrice(productId);
      const totalProductPrice = pricePerItem * cart[productId];
      productPrice.textContent = `Importe: $${totalProductPrice.toFixed(2)}`;

      totalAmount += totalProductPrice;

      productDetails.appendChild(productName);
      productDetails.appendChild(productQuantity);
      productDetails.appendChild(productPrice);

      productImageContainer.appendChild(productImage);
      productElement.appendChild(productImageContainer);
      productElement.appendChild(productDetails);

      cartItemsElement.appendChild(productElement);
  }

  
  document.getElementById('total-amount').textContent = totalAmount.toFixed(2);
};


  const addToCart = (event) => {
      const productId = event.target.closest('.product').dataset.productId;
      let cart = JSON.parse(localStorage.getItem('cart')) || {};
      cart[productId] = (cart[productId] || 0) + 1;
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartItemCount();
      displayCart();
      alert(`${productId} ha sido agregado al carrito.`);
  };

  const buyButtons = document.querySelectorAll('.buy-button');
  buyButtons.forEach(button => {
    button.addEventListener('click', addToCart);
  });


  updateCartItemCount();
  displayCart();
});
