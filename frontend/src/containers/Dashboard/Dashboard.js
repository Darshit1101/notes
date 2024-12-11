import React, { useState, useCallback, useEffect } from 'react'
import { DashboardCard } from '../../components';
import { useDispatch, useSelector } from "react-redux";
import * as dashboardDucks from '../../ducks/dashboard';
import './Dashboard.css';

const Dashboard = () => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    addNoteModal: false,
    tit: '',//title
    des: '',//description
    Allnotes: [] //all notes data
  })

  const changeNameValue = useCallback((obj) => {
    setState((prevState) => ({ ...prevState, ...obj }));
  }, []);

  const getdataList = useSelector(state => state.dashboard.getAll?.data)

  useEffect(() => {
    let objData = {
      uid: localStorage.getItem('id')
    };
    console.log("objData", objData)
    dispatch(dashboardDucks.getAllNote(objData));
  }, [])

  useEffect(() => {
    if (getdataList) {
      changeNameValue({ Allnotes: getdataList });
    }
  }, [getdataList]);

  //open close modal
  const openCloseModal = useCallback((name, value, type) => {
    if (type !== undefined) {
      changeNameValue({ [name]: !value });
    }
  }, []);

  //handle open add modal note
  const handleAddNote = () => {
    openCloseModal('addNoteModal', state.addNoteModal, 'open');
  }

  //handle save note
  const handleSaveNote = () => {
    let obj = {
      tit: state.tit,
      des: state.des,
      uid: localStorage.getItem('id')
    }
    dispatch(dashboardDucks.addNote(obj));
    changeNameValue({ tit: '', des: '' });
    openCloseModal('addNoteModal', state.addNoteModal, 'close');
  }

  return (
    <div>
      <DashboardCard
        state={state}
        changeNameValue={changeNameValue}
        openCloseModal={openCloseModal}
        handleAddNote={handleAddNote} //handle open add modal note
        handleSaveNote={handleSaveNote} //handle save note
      />
    </div>
  )
}

export default Dashboard
