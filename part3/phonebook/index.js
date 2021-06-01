const express = require("express");
const app = express();
let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/api/persons", (req, res) => {
  res.send(persons);
});

app.get("/api/info", (req, res) => {
  const date = new Date().toGMTString();
  const timezone = new Date().getTimezoneOffset() / 60;
  const count = persons.length;
  res.send(
    `<p>Phonebook has info ${count} people.</p>` + `<p>${date} ${timezone}</p>`
  );
});

const port = 3001;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
