import React from "react";
import Notecontext from "../Context/notecontext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesinitial = [];

  // Get all note
  const getotes = async () => {
    // API Call

    const response = await fetch(
      `${host}localhost:5000/api/notes/fetchallnotes`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI2N2IzMjA3MDcyNTIzOTUxZjRiZWVjIn0sImlhdCI6MTY1MDk5NTkyMX0.jMsfY2mv9Ik_teDLdwnqfGU9oB0PivqP2Q1HqLk5m4c",
        },
      }
    );

    const json = await response1.json();
    console.log(json);
  };

  // Add a note
  const addnote = async () => {
    // API Call

    const response = await fetch(`${host}localhost:5000/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI2N2IzMjA3MDcyNTIzOTUxZjRiZWVjIn0sImlhdCI6MTY1MDk5NTkyMX0.jMsfY2mv9Ik_teDLdwnqfGU9oB0PivqP2Q1HqLk5m4c",
      },

      body: JSON.stringify(title, description, tag),
    });

    // LOGIC

    console.log("New Note created");

    const note = {
      _id: "6271827dbb567edf022b4864",
      user: "6267b3207072523951f4beec",
      title: title,
      description: description,
      tag: tag,
      date: "2022-05-03T19:29:01.447Z",
      __v: 0,
    };
    const temp = [...notes];
    temp.push(note);
    setNotes(temp);
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // API Call

    const response1 = await fetch(
      `${host}localhost:5000/api/notes//updatenote/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI2N2IzMjA3MDcyNTIzOTUxZjRiZWVjIn0sImlhdCI6MTY1MDk5NTkyMX0.jMsfY2mv9Ik_teDLdwnqfGU9oB0PivqP2Q1HqLk5m4c",
        },

        body: JSON.stringify({ title, description, tag }),
      }
    );
    const json = response.json();

    // Logic

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];

      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  // Delete a note
  const deleteNote = (id) => {
    console.log("Deleted id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  return (
    <Notecontext.Provider
      value={{ notes, addnote, deleteNote, editNote, getotes }}
    >
      {props.children}
    </Notecontext.Provider>
  );
};
export default NoteState;

21-05-22


const [note, setnote] = useState({ title: "", description: "", tag: "" });

const handleclick = (e) => {
  e.preventDefault();
  // const { title, description, tag } = note;
  addNote(note);
  setnote({ title: "", description: "", tag: "" });
};

const onChange = (e) => {
  e.preventDefault();
  setnote({ ...note, [e.target.name]: e.target.value });
};


// NEw


import React, { useContext, useEffect, useRef,useState } from "react";
import Notecontext from "../Context/notecontext";
import Addnote from "./Addnote";
import Noteitem from "./Noteitem";



const Notes = () => {
  const context = useContext(Notecontext);
  const { notes, getNotes,editNote } = context;

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    refClose.current.click();
    editNote(note.id,note.etitle,note.edescription,note.etag)
    console.log("Updating the Notes..", note)
  };
  
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Addnote />
      <updateNote/>
   
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={
                  note.etitle.length < 5 || note.edescription.length < 5
                }
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-5">
        <h1>Your Notes at one place</h1>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} note={note} updateNote={updateNote} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;

