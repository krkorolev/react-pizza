import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://645ce550e01ac610589682d1.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("Ошибка в получении пиццы!");
        navigate("/");
      }
    }
    fetchPizza();
  }, []);
  if (!pizza) {
    return <>Загрузка...</>;
  }
  return (
    <div className="container">
      <img className="pizza-block__image" src={pizza.imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title">{pizza.title}</h4>

      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {pizza.price} ₽</div>
      </div>
    </div>
  );
};

export default FullPizza;
