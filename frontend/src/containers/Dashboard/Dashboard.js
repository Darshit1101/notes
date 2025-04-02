import React, { useState, useCallback, useEffect } from 'react'
import DashboardCard from "../../components/Dashboard/DashboardCard";
import { useDispatch, useSelector } from "react-redux";
import * as dashboardDucks from '../../ducks/dashboard';
import './Dashboard.css';
import { toastify } from '../../ducks/toast';

const Dashboard = () => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    addNoteModal: false,
    tit: '',//title
    des: '',//description
    Allnotes: [],//all notes data
    viewNoteModal: false,
    editNoteModal: false,
    notesValue: '',//search bar state value
    popoverActive: false,
    Category: '',
    selectedCategory: ''//select the Category
  })

  const changeNameValue = useCallback((obj) => {
    setState((prevState) => ({ ...prevState, ...obj }));
  }, []);

  const getdataList = useSelector(state => state.dashboard.getAll?.data)

  useEffect(() => {
    dispatch(dashboardDucks.getAllNote());
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
    changeNameValue({ tit: "", des: "", selectedCategory: '', })
    openCloseModal('addNoteModal', state.addNoteModal, 'open');
  }

  //handle save note
  const handleSaveNote = () => {
    if (state.tit.trim() || state.des.trim()) {
      let obj = {
        tit: state.tit,
        des: state.des,
        ctr: state.selectedCategory,
        uid: localStorage.getItem('id')
      }
      dispatch(dashboardDucks.addNote(obj));
      clearState();
      changeNameValue({notesValue: ''})
      openCloseModal('addNoteModal', state.addNoteModal, 'close');
    }
    else {
      dispatch(toastify({ type: 'error', msg: 'Note cannot be empty!' }));
    }
  }

  //delete note particular
  const handledeleteCard = (id) => {
    let obj = {
      id: id,
    }
    dispatch(dashboardDucks.deleteCard(obj))
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
    let obj = {
      tit: data.tit,
      des: data.des,
      selectedCategory: data.ctr,
      nid: data._id,
    }
    changeNameValue(obj)
    openCloseModal('editNoteModal', state.editNoteModal, 'open');
  }

  const handleUpdateNote = () => {
    let obj = {
      tit: state.tit,
      des: state.des,
      ctr: state.selectedCategory,
      nid: state.nid,
    }
    dispatch(dashboardDucks.editNote(obj))
    changeNameValue({ Category: '',notesValue: '' })
    openCloseModal('editNoteModal', state.editNoteModal, 'close');
  }

  //clear state
  const clearState = () => {
    let obj = {
      tit: "",
      des: "",
      selectedCategory: '',
      Category: ''
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

  //category wise data show
  const handleCategorySelection = (label, value) => {
    changeNameValue({ popoverActive: false, Category: label === 'All' ? '' : label });

    if (value) {
      dispatch(dashboardDucks.getAllNote({ ctr: value }));
    } else {
      dispatch(dashboardDucks.getAllNote()); // Call without an argument
    }
  };

  useEffect(() => {
    changeNameValue({ notesValue: '' })
  }, [state.Category])

  return (
    <div>
      <DashboardCard
        state={state}
        changeNameValue={changeNameValue}
        openCloseModal={openCloseModal}
        handleAddNote={handleAddNote} //handle open add modal note
        handleSaveNote={handleSaveNote} //handle save note(Add note)
        handledeleteCard={handledeleteCard}//delete note 
        handleViewNote={handleViewNote}//view note
        handleEditNoteData={handleEditNoteData}//edit note
        handleUpdateNote={handleUpdateNote}//update note
        handleCategorySelection={handleCategorySelection}//category wise selection
      />
    </div>
  )
}

export default Dashboard
