import axios from 'axios';
import { all, fork, takeLatest, put, call } from 'redux-saga/effects';
import {
  LOAD_MAIN_POSTS_REQUEST,
  LOAD_MAIN_POSTS_SUCCESS,
  LOAD_MAIN_POSTS_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  LOAD_HASHTAG_POSTS_REQUEST,
  LOAD_HASHTAG_POSTS_SUCCESS,
  LOAD_HASHTAG_POSTS_FAILURE,
  LOAD_USER_POSTS_REQUEST,
  LOAD_USER_POSTS_SUCCESS,
  LOAD_USER_POSTS_FAILURE,
} from '../reducers/post';

function addPostAPI(postData) {
  return axios.post('/post', postData, {
    withCredentials: true,
  });
}

function* addPost(action) {
  try {
    const { data } = yield call(addPostAPI, action.payload);

    yield put({
      type: ADD_POST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: ADD_POST_FAILURE,
      error,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function loadMainPostsAPI() {
  return axios.get('/posts');
}

function* loadMainPosts() {
  try {
    const { data } = yield call(loadMainPostsAPI);

    yield put({
      type: LOAD_MAIN_POSTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: LOAD_MAIN_POSTS_FAILURE,
      error,
    });
  }
}

function* watchLoadMainPosts() {
  yield takeLatest(LOAD_MAIN_POSTS_REQUEST, loadMainPosts);
}

function loadHashtagPostsAPI(tag) {
  return axios.get(`/hashtag/${tag}`);
}

function* loadHashtagPosts(action) {
  try {
    const { data } = yield call(loadHashtagPostsAPI, action.payload);

    yield put({
      type: LOAD_HASHTAG_POSTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: LOAD_HASHTAG_POSTS_FAILURE,
      error,
    });
  }
}

function* watchLoadHashtagPosts() {
  yield takeLatest(LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts);
}

function loadUserPostsAPI(id) {
  return axios.get(`/posts/${id}/posts`);
}

function* loadUserPosts(action) {
  try {
    const { data } = yield call(loadUserPostsAPI, action.payload);

    yield put({
      type: LOAD_USER_POSTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: LOAD_USER_POSTS_FAILURE,
      error,
    });
  }
}

function* watchLoadUserPosts() {
  yield takeLatest(LOAD_USER_POSTS_REQUEST, loadUserPosts);
}

function addCommentAPI() {}

function* addComment(action) {
  try {
    yield put({
      type: ADD_COMMENT_SUCCESS,
      payload: {
        postId: action.payload.postId,
      },
    });
  } catch (error) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      error,
    });
  }
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadMainPosts),
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchLoadHashtagPosts),
    fork(watchLoadUserPosts),
  ]);
}
