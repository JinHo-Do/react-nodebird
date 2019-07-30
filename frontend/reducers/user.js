const LOG_IN = 'LOG_IN';
const LOG_OUT = 'LOG_OUT';

const initialState = {
  isLoggedIn: false,
  user: null,
};

export const logIn = {
  type: LOG_IN,
  data: {
    nickname: 'jino',
  },
};

export const logOut = {
  type: LOG_OUT,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case LOG_OUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      break;
  }
};

export default userReducer;
