import { useReducer } from "react";

const ACTIONS = {
  INCREMENT: "increment",
  DECREMENT: "decrement",
  RESET: "reset",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.INCREMENT:
      return { count: state.count + 1 };
    case ACTIONS.DECREMENT:
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };

    default:
      return state;
  }
}

export const Counter = () => {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  const increment = () => {
    dispatch({ type: ACTIONS.INCREMENT });
  };

  const dectement = () => {
    dispatch({ type: ACTIONS.DECREMENT });
  };
  const reset = () => {
    dispatch({ type: ACTIONS.RESET });
  };

  return (
    <>
      <div className="text-center text-2xl">{state.count}</div>
      <button
        className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
        onClick={increment}
      >
        +
      </button>
      <button
        className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
        onClick={dectement}
      >
        -
      </button>
      <button
        className="w-full mt-1 px-4 py-2 font-semibold text-sm border bg-cyan-500 text-white rounded-full shadow-sm focus:border-sky-500 focus:ring-sky-500"
        onClick={reset}
      >
        Reset
      </button>
    </>
  );
};
