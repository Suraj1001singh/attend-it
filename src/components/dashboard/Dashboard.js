import React, { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar,";
import db from "../../firebase-config";
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

  const getStudents = async () => {
    if (Object.keys(selectedCourse).length != 0 && Object.keys(selectedSubject).length != 0 && selectedDate !== "") {
      const studentCollectionRef = query(collectionGroup(db, "arrayofdates"), where("subjectname", "==", selectedSubject.name));
      // const newred=collection(studentCollectionRef,selectedSubject.id);
      // const newred2=collection(newred,"cs2021-11-8");
      // const studentCollectionRef = await firebase.firestore().collection("events").get();
      // var data = db.collection("courses").doc(selectedCourse.id);
      const data = await getDocs(studentCollectionRef);
      // const dataArray = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      setDateList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      // console.log(`courses/${selectedCourse.id}/subject/${selectedSubject.id}/arrayofdates}`);
      // var docRef = db.collection("courses").doc(selectedCourse.id);
    } else {
      alert("Please select All fields");
    }
  };
  //-----------OnClick handles-----------------
  const handelOnClick = () => {
    if (Object.keys(selectedCourse).length != 0 && Object.keys(selectedSubject).length != 0) {
    } else {
      alert("Please select All fields");
    }
  };
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
  const handelOnchangeDate = (e) => {
    e.preventDefault();
    setSelectedDate(e.target.value);
  };
  console.log(selectedDate);
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
            <select name="Subject Name" id="subject" onChange={(e) => handelOnChangeSubject(e)}>
              <option>Select Date</option>
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
