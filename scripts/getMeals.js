const apiUrl = "www.themealdb.com/api/json/v1/1/";

let form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let formData = new FormData(form);
  let parsedFormData = Object.fromEntries(formData);
  console.log(parsedFormData);
});
