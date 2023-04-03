import { useReducer, useState } from "react";
import { ACTIONS } from "./TodoContainer";

export const Todo = ({ todo, dispatch }) => {
  return (
    <>
      <div className="flex flex-nowrap w-1/2 mx-auto justify-center space-y-2 space-x-4">
        <span
          //style={{ color: todo.complete ? "#AAA" : "#000" }}
          className={`my-auto text-2xl w-1/2 text-right ${
            todo.complete ? "line-through text-[#AAA]" : ""
          }`}
        >
          {todo.name}
        </span>
        <div className="flex align-center flex-wrap space-y-2">
          <button
            onClick={() =>
              dispatch({ type: ACTIONS.TOGGLE_TODO, payload: { id: todo.id } })
            }
            className="w-full px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm"
          >
            Toggle
          </button>
          <button
            onClick={() =>
              dispatch({ type: ACTIONS.DELETE_TODO, payload: { id: todo.id } })
            }
            className="w-full px-4 py-2 font-semibold text-sm bg-red-500 text-white rounded-full shadow-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};
