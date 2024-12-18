import LoginCard from "../../components/Login/LoginCard";
import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux';
import * as loginDucks from '../../ducks/login';
import SimpleReactValidator from "simple-react-validator";
import './Login.css';

const Login = () => {
  const dispatch = useDispatch();
  const validator = new SimpleReactValidator({ locale: 'en' });
  const [state, setState] = useState({
    e: '',
    pd: '',
    errMessage: {}
  })

  const changeNameValue = useCallback((obj) => {
    setState((prevState) => ({ ...prevState, ...obj }));
  }, []);

  //login data
  const loginData = () => {
    if (!validator.allValid()) {
      validator.showMessages();
      validator.helpers.forceUpdateIfNeeded();
      changeNameValue({ errMessage: validator.errorMessages });
    }
    else {
      let obj = {
        e: state.e,
        pd: state.pd
      }
      dispatch(loginDucks.postLoginData(obj))
      changeNameValue({ e: '', pd: '', errMessage: {} });
    }
  }

  return (
    <LoginCard
      state={state}
      changeNameValue={changeNameValue}
      loginData={loginData}//login data
      validator={validator}
    />
  )
}

export default Login;
