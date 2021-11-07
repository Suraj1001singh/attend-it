import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import db from "../../firebase-config";
import { collection, getDocs, addDoc } from "@firebase/firestore";
import "./displayqrcode.css";
import Navbar from "../navbar/Navbar,";

const DisplayQrCode = () => {
  const [src, setSrc] = useState("");

  //this will be fetched from api
  const [courseList, setCourseList] = useState(["MCA", "Btech CS", "MBA"]);
  const [subjectList, setSubjectList] = useState(["C programming", "Digital electronics"]);

  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  //----------------db references------
  const userCollectionRef = collection(db, "qrlink");

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
    if (selectedCourse && selectedSubject) {
      var today = new Date();
      var data = selectedCourse + "/" + selectedSubject + "/" + today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + "/" + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      GenerateQrCode(data);
      storeLink(data);
    } else {
      alert("Please select All fields");
    }
  };

  const handelOnChangeCourse = (e) => {
    e.preventDefault();

    setSelectedCourse(courseList[e.target.value]);
  };
  const handelOnChangeSubject = (e) => {
    e.preventDefault();

    setSelectedSubject(subjectList[e.target.value]);
  };
  const storeLink = async (newdata) => {
    await addDoc(userCollectionRef, { link: newdata });
  };
 

  return (
    <>
      <Navbar></Navbar>
      <section className="displayqrcode secton">
        <div className="displayqrcode_container bd-grid">
          <div className="select_tags">
            {/* ------------------------Course selector ----------------- */}
            {/* <label for="course">Course Name :</label> */}
            <select name="Course Name" id="course" onChange={(e) => handelOnChangeCourse(e)}>
              <option value="">Select Course</option>
              {courseList.map((name, index) => (
                <option key={index} value={index}>
                  {name}
                </option>
              ))}
            </select>
            {/* ------------------------Subject selector ----------------- */}
            {/* <label for="course">Subject Name :</label> */}
            <select name="Subject Name" id="subject" onChange={(e) => handelOnChangeSubject(e)}>
              <option value="">Select Subject</option>
              {subjectList.map((name, index) => (
                <option key={index} value={index}>
                  {name}
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
