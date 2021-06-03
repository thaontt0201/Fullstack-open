import React, { useState, useEffect } from "react";
import Contact from "./components/Contact";
import Form from "./components/Form";
import Search from "./components/Search";
import axios from "axios";
import contactService from "./services/contacts";
import Notification from "./components/Noti";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [findName, setFindName] = useState([]);
  const [notiMessage, setNotiMessage] = useState(null);

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
      // id: Math.floor(Math.random() * 99),
    };

    const existed = persons.some((person) => person.name === newName);
    if (existed === true) {
      return window.alert(`${newName} is already added to the phonebook`);
    }
    contactService.createContact(addPerson).then((returnedContact) => {
      console.log("test", returnedContact);
      setPersons([...persons, returnedContact]);
      setNewName("");
      setNewNumber("");
      setNotiMessage(`Added ${addPerson.name}`);
      setTimeout(() => {
        setNotiMessage(null);
      }, 2000);
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

  const deleteContact = (id) => {
    const urlDelete = `http://localhost:3001/api/persons/${id}`;
    const contact = persons.find((n) => n.id === id);
    const noDelete = persons.filter((n) => n.id !== id);
    console.log(contact.name);
    if (window.confirm(`Are you sure you want to delete ${contact.name}?`)) {
      axios
        .delete(urlDelete)
        .then(() => setPersons(persons.filter((n) => n.id !== id)));
    } else {
      console.log("cancelled");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Search handleFindName={handleFindName} findName={findName} />
      <Notification message={notiMessage} />
      <Form
        addContact={addContact}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <Contact
        persons={persons}
        deleteContact={deleteContact}
        key={persons.id}
      />
    </div>
  );
};

export default App;
