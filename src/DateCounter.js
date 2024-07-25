import { useState, useReducer } from "react";

function reducer(state, action) {
  console.log(state, action);
  // return { count: 0, step: 1 };

  switch (action.type) {
    case 'dec':
      return { ...state, count: state.count - state.step };

    case 'inc':
      return { ...state, count: state.count + state.step };

    case 'setCount':
      return { ...state, count: action.payload };

    case 'setStep':
      return { ...state, step: action.payload };

    case 'reset':
      return { count: 0, step: 1 };

    default: throw new Error('some error in the reducer')
  }
}

function DateCounter() {

  const initialState = { count: 0, step: 1 };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("june 11 2002");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "dec", payload: -1 });
  };

  const inc = function () {
    dispatch({ type: "inc", payload: 1 });
  };

  const defineCount = function (e) {
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    dispatch({ type: "setStep", payload: Number(e.target.value) })
  };

  const reset = function () {
    dispatch({ type: "reset" })
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;