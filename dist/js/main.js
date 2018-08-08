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

/* Event handling "click" on the sort buttons ".favorites-device-buttons": show/hide sontainer blocks */

const ButtContainer = document.querySelector(".favorites-device-buttons"); //Buttons Container
const buttons = ButtContainer.querySelectorAll(".control-buttons__btn"); //Buttons
const BlocksContainer = document.querySelector(".favorites-device"); //Blocks Container
const Blocks = BlocksContainer.querySelectorAll(".container-block"); //Blocks

//Event
buttons.forEach(item => item.addEventListener("click", SortBlocks));

//Sort Blocks
function SortBlocks() {
  //Styles
  buttons.forEach(
    item =>
      item.classList.contains("control-buttons__btn_active")
        ? item.classList.remove("control-buttons__btn_active")
        : 0
  );
  this.classList.add("control-buttons__btn_active");

  //Get Sort Block
  let SortBlockData = this.getAttribute("data-sort-block");

  //Show Sort Block
  if (SortBlockData == -1) {
    Blocks.forEach(item => (item.style.display = "flex"));
  } else {
    for (let i = 0; i < Blocks.length; i++) {
      let BlockData = Blocks[i].getAttribute("data-sort-block");

      if (BlockData && BlockData != SortBlockData) {
        Blocks[i].style.display = "none";
      } else {
        Blocks[i].style.display = "flex";
      }
    }
  }

  //Hide/Show Slider Controls
  CheckSlidesNum();
}

//Check The Number Of Slides
function CheckSlidesNum() {
  let Slide = BlocksContainer.querySelectorAll(".container-block"); //Slide
  let SlidesNum = 0; //Slides Num
  let Slider = document.querySelector(".favorites-slide"); //Slider

  //Remove Container Margin
  BlocksContainer.style.marginLeft = 0;

  //Get The Number Of Displayed Slides
  Slide.forEach(item => (item.style.display == "flex" ? SlidesNum++ : 0));

  //Show/Hide Slider Controls
  SlidesNum > 6
    ? Slider.classList.remove("container-slide_hide")
    : Slider.classList.add("container-slide_hide");

  //Update arrowPrev/arrowNext Styles
  arrowPrev.classList.remove("container-slide__arrow_active");
  arrowNext.classList.add("container-slide__arrow_active");

  //Update slideMove Data
  slideMove = 0;
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
