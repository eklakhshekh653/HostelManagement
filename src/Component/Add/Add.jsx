import React, { useState } from 'react';
import StudentService from '../../Service/Student.Service';
import { useParams } from 'react-router-dom';

const AddStudent = () => {
  const [student, setStudent] = useState({
    studentName: "",
    block: "",
    roomNo: "",
    status: ""
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setStudent({ ...student, [e.target.name]: value });
  };

  const StudentRegister = (e) => {  
    e.preventDefault();
    StudentService.saveStudent(student)  
      .then((res) => {
        setMsg("Student Added Successfully");
        setStudent({
          studentName: "",
          block: "",
          roomNo: "",
          status: ""
        });
      })
      .catch((error) => {
        console.error("There was an error adding the student!", error);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-lg p-10">
        <h2 className="text-2xl font-semibold text-blue-800 text-center mb-8">Add Student</h2>
        {msg && <p className="font-semibold text-green-500 text-center mb-6">{msg}</p>}
        <form className="space-y-6" onSubmit={StudentRegister}>
          <div>
            <label htmlFor="studentName" className="block text-sm font-medium text-gray-700">Student Name</label>
            <input
              type="text"
              name="studentName"
              required
              id="studentName"
              onChange={handleChange}
              value={student.studentName}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter student name"
            />
          </div>

          <div>
            <label htmlFor="block" className="block text-sm font-medium text-gray-700">Block</label>
            <input
              type="text"
              name="block"
              required
              id="block"
              onChange={handleChange}
              value={student.block}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter block"
            />
          </div>

          <div>
            <label htmlFor="roomNo" className="block text-sm font-medium text-gray-700">Room No</label>
            <input
              type="text"
              name="roomNo"
              required
              id="roomNo"
              onChange={handleChange}
              value={student.roomNo}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter room number"
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
            <input
              type="text"
              name="status"
              required
              id="status"
              onChange={handleChange}
              value={student.status}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter status"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full md:w-auto inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
