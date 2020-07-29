export default {
  getNotes: () => {
    return fetch("http://localhost:5000/note")
      .then((res) => res.json())
      .then((data) => data);
  },
  deleteNote: (_id) => {
    return fetch(`http://localhost:5000/note/${_id}`, { method: "delete" })
      .then((res) => res.json())
      .then((data) => data);
  },
  UpdateNote: (note) => {
    return fetch(`http://localhost:5000/note/${note.id}`, {
      method: "put",
      body: JSON.stringify(note),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => data);
  },
  createNote: (note) => {
    return fetch(`http://localhost:5000/note`, {
      method: "post",
      body: JSON.stringify(note),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => data);
  },
};
