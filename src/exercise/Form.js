import { useReducer, useRef } from "react";
/* a */
const INITIAL_STATE = {
  title: "",
  desc: "",
  price: 0,
  category: "",
  tags: [],
  images: {
    sm: "",
    md: "",
    lg: "",
  },
  quantity: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return { ...state, [action.payload.name]: action.payload.value };
    case "ADD_TAG":
      return { ...state, tags: [...state.tags, action.payload] };
    case "REMOVE_TAG":
      return {
        ...state,
        tags: [...state.tags.filter((tag) => tag !== action.payload)],
      };
    case "INCREASE":
      return { ...state, quantity: state.quantity + 1 };
    case "DECREASE":
      return { ...state, quantity: state.quantity - 1 };
    default:
      return state;
  }
};

export const Form = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const tagRef = useRef("");

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleTags = (e) => {
    const tags = tagRef.current.value.split(",");
    tags.forEach((tag) => {
      dispatch({
        type: "ADD_TAG",
        payload: tag,
      });
    });
    tagRef.current.value = "";
  };

  console.log(state);

  return (
    <>
      <div>
        <form className="flex flex-wrap space-y-4">
          <div className="w-full">
            <input
              name="title"
              onChange={handleChange}
              type="text"
              placeholder="Title"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            />
            <input
              name="desc"
              onChange={handleChange}
              type="text"
              placeholder="Desc"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            />
            <input
              name="price"
              onChange={handleChange}
              type="number"
              placeholder="Price"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            />
          </div>

          <div className="w-full">
            <select
              name="category"
              onChange={handleChange}
              id="countries"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 text-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            >
              <option defaultValue>Category</option>
              <option value="sneakers">Sneakers</option>
              <option value="tshirts">T-shirts</option>
              <option value="jeans">Jeans</option>
            </select>
          </div>

          <div className="w-full">
            <textarea
              ref={tagRef}
              placeholder="Seperate tags with commas..."
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 text-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            ></textarea>
            <button
              onClick={handleTags}
              type="button"
              className="submit w-full px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm"
            >
              Add Tags
            </button>
            <p className="text-center font-semibold">Tags:</p>
            <ul className="marker:text-sky-400 list-disc pl-5 space-y-3 text-slate-400">
              {state.tags.map((tag) => (
                <li key={tag} className="relative pr-2">
                  {tag}{" "}
                  <button
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_TAG",
                        payload: tag,
                      })
                    }
                    className="submit px-2 font-semibold text-sm bg-red-500 text-white rounded-full shadow-sm absolute right-2"
                  >
                    X
                  </button>{" "}
                </li>
              ))}
            </ul>
          </div>

          <div className="quantity flex items-center w-full">
            <button
              onClick={() =>
                dispatch({
                  type: "DECREASE",
                })
              }
              type="button"
              className="w-1/4 px-4 py-2 text-xl font-bold bg-cyan-500 text-white  rounded-full shadow-sm"
            >
              -
            </button>
            <span className="w-2/4 text-center font-semibold">
              Quantity ({state.quantity})
            </span>
            <button
              onClick={() =>
                dispatch({
                  type: "INCREASE",
                })
              }
              type="button"
              className="w-1/4 px-4 py-2 text-xl font-bold bg-cyan-500 text-white  rounded-full shadow-sm"
            >
              +
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
