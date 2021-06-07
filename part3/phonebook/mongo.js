const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}
const password = process.argv[2];

const url = `mongodb+srv://Phonebook:${password}@cluster0.fz72u.mongodb.net/Phonebook?retryWrites=true&w=majority`;
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
});
const Contact = mongoose.model("Contact", personSchema);

const name = process.argv[3];
const number = process.argv[4];

if (process.argv.length < 4) {
  Contact.find({}).then((result) => {
    console.log("Phonebook: ");
    result.forEach((contact) => {
      console.log(`${contact.name} ${contact.number}`);
    });
    mongoose.connection.close();
  });
} else {
  const contact = new Contact({
    name: name,
    number: number,
  });

  contact.save().then((res) => {
    console.log(`saved ${res.name} ${res.number}`);
    Contact.find({}).then((result) => {
      console.log("Phonebook:");
      result.forEach((contact) => {
        console.log(`${contact.name} ${contact.number}`);
      });
      mongoose.connection.close();
    });
  });
}

// Contact.find({}).then((result) => {
//   result.forEach((contact) => {
//     console.log(contact);
//   });
//   mongoose.connection.close();
// });
