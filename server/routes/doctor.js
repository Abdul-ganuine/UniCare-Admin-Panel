const express = require("express");
const router = express.Router();

const {
  getAllDoctors,
  deleteDoctor,
  getUser,
  updateUser,
  getAllUsers,
  changePassword,
  getDoctorAppointments,
  changeAppointmentStatus,
} = require("./../controllers/doctorController.js");
const middleware = require("../MiddleWare/authMiddleware.js");

/*Api for fetching all doctor */
router.route("/getDoctors").get(getAllDoctors);

/*Api for deleting a doctor */
router.route("/deleteDoctor/:id").delete(deleteDoctor);

router.route("/UserInfo/:id").get(getUser);
router.route("/updateUserInfo/:id").put(updateUser);
router.route("/getStudentUsers").get(getAllUsers);
router.route("/changePassword").post(changePassword);
router
  .route("/getAppointmentsByDoctorId")
  .get(middleware, getDoctorAppointments);
router.route("/changeAppointmentStatus").post(changeAppointmentStatus);

module.exports = router;
