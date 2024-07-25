function FinishedScreen({ points, maxPoints }) {
    return (
        <p className="result">
            you scored {points} / {maxPoints}
        </p>
    )
}

export default FinishedScreen
