const Persons = ({ persons, nameSearch, handleDelete }) => {
  const personsToShow =
    nameSearch.length === 0
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(nameSearch.toLowerCase())
        );

  return (
    <div>
      {personsToShow.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}{" "}
          <button type="button" onClick={() => handleDelete(person.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
