let cardContainer = document.querySelector(".card-container");
let input = document.querySelector(".search-bar  input");
let body = document.querySelector("body");
let theme = document.querySelector(".theme");
let themeImg = document.querySelector(".theme-img > i");
let themeText = document.querySelector(".theme-text");

console.log(themeText);

window.onload = function () {
  let themeMode = localStorage.getItem("theme");
  if (themeMode == "dark") {
    body.classList.add("dark-mode");
    themeImg.className = "fa-solid fa-sun";
    themeText.innerHTML = "Light Mode";
  } else {
    body.classList.remove("dark-mode");
    themeImg.className = "fa-solid fa-moon";
    themeText.innerHTML = "Dark Mode";
  }
};

function getData() {
  fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((card) => {
        cardContainer.innerHTML += `
        <a href="details.html?name=${
          card.name.common
        }" class="card border-radius box-shadow">
            <div class="card-img">
              <img  src="${card.flags.png}" alt="" />
            </div>
            <div class="card-body">
              <h3>${card.name.common}</h3>
              <p><span>Population:&nbsp;</span>${card.population.toLocaleString(
                "en-UK"
              )}</p>
              <p><span>Region:&nbsp;</span>${card.region}</p>
              <p><span>Capital:&nbsp;</span>${card.capital}</p>
            </div>
          </a>
    `;
      });
    });
}
getData();

input.addEventListener("keyup", function (e) {
  console.log(e.target.value);
});

//! ------------- Theme -----------------

console.log(themeImg);
theme.addEventListener("click", function (e) {
  if (!body.classList.contains("dark-mode")) {
    body.classList.add("dark-mode");
    themeImg.className = "fa-solid fa-sun";
    themeText.innerHTML = "Light Mode";
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.remove("dark-mode");
    themeImg.className = "fa-solid fa-moon";
    themeText.innerHTML = "Dark Mode";
    localStorage.setItem("theme", "light");
  }
});


