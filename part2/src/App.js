import React, { useState, useEffect } from "react";
import Contact from "./components/Contact";
import Form from "./components/Form";
import Search from "./components/Search";
import axios from "axios";
import contactService from "./services/contacts";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [findName, setFindName] = useState([]);

  useEffect(() => {
    contactService.getAll().then((initialContacts) => {
      setPersons(initialContacts);
    });
  }, []);

  const addContact = (e) => {
    e.preventDefault();
    console.log("saved", e.target);
    const addPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    const existed = persons.some((person) => person.name === newName);
    if (existed === true) {
      return window.alert(`${newName} is already added to the phonebook`);
    }
    contactService.createContact(addPerson).then((returnedContact) => {
      setPersons([...persons, returnedContact]);
      setNewName("");
      setNewNumber("");
    });
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
      <Search handleFindName={handleFindName} findName={findName} />
      <Form
        addContact={addContact}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <Contact persons={persons} />
    </div>
  );
};

export default App;
