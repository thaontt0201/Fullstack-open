const Search = ({ handleFindName, findName, clickShow, country }) => {
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
        {country ? (
          <div>
            {country && (
              <div>
                <h2>{country.name}</h2>
                <h3>Languages</h3>
                <ul>
                  {country.languages.map((language) => (
                    <li key={language.nativeName}>{language.name}</li>
                  ))}
                </ul>
                <img src={country.flag} width={400} height={300} />
              </div>
            )}{" "}
          </div>
        ) : (
          <div>
            {" "}
            {findName.map((isName) => {
              return (
                <div
                  style={{ display: "flex", marginBottom: "10px" }}
                  key={isName.name}
                >
                  <div>
                    {isName.name} {isName.number}
                  </div>
                  <button
                    style={{ marginLeft: "5px" }}
                    onClick={() => clickShow(isName)}
                  >
                    show
                  </button>
                </div>
              );
            })}
          </div>
        )}
        {/* {findName.map((isName) => {
          return (
            <div
              style={{ display: "flex", marginBottom: "10px" }}
              key={isName.name}
            >
              <div>
                {isName.name} {isName.number}
              </div>
              <button
                style={{ marginLeft: "5px" }}
                onClick={() => clickShow(isName)}
              >
                show
              </button>
            </div>
          );
        })}
        {country && (
          <div>
            <h2>{country.name}</h2>
            <h3>Languages</h3>
            <ul>
              {country.languages.map((language) => (
                <li key={language.nativeName}>{language.name}</li>
              ))}
            </ul>
            <img src={country.flag} width={400} height={300} />
          </div>
        )} */}
      </div>
    );
  };
  // console.log(findName);
  // console.log(country);
  return (
    <div>
      Find countries <input onChange={handleFindName} />
      <div>{renderCountry()}</div>
    </div>
  );
};

export default Search;
