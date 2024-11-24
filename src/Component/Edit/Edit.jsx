import React, { useEffect, useState } from 'react'; 
import StudentService from '../../Service/Student.Service';
import { useNavigate, useParams } from 'react-router-dom';

const EditStudent = () => {
  const [student, setStudent] = useState({
    id: "",
    studentName: "",
    block: "",
    roomNo: "",
    status: ""
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (id) {
      StudentService.getStudentById(id)  
        .then((res) => {
          setStudent(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const value = e.target.value;
    setStudent({ ...student, [e.target.name]: value });
  };

  const StudentUpdate = (e) => { 
    e.preventDefault();
    StudentService.editStudent(student) 
      .then((res) => {
        setMsg("Student updated successfully!");
        setTimeout(() => navigate("/"), 2000); 
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-xl p-10">
        <h2 className="text-2xl font-semibold text-blue-800 text-center mb-8">Update Student</h2>
        {msg && <p className="font-semibold text-green-500 text-center mb-6">{msg}</p>}
        <form className="space-y-6" onSubmit={StudentUpdate}>
          <div>
            <label htmlFor="studentName" className="block text-sm font-medium text-gray-700">Student Name</label>
            <input
              type="text"
              name="studentName"
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
              id="block"
              onChange={handleChange}
              value={student.block}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter student block"
            />
          </div>

          <div>
            <label htmlFor="roomNo" className="block text-sm font-medium text-gray-700">Room No</label>
            <input
              type="text"
              name="roomNo"
              id="roomNo"
              onChange={handleChange}
              value={student.roomNo}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter Student Room No"
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
            <input
              type="text"
              name="status"
              id="status"
              onChange={handleChange}
              value={student.status}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter student status"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full md:w-auto inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Update Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStudent;
