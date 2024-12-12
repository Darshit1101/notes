import { put, fork, takeLatest, call } from 'redux-saga/effects';
import * as api from '../services/api';
import { load, loaded } from '../ducks/loading';
import * as actions from '../ducks/dashboard';
import { toastify } from '../ducks/toast';

function* addNote(action) {
  try {
    yield put(load());
    const res = yield call(api.POST, '/addnote', action.payload);
    console.log('res.data====', res.data);
    if (res.status === 'success') {
      yield put(actions.addNoteSuccess(res));
    }
    else {
      yield put(toastify({ type: 'error', msg: res.m }));
    }
    yield put(loaded());
  } catch (error) {
    yield put(loaded());
    yield put(toastify({ type: 'error', msg: 'Something went wrong while doing. Please try again.' }));
  }
}

function* getAllNote(action) {
  try {
    yield put(load());
    const res = yield call(api.POST, '/getAllNotes', action.payload);
    console.log('res.data====', res.data);
    if (res.status === 'success') {
      yield put(actions.getAllNoteSuccess(res));
    }
    else {
      yield put(toastify({ type: 'error', msg: res.m }));
    }
    yield put(loaded());
  } catch (error) {
    yield put(loaded());
    yield put(toastify({ type: 'error', msg: 'Something went wrong while doing. Please try again.' }));
  }
}

export function* watchGetDashboard() {
  yield takeLatest(actions.addNote.type, addNote);
  yield takeLatest(actions.getAllNote.type, getAllNote);
}

export default function* rootSaga() {
  yield fork(watchGetDashboard);
}
