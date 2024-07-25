import { useEffect } from "react"

function Timer({ dispatch, timeRemain }) {
    const mins = Math.floor(timeRemain / 60);
    const secs = timeRemain % 60;
    useEffect(function () {
        const id = setInterval(() => {
            dispatch({ type: "tick" });
        }, 1000);

        return () => clearInterval(id);
    }, [])
    return (
        <p className="timer">
            {mins} : {secs}
        </p>
    )
}

export default Timer
