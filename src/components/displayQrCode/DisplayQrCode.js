import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import db from "../../firebase-config";
import { collection, getDocs, addDoc, query, where } from "@firebase/firestore";
import "./displayqrcode.css";
import Navbar from "../navbar/Navbar,";

const DisplayQrCode = () => {
  const [src, setSrc] = useState("");

  //this will be fetched from api
  const [courseList, setCourseList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);

  const [selectedCourse, setSelectedCourse] = useState({});
  const [selectedSubject, setSelectedSubject] = useState({});

  //----------------db references------
  const userCollectionRef = collection(db, "qrlink");
  const coursesCollectionRef = collection(db, "courses");

  //-----QR code generator-----------------
  const GenerateQrCode = async (newData) => {
    try {
      const data = await QRCode.toDataURL(newData);

      if (data) {
        setSrc(data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  //-----------OnClick handles-----------------
  const handelOnClick = () => {
    if (Object.keys(selectedCourse).length != 0 && Object.keys(selectedSubject).length != 0) {
      var today = new Date();

      //make changes here to make desired string if you need name : selectedCourse.courseName and selectedSubject.name

      var data = selectedCourse.id + "/" + selectedSubject.id + "/" + selectedSubject.name + "/" + today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + "/" + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      GenerateQrCode(data);
      storeLink(data);
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

  const storeLink = async (newdata) => {
    await addDoc(userCollectionRef, { link: newdata });
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

  return (
    <>
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
          </div>
          <div className="button_div">
            <button className="button" onClick={handelOnClick}>
              Generate QR
            </button>
          </div>

          <img src={src}></img>
        </div>
      </section>
    </>
  );
};

export default DisplayQrCode;
