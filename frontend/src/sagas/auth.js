import { put, fork, takeLatest, call } from 'redux-saga/effects';
import * as api from '../services/api';
import * as actions from '../ducks/auth';
// import { load, loaded } from '../ducks/loading';
import { toastify } from '../ducks/toast';


function* getProfile(action) {
  try {
    // yield put(load());
    const res = yield call(api.GET, "/getProfile", action.payload);
    if (res.status === "success") {
      yield put(actions.getProfileSuccess(res.data));
    } else {
      yield put(toastify({ type: "error", msg: res.m }));
    }
    // yield put(loaded());
  } catch (error) {
    // yield put(loaded());
    yield put(toastify({ type: "error", msg: "Something went wrong while doing. Please try again.", }));
  }
}

export function* watchGetProfile() {
  yield takeLatest(actions.getProfile.type, getProfile);
}

export default function* rootSaga() {
  yield fork(watchGetProfile);
}