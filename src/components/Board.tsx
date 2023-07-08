
import Square from "./Square";

export type BoardSquares = Array<string | null>;

function calculateWinner(squares: BoardSquares): string | null {
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
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}


type BoardProps = {
    isXTurn: boolean,
    squares: BoardSquares,
    onPlay: (x: BoardSquares) => void
}

const Board = ({ isXTurn, squares, onPlay }: BoardProps) => {

    const handleClick = (i: number) => {
        // If square not null return
        if (squares[i]) return;
        // If game over return
        if (calculateWinner(squares)) return;

        const nextSquares = squares.slice();
        isXTurn ? nextSquares[i] = "X" : nextSquares[i] = "O";
        onPlay(nextSquares);
    }

    let status: string;

    const winner: string | null = calculateWinner(squares);
    if (winner) {
        status = `Winner is ${winner}`;
    }
    else {
        status = `Next Player: ${isXTurn ? "X" : "O"}`;
    }

    return (
        <>
            <div className="status">{status}</div>

            <div className="board-row">
                <Square value={squares[0]} onClick={() => handleClick(0)} />
                <Square value={squares[1]} onClick={() => handleClick(1)} />
                <Square value={squares[2]} onClick={() => handleClick(2)} />
            </div>
            <div className="board-row">
                <Square value={squares[3]} onClick={() => handleClick(3)} />
                <Square value={squares[4]} onClick={() => handleClick(4)} />
                <Square value={squares[5]} onClick={() => handleClick(5)} />
            </div>
            <div className="board-row">
                <Square value={squares[6]} onClick={() => handleClick(6)} />
                <Square value={squares[7]} onClick={() => handleClick(7)} />
                <Square value={squares[8]} onClick={() => handleClick(8)} />
            </div>
        </>
    )
}

export default Board;