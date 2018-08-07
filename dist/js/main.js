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
