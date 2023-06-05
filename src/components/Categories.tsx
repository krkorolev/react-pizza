import React from "react";

type CategoriesProps = {
  activeCategories: number;
  setActiveCategories: (i: number) => void;
};

const Categories: React.FC<CategoriesProps> = React.memo(
  ({ activeCategories, setActiveCategories }) => {
    console.log("");
    const categories = [
      "Все",
      "Мясные",
      "Вегетарианская",
      "Гриль",
      "Острые",
      "Закрытые",
    ];

    return (
      <div className="categories">
        <ul>
          {categories.map((el, i) => (
            <li
              key={i}
              onClick={() => setActiveCategories(i)}
              className={activeCategories === i ? "active" : ""}
            >
              {el}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

export default Categories;
