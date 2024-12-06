import { put, fork, takeLatest, call } from 'redux-saga/effects';
import * as api from '../services/api';
import { load, loaded } from '../ducks/loading';
import * as actions from '../ducks/dashboard';
import { toastify } from '../ducks/toast';

function* getDashboard(action) {
  try {
    yield put(load());
    const res = yield call(api.POST, '/dashboardReportES', action.payload);

    if (res.status === 'success') {
      yield put(actions.getDashboardSuccess(res));
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

function* getNotiTypeList() {
  try {
    yield put(load());
    const res = yield call(api.GET, '/getNotifTypeList');

    if (res.status === 'success') {
      yield put(actions.getNotifTypeListSuccess(res));
    }
    else {
      yield put(toastify({ type: 'error', msg: 'Failed to get notofication data' }));
    }
    yield put(loaded());
  } catch (error) {
    yield put(toastify({ type: 'error', msg: 'Something went wrong while doing. Please try again.' }));
  }

}

export function* watchGetDashboard() {
  yield takeLatest(actions.getDashboard.type, getDashboard);
}

export function* watchGetNotiTypList() {
  yield takeLatest(actions.getNotiTypList.type, getNotiTypeList);
}

export default function* rootSaga() {
  yield fork(watchGetDashboard);
  yield fork(watchGetNotiTypList);
}
