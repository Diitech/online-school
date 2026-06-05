const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const admissionsForm = document.querySelector(".admissions-form");
const formMessage = document.getElementById("form-message");

if (admissionsForm && formMessage) {
  admissionsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formMessage.textContent = "Thank you! Our admissions team will contact you soon.";
    admissionsForm.reset();
  });
}

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.getElementById("main-nav");
const navLinks = document.querySelectorAll("#main-nav a");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}
