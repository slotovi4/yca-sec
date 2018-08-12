const closeButton = document.querySelectorAll(".popup__button_close");

closeButton.forEach(item => item.addEventListener("click", ClosePopup));

function ClosePopup() {
  let popup = this.closest(".popup");
  popup.classList.remove("popup_active");
}
