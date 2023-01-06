import React, { useEffect, useState } from "react";
import Card from "./card";
import foto1 from "../assets/slide1.jpg";
import foto2 from "../assets/slide2.jpg";
import foto3 from "../assets/slide3.jpg";
import foto4 from "../assets/slide4.jpg";
import foto5 from "../assets/slide5.jpg";
import foto6 from "../assets/slide6.jpg";
import foto7 from "../assets/slide7.jpg";
import foto8 from "../assets/slide8.jpg";
import foto9 from "../assets/slide9.jpg";
import foto10 from "../assets/slide10.jpg";
import foto11 from "../assets/slide11.jpg";
import foto12 from "../assets/slide12.jpg";
import foto13 from "../assets/slide13.jpg";
import foto14 from "../assets/slide14.jpg";
import foto15 from "../assets/slide15.jpg";
import foto16 from "../assets/slide16.jpg";

export default function CardContainer(props) {
  const { score, highScore, handleGame } = props;

  const images = [
    { name: "Slide1", src: foto1 },
    { name: "Slide2", src: foto2 },
    { name: "Slide3", src: foto3 },
    { name: "Slide4", src: foto4 },
    { name: "Slide5", src: foto5 },
    { name: "Slide6", src: foto6 },
    { name: "Slide7", src: foto7 },
    { name: "Slide8", src: foto8 },
    { name: "Slide9", src: foto9 },
    { name: "Slide10", src: foto10 },
    { name: "Slide11", src: foto11 },
    { name: "Slide12", src: foto12 },
    { name: "Slide13", src: foto13 },
    { name: "Slide14", src: foto14 },
    { name: "Slide15", src: foto15 },
    { name: "Slide16", src: foto16 },
  ];

  const [cards, setNewCards] = useState(images);

  const shuffle = (newCards) => {
    for (let i = images.length - 1; i > 0; i--) {
      let randomNum = Math.floor(Math.random() * i);
      let temp = newCards[i];
      newCards[i] = newCards[randomNum];
      newCards[randomNum] = temp;
    }
  };

  useEffect(() => {
    const newCards = [...cards];
    shuffle(newCards);
    setNewCards(newCards);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score, highScore]);

  return (
    <div className="cardContainer">
      {cards.map((card) => (
        <Card card={card} key={card.name} handleGame={handleGame} />
      ))}
    </div>
  );
}
