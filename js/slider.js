const slider = document.querySelector("[data-slider]");

if (slider) {
  const slides = slider.querySelectorAll("[data-slide]");
  let active = 0;

  function showSlide(index) {
    slides.forEach((slide, slideIndex) => {
      slide.hidden = slideIndex !== index;
    });
  }

  showSlide(active);
  setInterval(() => {
    active = (active + 1) % slides.length;
    showSlide(active);
  }, 4200);
}
