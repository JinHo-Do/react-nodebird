export const LOG_IN = 'LOG_IN';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAIL = 'LOG_IN_FAIL';

export const LOG_OUT = 'LOG_OUT';

export const SIGN_UP = 'SIGN_UP';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';

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

export const logInSuccess = () => ({
  type: LOG_IN_SUCCESS,
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
