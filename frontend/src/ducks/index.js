import { combineReducers } from "redux";
import toast from './toast';
import login from './login';
import auth from './auth';

const rootReducer = combineReducers({
    toast,
    login,
    auth,
});

export default rootReducer;