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

fetch(`https://restcountries.com/v3.1/name/${urlParams}`)
  .then((res) => res.json())
  .then((data) => {
    data.forEach((item) => {
      countryFlag.src = item.flags.png;
      countryName.innerHTML = item.name.common;
      nativeName.innerHTML = item.name.nativeName.fra.official;
      population.innerHTML = item.population.toLocaleString("en-UK");
      region.innerHTML = item.region;
      subRegion.innerHTML=item.subregion;
      capital.innerHTML = item.capital;
      currencies.innerHTML = item.currencies.EUR.name;
      languages.innerHTML = item.languages[0];
    });
  });
