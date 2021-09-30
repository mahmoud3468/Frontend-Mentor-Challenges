const questionHeader = document.querySelectorAll(".question__header");
const questionBody = document.querySelectorAll(".question__body");

for (let i = 0; i < questionHeader.length; i++) {
  questionHeader[i].addEventListener("click", () => {
    for (let q = 0; q < questionBody.length; q++) {
      if (i === q) {
        questionHeader[i].classList.toggle("bold");
        questionBody[q].classList.toggle("active");
      } else {
        questionBody[q].classList.remove("active");
        questionHeader[q].classList.remove("bold");
      }
    }
  });
}
