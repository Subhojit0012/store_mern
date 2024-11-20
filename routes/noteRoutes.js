const express = require("express");
const router = express.Router();
const noteControllers = require("../controllers/noteControllers");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);

router
  .route("/")
  .get(noteControllers.getAllNotes)
  .post(noteControllers.createNote)
  .patch(noteControllers.updateNote)
  .delete(noteControllers.deleteNote);

module.exports = router;
