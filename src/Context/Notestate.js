import React from "react";
import Notecontext from "../Context/notecontext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesinitial = [];
  const [notes, setNotes] = useState(notesinitial);

  // Get all  note

  const getNotes = async () => {
    //API CAll
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
         localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  // Add a note

  const addNote = async (title, description, tag) => {
    //API CAll
    const response = await fetch(`${host}/api/notes/addnote`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "auth-token":
         localStorage.getItem('token'),
      },

      body: JSON.stringify({ title, description, tag }),

    });

    const note = await response.json();
    setNotes(notes.concat(note));
    
  };

  // Update a note

  const editNote = async (id, title, description, tag) => {
    //API CAll
    const response = await fetch(`${host}/api/notes//updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
         localStorage.getItem('token'),
      },

      body: JSON.stringify({ title, description, tag }),
     
      
    });

    const json = response.json();
    console.log(json);

    let Newnotes = JSON.parse(JSON.stringify(notes));

    //Logic
    for (let index = 0; index < Newnotes.length; index++) {
      const element = Newnotes[index];

      if (element._id === id) {
        Newnotes[index].title = title;
        Newnotes[index].description = description;
        Newnotes[index].tag = tag;
        break;
      }
    }

    setNotes(Newnotes);
  };

  // Delete a Note
    const deleteNote = async (id) => {
      // API Call
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "auth-token":localStorage.getItem('token')
        }
      });
      const json =  response.json(); 
      console.log(json)
      const newNotes = notes.filter((note) => { return note._id !== id })
      setNotes(newNotes)
      props.showAlert("Deleted", "danger");
    }

  return (
    <Notecontext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>
      {props.children}
    </Notecontext.Provider>
  );
};
export default NoteState;
