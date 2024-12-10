import { combineReducers } from "redux";
import toast from './toast';
import login from './login';
import auth from './auth';
import dashboard from "./dashboard";

const rootReducer = combineReducers({
    toast,
    login,
    auth,
    dashboard
});

export default rootReducer;