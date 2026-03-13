import { useState } from "react";

// Styles
import "../styles/Quiz.css";

// Assets
import backIcon from "../assets/back.svg";

export default function Quiz() {
  const question = {
    text: "Which Prophet is mentioned the most by name in the Quran?",
    options: ["Adam", "Ibrahim", "Musa", "Muhammad"],
    correctAnswer: "Musa",
  };

  const [selected, setSelected] = useState(null);

  function handleClick(option) {
    if (selected !== null) return;
    setSelected(option);
  }

  function getButtonClass(option) {
    if (!selected) return "option";
    if (option === question.correctAnswer) return "option correct";
    if (option === selected && option !== question.correctAnswer)
      return "option wrong";
    return "option";
  }

  return (
    <div className="quiz-container">
      <div className="quiz-icons">
        <img src={backIcon} alt="Back" />
      </div>

      <div className="mosque-banner">
        <div className="skyline-container">
          {/* Back wave */}
          <div className="wave wave-back"></div>

          {/* Front wave */}
          <div className="wave wave-front"></div>

          {/* Mosque skyline */}
          <div className="mosque-skyline"></div>
        </div>
      </div>
      <h2>
        <div className="questions"></div>
        {question.text}
      </h2>
      <div className="questions">
        {question.options.map((option) => (
          <button
            key={option}
            className={getButtonClass(option)}
            onClick={() => handleClick(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
