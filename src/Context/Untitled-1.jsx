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
