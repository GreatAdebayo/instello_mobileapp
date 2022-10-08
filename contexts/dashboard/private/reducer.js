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

const privateReducer = (state, action) => {
  switch (action.type) {
    case IS_SUBMITTING:
      return {
        ...state,
        isEditing: true,
      };

    case EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        editSuccessMsg: action.payload,
        isEditing: false,
      };

    case EDIT_PROFILE_FAIL:
      return {
        ...state,
        editFailMsg: action.payload,
        isEditing: false,
      };

    case CLEAR_MSG:
      return {
        ...state,
        editFailMsg: null,
        editSuccessMsg: null,
      };

    case CLEAR_UPLOAD_MSG:
      return {
        ...state,
        uploadFailMsg: null,
        uploadSuccessMsg: null,
      };

    case SET_ASSET:
      return {
        ...state,
        indexAsset:
          action.payload.type === "change"
            ? action.payload.data
            : action.payload.data[0],
        assets:
          action.payload.type === "index" ? action.payload.data : state.assets,
        selectedAssets:
          action.payload.type === "change"
            ? [action.payload.data]
            : state.selectedAssets,
      };

    case SELECT_MULTIPLE:
      return {
        ...state,
        isSelectMultiple: !state.isSelectMultiple,
        selectedAssets: [],
        assets: state.assets.map((obj) => ({
          ...obj,
          selected: false,
        })),
      };

    case SELECT_ASSET:
      let asset = state.assets.find((asset) => asset.id == action.payload.id);
      asset.selected = action.payload.data;
      return {
        ...state,
        indexAsset: asset,
        assets: state.assets,
        selectedAssets:
          action.payload.data === true
            ? [...state.selectedAssets, asset]
            : state.selectedAssets.filter(
                (asset) => asset.id !== action.payload.id
              ),
      };

    case TAKE_PIC:
      return {
        ...state,
        selectedAssets: [...state.selectedAssets, action.payload],
      };

    case IS_UPLOADING:
      return {
        ...state,
        isUploading: true,
      };

    case UPLOADED_SUCCESS:
      return {
        ...state,
        uploadSuccessMsg: action.payload,
        isUploading: false,
      };

    case UPLOADED_FAIL:
      return {
        ...state,
        uploadFailMsg: action.payload,
        isUploading: false,
      };

    default:
      return state;
  }
};

export default privateReducer;
