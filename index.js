/*NAV-BAR*/

window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 0) {
        navbar.classList.add('scrolling');
    } else {
        navbar.classList.remove('scrolling');
    }
});

/*CARROUSELL*/

document.addEventListener("DOMContentLoaded", function () {
    const carouselSlide = document.querySelector(".carousel-slide");
    const carouselImages = document.querySelectorAll(".carousel-image");
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");
    let currentIndex = 0;
  
    
    function showImage(index) {
      const slideWidth = carouselImages[0].clientWidth;
      carouselSlide.style.transform = `translateX(-${index * slideWidth}px)`;
      currentIndex = index;
    }
  
    
    showImage(currentIndex);
  
   
    prevButton.addEventListener("click", function () {
      currentIndex =
        currentIndex > 0 ? currentIndex - 1 : carouselImages.length - 1;
      showImage(currentIndex);
    });
  
    
    nextButton.addEventListener("click", function () {
      currentIndex =
        currentIndex < carouselImages.length - 1 ? currentIndex + 1 : 0;
      showImage(currentIndex);
    });
  });