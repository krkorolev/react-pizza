import React, { useEffect, useContext, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import qs from "qs";

import { searchContext } from "../App";
import Categories from "../components/Categories";
import SortPopup, { popupArray } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination/Pagination";
import {
  setActiveCategories,
  setCurrentPage,
  setFiltres,
} from "../redux/slices/filterSlice";
import { fetchPizza, FetchPizzasArgs } from "../redux/slices/pizzaSlice";
import { RootState } from "../redux/store";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeCategories = useSelector(
    (state: RootState) => state.filter.activeCategories
  );

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const itemsSort = useSelector((state: RootState) => state.filter.sort);
  const currentPage = useSelector(
    (state: RootState) => state.filter.currentPage
  );
  const { pizzas, status } = useSelector((state: RootState) => state.pizza);

  const { searchValue } = useContext<any>(searchContext);

  const getPizzas = async () => {
    const sortBy = itemsSort.sortProperty.replace("-", "");
    const order = itemsSort.sortProperty.includes("-") ? "asc" : "desc";
    dispatch(
      // @ts-ignore
      fetchPizza({
        sortBy,
        order,
        currentPage,
        activeCategories,
      })
    );
  };

  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [activeCategories, itemsSort, currentPage]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as FetchPizzasArgs;

      const sort = popupArray.find((obj) => obj.sortProperty === params.sortBy);

      dispatch(
        setFiltres({
          activeCategories: params.activeCategories,
          currentPage: params.currentPage,
          sort: sort ? sort : popupArray[0],
        })
      );
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
  const onChangeCategories = React.useCallback((id: number) => {
    dispatch(setActiveCategories(id));
  }, []);
  const onCahangePage = (id: number) => {
    dispatch(setCurrentPage(id));
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategories={activeCategories}
          setActiveCategories={onChangeCategories}
        />
        <SortPopup value={itemsSort}/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === "loading"
          ? [...Array(6)].map((_, i) => <Skeleton key={i} />)
          : searchPizzas.map((obj) => (
              <PizzaBlock key={obj.id} {...obj} />
            ))}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onCahangePage} />
    </div>
  );
};

export default Home;
