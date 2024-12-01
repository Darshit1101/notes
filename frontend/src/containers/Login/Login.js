import { LoginCard } from '../../components';
import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as loginDucks from '../../ducks/login';
import { toastify } from '../../ducks/toast';
import './Login.css';

const Login = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    isConfiguration: 'signUp',
    fn: '',
    e: '',
    pd: '',
  })

  const changeNameValue = useCallback((obj) => {
    setState((prevState) => ({ ...prevState, ...obj }));
  }, []);

  // Register Data
  const registerData = () => {
    let obj = {
      fn: state.fn,
      e: state.e,
      pd: state.pd
    }
    dispatch(loginDucks.postRegisterData(obj))
    changeNameValue({ fn: '', e: '', pd: '' });
  }

  //login data
  const loginData = () => {
    let obj = {
      e: state.e,
      pd: state.pd
    }
    dispatch(loginDucks.postLoginData(obj))
  }

  return (
    <LoginCard
      state={state}
      changeNameValue={changeNameValue}
      registerData={registerData}//register data
      loginData={loginData}//login data
    />
  )
}

export default Login;
