import { SET_COLOR_MODE } from "./action";

const generalReducer = (state, action) => {
  switch (action.type) {
    case SET_COLOR_MODE:
      return {
        ...state,
        colorMode: action.payload,
        isColorChanged: true,
      };

    default:
      return state;
  }
};

export default generalReducer;
