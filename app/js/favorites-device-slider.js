/* Favorites-device event handling "click" on the next/prev arrow : slider */
const arrowPrev = document.querySelector(".favorites-device__arrow_prev"); //Prev Arrow
const arrowNext = document.querySelector(".favorites-device__arrow_next"); //Next Arrow
const container = document.querySelector(".favorites-device"); //Get Container
const slideNum = container.querySelectorAll(".container-block").length; //Number Of Slides
const containerColums = parseInt(
  parseInt(document.querySelector(".container__section_sect3").offsetWidth) /
    200
); //Num Conatiner Colums
let slideMove = 0; //Number Of Moved Slides

//Change Next Arrow
if (slideNum > containerColums) {
  arrowNext.classList.add("container-slide__arrow_active");
}

//Event
arrowPrev.addEventListener("click", PrewSlide);
arrowNext.addEventListener("click", NextSlide);

function NextSlide() {
  console.log(containerColums);
  //Change Prev Arrow
  arrowPrev.classList.add("container-slide__arrow_active");

  let hiddenSlides = slideNum - containerColums; //Number Of Hidden Slides
  if (slideMove < hiddenSlides) {
    slideMove++;
    container.style.marginLeft = "" + -200 * slideMove + "px";

    //Change Next Arrow
    if (hiddenSlides == slideMove) {
      arrowNext.classList.remove("container-slide__arrow_active");
    }
  }
}

function PrewSlide() {
  if (slideMove > 0) {
    //Change Next Arrow
    arrowNext.classList.add("container-slide__arrow_active");

    slideMove--;
    let newMargin = parseInt(container.style.marginLeft) + 200;
    container.style.marginLeft = "" + newMargin + "px";

    //Change Prev Arrow
    if (slideMove == 0) {
      arrowPrev.classList.remove("container-slide__arrow_active");
    }
  }
}
