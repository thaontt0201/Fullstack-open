import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "0123456789" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addContact = (e) => {
    e.preventDefault();
    console.log("saved", e.target);
    setNewName("");
    setNewNumber("");
    const existed = persons.some((person) => person.name === newName);
    if (existed === true) {
      return window.alert(`${newName} is already added to the phonebook`);
    }
    setPersons([...persons, { name: newName, number: newNumber }]);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <div>
        <h2>Numbers</h2>
        <ul>
          {persons.map((person) => (
            <li key={person.name}>
              {person.name} {person.number}
            </li>
          ))}
        </ul>
      </div>
      ...
    </div>
  );
};

export default App;
