import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [findName, setFindName] = useState([]);

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

  const handleFindName = (e) => {
    const correctName = persons.filter(
      (person) =>
        person.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
    );
    console.log(e.target.value);
    if (correctName.length === 0 || e.target.value === "") {
      return setFindName([]);
    }
    setFindName(correctName);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter shown with <input onChange={handleFindName} />
      </div>
      <div>
        {findName.map((isName) => (
          <p key={isName.name}>
            {isName.name} {isName.number}
          </p>
        ))}
      </div>
      <form onSubmit={addContact}>
        <h2>Add a new</h2>
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
