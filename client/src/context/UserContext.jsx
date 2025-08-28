import { createContext, useContext, useReducer, useEffect } from "react";

const UserContext = createContext();

const initialState = {
  userData: null,
};

const ACTIONS = {
  SET_USER: "SET_USER",
  CLEAR_USER: "CLEAR_USER",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_USER:
      return { ...state, userData: action.payload };
    case ACTIONS.CLEAR_USER:
      return { ...state, userData: null };
    default:
      return state;
  }
}

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      try {
        dispatch({ type: ACTIONS.SET_USER, payload: JSON.parse(data) });
      } catch {
        dispatch({ type: ACTIONS.CLEAR_USER });
      }
    }
  }, []);

  const setUser = (value) => {
    dispatch({ type: ACTIONS.SET_USER, payload: value });
    localStorage.setItem("user", JSON.stringify(value));
  };

  const clearUser = () => {
    dispatch({ type: ACTIONS.CLEAR_USER });
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ userData: state.userData, setUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
