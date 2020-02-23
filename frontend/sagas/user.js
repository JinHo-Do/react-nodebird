import {
  all,
  fork,
  takeLatest,
  takeEvery,
  call,
  // delay,
  put,
} from 'redux-saga/effects';
import axios from 'axios';
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
} from '../reducers/user';

axios.defaults.baseURL =
  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080/api';

function loginAPI(data) {
  return axios.post('/user/login', data, {
    withCredentials: true, // cors 쿠키 전송
  });
}

function* login(action) {
  try {
    const result = yield call(loginAPI, action.payload);
    // 사가의 put은 리덕스의 dispatch 역할을 한다.
    yield put({
      type: LOG_IN_SUCCESS,
      payload: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOG_IN_FAILURE,
    });
  }
}

function* watchLogin() {
  // takeEvery는 모두 !== takeLatest는 한 번만, 둘 다 while(true) {}임
  yield takeLatest(LOG_IN_REQUEST, login);
}

function signUpAPI(data) {
  return axios.post('/user/', data);
}

function logoutAPI(data) {
  return axios.post(
    '/user/logout',
    {},
    {
      withCredentials: true,
    },
  );
}

function* logout() {
  try {
    const result = yield call(logoutAPI);
    // 사가의 put은 리덕스의 dispatch 역할을 한다.
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOG_OUT_FAILURE,
    });
  }
}

function* watchLogout() {
  // takeEvery는 모두 !== takeLatest는 한 번만, 둘 다 while(true) {}임
  yield takeLatest(LOG_OUT_REQUEST, login);
}

function loadUserAPI() {
  return axios.get('/user/', {
    withCredentials: true,
  });
}

function* loadUser() {
  try {
    const result = yield call(loadUserAPI);
    // 사가의 put은 리덕스의 dispatch 역할을 한다.
    yield put({
      type: LOAD_USER_SUCCESS,
      payload: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_USER_FAILURE,
    });
  }
}

function* watchLoadUser() {
  // takeEvery는 모두 !== takeLatest는 한 번만, 둘 다 while(true) {}임
  yield takeEvery(LOAD_USER_REQUEST, loadUser);
}

function* signUp(action) {
  try {
    yield call(signUpAPI, action.payload); // call(function, parameter)
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: SIGN_UP_FAILURE,
      error,
    });
  }
}

function* watchSignUp() {
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
  /**
   * watchLogin(), call(watchLogin), fork(watchLogin)
   * call은 동기 처리, fork는 비동기 처리
   */
  yield all([
    fork(watchLogin),
    fork(watchLogout),
    fork(watchLoadUser),
    fork(watchSignUp),
  ]);
}
