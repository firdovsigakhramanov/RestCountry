const urlParams = new URLSearchParams(document.location.search).get("name");

const section = document.querySelector("section:nth-child(2)");
let countryFlag = document.querySelector(".country-flag > img");
let countryName = document.querySelector(".country-name");
let nativeName = document.querySelector(".native-name");
let population = document.querySelector(".population");
let region = document.querySelector(".region");
let subRegion = document.querySelector(".sub-region");
let capital = document.querySelector(".capital");
let topLevelDomain = document.querySelector(".top-level-domain");
let currencies = document.querySelector(".currencies");
let languages = document.querySelector(".languages");

let body = document.querySelector("body");
let theme = document.querySelector(".theme");
let themeImg = document.querySelector(".theme-img > i");
let themeText = document.querySelector(".theme-text");

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

fetch(`https://restcountries.com/v3.1/name/${urlParams}`)
  .then((res) => res.json())
  .then((data) => {
    data.forEach((item) => {
      countryFlag.src = item.flags.png;
      countryName.innerHTML = item.name.common;
      nativeName.innerHTML = item.name.nativeName.fra.official;
      population.innerHTML = item.population.toLocaleString("en-UK");
      region.innerHTML = item.region;
      subRegion.innerHTML = item.subregion;
      capital.innerHTML = item.capital;
      currencies.innerHTML = item.currencies.EUR.name;
      languages.innerHTML = item.languages[0];
    });
  });

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
