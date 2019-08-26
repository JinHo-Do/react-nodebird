const LOG_IN = 'LOG_IN';
const LOG_OUT = 'LOG_OUT';
const SIGN_UP = 'SIGN_UP';

const dummyUser = {
  nickname: 'jino',
  posts: [],
  followings: [],
  followers: [],
  signUpData: {},
};

const initialState = {
  isLoggedIn: false,
  user: null,
};

export const logIn = nickname => ({
  type: LOG_IN,
  payload: {
    nickname,
  },
});

export const logOut = () => ({
  type: LOG_OUT,
});

export const signUp = payload => ({
  type: SIGN_UP,
  payload,
});

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        isLoggedIn: true,
        user: { ...dummyUser, ...action.payload },
      };
    case LOG_OUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case SIGN_UP:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
