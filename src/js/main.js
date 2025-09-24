// Import our custom CSS
import "../scss/styles.scss";

// Import all of Bootstrap’s JS
import * as bootstrap from "bootstrap";

document
  .getElementById("subscriptionForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    console.log({ event });

    const formData1 = new FormData(event.target);

    for (var pair of formData1.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    console.log(Object.fromEntries(formData1));

    const nameInput = document.getElementById("userName");
    const emailInput = document.getElementById("userEmail");

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    const nameRegex = /^[A-Za-z\s]{2,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(name)) {
      showToast(
        "Please enter a valid name (letters only, min 2 characters)",
        "danger"
      );
      return;
    }

    if (!emailRegex.test(email)) {
      showToast("Please enter a valid email address", "danger");
      return;
    }

    const formData = {
      name,
      email,
      timestamp: new Date().toISOString(),
    };

    const existingData =
      JSON.parse(localStorage.getItem("subscriptions")) || [];
    existingData.push(formData);
    localStorage.setItem("subscriptions", JSON.stringify(existingData));

    showToast("Subscription successful!", "success", true);

    this.reset();
  });

function showToast(message, type = "success", animated = false) {
  const existingToast = document.getElementById("customToast");
  if (existingToast) existingToast.remove();

  const toastDiv = document.createElement("div");
  toastDiv.id = "customToast";
  toastDiv.className = `toast align-items-center text-white bg-${type} border-0 ${
    animated ? "toast-animated" : "toast-static"
  }`;
  toastDiv.setAttribute("role", "alert");
  toastDiv.setAttribute("aria-live", "assertive");
  toastDiv.setAttribute("aria-atomic", "true");

  toastDiv.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  `;

  document.body.appendChild(toastDiv);

  const toast = new bootstrap.Toast(toastDiv, {
    delay: animated ? 2500 : 4000,
  });
  toast.show();

  setTimeout(
    () => {
      toastDiv.remove();
    },
    animated ? 3000 : 5000
  );
}

function getSubscriptions() {
  return JSON.parse(localStorage.getItem("subscriptions")) || [];
}

function displaySubscriptions() {
  const subscriptions = getSubscriptions();
  console.log("Stored subscriptions:", subscriptions);
  subscriptions.forEach((sub, index) => {
    console.log(`${index + 1}. Name: ${sub.name}, Email: ${sub.email}`);
  });
}

displaySubscriptions();
