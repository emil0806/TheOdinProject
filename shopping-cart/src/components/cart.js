import React, { useEffect, useState } from "react";
import Card from "./card";

export default function Cart({ cart, amount, items, handleShopping }) {
  const [newCart, updateCart] = useState(cart);
  const [newAmount, updateAmount] = useState(amount);
  const [newItems, updateItems] = useState(items);

  useEffect(() => {
    updateCart(cart);
    updateAmount(amount);
    updateItems(items);
  }, [cart, amount, items]);

  return (
    <div>
      <h1>Checkout</h1>
      <h3>Items: {newItems}</h3>
      <h3>Amount: {newAmount}</h3>
      {newCart.map((card) => (
        <Card card={card} key={card.title} handleShopping={handleShopping} />
      ))}
    </div>
  );
}
