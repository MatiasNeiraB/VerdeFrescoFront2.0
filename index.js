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