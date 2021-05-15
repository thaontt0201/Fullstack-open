import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addContact = (e) => {
    e.preventDefault();
    console.log("saved", e.target);
    setNewName("");
    const existed = persons.some((person) => person.name === newName);
    if (existed === true) {
      return window.alert(`${newName} is already added to the phonebook`);
    }
    setPersons([...persons, { name: newName }]);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <h2>Names</h2>
        <ul>
          {persons.map((person) => (
            <li key={person.name}>{person.name}</li>
          ))}
        </ul>
      </div>
      ...
    </div>
  );
};

export default App;
