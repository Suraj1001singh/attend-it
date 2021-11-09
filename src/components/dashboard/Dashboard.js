import React, { useState, useEffect } from "react";
import "./dashboard.css";
import Navbar from "../navbar/Navbar,";
import db from "../../firebase-config";
import XLSX from "xlsx";
import { collection, getDocs, addDoc, query, where, firebase, collectionGroup } from "@firebase/firestore";

const Dashboard = () => {
  //this will be fetched from api

  const [courseList, setCourseList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [dateList, setDateList] = useState([]);

  const [selectedCourse, setSelectedCourse] = useState({});
  const [selectedSubject, setSelectedSubject] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [studentList, setStudentList] = useState([]);
  //----------------db references------
  const coursesCollectionRef = collection(db, "courses");
  const downloadExcel = () => {
    if (Object.keys(selectedCourse).length != 0 && Object.keys(selectedSubject).length != 0 && Object.keys(selectedDate).length != 0) {
      const newData = studentList.map((row) => {
        delete row.tableData;

        return row;
      });
      const workSheet = XLSX.utils.json_to_sheet(newData);
      const workBook = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(workBook, workSheet, "student attendance record");

      //buffer
      let buffer = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
      //binary string
      XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
      //download
      XLSX.writeFile(workBook, "AttendanceData.xlsx");
    } else {
      alert("Please select All fields");
    }
  };
  const getStudents = async () => {
    if (Object.keys(selectedCourse).length != 0 && Object.keys(selectedSubject).length != 0 && Object.keys(selectedDate).length != 0) {
      const studentCollectionRef = collectionGroup(db, `${selectedSubject.name}${selectedDate.date}`);
      const data = await getDocs(studentCollectionRef);
      setStudentList(data.docs.map((doc) => ({ ...doc.data() })));
    } else {
      alert("Please select All fields");
    }
  };
  //-----------OnClick handles-----------------

  const handelOnChangeCourse = (e) => {
    e.preventDefault();
    setSelectedCourse(
      ...courseList.filter((course) => {
        if (course.id === e.target.value) return course;
      })
    );
  };
  const handelOnChangeSubject = (e) => {
    e.preventDefault();
    setSelectedSubject(
      ...subjectList.filter((subject) => {
        if (subject.id === e.target.value) return subject;
      })
    );
  };
  const handelOnChangeDate = (e) => {
    e.preventDefault();
    setSelectedDate(
      ...dateList.filter((date) => {
        if (date.id === e.target.value) return date;
      })
    );
  };

  //------this useEffect for fetching coursesList
  useEffect(() => {
    const getCourses = async () => {
      const data = await getDocs(coursesCollectionRef);
      const dataArray = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setCourseList(dataArray);
    };
    getCourses();
  }, []);
  // -------this useEffect for fetching subjectList after selecting courses
  useEffect(() => {
    const getSubjects = async () => {
      if (Object.keys(selectedCourse).length != 0) {
        const subjectCollectionRef = collection(db, `courses/${selectedCourse.id}/subject`);
        const data = await getDocs(subjectCollectionRef);
        setSubjectList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
    };
    getSubjects();
  }, [selectedCourse]);
  // -------this useEffect for fetching dates
  useEffect(() => {
    const getListofDates = async () => {
      if (Object.keys(selectedSubject).length != 0) {
        const dateCollectionRef = query(collectionGroup(db, "arrayofdates"), where("subjectname", "==", selectedSubject.name));
        const data = await getDocs(dateCollectionRef);
        setDateList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
    };
    getListofDates();
  }, [selectedSubject]);
  console.log(studentList);
  return (
    <div>
      <Navbar></Navbar>
      <section className="displayqrcode secton">
        <div className="displayqrcode_container bd-grid">
          <div className="select_tags">
            {/* ------------------------Course selector ----------------- */}

            <select name="Course Name" id="course" onChange={(e) => handelOnChangeCourse(e)}>
              <option>Select Course</option>
              {courseList.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.courseName}
                </option>
              ))}
            </select>
            {/* ------------------------Subject selector ----------------- */}

            <select name="Subject Name" id="subject" onChange={(e) => handelOnChangeSubject(e)}>
              <option>Select Subject</option>
              {subjectList.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
            {/* --------------------------Date selector------------ */}
            <select name="Subject Name" id="subject" onChange={(e) => handelOnChangeDate(e)}>
              <option value="">Select Date</option>
              {dateList.map((date) => (
                <option key={date.id} value={date.id}>
                  {date.date}
                </option>
              ))}
            </select>
          </div>
          <div className="button_div">
            <button className="button" onClick={getStudents}>
              GO
            </button>
            <button className="button" onClick={downloadExcel}>
              Download
            </button>
          </div>
          {studentList.length > 0 ? (
            <div className="table-wrapper">
              <table className="fl-table">
                <thead>
                  <tr>
                    <th>Roll Number</th>
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody>
                  {studentList.map((student) => (
                    <tr key={student.id}>
                      <td>{student.rollno}</td>
                      <td>{student.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
