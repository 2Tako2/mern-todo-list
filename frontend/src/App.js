import React, { useState, useEffect } from "react";
import NoteDisplay from "./components/NoteDisplay";
import NoteAPI from "./NoteAPI";
import Form from "./components/Form";

export default function App() {
  // ############### useState Setting
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  // ############### useEffect setting
  useEffect(() => {
    NoteAPI.getNotes().then((data) => {
      setNotes(data.response);
    });
  }, [note]);

  // ############### reset form to blank
  const resetForm = () => {
    setNote({
      title: "",
      content: "",
    });
  };

  // ############### handle change
  // `...note` copies the note format
  // `[e.taget.name]` finds the object by its name value
  // `e.target.value` finds the object by its value value
  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const editMode = (note) => {
    setIsEditing(true);
    setNote(note);
  };

  // ############### handle ADD note

  const AddNote = async (e) => {
    e.preventDefault();
    const postData = await NoteAPI.createNote(note);
    const message = postData.message;
    if (message.msgError) {
      setMessage(message);
    } else {
      const data = await NoteAPI.getNotes();
      setNote(data.response);
      setMessage(message);
    }
    resetForm();
  };

  // ############### handle DELETE note

  const DeleteNote = async (_id) => {
    const deleteData = await NoteAPI.deleteNote(_id);
    const message = deleteData.message;
    if (message.msgError) {
      setMessage(message);
    } else {
      const data = await NoteAPI.getNotes();
      setNote(data.response);
      setMessage(message);
    }
  };

  // ############### handle UPDATE note

  const EditNote = async (e) => {
    e.preventDefault();
    const updateData = await NoteAPI.UpdateNote(note);
    const message = updateData.message;
    if (message.msgError) {
      setMessage(message);
    } else {
      const data = await NoteAPI.getNotes();
      setNote(data.response);
      setMessage(message);
    }
    setIsEditing(false);
    resetForm();
  };

  // ############### render notes using NoteDisplay component
  const renderNotes = notes.map((o) => (
    <NoteDisplay
      key={o._id}
      id={o._id}
      title={o.title}
      content={o.content}
      deleteHandler={DeleteNote}
      editMode={editMode}
    />
  ));

  // ############### Return
  return (
    <div className="row justify-content-center">
      <div className="col-4">
        <Form
          isEditing={isEditing}
          value={note}
          handleChange={handleChange}
          handler={isEditing ? EditNote : AddNote}
        />
        <p>{message.msgBody}</p>
      </div>
      <div className="col-4">{renderNotes}</div>
    </div>
  );
}
