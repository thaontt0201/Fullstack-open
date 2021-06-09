require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
//Creating connection to database
const mongoose = require("mongoose");
const url = process.env.MONGO_URI;
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((res) => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.log("error connecting to MongoDB: ", err.message);
  });

const Contact = require("./models/contact");

app.use(express.json());
morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :response-time ms - :res[content-length] :body")
);
app.use(cors());

// let persons = [
//   {
//     name: "Arto Hellas",
//     number: "040-123456",
//     id: 1,
//   },
//   {
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//     id: 2,
//   },
//   {
//     name: "Dan Abramov",
//     number: "12-43-234345",
//     id: 3,
//   },
//   {
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//     id: 4,
//   },
// ];

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/api/persons", (req, res) => {
  Contact.find({}).then((result) => {
    res.send(result);
  });
});

app.get("/api/info", (req, res) => {
  const date = new Date().toGMTString();
  const timezone = new Date().getTimezoneOffset() / 60;
  Contact.count({}).then((result) => {
    res.send(
      `<p>Phonebook has info ${result} people.</p>` +
        `<p>${date} ${timezone}</p>`
    );
  });
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  Contact.findById(id).then((contact) => {
    if (!contact) {
      return res.status(404).send("not found");
    }
    res.send(contact);
  });
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id.toString();
  Contact.findByIdAndDelete(id).then(() => res.status(204).end());
});

app.post("/api/persons", (req, res) => {
  const addperson = req.body;
  if (!addperson.name || !addperson.number) {
    return res.status(400).send({ error: "name or number is missing" });
  }

  Contact.find({}).then((result) => {
    if (result.some((p) => p.name === addperson.name)) {
      return res.status(400).send({ error: "name must be unique" });
    }
    const contact = new Contact({
      name: addperson.name,
      number: addperson.number,
    });
    contact.save().then((saveContact) => {
      res.send(saveContact);
    });
  });
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});

//Disconnect to databse after terminating the application
process.on("SIGINT", () => {
  mongoose.connection.close();
});
