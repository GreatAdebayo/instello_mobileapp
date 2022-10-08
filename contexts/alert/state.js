import { createContext, useReducer } from "react";
import alertReducer from "./reducer";
import { SET_ALERT, REMOVE_ALERT } from "./action";

export const AlertContext = createContext();

export const AlertState = (props) => {
  const initialState = [];
  const [state, dispatch] = useReducer(alertReducer, initialState);

  const setAlert = (msg, type, timeout = 3000) => {
    const id = Math.random();
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id },
    });

    //removeAlert
    setTimeout(
      () =>
        dispatch({
          type: REMOVE_ALERT,
          payload: id,
        }),
      timeout
    );
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};
