const Contact = ({ persons, deleteContact }) => {
  return (
    <div>
      <h2>Contacts</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.id} style={{ marginBottom: "10px" }}>
            {person.name} {person.number}
            <button
              key={person.id}
              style={{ marginLeft: "5px" }}
              onClick={() => deleteContact(person.id)}
            >
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contact;
