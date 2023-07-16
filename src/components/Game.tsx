import { useState } from "react";

import Board from "./Board"
import { BoardSquares } from "./Board";

export default function Game() {
    const [history, setHistory] = useState<Array<BoardSquares>>([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState<number>(0);
    const [ascending, setAscending] = useState<boolean>(true);

    const isXTurn = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares: BoardSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory)
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(move: number) {
        setCurrentMove(move);
    }

    const moves = history.map((_, move) => {
        let description;

        if (move > 0) {
            description = "Go to move #" + move;
        }
        else {
            description = "Go to move Game Start";
        }

        if (move === currentMove) {
            return (
                <li key={move}>
                    <div>
                        {"You are at move #" + move}
                    </div>
                </li>
            )
        }

        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>
                    {description}
                </button>
            </li>
        )
    })

    if (!ascending) moves.reverse();

    return (
        <div className="game">
            <div className="game-board">
                <Board isXTurn={isXTurn} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <label>
                    <input
                        type='checkbox'
                        checked={ascending}
                        onChange={(e) => setAscending(e.target.checked)} />
                    Ascending
                </label>
                <ol>
                    {moves}
                </ol>
            </div>
        </div>
    )
}