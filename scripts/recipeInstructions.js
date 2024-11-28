window.onload = () => {
  recipeInstructionsButton = document.querySelectorAll(".get-recipe-btn");
  recipe = document.querySelector(".recipe");

  hamburgerMenuIcon = document.getElementById("hamburger");
  navigationMenu = document.querySelector("nav");

  hamburgerMenuIcon.addEventListener("click", () => {
    navigationMenu.classList.toggle("navigation-active");
  });

  recipeInstructionsButton.forEach((button) => {
    button.addEventListener("click", () => {
      recipe.classList.toggle("show-instructions");
    });
  });
};
