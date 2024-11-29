const apiUrl = "https://www.themealdb.com/api/json/v1/1/";

let form = document.getElementById("form");
let searchResultsParentDiv = document.querySelector(".search-results-inner");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let formData = new FormData(form);
  let parsedFormData = Object.fromEntries(formData);
  console.log(parsedFormData);

  // search by name if only meal is entered
  if (parsedFormData.mealName) {
    fetch(`${apiUrl}/search.php?s=${parsedFormData.mealName}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.meals);

        let meals = data.meals;

        displaySearchResults(meals);
      })
      .catch((error) => console.error("Errror: ", error));
  }
});

function displaySearchResults(results) {
  searchResultsParentDiv.innerHTML = "";

  results.forEach((result) => {
    // create main result wrapper that contains both main details and also popup for instructions and ingredients
    let resultWrapper = document.createElement("div");
    resultWrapper.className = "result-wrapper";

    // create container div for name, area, and show-instructions button
    let detailsContainer = document.createElement("div");
    detailsContainer.className = "result-details";

    // create meal img element
    let resultImg = document.createElement("img");
    resultImg.src = result.strMealThumb;

    // create meal name element
    let resultName = document.createElement("h3");
    resultName.innerHTML = result.strMeal;

    // create meal area element
    let resultArea = document.createElement("p");
    resultArea.innerHTML = result.strArea;

    // create instructions wrapper
    let instructionsWrapper = document.createElement("div");
    instructionsWrapper.className = "instructions-wrapper";

    // create ingredients wrapper
    let ingredientsWrapper = document.createElement("div");
    ingredientsWrapper.className = "ingredients-wrapper";

    // creating ingredients display
    let ingredientsDisplay = document.createElement("div");
    let ingredientsHeading = document.createElement("h3");
    ingredientsHeading.innerHTML = "Ingredients";

    let instructionsHeading = document.createElement("h3");
    instructionsHeading.innerHTML = "Instructions";

    // genereating elements for ingredients and amounts
    for (let i = 1; i <= 20; i++) {
      let ingredient = document.createElement("p");
      ingredient.className = "ingredient";
      let amount = document.createElement("p");
      amount.className = "amount";

      let ingredientRow = document.createElement("div");

      if (result[`strIngredient${i}`]) {
        ingredient.innerHTML = result[`strIngredient${i}`];
        amount.innerHTML = result[`strMeasure${i}`];

        ingredientRow.appendChild(ingredient);
        ingredientRow.appendChild(amount);

        ingredientsDisplay.appendChild(ingredientRow);
      }
    }

    // create instructions p tag
    let instructions = document.createElement("p");
    instructions.innerHTML = result.strInstructions;

    instructionsWrapper.appendChild(instructionsHeading);
    instructionsWrapper.appendChild(instructions);

    ingredientsWrapper.appendChild(ingredientsHeading);
    ingredientsWrapper.appendChild(ingredientsDisplay);

    // adding elements to main search result
    resultWrapper.appendChild(resultImg);
    resultWrapper.appendChild(detailsContainer);
    resultWrapper.appendChild(instructionsWrapper);
    resultWrapper.appendChild(ingredientsWrapper);
    detailsContainer.appendChild(resultName);
    detailsContainer.appendChild(resultArea);

    searchResultsParentDiv.appendChild(resultWrapper);
  });
}
