import React from "react";

function NoteBox(prop) {
  return (
    
      <div className="noteDiv">
        <button className="deleteNote" onClick={prop.deleteFunc} index={prop.index}>X</button>
        <div className="notebox">
          <h3>Note No : {prop.index}</h3>
          <br />
          <h3>Title :  {prop.title}</h3>
          <hr />
          <p>{prop.description}</p>
        </div>
      </div>
    
  );
}

export default NoteBox;
