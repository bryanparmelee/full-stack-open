import { useEffect, useState } from "react";
import countryService from "../services/countries";
import Weather from "./Weather";

const Country = ({ country }) => {
  const [countryDetails, setCountryDetails] = useState(null);

  useEffect(() => {
    countryService.getCountryDetail(country).then((res) => {
      setCountryDetails(res.data);
    });
  }, [country]);

  if (!countryDetails) return null;

  const { name, languages, capital, area, flags, capitalInfo } = countryDetails;
  const langList = Object.values(languages);

  return (
    <div>
      <h1>{name.common}</h1>
      <p>capital {capital[0]}</p>
      <p>area {area}</p>
      <h2>laguages:</h2>
      <ul>
        {langList.map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={flags.png} alt={flags.alt} />
      <Weather capital={capital} capitalInfo={capitalInfo} />
    </div>
  );
};

export default Country;
