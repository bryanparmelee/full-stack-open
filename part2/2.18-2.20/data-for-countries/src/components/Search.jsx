const Search = ({ seachTerm, handleSearchChange }) => {
  return (
    <div>
      find countries{" "}
      <input
        name="searchTerm"
        value={seachTerm}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default Search;
