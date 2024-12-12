import { combineReducers } from "redux";
import toast from './toast';
import login from './login';
import auth from './auth';
import dashboard from "./dashboard";
import loading from "./loading";

const rootReducer = combineReducers({
    toast,
    login,
    auth,
    dashboard,
    loading,
});

export default rootReducer;