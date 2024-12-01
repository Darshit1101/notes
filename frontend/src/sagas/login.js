import { put, fork, takeLatest, call } from 'redux-saga/effects';
import * as api from '../services/api';
// import { load, loaded } from '../ducks/loading';
import * as actions from '../ducks/login';
import { toastify } from '../ducks/toast';

function* postRegisterData(action) {
    try {
        // yield put(load());
        const res = yield call(api.POST, "/createRegister", action.payload);
        if (res.status === "success") {
            yield put(toastify({ type: "success", msg: res.m }));
        } else {
            yield put(toastify({ type: "error", msg: res.m }));
        }
        // yield put(loaded());
    } catch (error) {
        // yield put(loaded());
        yield put(toastify({ type: "error", msg: "Something went wrong while doing. Please try again.", }));
    }
}

function* postLoginData(action) {
    try {
        // yield put(load());
        const res = yield call(api.POST, "/createLogin", action.payload);
        if (res.status === "success") {
            yield put(toastify({ type: "success", msg: res.m }));
        } else {
            yield put(toastify({ type: "error", msg: res.m }));
        }
        // yield put(loaded());
    } catch (error) {
        // yield put(loaded());
        yield put(toastify({ type: "error", msg: "Something went wrong while doing. Please try again.", }));
    }
}

export function* watchGetDataPage() {
    yield takeLatest(actions.postRegisterData.type, postRegisterData);
    yield takeLatest(actions.postLoginData.type, postLoginData);
}

export default function* rootSaga() {
    yield fork(watchGetDataPage);
}
