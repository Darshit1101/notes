import React, { useState, useCallback } from 'react'
import MyprofileCard from "../../components/Myprofile/Myprofile";
import './Myprofile.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as myprofile from '../../ducks/myprofile';
import SimpleReactValidator from "simple-react-validator";
import { encrypt } from '../../utils/passwordService';

function Myprofile(props) {
    let dispatch = useDispatch();
    let navigate = useNavigate();
    const validator = new SimpleReactValidator({ locale: 'en' });

    const [state, setState] = useState({
        deleteOpen: false,
        pd: '', // password
        npd: '', // new password
        isCurnPassVisible: false, // is current password visible
        isNewPassVisible: false, // is new password visible
    });

    //set data.
    const changeNameValue = useCallback((obj) => {
        setState((prevState) => ({ ...prevState, ...obj }))
    }, []);

    // handle back to main
    const handleBackToMain = () => {
        // Goes back one step in history
        navigate(-1); // navigate('/setting');
    }

    // handle delete account
    const handleDelAccount = () => {
        dispatch(myprofile.deleteAccount());
        changeNameValue({ deleteOpen: false });
    }

    // change password 
    let handleChangePassword = () => {
        if (!validator.allValid()) {
            validator.showMessages();
            validator.helpers.forceUpdateIfNeeded();
            changeNameValue({ 'errMessage': validator.errorMessages });
            validator.errorMessages?.pd == null ? changeNameValue({ errMessage: { ...state.errMessage, pd: null, npd: 'The new password field is required.' } }) : validator.errorMessages?.npd == null ? changeNameValue({ errMessage: { ...state.errMessage, pd: 'The current password field is required.', npd: null } }) : changeNameValue({ errMessage: { ...state.errMessage, pd: 'The current password field is required.', npd: 'The new password field is required.' } })
        }
        else {
            console.log('ok')
            let obj = {
                opd: encrypt(state.pd),
                pd: encrypt(state.npd)
            };
            console.log('obj', obj);
            dispatch(myprofile.cPwd(obj))
            if (localStorage.getItem('istm') === 'true') {
                obj.istm = true;
            }
            changeNameValue({ errMessage: { ...state.errMessage, pd: null, npd: null } })
        }
    }

    return (
        <MyprofileCard
            state={state}
            changeNameValue={changeNameValue}
            handleBackToMain={handleBackToMain}
            isShwBack={props.isShwBack}
            handleDelAccount={handleDelAccount}
            handleChangePassword={handleChangePassword}
            validator={validator}
        />
    )
}

export default Myprofile;