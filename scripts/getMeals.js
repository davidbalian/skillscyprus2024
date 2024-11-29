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

        searchResultsParentDiv.innerHTML = "";

        let meals = data.meals;

        meals.forEach((meal) => {
          let searchResult = document.createElement("div");
          searchResult.className = "search-result-meal";
          searchResult.innerHTML = meal.strMeal;
          searchResultsParentDiv.appendChild(searchResult);
        });
      })
      .catch((error) => console.error("Errror: ", error));
  }
});
