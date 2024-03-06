import React, { useContext } from "react";
import Notecontext from "../Context/notecontext";

const Noteitem = (props) => {
  
  const context = useContext(Notecontext);
  
  const { deleteNote } = context;
  const { note, updateNote } = props;

   // Update and Delete
  return (
    <div className="col-md-3">
      <div className="card my-4">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i
              className="far fa-trash-alt mx-2"
              onClick={() => {
                deleteNote(note._id);
                props.showAlert("Deleted Note", "danger");
              }}
            ></i>
            <i
              className="far fa-edit mx-2"
              onClick={() => {
                updateNote(note);
              }}
            ></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
