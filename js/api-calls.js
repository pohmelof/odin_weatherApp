import handleError from "./handleError.js";
import { DayWeather, City } from "./dayWeather.js";

// get coords of user input city through OpenWeather geolocation API
async function getCityCoords(obj, city) {
  if (city == undefined) {
    city = obj.city;
  }
  try {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=0f9fd4e3b6ce5da76c6b0ef6385dbe72`
    );
    const data = await response.json();

    const cityData = new City(data[0]);
    obj.city = cityData.city;
    return cityData;
  } catch (error) {
    handleError(error, "City not found");
    return getCityCoords(obj);
  }
}

// get 5 days weather data, some fields (sunset, sunrise, timezone) are not filled correctly
async function getMoreDaysWeather(obj, mode, lang) {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?lat=${obj.lat}&lon=${obj.lon}&units=${mode}&appid=0f9fd4e3b6ce5da76c6b0ef6385dbe72&lang=${lang}`
    );
    const data = await response.json();

    const list = data.list
      .filter((item) => (item.dt - data.list[0].dt) % 86400 === 0)
      .map((item) => (item = new DayWeather(item)));
    list.map((item) => {
      item.currentMode = mode === "metric" ? "celsius" : "fahrenheit";
      item.changeModeSign();
    });
    return list;
  } catch (error) {
    console.log(error);
    handleError();
  }
}

// get weather data for today
async function getTodayWeather(obj, mode, lang) {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${obj.lat}&lon=${obj.lon}&units=${mode}&appid=0f9fd4e3b6ce5da76c6b0ef6385dbe72&lang=${lang}`
    );
    const data = await response.json();

    const weatherDay = new DayWeather(data);
    weatherDay.city = obj.cityName;
    weatherDay.country = obj.country;
    weatherDay.cityRu = obj.cityNameRu;
    weatherDay.countryRu = obj.countryRu;
    weatherDay.currentMode = mode === "metric" ? "celsius" : "fahrenheit";
    weatherDay.changeModeSign();
    weatherDay.moreDaysWeather = await getMoreDaysWeather(obj, mode, lang);
    weatherDay.moreDaysWeather.forEach((item) => {
      item.timezone = data.timezone;
      delete item.sunrise;
      delete item.sunset;
    });
    return weatherDay;
  } catch (error) {
    console.log(error);
    handleError();
  }
}

export async function getWeatherData(obj, city) {
  const cityData = await getCityCoords(obj, city);
  const weatherData = await getTodayWeather(cityData, obj.mode, obj.lang);
  return weatherData;
}
