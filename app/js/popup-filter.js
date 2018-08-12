/* Event handling click on the filter buttons in ".popup__filter" */

const popupFilterButtons = document.querySelectorAll(
  ".control-buttons__btn[data-popup-data]"
);

popupFilterButtons.forEach(item => item.addEventListener("click", filterPopup));

function filterPopup() {
  let PopupControlContainer = this.closest(".popup__filter"); //Controlls Container
  let PopupController = PopupControlContainer.closest(
    ".popup__block"
  ).querySelector(".popup__controller"); //Popup Controller

  //Remove Active Style
  PopupControlContainer.querySelector(
    ".control-buttons__btn_active"
  ).classList.remove("control-buttons__btn_active");

  //Add Active Style
  this.classList.add("control-buttons__btn_active");

  //Get Data
  let PopupControlData = this.getAttribute("data-popup-data");

  //Move Popup Controller
  if (PopupControlData != -1) {
    PopupController.style.left = PopupControlData * 25 + "%";
  }
}
