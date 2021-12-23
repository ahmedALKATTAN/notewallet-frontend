import React, { useState, useContext } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import axios from "axios";
import AuthContext from "../store of browser provider/auth-context";

function AreaOfTextNote(props) {
  const authCtx = useContext(AuthContext);
  const [isExpanded, setExpanded] = useState(false);
  const thextractID = { id: localStorage.getItem("userdata") };

  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function submitNote(event) {
    axios
      .put("https://note-wallet-app.herokuapp.com/app/addNewNote", {
        note: note,
        id: thextractID.id,
      })
      .then((data) => {
        if (data.data.seccess) {
        } else {
          alert(data.data.messeg);
        }
      });
    props.onAdd(note);
    setNote({
      title: "",
      content: "",
    });
    event.preventDefault();
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}

        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default AreaOfTextNote;
