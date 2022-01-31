import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import FirstPage from './pages/FirstPage';

import './App.scss';
import UsersDashboard from './pages/Student/Dashboard';
import AddCourse from './pages/Student/AddCourses';
import Setting from './pages/Student/Setting';

import AdminDashboard from './pages/Admin/Dashboard';
import AdminTeachers from './pages/Admin/Teachers';
import AdminCourses from './pages/Admin/Courses';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users/dashboard" element={<UsersDashboard />} />
        <Route path="/users/add-course" element={<AddCourse />} />
        <Route path="/users/setting" element={<Setting />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/teacher" element={<AdminTeachers />} />
        <Route path="/admin/course" element={<AdminCourses />} />
      </Routes>
    </Router>
  );
}
