import React from "react";
import Navbar from "../navbar/Navbar,";

const Dashboard = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="select_tags">
        {/* ------------------------Course selector ----------------- */}

        <select name="Course Name" id="course">
          <option>Select Course</option>
        </select>
        {/* ------------------------Subject selector ----------------- */}

        <select name="Subject Name" id="subject">
          <option>Select Subject</option>
        </select>
        <select name="Subject Name" id="subject">
          <option>Select Date</option>
        </select>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Roll Number</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>21413412353</td>
              <td>suraj mitr</td>
            </tr>
            <tr>
              <td>21413412353</td>
              <td>suraj mitr</td>
            </tr>
            <tr>
              <td>21413412353</td>
              <td>suraj mitr</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
