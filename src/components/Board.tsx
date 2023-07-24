
import Square from "./Square";

export type BoardSquares = Array<string | null>;

type WinSquares = Array<number> | null;

function calculateWinner(squares: BoardSquares, size: number): WinSquares {

    //Check rows
    for (let y = 0; y < size * size; y += size) {
        for (let x = 0; x < size - 2; x++) {
            if (squares[x + y] && squares[x + y] === squares[x + y + 1] && squares[x + y] === squares[x + y + 2]) {
                return new Array<number>(x + y, x + y + 1, x + y + 2);
            }
        }
    }

    // Check columns
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size * size - size * 2; j += 6) {
            if (squares[j + i] && squares[j + i] === squares[j + i + size] && squares[j + i] === squares[j + i + size * 2]) {
                return new Array<number>(j + i, j + i + size, j + i + size * 2);
            }
        }
    }

    // check diagonals_1 (left2right)
    for (let y = 0; y < size * size - size * 2; y += 6) {
        for (let x = 0; x < size - 2; x++) {
            if (squares[x + y] && squares[x + y] === squares[x + y + size + 1] && squares[x + y] === squares[x + y + size * 2 + 2]) {
                return new Array<number>(x + y, x + y + size + 1, x + y + size * 2 + 2);
            }
        }
    }

    // check diagonals_2 (right2left)
    for (let y = 0; y < size * size - size * 2; y += 6) {
        for (let x = size; x > 1; x--) {
            if (squares[x + y] && squares[x + y] === squares[x + y + size - 1] && squares[x + y] === squares[x + y + size * 2 - 2]) {
                return new Array<number>(x + y, x + y + size - 1, x + y + size * 2 - 2);
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

    const RenderSquare = (i: number, winnerSquare: boolean) => {
        return (
            <Square
                key={i}
                value={squares[i]}
                onClick={() => handleClick(i)}
                winnerSquare={winnerSquare} />
        )
    }

    const RenderBoard = (size: number, winnerSquare: WinSquares) => {
        const board = new Array();

        for (let i = 0; i < size * size; i += size) {
            let row = new Array();
            for (let j = 0; j < size; j++) {
                if (winnerSquare && winnerSquare.indexOf(i + j) != -1) {
                    row.push(RenderSquare(i + j, true));
                }
                else {
                    row.push(RenderSquare(i + j, false));
                }
            }

            board.push(
                <div className="board-row" key={i / size}>
                    {row}
                </div>
            )
        }

        return board;
    }

    let status: string;

    const winnerSquares = calculateWinner(squares, size);
    const winner: string | null = winnerSquares ? squares[winnerSquares[0]] : null;
    if (winner) {
        status = `Winner is ${winner}`;
    }
    else if (squares.indexOf(null) == -1) {
        status = `Draw`;
    }
    else {
        status = `Next Player: ${isXTurn ? "X" : "O"}`;
    }

    return (
        <>
            <div className="status">{status}</div>

            {RenderBoard(size, winnerSquares)}
        </>
    )
}

export default Board;