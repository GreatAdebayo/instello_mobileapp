import {
  SET_SEARCHING,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_FAIL,
  REMOVE_USER,
  IS_LOADING,
  PROFILE_SUCCESS,
  PROFILE_FAIL,
  CLEAR_MSG,
  FOLLOW_SUCESS,
  FOLLOW_FAIL,
  UNFOLLOW_SUCESS,
  UNFOLLOW_FAIL,
} from "./action";

const publicReducer = (state, action) => {
  switch (action.type) {
    case SET_SEARCHING:
      return {
        ...state,
        isSearching: true,
      };

    case SEARCH_USER_SUCCESS:
      return {
        ...state,
        isSearching: false,
        searchedUsers: action.payload,
      };
    case SEARCH_USER_FAIL:
      return {
        ...state,
        isSearching: false,
        searchedUsers: [],
        searchFailureMsg: action.payload,
      };

    case REMOVE_USER:
      return {
        ...state,
        searchedUsers: state.searchedUsers.filter(
          (user) => user._id !== action.payload
        ),
      };

    case IS_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case PROFILE_SUCCESS:
      return {
        ...state,
        searchedUserInfo: action.payload,
        isLoading: false,
      };

    case PROFILE_FAIL:
      return {
        ...state,
        searchedUserInfo: {},
        profileErrorMsg: action.payload,
      };

    case CLEAR_MSG:
      return {
        ...state,
        profileErrorMsg: null,
        searchFailureMsg: null,
        followFailMsg: null,
        followSuccessMsg: null,
      };

    case FOLLOW_SUCESS:
      return {
        ...state,
        followSuccessMsg: action.payload,
      };

    case FOLLOW_FAIL:
      return {
        ...state,
        followFailMsg: action.payload,
      };

    case UNFOLLOW_SUCESS:
      return {
        ...state,
        followSuccessMsg: action.payload,
      };

    case UNFOLLOW_FAIL:
      return {
        ...state,
        followFailMsg: action.payload,
      };
    default:
      return state;
  }
};

export default publicReducer;
