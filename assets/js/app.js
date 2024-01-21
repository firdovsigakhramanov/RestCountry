let cardContainer = document.querySelector(".card-container");
let input = document.querySelector(".search-bar  input");

console.log(input);

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
