import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSort, SortPizzas, SortPropertyEnum } from "../redux/slices/filterSlice";
import { RootState } from "../redux/store";

type PopupItem = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export const popupArray: PopupItem[] = [
  {
    name: "популярности (DESK)",
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
  {
    name: "популярности (ASC)",
    sortProperty: SortPropertyEnum.RATING_ASC,
  },
  {
    name: "цене (DESK)",
    sortProperty: SortPropertyEnum.PRICE_DESC,
  },
  {
    name: "цене (ASC)",
    sortProperty: SortPropertyEnum.PRICE_ASC,
  },
  {
    name: "алфавиту (DESK)",
    sortProperty: SortPropertyEnum.PRICE_DESC,
  },
  {
    name: "алфавиту (ASC)",
    sortProperty: SortPropertyEnum.PRICE_ASC,
  },
];
type onClickSortEvent = MouseEvent & {
  path: Node[];
};

type SortProps = {
  value: SortPizzas
}

const SortPopup: React.FC<SortProps> = React.memo (({value}) => {
  const sortRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onClickSort = (event: MouseEvent) => {
      const _event = event as onClickSortEvent;
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setIsVisible(false);
      }
    };
    document.body.addEventListener("click", onClickSort);
    return () => document.body.removeEventListener("click", onClickSort);
  }, []);

  const dispatch = useDispatch();
  const activePopup = (el: PopupItem) => {
    dispatch(setSort(el));
    setIsVisible(false);
  };
  // const itemsSort = useSelector((state: RootState) => state.filter.sort);

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
        <span>{value.name}</span>
      </div>
      {isVisible && (
        <div className="sort__popup">
          <ul>
            {popupArray.map((el, i) => (
              <li
                key={i}
                onClick={() => activePopup(el)}
                className={value.name === el.name ? "active" : ""}
              >
                {el.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default SortPopup;
