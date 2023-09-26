import { useEffect, useState } from "react";

import Search from "./components/Search";
import CountryList from "./components/CountryList";
import Country from "./components/Country";
import countryService from "./services/countries";

function App() {
  const [countries, setCountries] = useState(null);
  const [seachTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    countryService.getAll().then((res) => {
      setCountries(res.data);
    });
  }, []);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleShow = (name) => setSelectedCountry(name);

  return (
    <div>
      <Search seachTerm={seachTerm} handleSearchChange={handleSearchChange} />
      <CountryList
        countries={countries}
        searchTerm={seachTerm}
        handleShow={handleShow}
      />
      {selectedCountry && <Country country={selectedCountry} />}
    </div>
  );
}

export default App;
