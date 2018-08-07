/* Favorites-device event handling "click" on the next/prev arrow : slider */
const arrowPrev = document.querySelector(".favorites-device__arrow_prev"); //Prev Arrow
const arrowNext = document.querySelector(".favorites-device__arrow_next"); //Next Arrow
const container = document.querySelector(".favorites-device"); //Get Container
const containerColums = 6; //Num Conatiner Colums
const slideNum = container.querySelectorAll(".container-block").length; //Number Of Slides
let slideMove = 0; //Number Of Moved Slides

arrowPrev.addEventListener("click", PrewSlide);
arrowNext.addEventListener("click", NextSlide);

function NextSlide() {
  let hiddenSlides = slideNum - containerColums; //Number Of Hidden Slides
  if (slideMove < hiddenSlides) {
    slideMove++;
    container.style.marginLeft = "" + -200 * slideMove + "px";
  }
}

function PrewSlide() {
  if (slideMove > 0) {
    slideMove--;
    let newMargin = parseInt(container.style.marginLeft) + 200;
    container.style.marginLeft = "" + newMargin + "px";
  }
}
