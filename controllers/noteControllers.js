const User = require("../models/User");
const Note = require("../models/Note");
const asyncHandler = require("express-async-handler");
/**
 * Retrieves all notes from the database and adds the username of the user associated with each note.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} JSON response with notes and associated user's username.
 */
const getAllNotes = asyncHandler(async (req, res) => {
  // Retrieve all notes from the database
  const notes = await Note.find().lean();

  // If no notes are found, return a 404 status with an empty array
  if (!notes?.length) {
    return res.status(404).json({
      message: "Notes not found!",
    });
  }

  // Retrieve the user associated with each note and add the username to the note object
  const noteWithUser = await Promise.all(
    notes.map(async (note) => {
      const user = await User.findById(note.user).lean().exec();
      return { ...note, username: user.username };
    })
  );

  // Send the response with notes and associated user's username
  res.json({
    count: noteWithUser.length,
    data: noteWithUser,
  });
});

/**
 * Create a new note based on the request body data.
 *
 * @param {Object} req - The request object containing user, title, and text.
 * @param {Object} res - The response object to send back the result.
 * @returns {Object} - JSON response indicating success or failure of note creation.
 */
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

module.exports = {
  getAllNotes,
  createNote,
};
