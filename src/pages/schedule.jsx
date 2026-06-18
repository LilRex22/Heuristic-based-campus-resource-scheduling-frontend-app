
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import Button from 'react-bootstrap/Button';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';



function Schedule() {
    const location = useLocation();
    // all available courses in the backend
    const [availableCourses, setAvailableCourses] = useState([]);
    // courses clicked from the Dropdown
    const [selectedCourses, setSelectedCourses] = useState([]);

    const [availableLecturers, setAvailableLecturers] = useState([]);
    const [selectedLecturers, setSelectedLecturers] = useState([]);

    // convert the available courses object to a list acceptable by the react-select component 
    const options = availableCourses.map((course)=>({ value: course.id, label: course.Course_code}));
    console.log(options)

    const optionsLecturers = availableLecturers.map((lecturer)=>({ value: lecturer.id, label: lecturer.Name, dept: lecturer.Department, avail: lecturer.Available }));
    console.log(optionsLecturers)

    
    // for selecting courses
    const handleCourseSelect = (selectedOption) => {
      if (!selectedOption) return; // cleared or nothing selected
        const courseId = Number(selectedOption.value);
        const selectedCourse = availableCourses.find(c => c.id === courseId);
        if (!selectedCourse) return;

        if (selectedCourses.some(c => c.id === courseId)) {
            alert('Course already selected');
        return;
        }

        setSelectedCourses(prev => [...prev, selectedCourse]);
    };

    // for selecting lecturers
    const handleLecturerSelect = (selectedOption) => {
      if (!selectedOption) return; // cleared or nothing selected
        const lecturerId = Number(selectedOption.value);
        const selectedLecturer = availableLecturers.find(l => l.id === lecturerId);
        if (!selectedLecturer) return;

        if (selectedLecturers.some(l => l.id === lecturerId)) {
            alert('Lecturer already selected');
        return;
        }

        setSelectedLecturers(prev => [...prev, selectedLecturer]);
    };

    // fetch the courses
    useEffect(() => {
        const fetchCourses = async () => {
        try {
                const response = await axios.get('http://localhost:8000/api/courses/');
                console.log(response.data)
                setAvailableCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        fetchCourses();
    }, [location.pathname]);


    // fetch the lecturers
    useEffect(() => {
        const fetchLecturers = async () => {
        try {
                const response = await axios.get('http://localhost:8000/api/lecturers/');
                console.log(response.data)
                setAvailableLecturers(response.data);
            } catch (error) {
                console.error('Error fetching lecturers:', error);
            }
        };
        fetchLecturers();
    }, [location.pathname]);

    console.log(availableLecturers)

    const details = [
        { No: '1', Name: 'Courses'},
        { No: '2', Name: 'Lecturers'},
        { No: '3', Name: 'Classrooms'},
        { No: '4', Name: 'Time Slots'},
        { No: '5', Name: 'Constraints'},
        { No: '6', Name: 'Review & Generate'}
    ]


    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0 d-flex justify-content-between w-100 pb-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <div className="d-flex gap-2 align-items-center">
                                <img width="48" height="48" src="https://img.icons8.com/badges/48/appointment-scheduling.png" alt="appointment-scheduling"/>
                                <h5 className='mt-2' style={{color: '#005bbf'}}>Sche<span className='text-dark'>dule</span></h5>
                            </div>
                            
                            <div className="d-flex gap-2 mt-1 me-3 align-items-center h-50">
                                <Link className='text-dark'>
                                    <i className='bi bi-bell fs-3 me-3'></i>
                                </Link>
                                <div className="rounded-circle p-1 text-white fs-3 text-center" style={{backgroundColor: '#0b1c30', width: '40px', height: '40px'}}>
                                    <i className='bi bi-person-fill d-block' style={{fontSize: '1.5rem', marginTop: '-2px'}}></i>
                                </div>
                                <div className="" style={{height: '50px'}}>
                                    <h5>Rex</h5>
                                    <p className='text-muted' style={{marginTop: '-8px'}}>Admin</p>
                                </div>
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className='p-3 mt-3'>
                <div className="row justify-content-between">
                    <div className="col-lg-5" style={{fontColor: '#0b1c30'}}>
                        <h1 className='fw-bold'>Schedule Data Setup</h1>
                        <p className='text-muted fw-bold' style={{fontSize: '13px'}}>ENTER AND MANAGE ALL DATA REQUIRED FOR TIMETABLE GENERATION.</p>
                    </div>
                
                    <div className="col-lg-6 d-flex gap-2 justify-content-lg-end ">
                        <div className="bg-white p-3 rounded-3 shadow text-muted" style={{border: '1px solid rgba(11, 28, 48, 0.25)'}}>
                            <small>Semester</small><br />
                            <p className='text-muted fw-bold mt-3'>
                                <i className='bi bi-calendar-range me-2'></i>
                                First Semester 2025/2026
                            </p>
                        </div>
                        
                        <div className="bg-white p-3 rounded-3 shadow text-muted" style={{border: '1px solid rgba(11, 28, 48, 0.25)'}}>
                            <small>Department</small><br />
                            <p className='text-muted fw-bold mt-3'>
                                <i className='bi bi-house-fill me-2'></i>
                                Computer Science
                            </p>
                        </div>
                    </div>
                </div>

                {/* the progress bar stuff abi wetin */}
                <div className="mt-5">
                    <div className="row">
                        {
                            details.map((detail) => {
                                return (
                                    <div className="col-lg-4 d-flex align-items-center justify-content-between" key={detail.No}>
                                        <div className="rounded-circle d-flex justify-content-center align-items-center text-center" style={{backgroundColor: '#c4c7c9', width: '40px', height: '40px'}}>
                                            {detail.No}
                                        </div>
                                        <p className='text-muted fw-bold mt-3'>{detail.Name}</p>
                                        <div className="mt-1" style={{width: '150px', height: '2px', backgroundColor: '#c4c7c9'}}></div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>


                {/* main content */}
                <div className="row mt-5">
                    <div className="col-lg-6">
                        <div className="d-flex justify-content-between align-items-center">
                            <h3>1. Courses</h3>
                            <Select
                                options={options}
                                placeholder="Search and Select a Course"
                                onChange={handleCourseSelect}
                                >
                            </Select>
                        </div>
                        <table className="table table-hover align-middle mt-2 ">
                            <thead>
                                <tr>
                                    <th className='text-muted'>Code</th>
                                    <th className='text-muted'>Course Title</th>
                                    <th className='text-muted'>Level</th>
                                    <th className='text-muted'>Credits</th>
                                    <th className='text-muted'>Students</th>
                                    <th className='text-muted'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedCourses.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="text-center text-muted py-4"
                                        >
                                            No courses selected
                                        </td>
                                    </tr>
                                ) : (
                                    selectedCourses.map(course => (
                                        <tr key={course.id}>
                                            <td>
                                                {course.Course_code}
                                            </td>
                                            <td>
                                                {course.Course_title}
                                            </td>
                                            <td>
                                                {course.Level}
                                            </td>
                                            <td>
                                                {course.Credit}
                                            </td>
                                            <td>
                                                {course.Student}
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    // onClick={() =>
                                                    //     removeCourse(course.id)
                                                    // }
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>


                    <div className="col-lg-6">
                        <div className="d-flex justify-content-between align-items-center">
                            <h3>2. Lecturers</h3>
                            <Select
                                options={optionsLecturers}
                                placeholder="Search and Select a Lecturer"
                                onChange={handleLecturerSelect}
                                >
                            </Select>
                        </div>
                        <table className="table table-hover align-middle mt-2 ">
                            <thead>
                                <tr>
                                    <th className='text-muted'>Name</th>
                                    <th className='text-muted'>Department</th>
                                    <th className='text-muted'>Available</th>
                                    <th className='text-muted'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedLecturers.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="4"
                                            className="text-center text-muted py-4"
                                        >
                                            No lecturers selected
                                        </td>
                                    </tr>
                                ) : (
                                    selectedLecturers.map(lecturer => (
                                        <tr key={lecturer.id}>
                                            <td>{lecturer.Name}</td>
                                            <td>{lecturer.Department}</td>
                                            <td>{String(lecturer.Available)}</td>
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    // onClick={() => removeLecturer(lecturer.id)}
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Schedule;