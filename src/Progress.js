function Progress({ index, numQue, points, maxPoints, answer }) {
    return (
        <header className="progress">
            <progress max={numQue} value={index + Number(answer !== null)} />
            <p>Question <strong>{index + 1}</strong> / {numQue} </p>
            <p>{points}/{maxPoints}</p>
        </header>
    )
}

export default Progress
