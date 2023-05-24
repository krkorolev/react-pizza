import React, { useState, useEffect, useContext, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import qs from "qs";

import { searchContext } from "../App";
import Categories from ".././components/Categories";
import Sort, { popupArray } from ".././components/Sort";
import PizzaBlock from ".././components/PizzaBlock";
import Skeleton from ".././components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination/Pagination";
import {
  setActiveCategories,
  setCurrentPage,
  setFiltres,
} from "../redux/slices/filterSlice";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const activeCategories = useSelector(
    (state) => state.filter.activeCategories
  );
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const itemsSort = useSelector((state) => state.filter.sort);
  const currentPage = useSelector((state) => state.filter.page);

  const { searchValue } = useContext(searchContext);

  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPizzas = async () => {
    setIsLoading(true);
    const sortBy = itemsSort.sortProperty.replace("-", "");
    const order = itemsSort.sortProperty.includes("-") ? "asc" : "desc";
    try {
      const resp = await axios(
        `https://645ce550e01ac610589682d1.mockapi.io/items?page=${currentPage}&limit=4&category=${
          activeCategories > 0 ? activeCategories : ""
        }&sortBy=${sortBy}&order=${order}`
      );
      setPizzas(resp.data);
    } catch (error) {
      alert("Ошибка при получении данных");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [activeCategories, itemsSort, currentPage]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = popupArray.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      dispatch(
        setFiltres({
          activeCategories: params.activeCategories,
          currentPage: params.currentPage,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        activeCategories,
        sortProperty: itemsSort.sortProperty,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [activeCategories, itemsSort, currentPage]);

  const searchPizzas = pizzas.filter((el) =>
    el.title.toLowerCase().includes(searchValue.toLowerCase())
  );
  const dispatch = useDispatch();

  const onChangeCategories = (id) => {
    dispatch(setActiveCategories(id));
  };
  const onCahangePage = (id) => {
    dispatch(setCurrentPage(id));
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategories={activeCategories}
          setActiveCategories={onChangeCategories}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...Array(6)].map((_, i) => <Skeleton key={i} />)
          : searchPizzas.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onCahangePage} />
    </div>
  );
};

export default Home;
