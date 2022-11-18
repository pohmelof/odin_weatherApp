const key = "0f9fd4e3b6ce5da76c6b0ef6385dbe72";
const countryNames = new Intl.DisplayNames(["en"], { type: "region" });
const cityInput = document.getElementById("changeCity");
const form = document.querySelector("form");
const loading = document.querySelector(".loading");

let city = "Moscow";

async function getCityCoords(city = "Moscow") {
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=0f9fd4e3b6ce5da76c6b0ef6385dbe72`
  );
  const data = await response.json();

  return data;
}

getCityCoords(city).then((item) => console.log(item));

async function getWeatherData(city) {
  loading.classList.remove("hidden");
  const cityCoords = await getCityCoords(city).then((obj) => ({
    lat: obj[0].lat,
    lon: obj[0].lon,
    city: obj[0].name,
    country: countryNames.of(obj[0].country),
  }));
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${cityCoords.lat}&lon=${cityCoords.lon}&units=metric&appid=0f9fd4e3b6ce5da76c6b0ef6385dbe72`
  );
  document.querySelector(
    "h2"
  ).innerHTML = `${cityCoords.city}, ${cityCoords.country}`;

  console.log(response.status);
  const data = await response.json();
  return data;
}

function renderTemp(city) {
  getWeatherData(city).then((data) => {
    loading.classList.add("hidden");
    console.log(data);
    document.querySelector("h1").innerHTML = `${parseInt(
      data.main.temp
    )}&deg;C`;
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  city = cityInput.value;
  renderTemp(city);
  form.reset();
});

renderTemp();
