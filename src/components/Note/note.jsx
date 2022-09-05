import React from "react";
import './note.css'
function NoteBox(prop) {

  
  
  

  return (

    
      <div className="noteDiv" >
        <button className="deleteNote" onClick={prop.deleteFunc} index={prop.index}>X</button>
        <button className="pinNote" onClick={prop.pinnedFunction} index={prop.index}></button>
        <div className="notebox">
          <h3>Title :  {prop.title}</h3>
          <h4>Note No : {prop.index + 1}</h4>
          <hr />
          <p className="content" onClick = {prop.editFunction}>{prop.description}</p>
        </div>
      </div>
    
  );
}

export default NoteBox;
