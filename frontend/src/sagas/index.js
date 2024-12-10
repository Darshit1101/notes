import { fork } from 'redux-saga/effects';
import login from './login';
import auth from './auth';
import dashboard from './dashboard';

export default function* rootSaga() {
    yield fork(login);
    yield fork(auth);
    yield fork(dashboard);
}