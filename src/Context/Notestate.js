import React from "react";
import Notecontext from "../Context/notecontext";
import { useState } from "react";

const NoteState = (props) => {
  
  const notesinitial = [
    [
      {
        _id: "62697946e642b5401c155c3a",
        user: "6267b3207072523951f4beec",
        title: "NewSDay updated",
        description: "Newmail@gmail",
        tag: "Incollege",
        date: "2022-04-27T17:11:34.594Z",
        __v: 0,
      },
      {
        _id: "6271827dbb567edf022b4864",
        user: "6267b3207072523951f4beec",
        title: "NewDay",
        description: "Newmail@gmail.com",
        tag: "Incollege",
        date: "2022-05-03T19:29:01.447Z",
        __v: 0,
      },
      {
        _id: "627182d9bb567edf022b4868",
        user: "6267b3207072523951f4beec",
        title: "NewSDay",
        description: "Newmail@gmail.com",
        tag: "Incollege",
        date: "2022-05-03T19:30:33.223Z",
        __v: 0,
      },
    ],
  ];

  const [notes, setNotes] = useState(notesinitial);

  // Add a note
const addnote = async ({title,description,tag}) => {
    // API Call


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
    temp.push(notes);
    setNotes(temp);
  };

  // Edit a note
  const editNote = async ({id, title, description, tag}) => {
    // API Call

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
    <Notecontext.Provider value={{ notes, addnote, deleteNote, editNote }}>
      {props.children}
    </Notecontext.Provider>
  );
};
export default NoteState;
