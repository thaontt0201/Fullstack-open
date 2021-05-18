import React, { useState, useEffect } from "react";
import Contact from "./components/Contact";
import Form from "./components/Form";
import Search from "./components/Search";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [findName, setFindName] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((respone) => {
      setCountries(respone.data);
    });
  }, []);

  const handleFindName = (e) => {
    const correctName = countries.filter(
      (country) =>
        country.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
    );
    if (correctName.length === 0 || e.target.value === "") {
      return setFindName([]);
    }
    setFindName(correctName);
  };

  return (
    <div>
      <h2>Country</h2>
      <Search handleFindName={handleFindName} findName={findName} />
    </div>
  );
};

export default App;
