import React from "react";

export default function Card(props) {
  const {
    card: { name, src },
    handleGame,
  } = props;

  return (
    <div className="card" id={name} onClick={handleGame.bind(this, name)}>
      <img src={src} alt={name}></img>
    </div>
  );
}
