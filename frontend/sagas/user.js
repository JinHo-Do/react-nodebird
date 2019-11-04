import {
  all,
  fork,
  takeLatest,
  takeEvery,
  call,
  delay,
  put,
} from 'redux-saga/effects';
import axios from 'axios';

import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
} from '../reducers/user';

function loginAPI() {}

function* login() {
  try {
    yield delay(500);
    // yield call(loginAPI);
    // 사가의 put은 리덕스의 dispatch 역할을 한다.
    yield put({
      type: LOG_IN_SUCCESS,
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

function signUpAPI() {}

function* signUp() {
  try {
  } catch (error) {}
}

function* watchSignUp() {
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
  /**
   * watchLogin(), call(watchLogin), fork(watchLogin)
   * call은 동기 처리, fork는 비동기 처리
   */
  yield all([fork(watchLogin), fork(watchSignUp)]);
}
