const express = require("express");
const app = express();

app.use(express.json());

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

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((p) => p.id === id);
  if (!person) {
    return res.status(404).send("not found");
  }
  res.send(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((p) => p.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const addperson = req.body;
  const add = { ...addperson, id: Math.floor(Math.random() * 99) };
  if (!addperson.name || !addperson.number) {
    return res.status(400).send({ error: "name or number is missing" });
  }
  if (persons.some((p) => p.name === addperson.name)) {
    return res.status(400).send({ error: "name must be unique" });
  }
  persons.push(add);
  res.send(persons);
});

const port = 3001;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
