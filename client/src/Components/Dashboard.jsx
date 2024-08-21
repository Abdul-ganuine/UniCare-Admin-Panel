import { useEffect, useState } from "react";
import CountCard from "./CountCard";
import "./Dashboard.css";
import TrendChart from "./TrendChart";
import doctorImg from "../assets/dashImg2.png";
import counsellorImg from "../assets/dashImg5.svg";
import userImg from "../assets/dashImg4.svg";
import calender from "../assets/calendar.svg";
import message from "../assets/message.svg";
import user from "../assets/user.svg";
import { useRole } from "./../Context/RoleProvider.jsx";
import { hideLoading, showLoading } from "../redux/alertSlice.js";
import { useDispatch } from "react-redux";
import axios from "axios";

function Dashboard() {
  const [numofDoctors, setNumOfDoctors] = useState("");
  const [numofCounsellors, setNumOfCounsellors] = useState("");
  const [numofStudents, setNumOfStudents] = useState("");
  const [appointments, setAppointments] = useState(1);
  const [users, setUsers] = useState(2);
  const [newMessages, setNewMessages] = useState(3);
  const dispatch = useDispatch();
  const role = useRole();

  useEffect(() => {
    dispatch(showLoading());
    axios
      .get("http://localhost:3000/panel/getDoctors")
      .then((res) => {
        setNumOfDoctors(res.data.length);
        dispatch(hideLoading());
      })
      .catch((err) => console.log(err));
  }, [dispatch]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/panel/getStudentUsers")
      .then((res) => {
        setNumOfStudents(res.data.length);
        dispatch(hideLoading());
      })
      .catch((err) => console.log(err));
  }, [dispatch]);

  useEffect(() => {
    dispatch(showLoading());
    axios
      .get("http://localhost:3000/panel/getCounsellors")
      .then((res) => {
        setNumOfCounsellors(res.data.length);
        dispatch(hideLoading());
      })
      .catch((err) => dispatch(hideLoading()));
  }, [dispatch]);

  const adminDetails = [
    {
      img: doctorImg,
      number: numofDoctors,
      description: "Doctors",
    },
    {
      img: counsellorImg,
      number: numofCounsellors,
      description: "Counsellors",
    },
    {
      img: userImg,
      number: numofStudents,
      description: "Users",
    },
  ];
  const healthProfessionalDetails = [
    {
      img: calender,
      number: appointments,
      description: "Appointments",
    },
    {
      img: user,
      number: users,
      description: "Counsellors",
    },
    {
      img: message,
      number: newMessages,
      description: "New Messages",
    },
  ];
  const detailsToRender =
    role === "admin" ? adminDetails : healthProfessionalDetails;
  return (
    <div className="dashboard">
      <div className="count-container">
        {detailsToRender.map((detail, i) => (
          <CountCard obj={detail} key={i} />
        ))}
      </div>
      <TrendChart />
    </div>
  );
}

export default Dashboard;
