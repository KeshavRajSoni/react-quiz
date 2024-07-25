function Question({ question, answer, dispatch, index, numQue }) {
    if (index === numQue) {
        dispatch({ type: "finished" });
        return null;
    }
    return (
        <div>
            <h4>{question.question}</h4>
            <div className="options">
                {question.options.map((option, index) =>
                    <button
                        className={`btn btn-option 
                        ${index === answer ? "answer" : ""}
                        ${answer !== null ? (index === question.correctOption ? "correct" : "wrong") : ""}`}
                        key={option}
                        disabled={answer !== null}
                        onClick={() => dispatch({ type: 'newAnswer', payload: index })
                        }>
                        {option}
                    </button>)
                }




            </div>
        </div>
    )
}

export default Question;
