import React, { useState, useReducer } from "react";
import { login } from "./utils/login";

const loginReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    case "success":
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
      };
    case "error":
      return {
        ...state,
        error: "Incorrect username or password!",
        isLoading: false,
        username: "",
        password: "",
      };
    case "logout":
      return {
        ...state,
        isLoggedIn: false,
        username: "",
        password: "",
        isLoading: false,
      };
    case "filed":
      return {
        ...state,
        [action.filed]: action.value,
      };
  }
  return state;
};
/* 3483966044 */

const initialState = {
  username: "",
  password: "",
  isLoading: false,
  error: "",
  isLoggedIn: false,
};

export default function LoginUseState() {
  const [state, dispatch] = useReducer(loginReducer, initialState);

  /*  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, showLoader] = useState(false);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  QUESTO VIENE SOSTITUITO DA...
  */

  const { username, password, isLoading, error, isLoggedIn } = state;

  const onSubmit = async (e) => {
    e.preventDefault();

    /*  
    setError("");
    showLoader(true); 
    QUESTO VIENE SOSTITUITO DA...
    */
    dispatch({ type: "login" });
    try {
      await login({ username, password });
      //setIsLoggedIn(true);
      dispatch({ type: "success" });
    } catch (error) {
      /* setError("Incorrect username or password!");
      showLoader(false);
      setUsername("");
      setPassword(""); 
      QUESTO VIENE SOSTITUITO DA...
      */
      dispatch({ type: "error" });
    }
  };

  return (
    <div className="App">
      <div className="login-container">
        {isLoggedIn ? (
          <>
            <h1 className="text-2xl">Welcome {username}!</h1>
            <button
              onClick={() => dispatch({ type: "logout" })}
              className="w-full px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm"
            >
              Log Out
            </button>
          </>
        ) : (
          <form className="form" onSubmit={onSubmit}>
            {error && <p className="error">{error}</p>}
            <p>Please Login!</p>
            <input
              type="text"
              placeholder="username"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              value={username}
              onChange={(e) =>
                dispatch({
                  type: "filed",
                  filed: "username",
                  value: e.currentTarget.value,
                })
              }
            />
            <input
              type="password"
              placeholder="password"
              autoComplete="new-password"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              value={password}
              onChange={(e) =>
                dispatch({
                  type: "filed",
                  filed: "password",
                  value: e.currentTarget.value,
                })
              }
            />
            <button
              className="submit w-full px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Log In"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
