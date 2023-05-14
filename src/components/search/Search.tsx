import { FC, ChangeEvent } from "react";
import debounce from "lodash.debounce";
interface SearchProps {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}
const Search: FC<SearchProps> = ({ setSearch }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setSearch(event.target.value);
  const debounceOnChange = debounce(handleChange, 500);
  return (
    <div>
      <input type="text" onChange={debounceOnChange} />
    </div>
  );
};
export default Search;
