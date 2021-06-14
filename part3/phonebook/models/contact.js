const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, "at least 3 characters"],
    unique: true,
    required: true,
  },
  number: {
    type: String,
    minLength: [8, "enter atleast 8 digits"],
    required: true,
  },
});
personSchema.plugin(uniqueValidator);

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
