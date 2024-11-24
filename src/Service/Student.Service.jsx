import axios from "axios";

const API_URL = "http://localhost:8080/students";

class StudentService {

    saveStudent(student) {
        return axios.post(API_URL, student);
    }

    getAllStudents() {
        return axios.get(API_URL);
    }

    getStudentById(id) {
        return axios.get(`${API_URL}/${id}`);
    }

    deleteStudent(id) {
        return axios.delete(`${API_URL}/deleteStudent/${id}`);
    }

    editStudent(student) {
        return axios.put(`${API_URL}/${student.id}`, student);
    }
    searchStudentByName(studentName) {
        return axios.get(`${API_URL}/searchByName`, { params: { studentName } });
    }


    searchStudentByRoomNo(roomNo) {
        return axios.get(`${API_URL}/searchByRoomNo`, { params: { roomNo } });
    }
}

export default new StudentService();
