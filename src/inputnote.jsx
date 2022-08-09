import React from "react";
import { useState , useEffect} from "react";
import NoteBox from "./note";



function InputNote(props) {

    function getFromLocalStorage(){
        let data = localStorage.getItem('Notes-Array');
        if(data!=null){
            return JSON.parse(data);
        }
        else return []
    }

    let [NotesArray, UpdateNotesArray] = useState(getFromLocalStorage())

    let [inputObj, changeInputObj] = useState({
        id: undefined,
        title: '',
        description: ''
    })

    function changedNote() {
        changeInputObj({
            id: NotesArray.length + 1,
            title: document.querySelector('.titleInput').value,
            description: document.querySelector('.noteInput').value
        })
    }

    function addNote() {
        // console.log(NotesArray.length, inputObj);
        changeInputObj({
            id: undefined,
            title: '',
            description: ''
        })
        UpdateNotesArray([...NotesArray, inputObj])

    }

    useEffect(() => {
        localStorage.setItem('Notes-Array',JSON.stringify(NotesArray))
    }, [NotesArray])
    

    function deleteNote(e) {
        NotesArray = NotesArray.filter((item) => {
            return e.target.getAttribute('index') != item.id
        })

        NotesArray.map((item,index) => (
            item.id = index+1
        )
        )

        UpdateNotesArray(NotesArray)


    }

    return (
        <>
            <div className="mainInputBox">
                <div className="inputBox">
                    <input type="text" className="titleInput" onChange={changedNote} placeholder="Title" value={inputObj.title} />
                    <textarea type="text" className="noteInput" onChange={changedNote} placeholder="Take a note ..." value={inputObj.description} />
                    <div className="btnFlex"><button type="submit" onClick={addNote}>Add</button></div>
                </div>
            </div>
            <div className="notesOuterMainBox">
            <div className="notesContainer">
                {
                    NotesArray.map((element, index) => (
                        <NoteBox key={index} title={element.title} description={element.description} index={element.id} deleteFunc={deleteNote} > </NoteBox>
                    ))
                }
                </div>
            </div>
        </>
    )

}
export { InputNote };

