import React, { useContext } from "react";
import Notecontext from "../Context/notecontext";
import Addnote from "./Addnote";
import Noteitem from "./Noteitem";

const Notes = () => {
  const context = useContext(Notecontext);
  const { notes, } = context;
  
  
  return (
    <>
      <Addnote />
      <div className="row my-3">
        <h1>Your Note</h1>
        {notes.map((note) => {
          return <Noteitem key={note._id} note={note} />;
        })}
      </div>
    </>
  );
};

export default Notes;
