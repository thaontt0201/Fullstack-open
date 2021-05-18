const Search = ({ handleFindName, findName }) => {
  const renderCountry = () => {
    if (findName.length >= 10) {
      return <p>Too many matches, specify another filter</p>;
    }
    if (findName.length === 1) {
      return (
        <div>
          <h2>{findName[0].name}</h2>
          <p>{findName[0].capital}</p>
          <p>{findName[0].population}</p>
          <h3>Languages</h3>
          <ul>
            {findName[0].languages.map((language) => (
              <li key={language.nativeName}>{language.name}</li>
            ))}
          </ul>
          <img src={findName[0].flag} width={400} height={300} />
        </div>
      );
    }
    return (
      <div>
        {findName.map((isName) => (
          <p key={isName.name}>
            {isName.name} {isName.number}
          </p>
        ))}
      </div>
    );
  };
  return (
    <div>
      Find countries <input onChange={handleFindName} />
      <div>{renderCountry()}</div>
    </div>
  );
};

export default Search;
