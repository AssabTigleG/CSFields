let images = Array.from(document.querySelectorAll('.scrolling-wrapper img'));
let currentImage = null;

images.forEach((img, index) => {
  img.addEventListener('click', function() {
    if(this.requestFullscreen) {
      this.requestFullscreen();
      currentImage = this;
    } else if(this.mozRequestFullScreen) { 
      this.mozRequestFullScreen();
    } else if(this.webkitRequestFullscreen) { 
      this.webkitRequestFullscreen();
    } else if(this.msRequestFullscreen) { 
      this.msRequestFullscreen();
    }
  });
});



document.addEventListener('keydown', function(e) {
 if (e.key === 'Escape') {
   document.exitFullscreen();
   window.scrollTo(scrollX, scrollY);
   currentImage = null;
 } else if (e.key === 'ArrowRight') {
    navigateToNextImage();
  } else if (e.key === 'ArrowLeft') {
    navigateToPreviousImage();
  }
});


let currentImageIndex = 0;

function navigateToNextImage() {
    document.exitFullscreen();
    document.onfullscreenchange = function (event) {
      if (!document.fullscreenElement) {
        currentImageIndex = (images.indexOf(currentImage) + 1) % images.length;
        currentImage = images[currentImageIndex];
        currentImage.requestFullscreen();
      }
    };
  }
  
  function navigateToPreviousImage() {
    document.exitFullscreen();
    document.onfullscreenchange = function (event) {
      if (!document.fullscreenElement) {
        currentImageIndex = (images.indexOf(currentImage) - 1 + images.length) % images.length;
        currentImage = images[currentImageIndex];
        currentImage.requestFullscreen();
      }
    };
  }



document.addEventListener('DOMContentLoaded', function () {
    const scrollingWrapper = document.querySelector('.scrolling-wrapper');
    let scrollAmount = 400; 
    const maxScrollAmount = 1200; 

    function scrollImages(direction, galleryId) {
      const scrollingWrapper = document.getElementById(galleryId).querySelector('.scrolling-wrapper');
      if (direction === 'left') {
          scrollingWrapper.scrollLeft -= scrollAmount;
      } else if (direction === 'right') {
          scrollingWrapper.scrollLeft += scrollAmount;
      }
  
      scrollAmount = Math.min(scrollAmount * 1.2, maxScrollAmount);
  }

    const scrollLeftButton = document.querySelector('.scroll-button:first-child');
    const scrollRightButton = document.querySelector('.scroll-button:last-child');

    

    document.querySelectorAll('.scroll-button').forEach(button => {
      button.addEventListener('click', function () {
          const direction = this.textContent.toLowerCase();
          const galleryId = this.parentElement.id;
          scrollImages(direction, galleryId);
      });
  });

});

let switchGalleryButtonDown = document.getElementById('switch-gallery-down');
let switchGalleryButtonUp = document.getElementById('switch-gallery-up');
switchGalleryButtonDown.addEventListener('click', function() {
    window.scrollBy({
        top: window.innerHeight,
        behavior: 'smooth'
    });
});
switchGalleryButtonUp.addEventListener('click', function() {
  window.scrollBy({
      top: -window.innerHeight,
      behavior: 'smooth'
  });
});


let hoverAudio = document.getElementById('hover-sound');
let clickAudio = document.getElementById('mouse-click');


images.forEach((img, index) => {
  img.addEventListener('click', function() {
    clickAudio.currentTime = 0;
    clickAudio.play();
  });
  img.addEventListener('mouseover', function() {
    hoverAudio.currentTime = 0;
    hoverAudio.play();
  });
});

let buttons = Array.from(document.querySelectorAll('button'));
buttons.forEach((button) => {
  button.addEventListener('click', function() {
    clickAudio.currentTime = 0;
    clickAudio.play();
  });
});

let keypressAudio = new Audio('./sounds/key.mp3');

document.addEventListener('keydown', function() {
    keypressAudio.currentTime = 0;
    keypressAudio.play();
});

