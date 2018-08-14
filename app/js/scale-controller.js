/* Event handling touchstart/touchmove on the controller in ".popup__scale" */

const controller = document.querySelectorAll(".popup__controller"); //Controller

/* Events */
controller.forEach(item => {
  item.addEventListener("touchstart", startController, false);
  item.addEventListener("touchmove", moveController, false);
});

/* Get Start Controller Position */
function startController(e) {
  conXstart = e.touches[0].pageX; //Srart X Cursor
  conYstart = e.touches[0].pageY; //Srart Y Cursor
  contPositionL = this.getBoundingClientRect().left; //Left Position Controller on X page
  contPositionR = this.getBoundingClientRect().right; //Left Position Controller on X page

  contPositionB = this.getBoundingClientRect().bottom; //Bottom Position Controller on X page
}

/* Move Controller */
function moveController(e) {
  let conX = e.touches[0].pageX - conXstart; //Move Value
  let conY = conYstart - e.touches[0].pageY; //Move Value
  let scale = this.closest(".popup__scale"); //Scale Block

  let g = document.getElementsByTagName("body")[0],
    screenWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      g.clientWidth;

  /* Desktop */
  if (screenWidth > 899) {
    let scaleLeft = scale.getBoundingClientRect().left; //Scale Left Page Position
    let scaleRight = scale.getBoundingClientRect().right; //Scale Right Page Position

    let contLeft = contPositionL - scaleLeft; //Controller Style Left Value
    let contRight = contPositionR - scaleRight; //Controller Style Left Value
    let scaleWidth = scale.getBoundingClientRect().width; //Scale Width

    if (contRight + conX >= 0) this.style.left = scaleWidth - 60 + "px";
    else if (contLeft + conX <= 0) this.style.left = "0px";
    else this.style.left = contLeft + conX + "px";
  } else {
    /* Mobile */
    let scaleBottom = scale.getBoundingClientRect().bottom; //Scale Bottom Page Position
    let contBottom = scaleBottom - contPositionB; //Controller Style Bottom Value
    let scaleHeight = scale.getBoundingClientRect().height; //Scale Height

    if (contBottom + conY <= 0) this.style.left = "0px";
    else if (contBottom + conY + 60 >= scaleHeight)
      this.style.left = scaleHeight - 60 + "px";
    else this.style.left = contBottom + conY + "px";
  }

  e.preventDefault();
}
