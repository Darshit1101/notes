import React, { useState, useCallback, useEffect } from 'react'
import './ManageNotes.css';
import ManageNotesCard from "../../components/ManageNotes/ManageNotesCard";
import { useDispatch, useSelector } from "react-redux";
import * as dashboardDucks from '../../ducks/dashboard';
import { useIndexResourceState } from '@shopify/polaris';

function ManageNotes() {
    const dispatch = useDispatch();

    const [state, setState] = useState({
        ManageNotes: [], //manage notes data 
        paggiActive: 1,//page number
        pageNumber: 0,
    })

    //set data.
    const changeNameValue = useCallback((obj) => {
        setState((prevState) => ({ ...prevState, ...obj }))
    }, []);

    const getdataList = useSelector(state => state.dashboard.getAll?.data)
    const noteCount = useSelector(state => state.dashboard.getAll?.count)

    useEffect(() => {
        let obj = {
            num: state.paggiActive
        };
        dispatch(dashboardDucks.getAllNote(obj));
    }, [state.paggiActive])

    useEffect(() => {
        if (getdataList) {
            changeNameValue({ ManageNotes: getdataList });
        }
    }, [getdataList]);

    //delete note particular
    const handledeleteModal = (id) => {
        let obj = {
            id: id,
            num: state.paggiActive
        }
        dispatch(dashboardDucks.deleteCard(obj))
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
        />
    )
}
export default ManageNotes;