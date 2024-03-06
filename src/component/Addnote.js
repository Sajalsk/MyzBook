import React, { useContext, useState } from "react";
import Notecontext from "../Context/notecontext";

const Addnote = (props) => {

  const context = useContext(Notecontext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleclick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({title: "",description: "",tag: ""})
    props.showAlert("Added Successfully", "success")
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });   // spread operator
  };

   {/* Add Note */}

  return (
    <div>
      <div className="container my-3" >
        <h1>Add a Note</h1>

        <form>

          {/* Title */}
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={note.title}
              aria-describedby="emailHelp"
              onChange={onChange}
              minLength={5} required
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={note.description}
              onChange={onChange}
              minLength={5} required
            />
          </div>

         {/* Tag */}
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
            Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={note.tag}
              onChange={onChange}
              minLength={5} required
            />
          </div>

          {/* checkbox */}
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
              onChange={onChange}
              value={note.tag}
              minLength={5} required
            />
             
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
           
           {/* Disabled */}
          <button
           disabled={note.title.length<5 || note.description.length<5}   // disabled
           type="submit"
           className="btn btn-primary"
           onClick={handleclick}
          >
            Add Note
          </button>

        </form>
      </div>
    </div>
  );
};

export default Addnote;
