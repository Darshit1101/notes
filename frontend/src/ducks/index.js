import { combineReducers } from "redux";
import toast from './toast';
import login from './login';
import auth from './auth';
import dashboard from "./dashboard";
import loading from "./loading";
import myprofile from './myprofile';

const rootReducer = combineReducers({
    toast,
    login,
    auth,
    dashboard,
    loading,
    myprofile
});

export default rootReducer;