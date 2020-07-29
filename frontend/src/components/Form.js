import React from "react";
import Input from "./Input";

const Form = (props) => {
  return (
    <form onSubmit={props.handler}>
      <h3>{props.isEditing ? "whatsup" : "Add a new note"}</h3>
      <div className="form-grou">
        <Input
          name="title"
          placeholder="Enter title"
          labelName="Title"
          handleChange={props.handleChange}
          value={props.value.title}
        />
        <Input
          name="content"
          placeholder="Enter content"
          labelName="Content"
          handleChange={props.handleChange}
          value={props.value.content}
        />

        <button type="submit" className="btn btn-primary">
          {props.isEditing ? "Edit Note" : "Add New"}
        </button>
      </div>
    </form>
  );
};

export default Form;
