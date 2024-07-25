import { useEffect, useReducer } from 'react';
import DateCounter from './DateCounter';
import Header from './Header';
import Main from './Main'
import Error from './Error'
import Loader from './Loader'
import StartScreen from './StartScreen'
import Question from './Question';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishedScreen from './FinishedScreen';
import Timer from './Timer';


const initialState = {
  questions: [],

  //"loading", "error", "ready", "active", "finished"
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  timeRemain: 420,

}

function reducer(state, action) {
  switch (action.type) {
    case "dataLoaded":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points: action.payload === question.correctOption ? state.points + question.points : state.points,

      };

    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finished":
      return { ...state, status: "finished" };
    case "tick":
      return {
        ...state,
        timeRemain: state.timeRemain - 1,
        status: state.timeRemain < 0 ? "finished" : "active"
      };

    default:
      throw new Error(`ye ${action.type} action kam nahi karega`);

  }

}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { status, questions, index, answer, points, timeRemain } = state;
  const numQue = questions.length;
  const maxPoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(function () {
    fetch('http://localhost:8800/questions')
      .then(res => res.json())
      .then(data => dispatch({ type: "dataLoaded", payload: data }))
      .catch(err => dispatch({ type: "dataFailed" }));
  }, []);

  return (<div className='app'>
    <Header />
    <Main>
      {status === "error" && <Error />}
      {status === "loading" && <Loader />}
      {status === "ready" && <StartScreen dispatch={dispatch} />}
      {status === "active" && (
        <>
          <Progress index={index} numQue={numQue} points={points} maxPoints={maxPoints} answer={answer} />
          <Question question={questions[index]} answer={answer} dispatch={dispatch} index={index} numQue={numQue} />
          <footer>
            <Timer dispatch={dispatch} timeRemain={timeRemain} />
            <NextButton dispatch={dispatch} answer={answer} />
          </footer>
        </>
      )
      }
      {
        status === "finished" && (
          <FinishedScreen points={points} maxPoints={maxPoints} />
        )
      }

      {/* add a restart, highscore feature in teh app. */}

    </Main>
  </div>)
}