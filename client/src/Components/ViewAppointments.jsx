import "./viewAppointments.css";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Doctors.css";
import DataTable from "react-data-table-component";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertSlice";

function ViewAppointments() {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();
  const appointment = [
    {
      first_name: "John",
      last_name: "Doe",
      number: "+1234567890",
      date: "2024-08-01",
      time: "10:00 AM",
      status: "Confirmed",
    },
    {
      first_name: "Jane",
      last_name: "Smith",
      number: "+0987654321",
      date: "2024-08-02",
      time: "11:30 AM",
      status: "Pending",
    },
    {
      first_name: "Emily",
      last_name: "Johnson",
      number: "+1122334455",
      date: "2024-08-03",
      time: "01:00 PM",
      status: "Cancelled",
    },
    {
      first_name: "Michael",
      last_name: "Williams",
      number: "+2233445566",
      date: "2024-08-04",
      time: "02:30 PM",
      status: "Confirmed",
    },
    {
      first_name: "Sarah",
      last_name: "Brown",
      number: "+3344556677",
      date: "2024-08-05",
      time: "03:45 PM",
      status: "Pending",
    },
  ];

  const columns = [
    {
      name: "ID",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => `${row.first_name} ${row.last_name}`,
      sortable: true,
    },
    {
      name: "Phone Number",
      selector: (row) => row.number,
    },
    {
      name: "Date",
      selector: (row) => row.date,
    },
    {
      name: "Time",
      selector: (row) => row.time,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Actions",
      selector: (row) => (
        <div className="btn-container">
          <button className="approve">Approve</button>
          <button className="reject">Reject</button>
        </div>
      ),
    },
  ];

  // useEffect(() => {
  //   dispatch(showLoading());
  //   axios
  //     .get("http://localhost:3000/panel/getAppointments")
  //     .then((res) => {
  //       setAppointments(res.data);
  //       dispatch(hideLoading());
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <div className="viewPage">
      <div className="table-container">
        <DataTable
          columns={columns}
          data={appointment}
          title="Available Appointments"
          pagination
          pointerOnHover
          highlightOnHover
          fixedHeader
          fixedHeaderScrollHeight="600px"
          responsive
        ></DataTable>
      </div>
    </div>
  );
}

export default ViewAppointments;
