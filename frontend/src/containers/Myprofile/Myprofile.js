import React, { useState, useCallback } from 'react'
import MyprofileCard from "../../components/Myprofile/Myprofile";
import './Myprofile.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as myprofile from '../../ducks/myprofile';

function Myprofile(props) {
    let dispatch = useDispatch();
    let navigate = useNavigate();

    const [state, setState] = useState({
        deleteOpen: false
    });

    //set data.
    const changeNameValue = useCallback((obj) => {
        setState((prevState) => ({ ...prevState, ...obj }))
    }, []);

    // handle back to main
    const handleBackToMain = () => {
        navigate('/setting');
    }

    // handle delete account
    const handleDelAccount = () => {
        dispatch(myprofile.deleteAccount());
        changeNameValue({ deleteOpen: false });
    }

    return (
        <MyprofileCard
            state={state}
            changeNameValue={changeNameValue}
            handleBackToMain={handleBackToMain}
            isShwBack={props.isShwBack}
            handleDelAccount={handleDelAccount}
        />
    )
}

export default Myprofile;