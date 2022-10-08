import { createContext, useReducer } from "react";
import publicReducer from "./reducer";
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
import axios from "axios";
import { baseUrl } from "./../../../utils/baseUrl";

export const PublicContext = createContext();

export const PublicState = (props) => {
  const initialState = {
    searchedUsers: [],
    isSearching: false,
    searchFailureMsg: null,
    isLoading: false,
    searchedUserInfo: {},
    profileErrorMsg: null,
    followSuccessMsg: null,
    followFailMsg: null,
  };
  const [state, dispatch] = useReducer(publicReducer, initialState);

  const setSearching = () => {
    dispatch({
      type: SET_SEARCHING,
    });
  };

  const setLoading = () => {
    dispatch({
      type: IS_LOADING,
    });
  };

  const clearMsg = () => {
    dispatch({
      type: CLEAR_MSG,
    });
  };

  const searchUser = async (username) => {
    setSearching();
    try {
      const res = await axios.get(
        `${baseUrl}user/search?page=1&limit=5&username=${username}`
      );
      const { data } = res.data;
      dispatch({
        type: SEARCH_USER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const { data } = error.response;
      if (error.message === "Network Error") {
        dispatch({
          type: SEARCH_USER_FAIL,
          payload: "couldn't search user",
        });
      } else {
        dispatch({
          type: SEARCH_USER_FAIL,
          payload: data.message,
        });
      }
    }
  };

  const removeUser = (id) => {
    dispatch({
      type: REMOVE_USER,
      payload: id,
    });
  };

  const publicProfileDetails = async (username) => {
    setLoading();
    try {
      const res = await axios.get(`${baseUrl}user/public/${username}`);
      const { data } = res.data;
      dispatch({
        type: PROFILE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const { data } = error.response;
      if (error.message === "Network Error") {
        dispatch({
          type: PROFILE_FAIL,
          payload: "couldn't fetch user details",
        });
      } else {
        dispatch({
          type: PROFILE_FAIL,
          payload: data.message,
        });
      }
    }
  };

  const follow = async (username) => {
    try {
      const res = await axios.post(`${baseUrl}user/follow/${username}`);
      const { message } = res.data;
      publicProfileDetails(username);
      dispatch({
        type: FOLLOW_SUCESS,
        payload: message,
      });
    } catch (error) {
      const { data } = error.response;
      if (error.message === "Network Error") {
        dispatch({
          type: FOLLOW_FAIL,
          payload: "couldn't follow user",
        });
      } else {
        dispatch({
          type: FOLLOW_FAIL,
          payload: data.message,
        });
      }
    }
  };

  const unFollow = async (username) => {
    try {
      const res = await axios.delete(`${baseUrl}user/follow/${username}`);
      const { message } = res.data;
      publicProfileDetails(username);
      dispatch({
        type: UNFOLLOW_SUCESS,
        payload: message,
      });
    } catch (error) {
      const { data } = error.response;
      if (error.message === "Network Error") {
        dispatch({
          type: UNFOLLOW_FAIL,
          payload: "couldn't unfollow user",
        });
      } else {
        dispatch({
          type: UNFOLLOW_FAIL,
          payload: data.message,
        });
      }
    }
  };

  return (
    <PublicContext.Provider
      value={{
        isSearching: state.isSearching,
        searchedUsers: state.searchedUsers,
        searchUser,
        searchFailureMsg: state.searchFailureMsg,
        removeUser,
        publicProfileDetails,
        isLoading: state.isLoading,
        searchedUserInfo: state.searchedUserInfo,
        profileErrorMsg: state.profileErrorMsg,
        clearMsg,
        follow,
        unFollow,
        followFailMsg: state.followFailMsg,
        followSuccessMsg: state.followSuccessMsg,
      }}
    >
      {props.children}
    </PublicContext.Provider>
  );
};
