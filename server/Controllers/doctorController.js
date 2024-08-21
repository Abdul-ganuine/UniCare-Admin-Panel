const User = require("../Models/Users.js");
const StudentUsers = require("../Models/studentUsers.js");
const bcrypt = require("bcryptjs");

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" });
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedDoctor = await User.findByIdAndDelete(id);
    if (!deletedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.json(deletedDoctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUser = async (req, res) => {
  const id = req.params.id;
  await User.findById({ _id: id })
    .then((doc) => res.json(doc))
    .catch((err) => res.json(err));
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(
      { _id: id },
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        number: req.body.number,
        specialization: req.body.speciality,
        timings: req.body.timings,
      }
    );
    return res.status(200).json({
      status: true,
      message: "User info updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating user details." });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const students = await StudentUsers.find({});
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { id, oldPassword, newPassword, confrimPassword } = req.body;

    if (!id || !oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ status: false, message: "Please provide all required fields" });
    }
    if (newPassword !== confrimPassword) {
      return res.json({
        status: false,
        message: "New password fields do not match.",
      });
    }

    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.json({ status: false, message: "Old password is incorrect" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res
      .status(200)
      .json({ status: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.json({ status: false, message: "Something went wrong" });
  }
};
module.exports = {
  getAllDoctors,
  deleteDoctor,
  updateUser,
  getUser,
  getAllUsers,
  changePassword,
};
