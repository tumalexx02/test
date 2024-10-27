const showModalButton = document.querySelector("#show-modal-button");
const closeModalButton = document.querySelector("#close-modal-button");
const modalWindow = document.querySelector(".modal-window");
const modalWindowOverlay = document.querySelector(".modal-window__overlay");
const modalWindowForm = document.querySelector(".modal-window__form");
const popup = document.querySelector(".popup");

const successMessage = "Your message successfully sent";
const errorMessage = "Error Message";

function showModalWindow() {
  modalWindow.classList.remove("modal-window_hidden");
  document.body.style.overflow = "hidden";
}

function hideModalWindow() {
  modalWindow.classList.add("modal-window_hidden");
  document.body.style.overflow = "auto";
}

function showPopup(isSucces) {
  popup.textContent = isSucces ? successMessage : errorMessage;
  popup.classList.remove("popup_hidden");
  setTimeout(() => {
    popup.classList.add("popup_hidden");
  }, 3000)
}

function validateForm() {
  let isValid = true;

  document.getElementById("full-name-error-message").textContent = "";
  document.getElementById("email-error-message").textContent = "";
  document.getElementById("message-error-message").textContent = "";

  const fullName = document.getElementById("full-name").value.trim();
  if (fullName === "") {
      document.getElementById("full-name-error-message").textContent = "Full Name is required.";
      isValid = false;
  }

  const email = document.getElementById("email").value.trim();
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email)) {
      document.getElementById("email-error-message").textContent = "Please enter a valid email.";
      isValid = false;
  }

  const message = document.getElementById("message").value.trim();
  if (message === "") {
      document.getElementById("message-error-message").textContent = "Message is required.";
      isValid = false;
  }

  return isValid;
}

async function submitForm(event) {
  event.preventDefault();

  if (validateForm()) {
      try {
          const formData = new FormData(modalWindowForm);
          const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
              method: "POST",
              body: formData
          });

          if (response.ok) {
              hideModalWindow();
              showPopup(true);
          } else {
              showPopup(false);
          }
          
          modalWindowForm.reset();
      } catch (error) {
          console.error("Error sending form:", error);
          showPopup(false);
      }
  }
}

showModalButton.addEventListener('click', showModalWindow);
modalWindowOverlay.addEventListener('click', hideModalWindow);
closeModalButton.addEventListener('click', hideModalWindow);
modalWindowForm.addEventListener("submit", submitForm);