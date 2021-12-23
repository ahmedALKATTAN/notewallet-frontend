import React, { useState, useEffect } from "react";
import Note from "./Note";
import AreaOfTextNote from "./AreaOfTextNote";
import AuthContext from "../store of browser provider/auth-context";
import { useContext } from "react";
import axios from "axios";

function NoteApp() {
  const [notes, setNotes] = useState([{ title: null, content: null }]);
  const authCtx = useContext(AuthContext);
  const userId = authCtx.userData;
  const thextractID = { id: localStorage.getItem("userdata") };

  useEffect(() => {
    axios
      .post("https://note-wallet-app.herokuapp.com/app/GetNotes", thextractID)
      .then((response) => {
        setNotes(response.data.data);
      });
  }, []);

  function addNote(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    const deletObjectInfor = { id: thextractID.id, arrayId: id };
    axios
      .put(
        "https://note-wallet-app.herokuapp.com/app/DeleteNote",
        deletObjectInfor
      )
      .then((response) => {});

    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return noteItem._id !== id;
      });
    });
  }

  return (
    <div>
      <AreaOfTextNote onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
    </div>
  );
}

export default NoteApp;
