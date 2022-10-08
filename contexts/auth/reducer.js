import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  SUBMITTING,
  CLEAR_MSG,
  CONFIRM_EMAIL_SUCCESS,
  CONFIRM_EMAIL_FAIL,
  RESEND_CODE_SUCCESS,
  RESEND_CODE_FAIL,
  SIGNIN_FAIL,
  SIGNIN_SUCCESS,
  CHECKEMAIL_FAIL,
  CHECKEMAIL_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_SUCCESS,
  LOAD_USER,
  LOAD_USER_ERROR,
  IS_LOADING,
  SIGNOUT,
} from "./action";

const authReducer = (state, action) => {
  switch (action.type) {
    case SUBMITTING:
      return {
        ...state,
        isSubmitting: true,
      };

    case CLEAR_MSG:
      return {
        ...state,
        signupSuccessMsg: null,
        signupFailMsg: null,
        sendCodeSuccessMsg: null,
        sendCodeFailMsg: null,
        confirmFailMsg: null,
        signInFailMsg: null,
        checkEmailFailMsg: null,
        checkEmailSuccessMsg: null,
        updatePasswordFailMsg: null,
        updatePasswordFailSuccessMsg: null,
        updatePasswordSuccessMsg: null,
      };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        signupSuccessMsg: action.payload.msg,
        userInfo: { email: action.payload.email },
        isSubmitting: false,
      };

    case SIGNUP_FAIL:
      return {
        ...state,
        signupFailMsg: action.payload,
        isSubmitting: false,
      };

    case RESEND_CODE_FAIL:
      return {
        ...state,
        sendCodeFailMsg: action.payload,
        isSubmitting: false,
      };

    case RESEND_CODE_SUCCESS:
      return {
        ...state,
        sendCodeSuccessMsg: action.payload,
        isSubmitting: false,
      };

    case CONFIRM_EMAIL_FAIL:
      return {
        ...state,
        confirmFailMsg: action.payload,
        isSubmitting: false,
        token: null,
        isAuthenticated: false,
      };

    case CONFIRM_EMAIL_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload,
        isSubmitting: false,
      };

    case SIGNIN_FAIL:
      return {
        ...state,
        signInFailMsg: action.payload,
        isSubmitting: false,
        isAuthenticated: false,
      };

    case SIGNIN_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        isAuthenticated: true,
        token: action.payload,
      };

    case CHECKEMAIL_FAIL:
      return {
        ...state,
        isSubmitting: false,
        isAuthenticated: false,
        token: null,
        checkEmailFailMsg: action.payload,
      };

    case CHECKEMAIL_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        isAuthenticated: false,
        token: null,
        userInfo: { email: action.payload.email },
        checkEmailSuccessMsg: action.payload.msg,
      };

    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        updatePasswordSuccessMsg: action.payload,
      };

    case UPDATE_PASSWORD_FAIL:
      return {
        ...state,
        isSubmitting: false,
        updatePasswordFailMsg: action.payload,
      };

    case IS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case LOAD_USER:
      return {
        ...state,
        isAuthenticated: true,
        userInfo: action.payload,
        isLoading: false,
      };
    case LOAD_USER_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        userInfo: null,
        isLoading: false,
      };

    case SIGNOUT:
      return {
        ...state,
        isAuthenticated: false,
        userInfo: null,
      };

    default:
      return state;
  }
};

export default authReducer;
