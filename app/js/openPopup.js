const openDevice = document.querySelectorAll(".container-block_device");

openDevice.forEach(item => item.addEventListener("click", OpenPopup));

function OpenPopup() {
  let popupId = this.getAttribute("data-popup-id");
  let popup = document.querySelector("#" + popupId + "");

  if (popup) popup.classList.add("popup_active");
}
