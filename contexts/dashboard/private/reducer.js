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

    case IS_FETCHING:
      return {
        ...state,
        isFetching: true,
      };

    case FETCH_FEEDS_SUCCESS:
      return {
        ...state,
        feeds: action.payload,
        isFetching: false,
        fetchingFailMsg: null,
      };

    case FETCH_FEEDS_FAIL:
      return {
        ...state,
        isFetching: false,
        fetchingFailMsg: action.payload,
      };

    case TOGGLE_READMORE:
      let feed = state.feeds.find((feed) => feed._id == action.payload);
      feed.isReadMore = !feed.isReadMore;
      feed.isReadLess = !feed.isReadLess;
      return {
        ...state,
        feeds: state.feeds,
      };

    case IS_FETCH_COMMENTS:
      return {
        ...state,
        isFetchingComment: true,
      };

    case ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };

    case FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: action.payload,
        isFetchingComment: false,
      };

    case FETCH_COMMENTS_FAIL:
      return {
        ...state,
        isFetchingComment: false,
        fetchCommentFailMsg: action.payload,
        comments: [],
      };

    case SAVE_POST:
      return {
        ...state,
        savedPosts: [...state.savedPosts, action.payload],
      };

    case IS_FETCHING_PRIVATE_POST:
      return {
        ...state,
        isFetchingPrivatePosts: true,
      };

    case FETCH_PRIVATE_POST_SUCCESS:
      return {
        ...state,
        privatePosts: action.payload,
        isFetchingPrivatePosts: false,
      };

    case FETCH_PRIVATE_POST_FAIL:
      return {
        ...state,
        isFetchingPrivatePosts: false,
        isFetchingPrivateFailMsg: action.payload,
      };
    default:
      return state;
  }
};

export default privateReducer;
