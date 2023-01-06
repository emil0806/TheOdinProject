import React, { useState } from "react";
import CardContainer from "./cardContainer";

export default function Game() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [cardsArr, addCard] = useState([]);
  const [text, setText] = useState("");

  const handleScore = () => {
    setScore((prevScore) => prevScore + 1);
  };

  const handleHighScore = () => {
    if (score > highScore) {
      setHighScore(score);
    } else {
      return;
    }
  };

  const updateText = (string) => {
    setText(string);
  };

  const updateCardsArr = (cardName) => {
    addCard((prevArr) => [...prevArr, cardName]);
  };

  const reset = () => {
    setScore(0);
    addCard([]);
  };

  const handleGame = (cardName) => {
    if (!cardsArr.includes(cardName)) {
      updateCardsArr(cardName);
      handleScore();
      updateText("Go for gold!");
    } else {
      updateText("You Lose. Better luck next time");
      handleHighScore();
      reset();
    }
  };

  return (
    <div className="game">
      <div className="scoreBoard">
        <h2>{"Score: " + score}</h2>
        <h2>{"HighScore: " + highScore}</h2>
      </div>
      <CardContainer
        score={score}
        highScore={highScore}
        handleGame={handleGame}
      />
      <div className="text">
        <h2>{text}</h2>
      </div>
    </div>
  );
}
