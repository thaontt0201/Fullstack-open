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

app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Contact.findById(id)
    .then((contact) => {
      if (!contact) {
        return res.status(404).send("not found");
      }
      res.send(contact);
    })
    .catch((error) => {
      next(error);
    });
});

app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id.toString();
  Contact.findByIdAndDelete(id)
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});

app.post("/api/persons", (req, res, next) => {
  const addperson = req.body;
  if (!addperson.name || !addperson.number) {
    return res.status(400).send({ error: "name or number is missing" });
  }

  // Contact.find({}).then((result) => {
  //   if (result.some((p) => p.name === addperson.name)) {
  //     return res.status(400).send({ error: "name must be unique" });
  //   }
  // });
  const contact = new Contact({
    name: addperson.name,
    number: addperson.number,
  });
  contact
    .save()
    .then((saveContact) => {
      res.send(saveContact);
    })
    .catch((error) => next(error));
});

app.put("/api/persons", (req, res) => {
  const editperson = req.body;
  console.log(editperson);
  Contact.findOneAndUpdate(
    { name: editperson.name },
    { number: editperson.number },
    { new: true }
  ).then((results) => {
    console.log("update result", results);
    res.send(results);
  });
});

const errorHandler = (error, req, res, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).send({ error: error.message });
  }
  next(error);
};
app.use(errorHandler);
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});

//Disconnect to databse after terminating the application
process.on("SIGINT", () => {
  mongoose.connection.close();
});
