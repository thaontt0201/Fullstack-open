const Search = ({ handleFindName, findName }) => {
  return (
    <div>
      Filter shown with <input onChange={handleFindName} />
      <div>
        {findName.map((isName) => (
          <p key={isName.name}>
            {isName.name} {isName.number}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Search;
