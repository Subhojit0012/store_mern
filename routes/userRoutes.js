const express = require("express");
const router = express.Router();
const usersControllers = require("../controllers/usersControllers");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);

router
  .route("/")
  .get(usersControllers.getAllUsers)
  .post(usersControllers.createUsers)
  .patch(usersControllers.updateUsers)
  .delete(usersControllers.deleteUsers);

module.exports = router;
