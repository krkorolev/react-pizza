import React from 'react';

const Categories = ({activeCategories, setActiveCategories}) => {
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
};

export default Categories;
