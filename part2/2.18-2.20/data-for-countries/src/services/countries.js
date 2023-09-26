import axios from "axios";
const API = import.meta.env.VITE_OPEN_WEATHER_API;

const getAll = () => {
  return axios.get("https://studies.cs.helsinki.fi/restcountries/api/all");
};

const getCountryDetail = (name) => {
  return axios.get(
    `https://studies.cs.helsinki.fi/restcountries//api/name/${name}`
  );
};

const getWeather = (lat, long) => {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${API}`
  );
};

export default { getAll, getCountryDetail, getWeather };
