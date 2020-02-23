/* eslint-disable no-case-declarations */
const initialState = {
  mainPosts: [
    {
      id: 1,
      user: {
        id: 1,
        nickname: 'jino',
      },
      content: 'first post',
      img: '',
      createdAt: new Date().toString(),
      comments: [],
    },
  ],
  imagePaths: [],
  addPostErrorReason: false,
  isAddingPost: false,
  postAdded: false,
  isAddingComment: false,
  addCommentErrorReason: false,
  commentAdded: false,
};

const dummyPost = {
  user: {
    id: 2,
    nickname: '진호',
  },
  content: 'new dummy post',
  img: '',
  createdAt: new Date().toString(),
};

const dummyComment = {
  id: 1,
  user: {
    id: 3,
    nickname: '진태',
  },
  createdAt: new Date().toString(),
  content: '밥은 먹고 다니냐?',
};

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const LOAD_MAIN_POSTS_REQUEST = 'LOAD_MAIN_POSTS_REQUEST';
export const LOAD_MAIN_POSTS_SUCCESS = 'LOAD_MAIN_POSTS_SUCCESS';
export const LOAD_MAIN_POSTS_FAILURE = 'LOAD_MAIN_POSTS_FAILURE';

export const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POSTS_REQUEST';
export const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAG_POSTS_SUCCESS';
export const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POSTS_FAILURE';

export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST';
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS';
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const LOAD_COMMENTS_REQUEST = 'LOAD_COMMENTS_REQUEST';
export const LOAD_COMMENTS_SUCCESS = 'LOAD_COMMENTS_SUCCESS';
export const LOAD_COMMENTS_FAILURE = 'LOAD_COMMENTS_FAILURE';

export const RETWEET_REQUEST = 'RETWEET_REQUEST';
export const RETWEET_SUCCESS = 'RETWEET_SUCCESS';
export const RETWEET_FAILURE = 'RETWEET_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const REMOVE_IMAGE = 'REMOVE_IMAGE';

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        isAddingPost: true,
        postAdded: false,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        isAddingPost: false,
        mainPosts: [action.payload, ...state.mainPosts],
        postAdded: true,
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        isAddingComment: false,
        addPostErrorReason: action.error,
      };
    case LOAD_MAIN_POSTS_REQUEST:
      return {
        ...state,
        mainPosts: [],
      };
    case LOAD_MAIN_POSTS_SUCCESS:
      return {
        ...state,
        isAddingPost: false,
        mainPosts: action.payload,
      };
    case LOAD_MAIN_POSTS_FAILURE:
      return {
        ...state,
      };
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        isAddingComment: true,
        commentAdded: false,
      };
    case ADD_COMMENT_SUCCESS:
      const postIndex = state.mainPosts.findIndex(
        post => post.id === action.payload.postId,
      );
      const post = state.mainPosts[postIndex];
      const comments = [...post.comments, dummyComment];
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = { ...post, comments };

      return {
        ...state,
        mainPosts,
        isAddingComment: false,
        commentAdded: true,
      };
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        isAddingComment: false,
        addCommentErrorReason: action.error,
      };
    default:
      return state;
  }
};

export default postReducer;
