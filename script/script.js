const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

const menuBtnFunc = () => {
  mobileMenu.classList.toggle("hidden");
};

menuBtn.addEventListener("click", menuBtnFunc);
