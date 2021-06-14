import axios from "axios";

const url = "http://localhost:3001/api/persons";

const getAll = () => {
  const request = axios.get(url);
  return request.then((response) => response.data);
};

const createContact = (newContact) => {
  const request = axios.post(url, newContact);
  return request.then((response) => response.data);
};

const updateContact = (updatedContect) => {
  const request = axios.put(url, updatedContect);
  return request.then((response) => response.data);
};
export default {
  getAll,
  createContact,
  updateContact,
};
