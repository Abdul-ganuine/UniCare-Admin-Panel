import { createContext, useCallback, useEffect, useState } from "react";

import prof5 from "../assets/prof5.jpeg";
import prof6 from "../assets/prof6.jpeg";
import prof7 from "../assets/prof7.jpeg";
import prof8 from "../assets/prof8.jpeg";
import prof4 from "../assets/prof4.jpeg";

export const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [details, setDetails] = useState({
    username: "",
    student_id: "",
    staff_id: "",
    password: "",
    email: "",
  });

  const [sized, setSized] = useState(false);
  const [token, setToken] = useState(null);
  const [fileIndex, setFileIndex] = useState(null);
  const [profImage, setProfImage] = useState(null);
  const [status, setStatus] = useState(() => {
    const savedUser = localStorage.getItem("status");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [updateProfile, setUpdateProfile] = useState(false);

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [files, setFiles] = useState([]);
  const [roughFiles, setRoughFiles] = useState([]);

  const [doctorsList, setDoctorsList] = useState([
    { name: "Dr Mayor", img: prof5 },
    {
      name: "Dr Yeboah",
      img: prof6,
    },
    { name: "Dr Samed", img: prof8 },
    { name: "Dr Okyere", img: prof4 },
    {
      name: "Dr Rabbi Darko",
      img: prof7,
    },
    { name: "Dr Samed", img: prof8 },
    { name: "Dr Okyere", img: prof4 },
    {
      name: "Dr Rabbi Darko",
      img: prof7,
    },
  ]);

  const [counsellorsList, setCounsellorsList] = useState([
    { name: "Mrs Victoria Agyei", img: prof5 },
    {
      name: "Mrs Bernice Peasah",
      img: prof6,
    },
    { name: "Ms. Joana Joseline Hack", img: prof8 },
    { name: "Mr. Cosmos Okyere", img: prof4 },
    {
      name: "Dr. Elizabeth A.S. Forjour",
      img: prof7,
    },
    { name: "Mr. Joan Soribang", img: prof8 },
    { name: "Dr Okyere", img: prof4 },
    {
      name: "Mr Rabbi Darko",
      img: prof7,
    },
  ]);

  const handleResizing = useCallback(() => {
    if (window.innerWidth < 1023) {
      setSized(true);
    } else {
      setSized(false);
    }
  }, []);

  // chat side variables
  const [chat, setChat] = useState(() => {
    const savedChat = localStorage.getItem("selectedChat");
    return savedChat ? JSON.parse(savedChat) : null;
  });

  useEffect(() => {
    if (chat) {
      localStorage.setItem("selectedChat", JSON.stringify(chat));
    }
  }, [chat]);

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <GlobalContext.Provider
      value={{
        sized,
        setSized,
        token,
        setToken,
        status,
        setStatus,
        files,
        setFiles,
        chat,
        setChat,
        roughFiles,
        setRoughFiles,
        fileIndex,
        setFileIndex,
        handleResizing,
        details,
        setDetails,
        profImage,
        setProfImage,
        currentUser,
        setCurrentUser,
        doctorsList,
        setDoctorsList,
        counsellorsList,
        setCounsellorsList,
        updateProfile,
        setUpdateProfile,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
