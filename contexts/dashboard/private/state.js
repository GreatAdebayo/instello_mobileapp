import { createContext, useReducer } from "react";
import privateReducer from "./reducer";
import {
  IS_SUBMITTING,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAIL,
  CLEAR_MSG,
  SET_ASSET,
  SELECT_MULTIPLE,
  SELECT_ASSET,
  TAKE_PIC,
  IS_UPLOADING,
  UPLOADED_SUCCESS,
  UPLOADED_FAIL,
  CLEAR_UPLOAD_MSG,
  FETCH_FEEDS_SUCCESS,
  FETCH_FEEDS_FAIL,
  IS_FETCHING,
  TOGGLE_READMORE,
  IS_FETCH_COMMENTS,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAIL,
  ADD_COMMENT,
  SAVE_POST,
  IS_FETCHING_PRIVATE_POST,
  FETCH_PRIVATE_POST_SUCCESS,
  FETCH_PRIVATE_POST_FAIL,
} from "./action";
import axios from "axios";
import { baseUrl } from "./../../../utils/baseUrl";
import { manipulateAsync } from "expo-image-manipulator";
import * as FileSystem from "expo-file-system";

export const PrivateContext = createContext();

export const PrivateState = (props) => {
  const initialState = {
    isEditing: false,
    editSuccessMsg: null,
    editFailMsg: null,
    indexAsset: {},
    assets: [],
    isSelectMultiple: false,
    selectedAssets: [],
    isUploading: false,
    uploadSuccessMsg: null,
    uploadFailMsg: null,
    feeds: [],
    isFetching: false,
    fetchingFailMsg: null,
    comments: [],
    fetchCommentFailMsg: null,
    isFetchingComment: false,
    savedPosts: [],
    privatePosts: [],
    isFetchingPrivatePosts: false,
    isFetchingPrivateFailMsg: null,
  };
  const [state, dispatch] = useReducer(privateReducer, initialState);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const setSubmitting = () => {
    dispatch({
      type: IS_SUBMITTING,
    });
  };

  const clearMsg = () => {
    dispatch({
      type: CLEAR_MSG,
    });
  };

  const editProfile = async (values) => {
    setSubmitting();
    try {
      const res = await axios.post(
        `${baseUrl}user/editprofile`,
        values,
        config
      );
      const { message } = res.data;
      dispatch({
        type: EDIT_PROFILE_SUCCESS,
        payload: message,
      });
    } catch (error) {
      const { data } = error.response;
      if (error.message === "Network Error") {
        dispatch({
          type: EDIT_PROFILE_FAIL,
          payload: "couldn't update profile",
        });
      } else {
        dispatch({
          type: EDIT_PROFILE_FAIL,
          payload: data.message,
        });
      }
    }
  };

  //new post starts
  const uploading = () => {
    dispatch({
      type: IS_UPLOADING,
    });
  };

  const clearUploadMsg = () => {
    setTimeout(() => {
      dispatch({
        type: CLEAR_UPLOAD_MSG,
      });
    }, 3000);
  };

  const setAssets = (data, type, schema) => {
    let newassets;
    if (type === "index") {
      newassets = data.map((obj) => ({
        ...obj,
        selected: false,
        schema,
      }));
    }

    dispatch({
      type: SET_ASSET,
      payload: { data: type === "change" ? data : newassets, type },
    });
  };

  const selectMultiple = () => {
    dispatch({
      type: SELECT_MULTIPLE,
    });
  };

  const select = (id, data) => {
    dispatch({
      type: SELECT_ASSET,
      payload: { id, data },
    });
  };

  const takePicture = (asset) => {
    dispatch({
      type: TAKE_PIC,
      payload: asset,
    });
  };

  const uploadAssets = async ({ caption }) => {
    uploading();
    //make a copy of selected assets
    let newSelectedAssets = state.selectedAssets.map((obj) => ({
      ...obj,
    }));
    //remove unwanted properties from selectedassets array
    newSelectedAssets = newSelectedAssets.map(
      ({
        creationTime,
        duration,
        filename,
        id,
        mediaSubtypes,
        modificationTime,
        selected,
        width,
        height,
        assetId,
        fileName,
        cancelled,
        fileSize,
        ...items
      }) => items
    );
    // convert all assets that has no base64
    const manipulatedAssets = [];
    for (const asset of newSelectedAssets) {
      let base64 = "";
      // manipulate video
      if (asset.type === "video" || asset.mediaType === "video") {
        if (asset.schema === "support") {
          base64 = await FileSystem.readAsStringAsync(asset.uri, {
            encoding: "base64",
          });
        }
        if (asset.schema === "unsupport") {
          const res = await manipulateAsync(asset.uri, [], {
            base64: true,
          });
          base64 = res.base64;
        }
        manipulatedAssets.push({
          base64: base64,
          mediaType: "video",
        });
      }
      // manipulate image/photo
      if (asset.type === "image" || asset.mediaType === "photo") {
        if (asset.schema === "support") {
          base64 = await FileSystem.readAsStringAsync(asset.uri, {
            encoding: "base64",
          });
        }
        if (asset.schema === "unsupport") {
          const res = await manipulateAsync(asset.uri, [], {
            base64: true,
          });
          base64 = res.base64;
        }
        manipulatedAssets.push({
          base64: base64,
          mediaType: "image",
        });
      }
    }
    try {
      const res = await axios.post(
        `${baseUrl}post`,
        {
          assets: manipulatedAssets,
          caption,
        },
        config
      );
      const { message } = res.data;
      dispatch({
        type: UPLOADED_SUCCESS,
        payload: message,
      });
    } catch (error) {
      const { data } = error.response;
      if (error.message === "Network Error") {
        dispatch({
          type: UPLOADED_FAIL,
          payload: "couldn't upload",
        });
      } else {
        dispatch({
          type: UPLOADED_FAIL,
          payload: data.message,
        });
      }
    }
  };
  //new post ends

  //feeds starts
  const isFetching = () => {
    dispatch({
      type: IS_FETCHING,
    });
  };

  const fetchFeeds = async () => {
    isFetching();
    try {
      const response = await axios.get(`${baseUrl}feeds`);
      const { data } = response.data;
      let feeds = data.map((obj) => ({
        ...obj,
        isReadMore: obj.caption.length > 49 ? true : false,
        isReadLess: false,
      }));
      dispatch({
        type: FETCH_FEEDS_SUCCESS,
        payload: feeds,
      });
    } catch (error) {
      const { data } = error.response;
      if (error.message === "Network Error") {
        dispatch({
          type: FETCH_FEEDS_FAIL,
          payload: "couldn't fetch feeds",
        });
      } else {
        dispatch({
          type: FETCH_FEEDS_FAIL,
          payload: data.message,
        });
      }
    }
  };

  const toggleReadMore = (id) => {
    dispatch({
      type: TOGGLE_READMORE,
      payload: id,
    });
  };
  //feeds end

  //fetch comments starts
  const setFetchingComments = () => {
    dispatch({
      type: IS_FETCH_COMMENTS,
    });
  };

  const fetchComments = async (id) => {
    setFetchingComments();
    try {
      const response = await axios.get(`${baseUrl}comment/${id}`);
      const { data } = response.data;
      dispatch({
        type: FETCH_COMMENTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const { data } = error.response;
      if (error.message === "Network Error") {
        dispatch({
          type: FETCH_COMMENTS_FAIL,
          payload: "couldn't fetch comments",
        });
      } else {
        dispatch({
          type: FETCH_COMMENTS_FAIL,
          payload: data.message,
        });
      }
    }
  };

  const addComment = async ({ comment, user, createdAt, id }) => {
    dispatch({
      type: ADD_COMMENT,
      payload: { content: comment, user, createdAt },
    });
    try {
      await axios.post(
        `${baseUrl}comment/${id}`,
        {
          content: comment,
        },
        config
      );
    } catch (error) {}
  };

  //fetch comments ends

  //saved posts starts
  const savePost = (id) => {
    console.log(id);
    // const find = state.savedPosts.find((post) => post.id === id);
    if (!find)
      dispatch({
        type: SAVE_POST,
        payload: id,
      });
  };
  //saved posts ends

  //profile posts starts
  const setFetchingImagePosts = () => {
    dispatch({
      type: IS_FETCHING_PRIVATE_POST,
    });
  };
  const fetchPersonalPosts = async (mode) => {
    setFetchingImagePosts();
    try {
      const response = await axios.get(`${baseUrl}post/private`, {
        params: {
          mode,
        },
      });
      const { data } = response.data;
      dispatch({
        type: FETCH_PRIVATE_POST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const { data } = error.response;
      if (error.message === "Network Error") {
        dispatch({
          type: FETCH_PRIVATE_POST_FAIL,
          payload: "couldn't fetch comments",
        });
      } else {
        dispatch({
          type: FETCH_PRIVATE_POST_FAIL,
          payload: data.message,
        });
      }
    }
  };
  //profile posts ends
  return (
    <PrivateContext.Provider
      value={{
        isEditing: state.isEditing,
        clearMsg,
        editProfile,
        editSuccessMsg: state.editSuccessMsg,
        editFailMsg: state.editFailMsg,
        setAssets,
        selectMultiple,
        isSelectMultiple: state.isSelectMultiple,
        select,
        indexAsset: state.indexAsset,
        assets: state.assets,
        selectedAssets: state.selectedAssets,
        takePicture,
        uploadAssets,
        isUploading: state.isUploading,
        uploadSuccessMsg: state.uploadSuccessMsg,
        uploadFailMsg: state.uploadFailMsg,
        clearUploadMsg,
        fetchFeeds,
        feeds: state.feeds,
        isFetching: state.isFetching,
        fetchingFailMsg: state.fetchingFailMsg,
        toggleReadMore,
        fetchComments,
        comments: state.comments,
        fetchCommentFailMsg: state.fetchCommentFailMsg,
        isFetchingComment: state.isFetchingComment,
        addComment,
        savePost,
        savedPosts: state.savedPosts,
        fetchPersonalPosts,
        privatePosts: state.privatePosts,
        isFetchingPrivatePosts: state.isFetchingPrivatePosts,
        isFetchingPrivateFailMsg: state.isFetchingPrivateFailMsg,
      }}
    >
      {props.children}
    </PrivateContext.Provider>
  );
};
