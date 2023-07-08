
type ValueProp = {
    value: string | null,
    onClick: () => void
}

const Square = ({ value, onClick }: ValueProp) => {

    return (
        <button className='square' onClick={onClick}>
            {value}
        </button>
    )
}

export default Square;