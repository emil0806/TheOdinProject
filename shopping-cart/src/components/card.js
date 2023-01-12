import React, { useState } from "react";

export default function Card({
  card: { title, price, quantity, src },
  handleShopping,
}) {
  const [items, setQuantity] = useState(quantity);

  return (
    <div className="card">
      <h1 className="title">{title}</h1>
      <h3 className="price">{price + " kr."} </h3>
      <img alt="card" className="card-img" src={src}></img>
      <div className="quantityContainer">
        <input
          id="inputField"
          type="number"
          value={items}
          min="0"
          onChange={(e) => setQuantity(e.target.value)}
        ></input>
      </div>
      <button onClick={handleShopping.bind(this, title, items)}>
        Add to Cart
      </button>
    </div>
  );
}
