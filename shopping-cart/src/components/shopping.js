import React, { useEffect, useState } from "react";
import Card from "./card";

export default function Shopping({ items, amount, products, handleShopping }) {
  const [newAmount, updateAmount] = useState(amount);
  const [newItems, updateItems] = useState(items);

  useEffect(() => {
    updateAmount(amount);
    updateItems(items);
  }, [amount, items]);

  return (
    <div className="shop">
      <div className="cartSection">
        <h4>Items: {newItems}</h4>
        <h4>Amount: {newAmount}</h4>
      </div>
      <div className="shoppingContainer">
        {products.map((card) => (
          <Card card={card} key={card.title} handleShopping={handleShopping} />
        ))}
      </div>
    </div>
  );
}
