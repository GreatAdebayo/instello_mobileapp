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
  };
  const [state, dispatch] = useReducer(privateReducer, initialState);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const uploading = () => {
    dispatch({
      type: IS_UPLOADING,
    });
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

  const clearUploadMsg = () => {
    setTimeout(() => {
      dispatch({
        type: CLEAR_UPLOAD_MSG,
      });
    }, 3000);
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

  const uploadAssets = async ({ caption }, isEnabled) => {
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
          type: isEnabled ? "paid" : "free",
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
      }}
    >
      {props.children}
    </PrivateContext.Provider>
  );
};
