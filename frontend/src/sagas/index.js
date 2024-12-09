import { fork } from 'redux-saga/effects';
import login from './login';
import auth from './auth';

export default function* rootSaga() {
    yield fork(login);
    yield fork(auth);
}