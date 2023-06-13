import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import TeacherLogin from './pages/TeacherLogin';
import StudentLogin from './pages/StudentLogin';
import TeacherHome from './pages/TeacherHome';
import StudentHome from './pages/StudentHome';

function App() {
  return (
    <div className="h-full w-full">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teacher/login" element={<TeacherLogin />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/teacher/home" element={<TeacherHome />} />
        <Route path="/student/home/:id" element={<StudentHome />} />
        </Routes>
  
    </div>
  );
}

export default App;
