import React from "react";

const NoteDisplay = (props) => {
  return (
    <div>
      <h4>Title: {props.title}</h4>
      <h6>Content: {props.content}</h6>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => props.editMode(props)}
      >
        Edit
      </button>

      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => props.deleteHandler(props.id)}
      >
        Delete
      </button>
      <br />
    </div>
  );
};

export default NoteDisplay;
