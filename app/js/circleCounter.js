/* Event handling touchstart/touchmove on the circle controller in ".xiaomi-warm-flor" */

const counter = document.getElementById("counter");
const ctx = counter.getContext("2d");
let pointToFill = 2.04; //Point from where to fill the circle
const cw = ctx.canvas.width; //Return canvas width
const ch = ctx.canvas.height; //Return canvas height
let startingPoint = 0; // Starting Point
let diff; // find the different between current value (startingPoint)
let status;
let circleArrow = document.querySelector(".xiaomi-warm-flor__arrow-move");

const img = new Image(); //Background Image
img.src = "../dist/img/xiaomi-warm-flor/oval_2.jpg";
img.onload = function() {
  const pattern = ctx.createPattern(img, "repeat");
  ctx.strokeStyle = pattern;
};

/* Circle Canvas */
function circleCounter(status) {
  diff = (startingPoint / 100) * Math.PI * 2 * 10;
  ctx.clearRect(0, 0, cw, ch); // Clear canvas every time when function is call

  /*Line*/
  ctx.lineWidth = 40; // size of stroke

  /* Text */
  ctx.fillStyle = "#333333"; // color that you want to fill in ctx/circle
  ctx.textAlign = "center";
  ctx.font = "600 66px Arial"; //set font size and face
  ctx.fillText("+" + parseInt(startingPoint / 3), 105, 130); //fillText(text,x,y);

  /* Path */
  ctx.beginPath();
  ctx.arc(110, 110, 110, pointToFill, diff / 10 + pointToFill); //arc(x,y,radius,start,stop)
  ctx.stroke();

  if (startingPoint < 85) {
    circleArrow.style.transform = "rotate(" + 3.6 * startingPoint + "deg)";
  }

  // Condition
  if (status) {
    if (startingPoint < 85) {
      startingPoint++;
    }
  } else {
    if (startingPoint > 0) {
      startingPoint--;
    }
  }
}

/* Touch Event */
let fill = circleCounter(status);
let x_start, //X start val
  y_start, //Y start val
  oldValY; //Old Value Y

/* First Touch */
counter.addEventListener("touchstart", getStartTouch, false);

function getStartTouch(e) {
  x_start = e.changedTouches[0].clientX;
  y_start = e.changedTouches[0].clientY;
}

/* Move Touch */
counter.addEventListener(
  "touchmove",
  function(e) {
    let touchobj = e.changedTouches[0]; // Touch
    let rect = this.getBoundingClientRect();

    /* Container Area */
    if (
      touchobj.clientX < rect.right &&
      touchobj.clientX > rect.left &&
      touchobj.clientY > rect.top &&
      touchobj.clientY < rect.bottom
    ) {
      let yD = e.touches[0].pageY - y_start;
      let centerX = (rect.right + rect.left) / 2;

      //Save Old Val
      if (!oldValY) {
        oldValY = yD;
      }

      let arrowPositionX = document
        .querySelector(".xiaomi-warm-flor__arrow")
        .getBoundingClientRect().right; //Arrow Position X

      if (touchobj.clientX < centerX) {
        //Left Piece Circle
        oldValY > yD ? (status = true) : (status = false);
        oldValY = yD;
      } else if (arrowPositionX > centerX) {
        //Right Piece Circle
        oldValY < yD ? (status = true) : (status = false);
        oldValY = yD;
      }

      circleCounter(status);
    }
    e.preventDefault();
  },
  false
);
