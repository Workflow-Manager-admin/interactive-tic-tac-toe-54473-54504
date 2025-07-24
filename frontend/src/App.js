import React, { useState, useEffect } from 'react';
import './App.css';

// Minimal color palette as CSS variables (light theme)
//  primary: #1e90ff  | accent: #ff5252 | secondary: #e0e0e0

// Utility function for calculating if there's a winner
function calculateWinner(squares) {
  // All winning patterns
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i=0; i<lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      squares[a] && 
      squares[a] === squares[b] && 
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}

// PUBLIC_INTERFACE
function Square({ value, onClick, highlight }) {
  /** A single clickable tic tac toe square. */
  return (
    <button
      className="ttt-square"
      onClick={onClick}
      style={highlight ? { background: 'var(--ttt-accent)' } : undefined}
      aria-label={value ? `Square with ${value}` : "Empty square"}
    >
      {value}
    </button>
  );
}

// PUBLIC_INTERFACE
function Board({ squares, onSquareClick, winningLine }) {
  /** The 3x3 tic tac toe board. */
  function renderSquare(i) {
    const isHighlight = winningLine ? winningLine.includes(i) : false;
    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => onSquareClick(i)}
        highlight={isHighlight}
      />
    );
  }
  // Render 3 rows
  return (
    <div className="ttt-board">
      {[0, 1, 2].map(row =>
        <div key={row} className="ttt-board-row">
          {[0, 1, 2].map(col => renderSquare(3 * row + col))}
        </div>
      )}
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  /**
   * Main Tic Tac Toe app component.
   */
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [winnerInfo, setWinnerInfo] = useState({ winner: null, line: null });
  const [moveCount, setMoveCount] = useState(0);

  // Set up the color palette via CSS variables (override template colors)
  useEffect(() => {
    document.documentElement.style.setProperty('--ttt-primary', '#1e90ff');   // blue
    document.documentElement.style.setProperty('--ttt-accent', '#ff5252');    // bright red
    document.documentElement.style.setProperty('--ttt-secondary', '#e0e0e0'); // light gray
    document.documentElement.style.setProperty('--button-bg', '#1e90ff');
    document.documentElement.style.setProperty('--button-text', '#ffffff');
    document.documentElement.style.setProperty('--bg-primary', '#ffffff');
    document.documentElement.style.setProperty('--text-primary', '#222');
    document.documentElement.style.setProperty('--border-color', 'var(--ttt-secondary)');
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
        <span style={{ color: 'var(--ttt-accent)', fontWeight: 600 }}>
          {winnerInfo.winner}
        </span>{" "}
        wins!
      </span>
    );
  } else if (gameOver && moveCount === 9) {
    status = <span style={{ color: 'grey' }}>Draw!</span>;
  } else {
    status = (
      <span>
        Turn:{" "}
        <span
          style={{
            color: xIsNext ? 'var(--ttt-primary)' : 'var(--ttt-accent)',
            fontWeight: 500
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
        >
          Restart
        </button>
        <div className="ttt-infobar">
          <span className="ttt-minor">
            Two player (local device). Minimal demo build. 
          </span>
        </div>
      </main>
    </div>
  );
}

export default App;
