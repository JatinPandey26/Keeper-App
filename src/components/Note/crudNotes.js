function getFromLocalStorage(id){
    let data =  localStorage.getItem(id);
    if(data!= null){
        return JSON.parse(data);
    }
    else return []
}

function changedNoteInput(NotesArray,changeInputObj) {
    changeInputObj({
        id: NotesArray.length,
        title: document.querySelector('.titleInput').value,
        description: document.querySelector('.noteInput').value
    })
}

function addNote(NotesArray,changeInputObj,UpdateNotesArray,inputObj) {
    changeInputObj({
        id: undefined,
        title: '',
        description: ''
    })
    UpdateNotesArray([...NotesArray, inputObj])

}

function deleteNote(e,NotesArray,UpdateNotesArray,pinnedNotesArray,updatePinnedArray) {
    console.log(e.target.getAttribute('index'));    
    
    NotesArray = NotesArray.filter((item) => {
        return e.target.getAttribute('index') != item.id
    })

    updatePinnedArray(pinnedNotesArray.filter(item => {return NotesArray.includes(item)}))

    NotesArray.map((item,index) => (
        item.id = index
    )
    )

    UpdateNotesArray(NotesArray)


}

function compare(item,pinnedNotesArray) {
    let ret = false;
    pinnedNotesArray.forEach((note) => { if (deepEqual(item, note)){ ret = ret || true} })
    
    return ret;
}
function isObject(object) {
    return object != null && typeof object === 'object';
}
function deepEqual(object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (const key of keys1) {
        const val1 = object1[key];
        const val2 = object2[key];
        const areObjects = isObject(val1) && isObject(val2);
        if (
            areObjects && !deepEqual(val1, val2) ||
            !areObjects && val1 !== val2
        ) {
            return false;
        }
    }
    return true;
}


function pinNote(e,NotesArray, pinnedNotesArray ,updatePinnedArray){

    console.log(compare(NotesArray[e.target.getAttribute('index')],pinnedNotesArray));

    if(compare(NotesArray[e.target.getAttribute('index')],pinnedNotesArray)){
        e.target.parentElement.style.backgroundColor = 'azure'
        updatePinnedArray(pinnedNotesArray.filter((item) => !deepEqual(item, NotesArray[e.target.getAttribute('index')])))
        return;
    }

    e.currentTarget.classList.add('red')
    
    updatePinnedArray([NotesArray[e.target.getAttribute('index')]  , ...pinnedNotesArray])


}



export {deleteNote,addNote,changedNoteInput,getFromLocalStorage,pinNote,compare}