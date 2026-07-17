// import React from 'react'
import ReactDOM from 'react-dom/client';
// import NavigationBar  from './components/navbar';
import Home from './pages/home';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from './components/layout';
import './components/app.css'; 
import Login from './pages/login';
import SignUp from './pages/signup';
import Dashboard from './pages/dashboard';
import Lecturers from './pages/Lecturers';
import Classrooms from './pages/classrooms';
import Courses from './pages/courses';
import Schedule from './pages/Schedule';
import AddLecturers from './pages/add_lecturers';
import DashboardLayout from './components/dashboardLayout';
import AddClassrooms from './pages/add_classrooms';
import AddCourses from './pages/add_courses';
// our custom css file


function App() {
  return (
      <BrowserRouter>
        <Routes>
          {/* note that child routes do not start with '/' because they are relative to the parent route; if we start with '/', it becomes an absolute path and will not be nested under the parent route */}
            {/* this is the whole page layout, the dashboard is excluded because it has its own layout (sidebar + navbar) */}
            <Route path='/' element={<Layout/>}>
              <Route index element={<Home />} />
            </Route>
            <Route  path='login' element={<Login/> } />
            <Route path='/signup' element={<SignUp/>} />
        
            {/* dashboard uses its own layout (sidebar + navbar) */}
            <Route path="dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path='lecturers' element={<Lecturers />} />
              <Route path='lecturers/add' element={<AddLecturers />}/>
              <Route path='classrooms/add' element={<AddClassrooms />}/>
              <Route path='courses/add' element={<AddCourses />}/>
              <Route path='classrooms' element={<Classrooms />} />
              <Route path='courses' element={<Courses />} />
              <Route path='schedule' element={<Schedule />} />
            </Route>

        </Routes>
      </BrowserRouter>
  )
}

export default App
ReactDOM.createRoot(document.getElementById('root')).render(<App />);