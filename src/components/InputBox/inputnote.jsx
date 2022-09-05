import React from "react";
import { useState, useEffect } from "react";
import NoteBox from "../Note/note";
import './inputnote.css'
import { addNote, deleteNote, changedNoteInput, getFromLocalStorage, pinNote , compare } from '../Note/crudNotes'
import Paginate from "../Paginate/paginate";
import _ from 'lodash';
import Popup from "../Popup/Popup";
import { editFunction } from "../Note/crudNotes";
import { useRef } from "react";

function InputNote(props) {

    const [NotesArray, UpdateNotesArray] = useState(getFromLocalStorage('Notes-Array'))
    const [pinnedNotesArray, UpdatePinnedNotesArray] = useState(getFromLocalStorage('Pinned-Notes-Array'))
    const [cominedArray, UpdateCombinedNotesArray] = useState([])
    const [page, setPage] = useState(0);
    const refForPopup = useRef(null)
    const notesPerPage = 6;
    const pageVisited = page * notesPerPage;

    const [inputObj, changeInputObj] = useState({
        id: undefined,
        title: '',
        description: ''
    })
    

    useEffect(() => {
        localStorage.setItem('Notes-Array', JSON.stringify(NotesArray));
        localStorage.setItem('Pinned-Notes-Array', JSON.stringify(pinnedNotesArray));
        let newCombinedArray = []
        pinnedNotesArray.forEach(item => newCombinedArray.push(item))
        NotesArray.forEach((item) => {if(!compare(item,pinnedNotesArray))newCombinedArray.push(item)})
        UpdateCombinedNotesArray(newCombinedArray)
    }, [NotesArray, pinnedNotesArray])

    const changePage = ({ selected }) => {
        setPage(selected)
    }


    const displayNotes = cominedArray.slice(pageVisited, pageVisited + notesPerPage).map((note, index) =>
        <NoteBox key={index} title={note.title} description={note.description} index={note.id} deleteFunc={(e) => deleteNote(e, NotesArray, UpdateNotesArray, pinnedNotesArray, UpdatePinnedNotesArray)} pinnedFunction={(e) => pinNote(e, NotesArray, pinnedNotesArray, UpdatePinnedNotesArray)}  > </NoteBox>
    )

    return (
        <>
            <div className="mainInputBox">
                <div className="inputBox">
                    <input type="text" className="titleInput" onChange={(e) => changedNoteInput(NotesArray, changeInputObj)} placeholder="Title" value={inputObj.title} />
                    <textarea type="text" className="noteInput" onChange={(e) => changedNoteInput(NotesArray, changeInputObj)} placeholder="Take a note ..." value={inputObj.description} />
                    <div className="btnFlex"><button type="submit" onClick={(e) => addNote(NotesArray, changeInputObj, UpdateNotesArray, inputObj)}>Add</button></div>
                </div>
            </div>
            <div className="notesOuterMainBox">
                <div className="notesContainer">
                    {
                        displayNotes
                    }
                </div>
                <Paginate pageCount={Math.ceil(NotesArray.length / notesPerPage)} changePage={changePage}></Paginate>
            </div>
           
        </>
    )

}
export { InputNote };

