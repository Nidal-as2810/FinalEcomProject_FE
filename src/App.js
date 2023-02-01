import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/navbar/Footer";
import Main from "./components/mainpage/Main";

import Signup from "./components/register/Signup";
import Signin from "./components/register/Signin";

import Category from "./components/category/Category";
import Cart from "./components/category/Cart";
import Checkout from "./components/checkout/Checkout";
import Favourite from "./components/category/Favourite";
import Orders from "./components/category/Orders";
import Profile from "./components/profile/Profile";

function App() {
  const [sub, setSub] = useState({});
  const currentSubCategory = (sub) => {
    setSub(sub);
  };
  return (
    <BrowserRouter>
      <div className="App">
        <div className="nav">
          <Navbar changeCategory={currentSubCategory} />
        </div>

        <div className="container">
          <div className="nav-dimensions"></div>

          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/category" element={<Category currentSub={sub} />} />
            <Route element={<RequireAuth />}>
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/favourite" element={<Favourite />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
