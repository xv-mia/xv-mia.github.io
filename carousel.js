const carousel = document.querySelector('.carousel');
const track = carousel.querySelector('.carousel-track');
const slides = Array.from(track.children);
const prevButton = carousel.querySelector('.carousel-button.prev');
const nextButton = carousel.querySelector('.carousel-button.next');

let currentIndex = 0;

const slideWidth = slides[0].getBoundingClientRect().width + 30; // Include gap
let currentPosition = 0;

// Clone slides for infinite effect
slides.forEach((slide) => {
  const clone = slide.cloneNode(true);
  track.appendChild(clone);
});

// Infinite scroll animation
function animateCarousel() {
  currentPosition -= 0.5; // Move left more slowly
  if (Math.abs(currentPosition) >= slideWidth * slides.length) {
    currentPosition = 0; // Reset position
  }
  track.style.transform = `translateX(${currentPosition}px)`;
  requestAnimationFrame(animateCarousel);
}

animateCarousel();

function updateCarousel() {
  const slideWidth = slides[0].getBoundingClientRect().width;
  track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

function moveToNextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  updateCarousel();
}

function moveToPrevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateCarousel();
}

nextButton.addEventListener('click', moveToNextSlide);
prevButton.addEventListener('click', moveToPrevSlide);

// Auto-scroll functionality
setInterval(moveToNextSlide, 3000); // Change slide every 3 seconds

// Copy text functionality
function copyText(button) {
  const textToCopy = button.textContent;
  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      const message = document.getElementById('copy-message');
      message.style.display = 'block';
      setTimeout(() => {
        message.style.display = 'none';
      }, 4000); // Hide after 2 seconds
    })
    .catch((err) => {
      console.error('Error al copiar el texto: ', err);
    });
}
