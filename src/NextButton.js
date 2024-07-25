import Question from "./Question";

function NextButton({ dispatch, answer, index, numQue }) {
    if (answer === null) return null;

    return (
        <button className="btn btn-ui"
            onClick={() => dispatch({ type: 'nextQuestion' })} >
            Next
        </button>
    )
}

export default NextButton
