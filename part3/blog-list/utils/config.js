require("dotenv").config();

const mongoUrl =
  process.env.NODE_ENV === "test"
    ? process.env.TESTING_URI
    : process.env.MONGO_URI;

const PORT = process.env.PORT;

module.exports = {
  mongoUrl,
  PORT,
};
