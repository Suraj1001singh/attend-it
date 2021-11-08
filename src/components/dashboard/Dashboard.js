import React from "react";
import Navbar from "../navbar/Navbar,";
import XLSX from "xlsx";
const colorData = [
  {
    color: "red",
    value: "#f00",
  },
  {
    color: "green",
    value: "#0f0",
  },
  {
    color: "blue",
    value: "#00f",
  },
  {
    color: "cyan",
    value: "#0ff",
  },
  {
    color: "magenta",
    value: "#f0f",
  },
  {
    color: "yellow",
    value: "#ff0",
  },
  {
    color: "black",
    value: "#000",
  },
];
const Dashboard = () => {
  const downloadExcel = () => {
    const newData = colorData.map((row) => {
      delete row.tableData;
      return row;
    });
    const workSheet = XLSX.utils.json_to_sheet(newData);
    const workBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workBook,
      workSheet,
      "student attendance record"
    );

    //buffer
    let buffer = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    //binary string
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    //download
    XLSX.writeFile(workBook, "AttendanceData.xlsx");
  };
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
        <button onClick={downloadExcel}>click to export</button>
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
