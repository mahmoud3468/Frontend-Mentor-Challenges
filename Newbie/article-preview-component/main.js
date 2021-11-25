const shareBtn = document.querySelector(".share");
const activeFooter = document.querySelector(".active-footer");

shareBtn.addEventListener("click", () => {
  activeFooter.classList.toggle("active");
});
