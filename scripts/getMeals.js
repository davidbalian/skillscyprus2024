const apiUrl = "https://www.themealdb.com/api/json/v1/1/";

let form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let formData = new FormData(form);
  let parsedFormData = Object.fromEntries(formData);
  console.log(parsedFormData);

  if (parsedFormData.mealName) {
    fetch(`${apiUrl}/search.php?s=${parsedFormData.mealName}`)
      .then((res) => res.json())
      .then((data) => console.log(data.meals))
      .catch((error) => console.error("Errror: ", error));
  }
});
