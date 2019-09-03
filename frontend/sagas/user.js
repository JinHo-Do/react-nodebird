import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import { LOG_IN, LOG_IN_SUCCESS, LOG_IN_FAIL } from '../reducers/user';

function loginAPI() {}

function* login() {
  try {
    yield call(loginAPI);
    yield put({
      type: LOG_IN_SUCCESS,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOG_IN_FAIL,
    });
  }
}

function* watchLogin() {
  yield takeLatest(LOG_IN, login);
}

export default function* userSaga() {
  yield all([fork(watchLogin)]);
}
