import "./viewAppointments.css";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Doctors.css";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertSlice";
import { toast } from "react-toastify";
import moment from "moment";

function ViewAppointments() {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();

  const getAppointments = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.get(
        "http://localhost:3000/panel/getAppointmentsByDoctorId",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading());

      if (res.data.status) {
        const data = res.data.data;
        setAppointments(data);

        if (data.length === 0) {
          toast.success("You do not have any appointments");
        } else {
          toast.success(res.data.message);
        }
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Failed to fetch appointments");
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const columns = [
    {
      name: "ID",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    // {
    //   name: "Patient Name",
    //   selector: (row) => `${row.first_name} ${row.last_name}`,
    //   sortable: true,
    // },
    // {
    //   name: "Phone Number",
    //   selector: (row) => row.number,
    // },
    {
      name: "Date",
      selector: (row) => moment(row.date).format("YYYY-MM-DD"),
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

  return (
    <div className="viewPage">
      <div className="table-container">
        <DataTable
          columns={columns}
          data={appointments}
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
