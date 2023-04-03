import { useReducer, useState } from "react";
import { Todo } from "./Todo";

export const ACTIONS = {
  ADD_TODO: "add_todo",
  TOGGLE_TODO: "toggle_todo",
  DELETE_TODO: "delete_todo",
};

function reducer(todos, action) {
  console.log(todos, action);
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(action.payload.name)];
    case ACTIONS.TOGGLE_TODO:
      return todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      });
    case ACTIONS.DELETE_TODO:
      return todos.filter((todo) => todo.id !== action.payload.id);

    default:
      return todos;
  }
}

const newTodo = (name) => {
  return { id: Date.now(), name: name, complete: false };
};

export const TodoContainer = () => {
  const [todos, dispatch] = useReducer(reducer, []);
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    //richiamo la funzione dentro al REDUCER passando:
    //-I Argomento-> "add_todo"
    //-II Argomento-> tramite payload rappresenta il parametro dell'azione che stiamo per  in questo caso name
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name } });
    setName("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Todo..."
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
        />
      </form>
      {todos.map((todo) => {
        return <Todo key={todo.id} todo={todo} dispatch={dispatch} />;
      })}
    </>
  );
};
