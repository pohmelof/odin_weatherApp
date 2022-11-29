import { renderDateTime, getDateData } from "./renderDateTime.js";
import { getWeatherData } from "./api-calls.js";
import { saveToLocalStorage } from "./localStorage.js";

const weatherImages = {
  "01d": {
    src: "./images/01d.jpg",
    author:
      'Photo by <a href="https://unsplash.com/@shelter?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Shelter</a> on <a href="https://unsplash.com/s/photos/clear-blue-sky?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>',
  },
  "01n": {
    src: "./images/01n.jpg",
    author:
      'Photo by <a href="https://unsplash.com/@jinen?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Jinen Shah</a> on <a href="https://unsplash.com/s/photos/clear-night-sky?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>',
  },
  "02d": {
    src: "./images/02d.jpg",
    author:
      'Photo by <a href="https://unsplash.com/@gavrushchenko?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Vitaliy Gavrushchenko</a> on <a href="https://unsplash.com/s/photos/sky-clouds?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>',
  },
  "02n": {
    src: "./images/02n.jpg",
    author:
      'Photo by <a href="https://unsplash.com/@mayear2019?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">yue su</a> on <a href="https://unsplash.com/s/photos/night-sky-clouds?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>',
  },
  "03d": {
    src: "./images/03d.jpg",
    author:
      'Photo by <a href="https://unsplash.com/@toddquackenbush?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Todd Quackenbush</a> on <a href="https://unsplash.com/s/photos/scattered-clouds?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>',
  },
  "03n": {
    src: "./images/02n.jpg",
    author:
      'Photo by <a href="https://unsplash.com/@mayear2019?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">yue su</a> on <a href="https://unsplash.com/s/photos/night-sky-clouds?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>',
  },
  "04d": {
    src: "./images/04d.jpg",
    author:
      'Photo by <a href="https://unsplash.com/@billy_huy?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Billy Huynh</a> on <a href="https://unsplash.com/s/photos/clouds?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>',
  },
  "04n": {
    src: "./images/02n.jpg",
    author:
      'Photo by <a href="https://unsplash.com/@mayear2019?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">yue su</a> on <a href="https://unsplash.com/s/photos/night-sky-clouds?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>',
  },
  "09d": {
    src: "./images/09d.jpg",
    author:
      'Photo by <a href="https://unsplash.com/@rocua18?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Rodolfo Cuadros</a> on <a href="https://unsplash.com/s/photos/rain-day?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>',
  },
  "09n": {
    src: "./images/09n.jpg",
    author:
      'Photo by <a href="https://unsplash.com/@bensow?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Benjamin Sow</a> on <a href="https://unsplash.com/s/photos/rain-night?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>',
  },
  "10d": {
    src: "./images/09d.jpg",
    author:
      'Photo by <a href="https://unsplash.com/@rocua18?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Rodolfo Cuadros</a> on <a href="https://unsplash.com/s/photos/rain-day?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>',
  },
  "10n": {
    src: "./images/09n.jpg",
    author:
      'Photo by <a href="https://unsplash.com/@bensow?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Benjamin Sow</a> on <a href="https://unsplash.com/s/photos/rain-night?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>',
  },
  "11d": {
    src: "./images/11d.jpg",
    author:
      'Photo by <a href="https://unsplash.com/@raychelsnr?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Raychel Sanner</a> on <a href="https://unsplash.com/s/photos/thunderstorm?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>',
  },
  "11n": {
    src: "./images/11n.jpg",
    author:
      'Photo by <a href="https://unsplash.com/@antomalani?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Anton Malanin</a> on <a href="https://unsplash.com/s/photos/thunderstorm-night?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>',
  },
  "13d": {
    src: "./images/13d.jpg",
    author:
      'Photo by <a href="https://unsplash.com/@loicvdh?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Loïc Van der Heyden</a> on <a href="https://unsplash.com/s/photos/snow?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>',
  },
  "13n": {
    src: "./images/13n.jpg",
    author:
      'Photo by <a href="https://unsplash.com/@roanlavery?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Roan Lavery</a> on <a href="https://unsplash.com/s/photos/snow-night?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>',
  },
  "50d": {
    src: "./images/50d.jpg",
    author:
      'Photo by <a href="https://unsplash.com/@rgaleriacom?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Ricardo Gomez Angel</a> on <a href="https://unsplash.com/s/photos/mist?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>',
  },
  "50n": {
    src: "./images/50d.jpg",
    author:
      'Photo by <a href="https://unsplash.com/@rgaleriacom?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Ricardo Gomez Angel</a> on <a href="https://unsplash.com/s/photos/mist?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>',
  },
};

const loading = document.querySelector(".loading");

function renderHeader(obj) {
  const header = document.createElement("header");
  const btnLang = document.createElement("button");
  const btnTemp = document.createElement("button");

  // language change button
  btnLang.className = "btn btn-lang";
  btnLang.dataset.lang = obj.lang;
  btnLang.textContent = obj.lang.toUpperCase();

  // temperature mode change button
  btnTemp.className = "btn convert-temp";
  btnTemp.dataset.mode = obj.mode === "metric" ? "celsius" : "fahrenheit";
  btnTemp.innerHTML = obj.modeSign;

  header.append(btnLang, btnTemp);

  return header;
}

function renderWeatherMainEl(obj) {
  const { weatherData } = obj;
  const weatherMain = document.createElement("div");
  weatherMain.className = "weather-main";

  // location-date-block
  const locationDate = document.createElement("div");
  const location = document.createElement("div");
  const dateMonth = document.createElement("div");
  const time = document.createElement("div");
  const form = document.createElement("form");
  const label = document.createElement("label");
  const input = document.createElement("input");

  locationDate.className = "location-date-block";

  location.className = "location";
  location.textContent =
    obj.lang === "en"
      ? `${weatherData.city}, ${weatherData.country}`
      : `${weatherData.cityRu}, ${weatherData.countryRu}`;

  dateMonth.className = "date-month";
  time.className = "time";

  form.className = "change-city";
  form.autocomplete = "off";
  label.for = "changeCity";
  label.textContent = obj.lang === "en" ? "Change city:" : "Изменить город:";
  input.type = "text";
  input.id = "changeCity";
  input.name = "changeCity";
  form.append(label, input);

  locationDate.append(location, dateMonth, time, form);

  // temp block
  const tempBlock = document.createElement("div");
  const temp = document.createElement("div");
  const type = document.createElement("div");
  const feels = document.createElement("div");

  tempBlock.className = "temp-block";
  temp.className = "temp";
  type.className = "weather-type";
  feels.className = "feels-like";

  temp.innerHTML = `${parseInt(weatherData.temp)}${weatherData.modeSign}`;
  type.innerHTML = `<img src='http://openweathermap.org/img/wn/${weatherData.weatherIcon}@2x.png' alt=''>`;
  feels.innerHTML = `${
    obj.lang === "en" ? "Feels like:" : "Ощущается как:"
  } <span>${parseInt(weatherData.feels_like)}${weatherData.modeSign}<span>`;

  tempBlock.append(temp, type, feels);

  // conditions block
  const conditions = document.createElement("div");
  const wind = document.createElement("div");
  const humidity = document.createElement("div");
  const pressure = document.createElement("div");

  conditions.className = "conditions-block";
  wind.className = "wind";
  humidity.className = "humidity";
  pressure.className = "pressure";

  wind.innerHTML = `<p><i class="fa-solid fa-wind"></i> ${parseInt(
    weatherData.wind
  )} ${obj.lang === "en" ? "m/s" : "м/с"}</p>`;
  humidity.innerHTML = `<p><i class="fa-sharp fa-solid fa-droplet"></i> ${parseInt(
    weatherData.humidity
  )} %</p>`;
  pressure.innerHTML = `<p><i class="fa-solid fa-mercury"></i> 
  ${
    obj.lang === "en"
      ? parseInt(weatherData.pressure)
      : parseInt(weatherData.pressure * 0.75)
  } 
  ${obj.lang === "en" ? "hPa" : "мм рт.ст."}</p>`;

  conditions.append(wind, humidity, pressure);

  // sunrise-sunset block
  const sunriseSunset = document.createElement("div");
  const sunrise = document.createElement("div");
  const sunset = document.createElement("div");

  sunriseSunset.className = "sunrise-sunset-block";
  sunrise.className = "sunrise";
  sunset.className = "sunset";

  const sunriseTime = getDateData(
    weatherData.timezone,
    obj.lang,
    weatherData.sunrise
  );
  const sunsetTime = getDateData(
    weatherData.timezone,
    obj.lang,
    weatherData.sunset
  );

  sunrise.innerHTML = `<div>
    <i class="fa-solid fa-sun"></i> 
    ${obj.lang == "en" ? "Sunrise" : "Рассвет"}
  </div>
  <div>${sunriseTime.hh}:${sunriseTime.mm}</div>`;

  sunset.innerHTML = `<div>
    <i class="fa-solid fa-sun"></i> 
    ${obj.lang == "en" ? "Sunset" : "Закат"}
  </div>
  <div>${sunsetTime.hh}:${sunsetTime.mm}</div>`;

  sunriseSunset.append(sunrise, sunset);

  weatherMain.append(locationDate, tempBlock, conditions, sunriseSunset);

  return weatherMain;
}

function renderWeatherMoreEl(obj) {
  const weatherArr = obj.weatherData.moreDaysWeather;
  const weatherMore = document.createElement("div");
  weatherMore.className = "weather-more";

  for (let i = 1; i < weatherArr.length; i++) {
    const dayBlock = document.createElement("div");
    const date = document.createElement("div");
    const moreTemp = document.createElement("div");
    const weatherType = document.createElement("div");

    dayBlock.className = "more-day-block";
    date.className = "more-date";
    moreTemp.className = "more-temp";
    weatherType.className = "more-weather-type";

    const { month, weekday, day } = getDateData(
      weatherArr[i].timezone,
      obj.lang,
      weatherArr[i].dateTime
    );
    date.innerHTML =
      obj.lang === "en"
        ? `${weekday}, ${month} ${day}`
        : `${day} ${month}, ${weekday}`;

    moreTemp.innerHTML = `${parseInt(weatherArr[i].temp)}${
      obj.weatherData.modeSign
    }`;
    weatherType.innerHTML = `<img src='http://openweathermap.org/img/wn/${weatherArr[i].weatherIcon}@2x.png' alt=''>`;

    dayBlock.append(date, moreTemp, weatherType);

    weatherMore.appendChild(dayBlock);
  }

  return weatherMore;
}

function renderFooter(obj) {
  const footer = document.createElement("footer");
  footer.innerHTML = weatherImages[obj.weatherData.weatherIcon].author;
  return footer;
}

function renderPage(obj) {
  const { weatherData } = obj;
  const container = document.querySelector(".container");
  const weatherCont = document.createElement("div");
  weatherCont.className = "weather-cont";
  container.innerHTML = "";

  weatherCont.append(renderWeatherMainEl(obj), renderWeatherMoreEl(obj));

  container.append(renderHeader(obj), weatherCont, renderFooter(obj));

  const cityInput = document.getElementById("changeCity");
  const form = document.querySelector(".change-city");
  const convertBtn = document.querySelector(".convert-temp");
  const changeLang = document.querySelector(".btn-lang");

  document.body.style.backgroundImage = `url(${
    weatherImages[weatherData.weatherIcon].src
  })`;

  clearInterval(obj.t);
  renderDateTime(weatherData.timezone, obj.lang);
  obj.t = setInterval(
    () => renderDateTime(weatherData.timezone, obj.lang),
    1000
  );
  loading.classList.add("hidden");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    cityInput.value.replace(" ", "%20");
    renderFromAPI(obj, cityInput.value.replace(" ", "%20"));
    form.reset();
  });

  convertBtn.addEventListener("click", (e) => {
    if (e.target.dataset.mode === "undefined") return;
    const mode = e.target.dataset.mode === "celsius" ? "fahrenheit" : "celsius";
    const weatherArr = obj.weatherData.moreDaysWeather;
    obj.weatherData.convertTemp(mode);
    weatherArr.map((item) => item.convertTemp(mode));
    convertBtn.innerHTML = obj.weatherData.modeSign;
    e.target.dataset.mode = mode;
    obj.mode = mode === "celsius" ? "metric" : "imperial";
    obj.modeSign = obj.weatherData.modeSign;
    console.log(obj);
    renderPage(obj);
  });

  changeLang.addEventListener("click", (e) => {
    const lang = e.target.dataset.lang;
    obj.lang = lang === "en" ? "ru" : "en";
    renderPage(obj);
  });
  saveToLocalStorage(obj);
}

async function renderFromAPI(obj, city) {
  loading.classList.remove("hidden");
  obj.weatherData = await getWeatherData(obj, city);
  obj.city = obj.weatherData.city;
  console.log(obj);
  renderPage(obj);
}

export { renderPage, renderFromAPI };
