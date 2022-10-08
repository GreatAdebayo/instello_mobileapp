import { createContext, useReducer } from "react";
import generalReducer from "./reducer";
import { SET_COLOR_MODE } from "./action";
import { useColorScheme } from "react-native";

export const GeneralContext = createContext();

export const GeneralState = (props) => {
  const colorScheme = useColorScheme();
  const initialState = {
    colorMode: colorScheme,
  };
  const [state, dispatch] = useReducer(generalReducer, initialState);

  const toggleColor = (color) => {
    dispatch({
      type: SET_COLOR_MODE,
      payload: color,
    });
  };

  return (
    <GeneralContext.Provider
      value={{
        colorMode: state.colorMode,
        toggleColor,
      }}
    >
      {props.children}
    </GeneralContext.Provider>
  );
};
