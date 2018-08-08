/* Favorites-scenarios event handling "click" on the next/prev arrow : slider & fade in/out animation */
const FavArrowPrev = document.querySelector(".favorites-scenarios__arrow_prev"); //Prev Arrow
const FavArrowNext = document.querySelector(".favorites-scenarios__arrow_next"); //Next Arrow
const FavContainer = document.querySelector(".favorites-scenarios"); //Get Container
const FavContainerBlocks = FavContainer.querySelectorAll(".container-block");
const FavSlideNum = FavContainerBlocks.length; //Number Of Slides
const FavPageBlocksNum = 9; //Number Of Blocks In Slide
let FavSlideMove = 0; //Number Of Moved Slides

//Change Next Arrow
if (FavSlideNum > FavPageBlocksNum) {
  FavArrowNext.classList.add("container-slide__arrow_active");
}

//Event
FavArrowPrev.addEventListener("click", FavPrewSlide);
FavArrowNext.addEventListener("click", FavNextSlide);

/* FavNextSlide */
function FavNextSlide() {
  let FavSlide = (FavSlideMove + 1) * FavPageBlocksNum; //Number Of Moved Blocks In Slide

  if (FavSlide < FavSlideNum) {
    //Change Prev Arrow
    FavArrowPrev.classList.add("container-slide__arrow_active");

    FavSlideMove++;
    for (let i = FavSlide - FavPageBlocksNum; i < FavSlide; i++) {
      //Animate
      FavContainerBlocks[i].style.display = "none";
      if (i + FavPageBlocksNum < FavSlideNum) {
        FavContainerBlocks[i + FavPageBlocksNum].style.transition = "all 0s";
        fadeIn(FavContainerBlocks[i + FavPageBlocksNum], "flex");
      }
    }
  }
  //Change Next Arrow
  if (FavSlideNum < FavSlide + FavPageBlocksNum)
    FavArrowNext.classList.remove("container-slide__arrow_active");
}

/* FavPrewSlide */
function FavPrewSlide() {
  let FavSlide = FavSlideMove * FavPageBlocksNum - 1; //Number Of Moved Blocks In Slide
  if (FavSlide > 0) {
    //Change Next Arrow
    FavArrowNext.classList.add("container-slide__arrow_active");
    FavSlideMove--;
    for (let i = FavSlide; i > FavSlide - FavPageBlocksNum; i--) {
      //Animate
      fadeIn(FavContainerBlocks[i], "flex");
    }
  }

  //Change Prev Arrow
  if (FavSlide - FavPageBlocksNum <= 0) {
    FavArrowPrev.classList.remove("container-slide__arrow_active");
  }
}

/* FadeIn */
function fadeIn(el, display) {
  el.style.opacity = 0;
  el.style.display = display || "block";

  (function fade() {
    var val = parseFloat(el.style.opacity);
    if (!((val += 0.05) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
}
