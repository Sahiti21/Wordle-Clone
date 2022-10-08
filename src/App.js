import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import {
  boardDefault,
  generateWordSet
} from "./Words";
import React, {
  useState,
  createContext,
  useEffect
} from "react";
import GameOver from "./components/GameOver";

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({
    attempt: 0,
    letter: 0
  });
  const [wordSet, setWordSet] = useState(new Set());
  const [correctWord, setCorrectWord] = useState("");
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
    });
  }, []);

  const onEnter = () => {

    if (currAttempt.letter !== 5) return;

    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }
    
    if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({
        attempt: currAttempt.attempt + 1,
        letter: 0
      });
      if (currAttempt.attempt === 5) {
        setGameOver({
          gameOver: true,
          guessedWord: false
        });
        return;
      }
    } else {
      alert("Word not found");
      for (let i = 0; i < 5; i++) {
        board[currAttempt.attempt][i] = "";
      }
      setCurrAttempt({
        attempt: currAttempt.attempt,
        letter: 0
      });
    }

    if (currWord.toLowerCase() === correctWord.toLowerCase()) {
      setGameOver({
        gameOver: true,
        guessedWord: true
      });
      return;
    }


  };

  const onDelete = () => {
    if (currAttempt.letter === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letter - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({
      ...currAttempt,
      letter: currAttempt.letter - 1
    });
  };

  const onSelectLetter = (key) => {
    if (currAttempt.letter > 4) return;

    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letter] = key;
    setBoard(newBoard);
    setCurrAttempt({
      attempt: currAttempt.attempt,
      letter: currAttempt.letter + 1,
    });
  };

  return ( <
    div className = "App" >
    <
    nav >
    <
    h1 > Wordle < /h1> < /
    nav > <
    AppContext.Provider value = {
      {
        board,
        setBoard,
        currAttempt,
        setCurrAttempt,
        correctWord,
        onSelectLetter,
        onDelete,
        onEnter,
        setDisabledLetters,
        disabledLetters,
        setGameOver,
        gameOver,
      }
    } >
    <
    div className = "game" >
    <
    Board / > {
      gameOver.gameOver ? < GameOver / > : < Keyboard / >
    } <
    /div> < /
    AppContext.Provider > <
    /div>
  );
}

export default App;
