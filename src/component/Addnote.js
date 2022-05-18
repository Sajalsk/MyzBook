import React, { useContext, useState } from "react";
import Notecontext from "../Context/notecontext";



const Addnote = () => {
  const context = useContext(Notecontext);
  const { addnote } = context;

  const [note, setnote] = useState({ title: "", description: "", tag: "" });

  const handleclick = (e) => {
    e.preventDefualt();
    const {title, description, tag} = note
    addnote(title, description, tag)
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  const onChange = (e) => {
    setnote({ title: "", description: "", tag: "" });
  };
  return (
    <div>
      {" "}
      <div className="container my-3">
        <h1>Add a Note</h1>
        <form onSubmit={handleclick}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={onChange}
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
              onChange={onChange}
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
        
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addnote;
