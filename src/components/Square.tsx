
type ValueProp = {
    value: string | null,
    onClick: () => void,
    winnerSquare: boolean
}

const Square = ({ value, onClick, winnerSquare: winner }: ValueProp) => {
    return (
        <button className={winner ? 'winnerSquare' : 'square'} onClick={onClick}>
            {value}
        </button>
    )
}

export default Square;