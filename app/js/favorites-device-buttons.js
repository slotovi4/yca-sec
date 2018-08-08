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
