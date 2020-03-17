import axios from 'axios';
import { all, fork } from 'redux-saga/effects';
import user from './user';
import post from './post';

axios.defaults.baseURL =
  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080/api';

export default function* rootSaga() {
  yield all([fork(user), fork(post)]);
}
