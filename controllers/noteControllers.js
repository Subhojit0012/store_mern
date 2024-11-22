const User = require("../models/User");
const Note = require("../models/Note");
const asyncHandler = require("express-async-handler");

//* get all the notes
const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find().lean();

  //! If no notes are found, return a 404 status with an empty array
  if (!notes?.length) {
    return res.status(404).json({
      message: "Notes not found!",
    });
  }

  //* Retrieve the user associated with each note and add the username to the note object
  const noteWithUser = await Promise.all(
    notes.map(async (note) => {
      const user = await User.findById(note.user).lean().exec();
      return { ...note, username: user.username };
    })
  );

  res.json(noteWithUser);
});

//* create note
const createNote = asyncHandler(async (req, res) => {
  // in user you have to sent User's ObjectId
  const { user, title, text } = req.body;

  // Check if any of the required fields are missing
  if (!user || !title || !text) {
    return res.status(400).json({
      message: "All Fields are Required!",
    });
  }

  // Check if there is a duplicate note title
  const duplicate = await Note.findOne({ title }).lean().exec();
  if (duplicate) {
    return res.status(400).json({
      message: "Duplicate Title",
    });
  }

  // Create a new note if all checks pass
  const note = await Note.create({ user, title, text });
  if (note) {
    return res.status(200).json({
      message: `user ${note.user}'s note is created!`,
    });
  } else {
    return res.status(404).json({
      message: "Please fill the fields correctly!",
    });
  }
});

//* update the note
const updateNote = asyncHandler(async (req, res) => {
  const { id, title, text, user, completed } = req.body;
  // confirm data
  if (!id || !title || !text || typeof completed !== "boolean") {
    res.status(400).json({
      message: "All fields are required!",
    });
  }

  // confirms the note exist to update
  const note = await Note.findById(id).exec();

  if (!note) {
    res.status(400).json({
      message: "Note model not found!",
    });
  }

  // Check for duplicate title
  const duplicate = await Note.findOne({ title }).lean().exec();

  if (duplicate && duplicate?._id.toString() !== id) {
    res.status(400).json({
      message: "Duplicate title!",
    });
  }

  (note.user = user),
    (note.title = title),
    (note.text = text),
    (note.completed = completed);

  const update = await note.save();

  res.json({
    message: `${update.title} updated!`,
  });
});

//* delete the note
const deleteNote = asyncHandler(async (req, res) => {
  // const note = await Note.findById(req.body.id);
  // const note = await Note.findOneAndDelete({_id: req.body.id});
  const note = await Note.deleteOne({ _id: req.body.id });

  if (note) {
    res.json({ message: "Note removed" });
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});

module.exports = {
  getAllNotes,
  createNote,
  updateNote,
  deleteNote,
};
