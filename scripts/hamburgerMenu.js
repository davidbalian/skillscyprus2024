window.onload = () => {
  hamburgerMenuIcon = document.getElementById("hamburger");
  navigationMenu = document.querySelector("nav");

  hamburgerMenuIcon.addEventListener("click", () => {
    navigationMenu.classList.toggle("navigation-active");
  });
};
