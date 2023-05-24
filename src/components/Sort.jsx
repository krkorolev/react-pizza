import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSort } from "../redux/slices/filterSlice";

export const popupArray = [
  {
    name: "популярности (DESK)",
    sortProperty: "rating",
  },
  {
    name: "популярности (ASC)",
    sortProperty: "-rating",
  },
  {
    name: "цене (DESK)",
    sortProperty: "price",
  },
  {
    name: "цене (ASC)",
    sortProperty: "-price",
  },
  {
    name: "алфавиту (DESK)",
    sortProperty: "title",
  },
  {
    name: "алфавиту (ASC)",
    sortProperty: "-title",
  },
];

const Sort = () => {
  const sortRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onClickSort = (event) => {
      if (!event.composedPath().includes(sortRef.current)) {
        setIsVisible(false);
      }
    };
    document.body.addEventListener("click", onClickSort);
    return () => document.body.removeEventListener("click", onClickSort);
  }, []);

  const dispatch = useDispatch();
  const activePopup = (el) => {
    dispatch(setSort(el));
    setIsVisible(false);
  };
  const itemsSort = useSelector((state) => state.filter.sort);

  return (
    <div ref={sortRef} className="sort">
      <div onClick={() => setIsVisible(!isVisible)} className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span>{itemsSort.name}</span>
      </div>
      {isVisible && (
        <div className="sort__popup">
          <ul>
            {popupArray.map((el, i) => (
              <li
                key={i}
                onClick={() => activePopup(el)}
                className={itemsSort.name === el.name ? "active" : ""}
              >
                {el.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
