// APP STATE

// ===== SELECTORS ===== //
// ==================== //
const cartIcon = document.querySelector(".cart-icon");
const cartItems = document.querySelector(".cart-items");
const navIcons = document.querySelector(".nav-icons");
const mainNav = document.querySelector(".main-nav");
const thumbnails = document.querySelector(".thumbnails-images");
const slider = document.querySelector(".product-slider");
const closeSliderBtn = document.querySelector(".close-slider");
const sliderMainImg = document.querySelector(".slider-main-img");
const sliderThumbnails = document.querySelector(".slider-thumbnails");

// ====== EVENTS ====== //
// ==================== //
cartIcon.addEventListener("click", () => cartItems.classList.toggle("hidden"));

navIcons.addEventListener("click", () => mainNav.classList.toggle("nav-open"));

// Show the slider with clicked thumbnail image
thumbnails.addEventListener("click", (e) => {
  const current = e.target.closest("img");
  if (!current) return;

  sliderMainImg.setAttribute("src", current.getAttribute("src"));

  // mark the initail thumbnail as selected
  sliderThumbnails.querySelectorAll("img").forEach((img) => {
    // remove the previous selected image
    img.classList.remove("selected");

    if (img.getAttribute("src") === current.getAttribute("src")) {
      img.classList.add("selected");
    }
  });

  slider.classList.remove("hidden-slider");
});

// Close the Slider by clicking the overlay Or the close icon
slider.addEventListener("click", (e) => {
  const currClass = e.target.getAttribute("class");
  const closeIcon = e.target.closest(".close-slider");

  if (currClass === "product-slider" || closeIcon)
    slider.classList.add("hidden-slider");
});

sliderThumbnails.addEventListener("click", (e) => {
  const current = e.target.closest("img");
  if (!current) return;

  // remove the selected class from all thumbnails
  current.parentElement.querySelector(".selected").classList.remove("selected");
  // add the selected class to the active thumbnail
  current.classList.add("selected");

  sliderMainImg.setAttribute("src", current.getAttribute("src"));
});
