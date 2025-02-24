import { put, fork, takeLatest, call } from 'redux-saga/effects';
import * as api from '../services/api';
import { load, loaded } from '../ducks/loading';
import * as actions from '../ducks/myprofile';
import { toastify } from '../ducks/toast';

// delete account
function* deleteAccount(action) {
    try {
        yield put(load());
        const res = yield call(api.POST, '/deleteAccount', action.payload);

        if (res.status === 'success') {
            window.localStorage.clear();
            window.location.href = '/login';
        }
        else {
            yield put(toastify({ type: 'error', msg: 'Failed to delete account' }));
        }
        yield put(loaded());
    } catch (error) {
        yield put(loaded());
        yield put(toastify({ type: 'error', msg: 'Something went wrong while doing. Please try again.' }));
    }
}



export function* watchDelAccount() {
    yield takeLatest(actions.deleteAccount.type, deleteAccount);
}

export default function* rootSaga() {
    yield fork(watchDelAccount);
}