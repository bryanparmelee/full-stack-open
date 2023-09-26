const Filter = ({ nameSearch, handleSearchChange }) => {
  return (
    <div>
      filter shown with{" "}
      <input name="search" value={nameSearch} onChange={handleSearchChange} />
    </div>
  );
};

export default Filter;
