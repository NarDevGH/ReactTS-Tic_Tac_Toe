import { useState } from "react";

import Board from "./Board"
import { BoardSquares } from "./Board";

export default function Game() {
    const boardSize: number = 3;

    const [history, setHistory] = useState<Array<BoardSquares>>([Array(boardSize * boardSize).fill(null)]);
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

    function moveBoardIndex(move: number): number {
        const moveBoard = history[move];
        const prevBoard = history[move - 1];
        for (let i = 0; i < moveBoard.length; i++) {
            if (moveBoard[i] && moveBoard[i] != prevBoard[i]) {
                return i;
            }
        }
        return -1;
    }

    function moveRow(moveIndex: number) {
        return Number((moveIndex / boardSize).toFixed(0)) + 1;
    }

    function moveColumn(moveIndex: number) {
        return Number((moveIndex % boardSize).toFixed(0)) + 1;
    }

    const moves = history.map((_, move) => {
        let description;

            const moveIndex = moveBoardIndex(move);
            const row = moveRow(moveIndex);
            const column = moveColumn(moveIndex);

        if (move > 0) {
            description = `Go to move # ${move} (${row},${column})`;
        }
        else {
            description = "Go to move Game Start";
        }

        if (move === currentMove) {
            if (move > 0) {
                return (
                    <li key={move}>
                        <div>
                            {`You are at move # ${move} (${row},${column})`}
                        </div>
                    </li>
                )
            }
            else {
                return (
                    <li key={move}>
                        <div>
                            {`You are at move # ${move}`}
                        </div>
                    </li>
                )
            }
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
                <Board
                    size={boardSize}
                    isXTurn={isXTurn}
                    squares={currentSquares}
                    onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <label>
                    <input
                        type='checkbox'
                        checked={ascending}
                        onChange={(e) => setAscending(e.target.checked)} />
                    Ascending
                </label>
                <ul>
                    {moves}
                </ul>
            </div>
        </div>
    )
}