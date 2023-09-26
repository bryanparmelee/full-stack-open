import { useEffect, useState } from "react";
import countryService from "../services/countries";

const Weather = ({ capital, capitalInfo }) => {
  const [weatherData, setWeatherData] = useState(null);

  const [lat, long] = capitalInfo.latlng;

  useEffect(() => {
    countryService.getWeather(lat, long).then((res) => {
      setWeatherData(res.data);
    });
  }, []);

  if (!weatherData) return null;

  const icon = weatherData.weather[0].icon;
  const alt = weatherData.weather[0].description;

  return (
    <div>
      <h1>Weather in {capital}</h1>
      <p>Temperatrue {weatherData.main.temp} Fahrenheit</p>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt={alt} />
      <p>Wind {weatherData.wind.speed} m/s</p>
    </div>
  );
};

export default Weather;
