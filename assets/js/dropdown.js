let filterSelect = document.querySelector(".filter-select");
let filterOptions = document.querySelector(".filter-options");
let selectImg = document.querySelector(".filter-select__img > i");
let filterOption = document.querySelectorAll(".filter-option");
let filterSelectText = document.querySelector(".filter-select > span");

filterSelect.addEventListener("click", function (e) {
  filterOptions.classList.toggle("active");
  selectImg.classList.toggle("rotate");
});

filterOption.forEach((item) => {
  item.addEventListener("click", function (e) {
    filterSelectText.innerHTML = e.target.textContent;
    filterOptions.classList.remove("active");
    selectImg.style.transform = "rotate(180deg)";
    selectRegion(item);
  });
});

function selectRegion(item) {
  fetch("https://restcountries.com/v3.1/region/" + item.innerHTML)
    .then((res) => res.json())
    .then((data) => {
      cardContainer.innerHTML = "";
      data.forEach((card) => {
        console.log(card);
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
