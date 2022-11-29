import { renderFromAPI } from "./js/renderPage.js";
import { getFromLocalStorage } from "./js/localStorage.js";

const userSettings = {
  city: "tokyo",
  t: null,
  lang: "en",
  mode: "metric",
  modeSign: "&deg;C",
  weatherData: null,
};

if (localStorage.getItem("userSettings") !== null) {
  getFromLocalStorage(userSettings);
}

renderFromAPI(userSettings);
