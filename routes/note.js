const express = require("express");
const noteRouter = express.Router();
const Note = require("../model/Note");

//Read
noteRouter.get("/", (req, res) => {
  Note.find({}, (err, response) => {
    if (err) {
      res.status(500).json({
        message: {
          msgBody: "Unable to get notes",
          msgError: true,
        },
      });
    } else {
      res.status(200).json({ response });
    }
  });
});

//Create
noteRouter.post("/", (req, res) => {
  const note = new Note(req.body);
  note.save((err, document) => {
    if (err)
      res.status(500).json({
        message: {
          msgBody: "Unable to add note",
          msgError: true,
        },
      });
    else
      res.status(200).json({
        message: {
          msgBody: "Successfully added note",
          msgError: false,
        },
      });
  });
});

//Delete
noteRouter.delete("/:id", (req, res) => {
  Note.findByIdAndDelete(req.params.id, (err) => {
    if (err)
      res.status(500).json({
        message: {
          msgBody: "Unable to delete note",
          msgError: true,
        },
      });
    else
      res.status(200).json({
        message: {
          msgBody: "Successfully deleted note",
          msgError: false,
        },
      });
  });
});

//Update
noteRouter.put("/:id", (req, res) => {
  Note.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { runValidators: true },
    (err, response) => {
      if (err)
        res.status(500).json({
          message: {
            msgBody: "Unable to update note",
            msgError: true,
          },
        });
      else
        res.status(200).json({
          message: { msgBody: "Successfully updated note", msgError: false },
        });
    }
  );
});
module.exports = noteRouter;
