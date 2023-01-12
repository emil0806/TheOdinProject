import React from "react";
import "./styles/styles.css";
import Navigation from "./components/navigation";
import glass from "./assets/glass.jpg";
import cup from "./assets/cup.jpg";
import box from "./assets/box.jpg";
import plates from "./assets/plates.jpg";

function App() {
  const products = [
    { title: "Glass", price: 500, quantity: 0, src: glass },
    { title: "Cup", price: 100, quantity: 0, src: cup },
    { title: "Box", price: 600, quantity: 0, src: box },
    { title: "Plates", price: 1000, quantity: 0, src: plates },
  ];
  return (
    <div className="App">
      <Navigation products={products} />
    </div>
  );
}

export default App;
