const apiUrl = "https://www.themealdb.com/api/json/v1/1/";

let form = document.getElementById("form");
let searchResultsParentDiv = document.querySelector(".search-results-inner");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let formData = new FormData(form);
  let parsedFormData = Object.fromEntries(formData);
  console.log(parsedFormData);
  let mealName = parsedFormData.mealName;
  let category = parsedFormData.category;
  let country = parsedFormData.country;

  if (mealName && category == "default" && country == "default") {
    fetch(`${apiUrl}/search.php?s=${mealName}`)
      .then((res) => res.json())
      .then((data) => {
        callAPIAndDisplayResults(data);
      })
      .catch((error) => console.error("Errror: ", error));
  } else if (mealName == "" && category != "default" && country == "default") {
    fetch(`${apiUrl}/search.php?s=${category}`)
      .then((res) => res.json())
      .then((data) => {
        callAPIAndDisplayResults(data);
      })
      .catch((error) => console.error("Errror: ", error));
  } else if (mealName == "" && country != "default" && category == "default") {
    fetch(`${apiUrl}/search.php?s=${country}`)
      .then((res) => res.json())
      .then((data) => {
        callAPIAndDisplayResults(data);
      })
      .catch((error) => console.error("Errror: ", error));
  } else {
    if (mealName) {
      fetch(`${apiUrl}/search.php?s=${mealName}`)
        .then((res) => res.json())
        .then((data) => {
          callAPIAndDisplayResults(data);
        })
        .catch((error) => console.error("Errror: ", error));
    } else if (country) {
      fetch(`${apiUrl}/search.php?s=${country}`)
        .then((res) => res.json())
        .then((data) => {
          callAPIAndDisplayResults(data);
        })
        .catch((error) => console.error("Errror: ", error));
    } else if (category) {
      fetch(`${apiUrl}/search.php?s=${category}`)
        .then((res) => res.json())
        .then((data) => {
          callAPIAndDisplayResults(data);
        })
        .catch((error) => console.error("Errror: ", error));
    }
  }
});

function callAPIAndDisplayResults(data) {
  let meals = data.meals;

  displaySearchResults(meals);
}

function displaySearchResults(results) {
  searchResultsParentDiv.innerHTML = "";

  if (results) {
    results.forEach((result) => {
      // create main result wrapper that contains both main details and also popup for instructions and ingredients
      let resultWrapper = document.createElement("div");
      resultWrapper.className = "result-wrapper";

      let detailsWrapper = document.createElement("div");
      detailsWrapper.className = "details-wrapper";

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
        ingredientRow.className = "ingredient-row";

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
      detailsWrapper.appendChild(detailsContainer);
      detailsWrapper.appendChild(instructionsWrapper);
      detailsWrapper.appendChild(ingredientsWrapper);
      resultWrapper.appendChild(detailsWrapper);
      detailsContainer.appendChild(resultName);
      detailsContainer.appendChild(resultArea);

      searchResultsParentDiv.appendChild(resultWrapper);
    });
  } else {
    let noResults = document.createElement("h2");
    noResults.innerHTML = "No results";

    searchResultsParentDiv.appendChild(noResults);
  }
}
