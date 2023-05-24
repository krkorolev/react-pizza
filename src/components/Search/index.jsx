import React, { useCallback, useContext, useRef, useState } from "react";
import { searchContext } from "../../App";
import styles from "./search.module.scss";
import debounse from "lodash.debounce";

const Search = () => {
  const [value, setValue] = useState("");
  const { setSearchValue } = useContext(searchContext);

  const inputRef = useRef();
  const onClickClear = () => {
    setSearchValue("");
    inputRef.current.focus();
  };
  const updateSearchValue = useCallback(
    debounse((str) => {
      setSearchValue(str);
    }, 1000),
    []
  );
  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };
  return (
    <div className={styles.search}>
      <svg
        className={styles.imgSearch}
        fill="none"
        height="24"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" x2="16.65" y1="21" y2="16.65" />
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск..."
      />
      {value && (
        <svg
          onClick={onClickClear}
          className={styles.clear}
          height="48"
          viewBox="0 0 48 48"
          width="48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z" />
          <path d="M0 0h48v48h-48z" fill="none" />
        </svg>
      )}
    </div>
  );
};

export default Search;
