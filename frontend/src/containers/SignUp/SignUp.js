import SignUpCard from "../../components/SignUp/SignUpCard";
import React, { memo, useCallback, useState } from 'react'
import { useDispatch } from 'react-redux';
import * as loginDucks from '../../ducks/login';
import SimpleReactValidator from "simple-react-validator";
import './SignUp.css';

const SignUp = () => {
  const dispatch = useDispatch();
  const validator = new SimpleReactValidator({ locale: 'en' });
  const [state, setState] = useState({
    fn: '',
    e: '',
    pd: '',
    errMessage: {}
  })

  const changeNameValue = useCallback((obj) => {
    setState((prevState) => ({ ...prevState, ...obj }));
  }, []);

  // Register Data
  const registerData = () => {
    if (!validator.allValid()) {
      validator.showMessages();
      validator.helpers.forceUpdateIfNeeded();
      changeNameValue({ errMessage: validator.errorMessages });
    }
    else {
      let obj = {
        fn: state.fn,
        e: state.e,
        pd: state.pd
      }
      dispatch(loginDucks.postRegisterData(obj))
      changeNameValue({ fn: '', e: '', pd: '', errMessage: {} });
    }
  }

  return (
    <SignUpCard
      state={state}
      changeNameValue={changeNameValue}
      registerData={registerData}//register data
      validator={validator}
    />
  )
}

// export default SignUp;
export default memo(SignUp);
