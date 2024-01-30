let cardContainer = document.querySelector(".card-container");
let input = document.querySelector(".search-bar  input");
let body = document.querySelector("body");
let theme = document.querySelector(".theme");
let themeImg = document.querySelector(".theme-img > i");
let themeText = document.querySelector(".theme-text");
let loadMore = document.querySelector(".btn__load-more");
let data = [];
let searchData = [];
let screenData = [];

//* Filter-Select*---------*---------*---------*---------*---------*---
let filterSelect = document.querySelector(".filter-select");
let filterOptions = document.querySelector(".filter-options");
let selectImg = document.querySelector(".filter-select__img > i");
let filterOption = document.querySelectorAll(".filter-option");
let filterSelectText = document.querySelector(".filter-select > span");
// *---------*---------*---------*---------*---------*---------*---------

window.onload = function () {
  screenData = data.splice(0, 32);
  getData(screenData);
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

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((x) => {
    x.forEach((card) => {
      data.push(card);
      searchData.push(card);
    });
  });

function getData(x) {
  x.forEach((card) => {
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
}

//! ------------- Theme ----------------->

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

//? ------------- Search Function ---------------->

function search(searchTerm, data) {
  searchTerm = searchTerm.toLowerCase();
  const filteredData = data.filter((item) => {
    const currentValue = item.name.common.toLowerCase();
    return currentValue.includes(searchTerm);
  });
  return filteredData;
}

input.addEventListener("keyup", function (e) {
  if (input.value !== "") {
    result = search(e.target.value, searchData);
    loadMore.classList.add("hide");
    cardContainer.innerHTML = "";
    filterSelectText.innerHTML = "Filter by Region";
    selectImg.classList.remove("rotate");
    getData(result);
  } else {
    loadMore.classList.remove("hide");
    cardContainer.innerHTML = "";
    getData(screenData);
  }
});

//* ---------------------- Load More -------------------------->

loadMore.addEventListener("click", function (e) {
  loadData();
  if (data.length == 0) {
    loadMore.classList.add("hide");
  }
});

function loadData() {
  screenData = data.splice(0, 25);
  getData(screenData);
}

//? Filter-Select--------------------------------------------->

filterSelect.addEventListener("click", function (e) {
  filterOptions.classList.toggle("active");
  selectImg.classList.toggle("rotate");
  loadMore.classList.add("hide");
  console.log(filterSelect);
});

filterOption.forEach((item) => {
  item.addEventListener("click", function (e) {
    filterSelectText.innerHTML = e.target.textContent;
    filterOptions.classList.remove("active");
    selectImg.classList.add("rotate");
    selectRegion(item);
  });
});

function selectRegion(item) {
  fetch("https://restcountries.com/v3.1/region/" + item.innerHTML)
    .then((res) => res.json())
    .then((data) => {
      cardContainer.innerHTML = "";
      getData(data);
    });
}

console.log(filterSelect);
