import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Link, Route } from "react-router-dom";
import Home from "./home";
import Shopping from "./shopping";
import Cart from "./cart";

const Navigation = ({ products }) => {
  const [items, setItems] = useState(0);
  const [amount, setAmount] = useState(0);
  const [cart, setCart] = useState([]);
  const [cartTitles, setTitles] = useState([]);

  useEffect(() => {
    let totalItems = 0;
    let subTotal = 0;
    let totalAmount = 0;
    for (let i = 0; i < cart.length; i++) {
      totalItems += Number(cart[i].quantity);
      subTotal = Number(cart[i].price) * Number(cart[i].quantity);
      totalAmount += subTotal;
    }
    setItems(totalItems);
    setAmount(totalAmount);
  }, [cart, cartTitles]);

  const handleQuantity = ({ product }, quantity) => {
    let newCart = [...cart];
    let newTitles = [...cartTitles];
    let objIndex = cart.findIndex((obj) => obj.title === product.title);
    newCart[objIndex].quantity = quantity;
    if (quantity < 1) {
      newCart.splice(objIndex, 1);
      newTitles.splice(objIndex, 1);
    }
    setCart(newCart);
    setTitles(newTitles);
  };

  const updateCart = ({ product }) => {
    setCart((prevArr) => [...prevArr, product]);
    setTitles((prevArr) => [...prevArr, product.title]);
  };

  const handleShopping = (title, quantity) => {
    let objIndex = products.findIndex((obj) => obj.title === title);
    let product = products[objIndex];

    if (!cartTitles.includes(title)) {
      product.quantity = quantity;
      updateCart({ product });
    } else {
      handleQuantity({ product }, quantity);
    }
  };

  return (
    <BrowserRouter>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/shop">Shop</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/shop"
          element={
            <Shopping
              products={products}
              items={items}
              amount={amount}
              handleShopping={handleShopping}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              amount={amount}
              items={items}
              handleShopping={handleShopping}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Navigation;
