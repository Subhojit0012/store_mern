const User = require("../models/User");
const Note = require("../models/Note");
const asyncHandler = require("express-async-handler");

// @desc get all notes
// @route GET /users
// @access Private

const getAllNotes = asyncHandler(async (err, req, res) => {
  const notes = await Note.find().lean();

  if (!notes?.length) {
    res.status(404).json({
      message: "Notes not found!",
    });
  }

  const noteWithUser = await Promise.all(
    notes.map(async (note) => {
      const user = await User.findById(note.user).lean().exec();
      return { ...note, username: user.username };
    })
  );

  res.json(noteWithUser);
});

// @desc create note
// @route GET /users
// @access Private

const createNote = asyncHandler(async (req, res) => {
  const { user, title, text } = req.body;

  if (!user || !title || !text) {
    res.status(400).json({
      message: "All Fields are Required!",
    });
  }

  const duplicate = await Note.findOne({ title }).lean().exec();
  if (duplicate) {
    return res.status(400).json({
      message: "Duplicate Title",
    });
  }

  const note = { user, title, text };

  const createNote = await Note.create(note);
  if (createNote) {
    res.status(200).json({
      message: `user ${createNote.user}'s note is created!`,
    });
  } else {
    res.status(404).json({
      message: "Plaese fill the fields correctly!",
    });
  }
});

module.exports = {
  getAllNotes,
  createNote,
};
