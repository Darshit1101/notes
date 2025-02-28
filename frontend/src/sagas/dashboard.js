import { put, fork, takeLatest, call } from 'redux-saga/effects';
import * as api from '../services/api';
import { load, loaded } from '../ducks/loading';
import * as actions from '../ducks/dashboard';
import { toastify } from '../ducks/toast';

function* addNote(action) {
  try {
    yield put(load());
    const res = yield call(api.POST, '/addnote', action.payload);
    if (res.status === 'success') {
      yield put(actions.getAllNoteSuccess(res));
      yield put(toastify({ type: 'success', msg: res.m }));
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

function* deleteCard(action) {
  try {
    yield put(load());
    const res = yield call(api.DELETE, '/deleteCard?id=' + action.payload.id + '&num=' + action.payload.num);
    if (res.status === 'success') {
      yield put(actions.getAllNoteSuccess(res));
      yield put(toastify({ type: 'success', msg: res.m }));
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

function* editNote(action) {
  try {
    yield put(load());
    const res = yield call(api.POST, '/editNote', action.payload);
    if (res.status === 'success') {
      yield put(actions.getAllNoteSuccess(res));
      yield put(toastify({ type: 'success', msg: res.m }));
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
  yield takeLatest(actions.deleteCard.type, deleteCard);
  yield takeLatest(actions.editNote.type, editNote);
}

export default function* rootSaga() {
  yield fork(watchGetDashboard);
}
