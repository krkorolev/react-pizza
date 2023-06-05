import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import FullPizza from "./pages/FullPizza";
import NotFound from "./pages/NotFound";

import "./scss/app.scss";
import MainLayout from "./layouts/MainLayout";

export const searchContext = React.createContext({});

function App() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <searchContext.Provider value={{ searchValue, setSearchValue }}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/pizza/:id" element={<FullPizza />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </searchContext.Provider>
  );
}

export default App;
