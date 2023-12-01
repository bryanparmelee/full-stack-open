import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameSearch, setNameSearch] = useState("");
  const [notification, setNotification] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleNameChange = (e) => setNewName(e.target.value);
  const handleNumberChange = (e) => setNewNumber(e.target.value);
  const handleSearchChange = (e) => setNameSearch(e.target.value);

  const handleNameSubmit = (e) => {
    e.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson && existingPerson.number === newNumber) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
      return;
    } else if (existingPerson) {
      if (
        window.confirm(
          `${existingPerson.name} is already in the phonebook. Reaplce old number with a new one?`
        )
      ) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        personService
          .update(existingPerson.id, updatedPerson)
          .then((res) => {
            setPersons(
              persons.map((p) => (p.id !== existingPerson.id ? p : res.data))
            );
            setNotification(`${res.data.name} has been updated.`);
            setNewName("");
            setNewNumber("");
            setTimeout(() => {
              setNotification("");
            }, 5000);
          })
          .catch((error) => {
            setError(error.response.data.error);
          });
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      personService
        .create(personObject)
        .then((res) => {
          setPersons(persons.concat(res.data));
          setNotification(`${res.data.name} has been added.`);
          setNewName("");
          setNewNumber("");
          setTimeout(() => {
            setNotification("");
          }, 5000);
        })
        .catch((error) => {
          setError(error.response.data.error);
        });
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const handleDelete = (id) => {
    const toDelete = persons.find((p) => p.id === id);
    if (window.confirm(`Do you really want to delete ${toDelete.name}?`)) {
      personService.deletePerson(id);
      setPersons(persons.filter((p) => p.id !== id));
      setNotification(`${toDelete.name} has been removed`);
      setTimeout(() => {
        setNotification("");
      }, 5000);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} isError={false} />
      <Notification message={error} isError={true} />
      <Filter nameSearch={nameSearch} handleSearchChange={handleSearchChange} />
      <hr />
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        handleNameSubmit={handleNameSubmit}
      />

      <h2>Numbers</h2>
      <Persons
        persons={persons}
        nameSearch={nameSearch}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
