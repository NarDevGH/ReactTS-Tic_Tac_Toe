
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
    size: number
    isXTurn: boolean,
    squares: BoardSquares,
    onPlay: (x: BoardSquares) => void
}

const Board = ({ size, isXTurn, squares, onPlay }: BoardProps) => {

    const handleClick = (i: number) => {
        // If square not null return
        if (squares[i]) return;
        // If game over return
        if (calculateWinner(squares)) return;

        const nextSquares = squares.slice();
        isXTurn ? nextSquares[i] = "X" : nextSquares[i] = "O";
        onPlay(nextSquares);
    }

    const RenderSquare = (i: number) => <Square value={squares[i]} onClick={() => handleClick(i)} />

    const RenderBoard = (size: number) => {
        const board = new Array();

        for (let i = 0; i < size * size; i += size) {
            let row = new Array();
            for (let j = 0; j < size; j++) {
                row.push(RenderSquare(i + j));
            }

            board.push(
                <div className="board-row">
                    {row}
                </div>
            )
        }

        return board;
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

            {RenderBoard(size)}
        </>
    )
}

export default Board;