import React, { useState, useCallback, useEffect } from 'react'
import './ManageNotes.css';
import ManageNotesCard from "../../components/ManageNotes/ManageNotesCard";
import { useDispatch, useSelector } from "react-redux";
import * as dashboardDucks from '../../ducks/dashboard';

function ManageNotes() {
    const dispatch = useDispatch();

    const [state, setState] = useState({
        ManageNotes: [] //manage notes data 
    })

    //set data.
    const changeNameValue = useCallback((obj) => {
        setState((prevState) => ({ ...prevState, ...obj }))
    }, []);

    let objData = { uid: localStorage.getItem('id') };
    const getdataList = useSelector(state => state.dashboard.getAll)

    useEffect(() => {
        dispatch(dashboardDucks.getAllNote(objData));
    }, [])

    useEffect(() => {
        if (getdataList) {
            changeNameValue({ ManageNotes: getdataList });
        }
    }, [getdataList]);

    const handledeleteModal = () => {
        console.log("delete modal")
    }

    return (
        <ManageNotesCard
            state={state}
            changeNameValue={changeNameValue}
            handledeleteModal={handledeleteModal}
        />
    )
}
export default ManageNotes;