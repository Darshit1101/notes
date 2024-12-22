import React, { useState, useCallback, useEffect } from 'react'
import DashboardCard from "../../components/Dashboard/DashboardCard";
import { useDispatch, useSelector } from "react-redux";
import * as dashboardDucks from '../../ducks/dashboard';
import './Dashboard.css';

const Dashboard = () => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    addNoteModal: false,
    tit: '',//title
    des: '',//description
    Allnotes: [],//all notes data
    viewNoteModal: false,
    notesValue: ''//search bar state value
  })

  const changeNameValue = useCallback((obj) => {
    setState((prevState) => ({ ...prevState, ...obj }));
  }, []);

  let objData = { uid: localStorage.getItem('id') };
  const getdataList = useSelector(state => state.dashboard.getAll)

  useEffect(() => {
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
    clearState();
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
    clearState();
    openCloseModal('addNoteModal', state.addNoteModal, 'close');
    setTimeout(() => {
      dispatch(dashboardDucks.getAllNote(objData));
    }, 100)
  }

  //delete note particular
  const handledeleteCard = (id) => {
    let obj = {
      id: id
    }
    dispatch(dashboardDucks.deleteCard(obj))
    setTimeout(() => {
      dispatch(dashboardDucks.getAllNote(objData));
    }, 100)
  }

  //view data on view btn click
  const handleViewNote = (data) => {
    let obj = {
      tit: data.tit,
      des: data.des,
    }
    changeNameValue(obj)
    openCloseModal('viewNoteModal', state.viewNoteModal, 'open');
  }

  //edit btn onclick
  const handleEditNoteData = (data) => {
    console.log("edit data", data)
  }

  //clear state
  const clearState = () => {
    let obj = {
      tit: "",
      des: ""
    }
    changeNameValue(obj);
  }

  //search notes
  useEffect(() => {
    if (state.notesValue !== '') {
      let filterNote = getdataList.filter((elm) => {
        return elm.tit.toLowerCase().includes(state.notesValue.toLowerCase()) || elm.des.toLowerCase().includes(state.notesValue.toLowerCase());
      });
      changeNameValue({ Allnotes: filterNote })
    }
    else {
      changeNameValue({ Allnotes: getdataList });
    }
  }, [state.notesValue]);

  return (
    <div>
      <DashboardCard
        state={state}
        changeNameValue={changeNameValue}
        openCloseModal={openCloseModal}
        handleAddNote={handleAddNote} //handle open add modal note
        handleSaveNote={handleSaveNote} //handle save note
        handledeleteCard={handledeleteCard}//delete note 
        handleViewNote={handleViewNote}//view note
        handleEditNoteData={handleEditNoteData}//edit note
      />
    </div>
  )
}

export default Dashboard
