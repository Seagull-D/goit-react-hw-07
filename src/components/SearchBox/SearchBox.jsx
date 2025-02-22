import { useDispatch, useSelector } from "react-redux";
import s from "./SearchBox.module.css";

import { changeFilter, selectFilter } from "../../redux/filtersSlice";
const SearchBox = () => {
  const searchTerm = useSelector(selectFilter);

  const dispatch = useDispatch();

  const handleSearchChange = (evt) => {
    dispatch(changeFilter(evt.target.value.trim() || ""));
  };
  return (
    <div>
      <div>
        <input
          onChange={handleSearchChange}
          value={searchTerm}
          placeholder="пошук"
          className={s.inputSearchIcon}
          type="text"
          name="searchInput"
        />
      </div>
    </div>
  );
};

export default SearchBox;
