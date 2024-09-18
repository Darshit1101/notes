import { LoginCard } from '../../components';
import React, { useCallback, useState } from 'react'

const Login = () => {
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
    console.log("Register Data", state)
  }

  //login data
  const loginData = () => {
    console.log("Login Data", state)
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
