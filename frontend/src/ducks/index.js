import { combineReducers } from "redux";
import toast from './toast';
import login from './login';

const rootReducer = combineReducers({
    toast,
    login,
});

export default rootReducer;