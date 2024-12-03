import { SignUpCard } from '../../components';
import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as loginDucks from '../../ducks/login';
import { toastify } from '../../ducks/toast';
import './SignUp.css';

const SignUp = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
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

  return (
    <SignUpCard
      state={state}
      changeNameValue={changeNameValue}
      registerData={registerData}//register data
    />
  )
}

export default SignUp;
