/* Event handling "touch move/end" for ".planned-scenario": hide/show arrow. */

const mainBlock = document.querySelector(".container__main-block");

mainBlock.addEventListener("touchmove", hideArrow);
mainBlock.addEventListener("touchend", showArrow);

function hideArrow() {
  this.classList.remove("container__main-block_after");
}

function showArrow() {
  this.classList.add("container__main-block_after");
}

/* Favorites-device event handling "click" on the next/prev arrow : slider */
const arrowPrev = document.querySelector(".favorites-device__arrow_prev"); //Prev Arrow
const arrowNext = document.querySelector(".favorites-device__arrow_next"); //Next Arrow
const container = document.querySelector(".favorites-device"); //Get Container
const slideNum = container.querySelectorAll(".container-block").length; //Number Of Slides
const containerColums = 6; //Num Conatiner Colums
let slideMove = 0; //Number Of Moved Slides

//Change Next Arrow
if (slideNum > containerColums) {
  arrowNext.classList.add("container-slide__arrow_active");
}

//Event
arrowPrev.addEventListener("click", PrewSlide);
arrowNext.addEventListener("click", NextSlide);

function NextSlide() {
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

/* Event handling "click" on the button ".header-mobile-btn": animate button & show/hide mobile menu */

const menu = document.querySelector(".header__menu");
const menuBtn = document.querySelector(".header-mobile-btn");
const menuBtnLine = document.querySelectorAll(".header-mobile-btn__line");

/* Set Initial State Of Menu */
var showMenu = false;

menuBtn.addEventListener("click", toggleMenu);

function toggleMenu() {
  if (!showMenu) {
    menu.classList.add("header__menu_show");
    menuBtn.classList.add("header-mobile-btn_close");
    menuBtnLine.forEach(item =>
      item.classList.add("header-mobile-btn__line_close")
    );

    /* Set Menu State */
    showMenu = true;
  } else {
    menu.classList.remove("header__menu_show");
    menuBtn.classList.remove("header-mobile-btn_close");
    menuBtnLine.forEach(item =>
      item.classList.remove("header-mobile-btn__line_close")
    );

    /* Set Menu State */
    showMenu = false;
  }
}
