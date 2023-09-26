const CountryList = ({ countries, searchTerm, handleShow }) => {
  const contriesToShow =
    searchTerm.length === 0
      ? countries
      : countries.filter((country) =>
          country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
        );
  if (contriesToShow === null) return null;
  if (contriesToShow.length > 10) {
    return <p>Too many countries, specify another filter.</p>;
  }

  if (contriesToShow.length > 1 && contriesToShow.length <= 10) {
    return (
      <>
        {contriesToShow.map((country) => (
          <div key={country.name.common}>
            {country.name.common}{" "}
            <button
              type="button"
              onClick={() => handleShow(country.name.common)}
            >
              show
            </button>
          </div>
        ))}
      </>
    );
  }
  if (contriesToShow.length === 1) handleShow(contriesToShow[0].name.common);
};

export default CountryList;
