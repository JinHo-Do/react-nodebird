const ADD_POST = 'ADD_POST';
const ADD_DUMMY = 'ADD_DUMMY';

const initialState = {
  mainPosts: [],
};

export const addPost = {
  type: ADD_POST,
};

export const addDummy = {
  type: ADD_DUMMY,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {};
    case ADD_DUMMY:
      return {
        ...state,
        mainPosts: [action.payload, ...state.mainPosts],
      };
    default:
      return state;
  }
};

export default postReducer;
