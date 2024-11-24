import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';
import StudentService from '../../Service/Student.Service';

const Home = () => {
  const [studentList, setStudentList] = useState([]);
  const [displayedStudents, setDisplayedStudents] = useState([]);
  const [suggestedStudents, setSuggestedStudents] = useState([]);
  const [msg, setMsg] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("studentName");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    fetchAllStudents();
  }, []);

  const fetchAllStudents = () => {
    StudentService.getAllStudents()
      .then((res) => {
        const sortedData = res.data.sort((a, b) => {
          if (a.block === b.block) {
            return a.roomNo - b.roomNo;
          }
          return a.block.localeCompare(b.block);
        });
        setStudentList(sortedData);
        setDisplayedStudents(sortedData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteStudent = (id, studentName) => {
    const confirmationName = window.prompt("Please type the student's name to confirm deletion:");
  
    if (confirmationName && confirmationName.trim().toLowerCase() === studentName.toLowerCase()) {
      StudentService.deleteStudent(id)
        .then(() => {
          setMsg("Student data deleted successfully!");
          setTimeout(() => setMsg(""), 2000);

          const updatedList = studentList.filter((student) => student.id !== id);
          setStudentList(updatedList);
          setDisplayedStudents(updatedList);
        })
        .catch((error) => {
          console.error("Delete Error:", error);
          setMsg("Failed to delete student. Please try again.");
        });
    } else {
      setMsg("Deletion canceled. Name did not match.");
      setTimeout(() => setMsg(""), 2000);
    }
  };
  
  const debouncedSearch = debounce((term) => {
    if (term.trim() === "") {
      setSuggestedStudents([]);
      setDisplayedStudents(studentList);
      return;
    }

    const searchMethod = searchType === "studentName"
      ? StudentService.searchStudentByName
      : StudentService.searchStudentByRoomNo;

    searchMethod(term)
      .then((res) => {
        const sortedData = res.data.sort((a, b) => {
          if (a.block === b.block) {
            return a.roomNo - b.roomNo;
          }
          return a.block.localeCompare(b.block);
        });
        setSuggestedStudents(sortedData);
        setDisplayedStudents(sortedData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, 300);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      debouncedSearch(searchTerm);
    }
  };

  const paginate = (students) => {
    const start = (currentPage - 1) * itemsPerPage;
    return students.slice(start, start + itemsPerPage);
  };

  const handlePageChange = (page) => setCurrentPage(page);

  const totalPages = Math.ceil(displayedStudents.length / itemsPerPage);

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:justify-between justify-center items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">All Students List</h1>
        {msg && <p className="text-green-600 font-medium mt-2 sm:mt-0">{msg}</p>}
      </div>

      <div className="flex flex-col sm:flex-row mb-6 space-y-4 sm:space-y-0 sm:space-x-4 overflow-hidden">
        <select 
          className="border border-gray-300 rounded p-2 transition-all duration-300 hover:border-blue-500 overflow-hidden"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option className='overflow-hidden' value="studentName">Search by Name</option>
          <option className='overflow-hidden' value="roomNo">Search by Room</option>
        </select>
        <input
          type="text"
          className="border border-gray-300 rounded p-2 flex-grow transition-all duration-300 hover:border-blue-500"
          placeholder={`Enter ${searchType === "studentName" ? "student name" : "room number"} to search`}
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={handleKeyPress}
        />
        <button
          className="bg-blue-500 text-white rounded px-4 py-2 transition-transform duration-200 hover:scale-105"
          onClick={() => debouncedSearch(searchTerm)}
        >
          Search
        </button>
      </div>

      {searchTerm && suggestedStudents.length > 0 && (
        <ul className="bg-white border border-gray-300 rounded shadow-lg max-h-40 overflow-y-auto">
          {suggestedStudents.map((student) => (
            <li
              key={student.id}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => {
                setSearchTerm(student.studentName);
                debouncedSearch(student.studentName);
              }}
            >
              {student.studentName} - Block {student.block}
            </li>
          ))}
        </ul>
      )}

<div className="overflow-auto hidden md:block">
  <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
    <thead className="bg-blue-600 text-white">
      <tr>
        <th className="p-3 border text-center font-semibold">#</th>
        <th className="p-3 border text-center font-semibold">Student Name</th>
        <th className="p-3 border text-center font-semibold">Block</th>
        <th className="p-3 border text-center font-semibold">Room No</th>
        <th className="p-3 border text-center font-semibold">Status</th>
        <th className="p-3 border text-center font-semibold">Actions</th>
      </tr>
    </thead>
    <tbody>
      {paginate(displayedStudents).map((student, index) => (
        <tr
          key={student.id}
          className={`${
            index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50'
          } border transition-all duration-300 hover:bg-gray-200 transform hover:scale-105`}
        >
          <td className="p-3 text-center">{(currentPage - 1) * itemsPerPage + index + 1}</td>
          <td className="p-3 text-center">{student.studentName}</td>
          <td className="p-3 text-center">{student.block}</td>
          <td className="p-3 text-center">{student.roomNo}</td>
          <td
            className='p-3 text-center' >{student.status} </td>
          <td className="p-3 text-center">
            <Link
              to={`/editStudent/${student.id}`}
              className="text-blue-500 hover:underline transition-all duration-300"
            >
              Edit
            </Link>
            <button
                   onClick={() => deleteStudent(student.id, student.studentName)}
                className="ml-2 text-red-500 hover:underline transition-all duration-300"
              >
                    Delete
                 </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      <div className="md:hidden space-y-6 flex flex-col items-center">
        {paginate(displayedStudents).map((student, index) => (
          <div key={student.id} className="bg-gradient-to-r from-blue-100 to-purple-200 shadow-lg rounded-xl p-5 w-full max-w-md transition-transform duration-300 hover:shadow-xl transform hover:scale-105">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">
                  <span className="mr-2">#{(currentPage - 1) * itemsPerPage + index + 1}</span>
                  <span className="text-gray-800">{student.studentName}</span>
                </h3>
                <span className="material-icons text-blue-600">person</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-gray-700">
                <p className="flex items-center">
                  <span className="material-icons text-green-500 mr-2">location_city</span>
                  <strong>Block:&nbsp;&nbsp;</strong> {student.block}
                </p>
                <p className="flex items-center">
                  <span className="material-icons text-purple-500 mr-2">meeting_room</span>
                  <strong>Room No: &nbsp;&nbsp;</strong> {student.roomNo}
                </p>
                <p className="col-span-2 flex items-center">
                  <span className="material-icons text-yellow-500 mr-2">info</span>
                  <strong>Status:&nbsp;&nbsp;</strong> {student.status}
                </p>
              </div>
              <div className="flex justify-between mt-4">
                <Link to={`/editStudent/${student.id}`} className="flex items-center text-blue-600 hover:text-blue-800 transition-all">
                  <span className="material-icons mr-1">edit</span> Edit
                </Link>
                

                <button
  onClick={() => deleteStudent(student.id, student.studentName)}
  className="flex items-center text-red-600 hover:text-red-800 transition-all"
>
<span className="material-icons mr-1">delete</span> Delete
</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`mx-1 px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'} transition-all duration-300`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
