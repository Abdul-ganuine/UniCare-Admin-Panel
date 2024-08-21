const express = require("express");
const router = express.Router();

const {
  getAllDoctors,
  deleteDoctor,
  getUser,
  updateUser,
  getAllUsers,
  changePassword,
} = require("./../controllers/doctorController.js");

/*Api for fetching all doctor */
router.route("/getDoctors").get(getAllDoctors);

/*Api for deleting a doctor */
router.route("/deleteDoctor/:id").delete(deleteDoctor);

router.route("/UserInfo/:id").get(getUser);
router.route("/updateUserInfo/:id").put(updateUser);
router.route("/getStudentUsers").get(getAllUsers);
router.route("/changePassword").post(changePassword);

module.exports = router;
