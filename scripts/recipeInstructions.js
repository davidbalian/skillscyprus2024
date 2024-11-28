window.onload = () => {
  recipeInstructionsButton = document.querySelector(".get-recipe-btn");
  recipe = document.querySelector(".recipe");

  //   recipeInstructionsButton.addEventListener("click", () => {
  //     recipe.classList.toggle("show-instructions");
  //     // alert();
  //   });

  recipeInstructionsButton.forEach((button) => {
    button.addEventListener("click", () => {
      recipe.classList.toggle("show-instructions");
    });
  });
};
