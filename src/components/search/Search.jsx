import debounce from "lodash.debounce";

const Search = ({ setTitle }) => {
  const handleChange = (e) => setTitle(e?.target?.value);
  const debounceOnChange = debounce(handleChange, 500);
  return (
    <div>
      <input type="text" onChange={debounceOnChange} />
    </div>
  );
};
export default Search;
