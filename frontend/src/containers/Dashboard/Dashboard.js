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
    editNoteModal: false,
    notesValue: '',//search bar state value
    popoverActive: false,
    Category: '',
    selectedCategory: ''//select the Category
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
      ctr: state.selectedCategory,
      uid: localStorage.getItem('id')
    }
    dispatch(dashboardDucks.addNote(obj));
    clearState();
    openCloseModal('addNoteModal', state.addNoteModal, 'close');
  }

  //delete note particular
  const handledeleteCard = (id) => {
    let obj = {
      id: id,
      uid: localStorage.getItem('id')
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
      uid: localStorage.getItem('id')
    }
    dispatch(dashboardDucks.editNote(obj))
    openCloseModal('editNoteModal', state.editNoteModal, 'close');
  }

  //clear state
  const clearState = () => {
    let obj = {
      tit: "",
      des: "",
      selectedCategory: 'all',
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
    const newCategory = label === 'All' ? '' : label;
    changeNameValue({ popoverActive: false, Category: newCategory });
    // Conditionally manage the `ctr` property in objData
    if (value === 'all') {
      delete objData.ctr; // Remove `ctr` for default API call
    } else {
      objData.ctr = value; // Add `ctr` for filtering
    }
    dispatch(dashboardDucks.getAllNote(objData));
  };

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
