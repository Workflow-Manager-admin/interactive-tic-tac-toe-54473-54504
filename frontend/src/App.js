import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');

  // Effect to apply theme to document element
  useEffect(() => {
<<<<<<< HEAD
    // Set a fully red theme using only shades of red for all variables:
    document.documentElement.style.setProperty('--ttt-primary', '#b71c1c');      // Deep strong red for primaries (X/labels)
    document.documentElement.style.setProperty('--ttt-accent', '#ff5252');       // Bright accent red (O/winner backgrounds)
    document.documentElement.style.setProperty('--ttt-secondary', '#ff8a80');    // Soft red (board hover secondary)
    document.documentElement.style.setProperty('--button-bg', '#ff5252');
    document.documentElement.style.setProperty('--button-bg-hover', '#b71c1c');
    document.documentElement.style.setProperty('--button-text', '#fff');
    document.documentElement.style.setProperty('--bg-primary', '#fff5f5');
    document.documentElement.style.setProperty('--text-primary', '#b71c1c');
    document.documentElement.style.setProperty('--text-accent', '#ff5252');
    document.documentElement.style.setProperty('--border-color', '#ff8a80');
  }, []);

  useEffect(() => {
    // Evaluate winner or draw after move
    const winner = calculateWinner(squares);
    if (winner) {
      // Find the winning line for highlight
      const lines = [
        [0, 1, 2], [3, 4, 5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
      ];
      const line = lines.find(
        ([a, b, c])=>squares[a] && squares[a] === squares[b] && squares[a] === squares[c]
      );
      setWinnerInfo({ winner, line });
      setGameOver(true);
    } else if (moveCount === 9) {
      setWinnerInfo({ winner: null, line: null }); // Draw
      setGameOver(true);
    }
  }, [squares, moveCount]);

  // PUBLIC_INTERFACE
  function handleSquareClick(i) {
    if (gameOver || squares[i]) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
    setMoveCount(moveCount + 1);
  }

  // PUBLIC_INTERFACE
  function handleRestart() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setGameOver(false);
    setWinnerInfo({ winner: null, line: null });
    setMoveCount(0);
  }

  let status;
  if (winnerInfo.winner) {
    status = (
      <span>
        <span style={{
          color: "var(--ttt-accent)",
          fontWeight: 700,
          textShadow: '0 1px 6px #ffd6d6'
        }}>
          {winnerInfo.winner}
        </span>{" "}
        wins!
      </span>
    );
  } else if (gameOver && moveCount === 9) {
    status = (
      <span style={{
        color: "#c62828",
        textShadow: "0 2px 6px #fff3f3"
      }}>
        Draw!
      </span>
    );
  } else {
    status = (
      <span>
        Turn:{" "}
        <span
          style={{
            color: xIsNext ? 'var(--ttt-primary)' : 'var(--ttt-accent)',
            fontWeight: 600,
            textShadow: "0 1px 8px #fff0f0"
          }}
        >
          {xIsNext ? 'X' : 'O'}
        </span>
      </span>
    );
  }

  return (
    <div className="App" style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <main className="ttt-main-centered">
        <h1 className="ttt-title" style={{
          color: 'var(--ttt-primary)',
          marginBottom: '8px',
          fontWeight: 700,
          fontSize: '2.4rem',
          textShadow: '0 2px 6px #ffeaea'
        }}>
          Tic Tac Toe
        </h1>
        <Board
          squares={squares}
          onSquareClick={handleSquareClick}
          winningLine={winnerInfo.line}
        />
        <div className="ttt-status">
          {status}
        </div>
        <button
          className="ttt-reset-btn"
          onClick={handleRestart}
          aria-label="Restart game"
=======
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="App">
      <header className="App-header">
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
>>>>>>> parent of c6fa5c3 (CheckPoint - cg4db7c766)
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          Current theme: <strong>{theme}</strong>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
