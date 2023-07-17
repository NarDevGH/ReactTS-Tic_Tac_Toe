
import Square from "./Square";

export type BoardSquares = Array<string | null>;

function calculateWinner(squares: BoardSquares, size: number): string | null {

    //Check rows
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size - 2; j++) {
            if (squares[j + i] && squares[j + i] === squares[j + i + 1] && squares[j + i] === squares[j + i + 2]) {
                return squares[j + i];
            }
        }
    }

    // Check columns
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size * size - size * 2; j += 6) {
            if (squares[j + i] && squares[j + i] === squares[j + i + size] && squares[j + i] === squares[j + i + size * 2]) {
                return squares[j + i];
            }
        }
    }

    // check diagonals_1 (left2right)
    for (let y = 0; y < size * size - size * 2; y += 6) {
        for (let x = 0; x < size - 2; x++) {
            if (squares[x + y] && squares[x + y] === squares[x + y + size + 1] && squares[x + y] === squares[x + y + size * 2 + 2]) {
                return squares[x + y];
            }
        }
    }

    // check diagonals_2 (right2left)
    for (let y = 0; y < size * size - size * 2; y += 6) {
        for (let x = size; x > 1; x--) {
            if (squares[x + y] && squares[x + y] === squares[x + y + size - 1] && squares[x + y] === squares[x + y + size * 2 - 2]) {
                return squares[x + y];
            }
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
        if (calculateWinner(squares, size)) return;

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

    const winner: string | null = calculateWinner(squares, size);
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