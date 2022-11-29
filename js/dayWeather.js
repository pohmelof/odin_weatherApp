const countryNames = new Intl.DisplayNames(["en"], { type: "region" });
const countryNamesRu = new Intl.DisplayNames(["ru"], { type: "region" });

export class City {
  constructor({ country, lat, lon, name, local_names: { ru } }) {
    this.lat = lat;
    this.lon = lon;
    this.cityName = name;
    this.cityNameRu = ru;
    this.countryRu = countryNamesRu.of(country);
    this.country = countryNames.of(country);
  }
}

export class DayWeather {
  constructor({
    timezone,
    dt,
    main: { temp, feels_like, humidity, pressure },
    weather: [{ main, icon, description }],
    wind: { speed },
    sys: { sunset, sunrise },
  }) {
    this.timezone = timezone;
    this.dateTime = dt * 1000;
    this.temp = temp;
    this.feels_like = feels_like;
    this.humidity = humidity;
    this.weatherType = main;
    this.weatherIcon = icon;
    this.weatherDesc = description;
    this.wind = speed;
    this.pressure = pressure;
    this.sunset = sunset * 1000;
    this.sunrise = sunrise * 1000;
  }

  changeModeSign = () => {
    if (this.currentMode === "celsius") this.modeSign = `&deg;C`;
    if (this.currentMode === "fahrenheit") this.modeSign = `&deg;F`;
  };

  convertTemp = (convertTo) => {
    if (this.currentMode === "celsius") {
      if (convertTo === "celsius") return;
      this.temp = (this.temp * 9) / 5 + 32;
      this.feels_like = (this.feels_like * 9) / 5 + 32;
      this.currentMode = "fahrenheit";
    } else if (this.currentMode === "fahrenheit") {
      if (convertTo === "fahrenheit") return;
      this.temp = ((this.temp - 32) * 5) / 9;
      this.feels_like = ((this.feels_like - 32) * 5) / 9;
      this.currentMode = "celsius";
    }
    this.changeModeSign();
  };
}
