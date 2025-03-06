import React, { useState, useCallback, useEffect } from 'react'
import './ManageNotes.css';
import ManageNotesCard from "../../components/ManageNotes/ManageNotesCard";
import { useDispatch, useSelector } from "react-redux";
import * as dashboardDucks from '../../ducks/dashboard';
import { useIndexResourceState } from '@shopify/polaris';
import domtoimage from "dom-to-image";
import { call } from 'redux-saga/effects';

function ManageNotes() {
    const dispatch = useDispatch();

    const [state, setState] = useState({
        ManageNotes: [], //manage notes data 
        paggiActive: 1,//page number
        pageNumber: 0,
        viewDataModal: false,
        tit: '',
        des: '',
        dawnloadDataModal: false,
        profile: {},
        sortSelected: ['cdt desc']
    })

    //set data.
    const changeNameValue = useCallback((obj) => {
        setState((prevState) => ({ ...prevState, ...obj }))
    }, []);

    //open close modal
    const openCloseModal = useCallback((name, value, type) => {
        if (type !== undefined) {
            changeNameValue({ [name]: !value });
        }
    }, []);

    const getdataList = useSelector(state => state.dashboard.getAll?.data)
    const noteCount = useSelector(state => state.dashboard.getAll?.count)
    const profile = useSelector((state) => state.auth.profile);

    // useEffect(() => {
    //     let obj = {
    //         num: state.paggiActive
    //     };
    //     dispatch(dashboardDucks.getAllNote(obj));
    // }, [state.paggiActive])

    useEffect(() => {
        if (getdataList) {
            changeNameValue({ ManageNotes: getdataList });
        }
        if (profile) {
            changeNameValue({ profile: profile });
        }
    }, [getdataList, profile]);

    //delete note particular
    const handledeleteModal = (id) => {
        let obj = {
            id: id,
            num: state.paggiActive
        }
        dispatch(dashboardDucks.deleteCard(obj))
    }

    //view data on view btn click
    const handleViewModal = (data) => {
        let obj = {
            tit: data.tit,
            des: data.des,
        }
        changeNameValue(obj)
        openCloseModal('viewDataModal', state.viewDataModal, 'open');
    }

    //open dawnload modal 
    const handleDownloadModal = (data) => {
        let obj = {
            tit: data.tit,
            des: data.des,
        }
        changeNameValue(obj)
        openCloseModal('dawnloadDataModal', state.dawnloadDataModal, 'open');
    }

    //dawnload note
    const handleSaveNote = () => {
        var _html = document.getElementById('main-note-box');
        domtoimage.toPng(_html, { bgcolor: "#ffffff" })
            .then((dataUrl) => {
                const link = document.createElement("a");
                link.href = dataUrl;
                link.download = new Date().getTime() + '_' + state.profile.fn + '.png';
                link.click();
            })
            .catch((error) => console.error("Error capturing image:", error));
    }

    // paggination call
    const onPaggiCall = (i) => {
        let num = 0;
        if (i === '+1') {
            num = state.paggiActive + 1;
        } else if (i === '-1') {
            num = state.paggiActive - 1;
        } else {
            num = i;
        }
        changeNameValue({ paggiActive: num });
    }

    //get number of totaldata
    useEffect(() => {
        changeNameValue({ pageNumber: parseInt(Math.ceil(noteCount / 5)) });
    }, [noteCount]);

    // Function to get the correct index number based on pagination
    const getIndexNumber = (index) => {
        const itemsPerPage = 5;  // Change this based on your pagination setting
        const startIndex = (state.paggiActive - 1) * itemsPerPage;
        return startIndex + index + 1;
    };

    //selected resources all selected
    let Tdata = [];
    Tdata = state.ManageNotes && state.ManageNotes.length > 0 && state.ManageNotes.map(x => ({ ...x, id: x._id }));//id Field add in data
    const { selectedResources, handleSelectionChange } = useIndexResourceState(Tdata);

    //bulk delete
    const onDeleteBulkAction = () => {
        let obj = {
            typ: 'delete',
            arr_id: selectedResources,
        }
        dispatch(dashboardDucks.deleteBulkNotes(obj))
        selectedResources.splice(0, selectedResources.length);//original array change (empty)
    }

    //call main api on state change
    useEffect(() => {
        callNoteApi();
    }, [state.sortSelected, state.paggiActive])

    //function for api call
    const callNoteApi = () => {
        const srtValue = state.sortSelected.toString().replace('asc', '1').replace('desc', '-1');
        let obj = {
            num: state.paggiActive,
            srt: srtValue
        };
        dispatch(dashboardDucks.getAllNote(obj));
    }

    return (
        <ManageNotesCard
            state={state}
            changeNameValue={changeNameValue}
            handledeleteModal={handledeleteModal}
            onPaggiCall={onPaggiCall}
            getIndexNumber={getIndexNumber}
            onDeleteBulkAction={onDeleteBulkAction}
            selectedResources={selectedResources}
            handleSelectionChange={handleSelectionChange}
            handleViewModal={handleViewModal}
            openCloseModal={openCloseModal}
            handleDownloadModal={handleDownloadModal}
            handleSaveNote={handleSaveNote}
        />
    )
}
export default ManageNotes;