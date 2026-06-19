
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

    const [availableClassrooms, setAvailableClassrooms] = useState([]);
    const [selectedClassrooms, setSelectedClassrooms] = useState([]);

    const [availableTimeslots, setAvailableTimeslots] = useState([])
    const [selectedTimeslots, setSelectedTimeslots] = useState([])

    // convert the available objects to a list acceptable by the react-select component 
    const options = availableCourses.map((course)=>({ value: course.id, label: course.Course_code}));

    const optionsLecturers = availableLecturers.map((lecturer)=>({ value: lecturer.id, label: lecturer.Name, dept: lecturer.Department, avail: lecturer.Available }));

    const optionsClassrooms = availableClassrooms.map((classroom)=>({ value: classroom.id, label: classroom.Name, capacity: classroom.Capacity, type: classroom.Type, avail: classroom.Available }));

    const optionsTimeslots = availableTimeslots.map((timeslot)=>({ value: timeslot.id, label: timeslot.Day, start: timeslot.Start_time, end: timeslot.End_time, duration: timeslot.Duration}))

    
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

    // for removing courses
    const removeCourse = (id) => {
    setSelectedCourses(prev =>
        prev.filter(course => course.id !== id)
    );

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

    // for removing lecturers
    const removeLecturer = (id) => {
        setSelectedLecturers(prev =>
            prev.filter(lecture => lecture.id !== id)
        );
    };


    // for selecting classrooms
    const handleClassroomSelect = (selectedOption) => {
      if (!selectedOption) return; // cleared or nothing selected
        const classroomId = Number(selectedOption.value);
        const selectedClassroom = availableClassrooms.find(c => c.id === classroomId);
        if (!selectedClassroom) return;

        if (selectedClassrooms.some(c => c.id === classroomId)) {
            alert('Classroom already selected');
        return;
        }

        setSelectedClassrooms(prev => [...prev, selectedClassroom]);
    };

    // for removing classrooms
    const removeClassrooms = (id) => {
        setSelectedClassrooms(prev =>
            prev.filter(classroom => classroom.id !== id)
        );
    };  


    // for selecting timeslots
    const handleTimeslotSelect = (selectedOption) => {
      if (!selectedOption) return; // cleared or nothing selected
        const timeslotId = Number(selectedOption.value);
        const selectedTimeslot = availableTimeslots.find(t => t.id === timeslotId);
        if (!selectedTimeslot) return;

        if (selectedTimeslots.some(t => t.id === timeslotId)) {
            alert('Timeslot already selected');
        return;
        }

        setSelectedTimeslots(prev => [...prev, selectedTimeslot]);
    };

    // for removing timeslots
    const removeTimeslots = (id) => {
        setSelectedTimeslots(prev =>
            prev.filter(timeslot => timeslot.id !== id)
        );
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


    // fetch the timeslots
    useEffect(() => {
        const fetchTimeslots = async () => {
        try {
                const response = await axios.get('http://localhost:8000/api/timeslots/');
                console.log(response.data)
                setAvailableTimeslots(response.data);
            } catch (error) {
                console.error('Error fetching timeslots:', error);
            }
        };
        fetchTimeslots();
    }, [location.pathname]);
    console.log(availableTimeslots)

    // fetch the classrooms
    useEffect(() => {
        const fetchClassrooms = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/classrooms/');
                console.log(response.data)
                setAvailableClassrooms(response.data);
            } catch (error) {
                console.error('Error fetching classrooms:', error);
            }
        };
        fetchClassrooms();
    }, [location.pathname]);


    // keep track of which step has been opened
    const [visitedSteps, setVisitedSteps] = useState([]);
    const markVisited = (id) => {
        setVisitedSteps(prev => (prev.includes(id) ? prev : [...prev, id]));
        console.log('step visited:', id)
    }

    const details = [
        { No: '1', Name: 'Courses', id: 'pg1', Description: 'Step One: Click on the Select a Course button, from the list of available courses, select the courses to be scheduled for. Each selected course appear on the table where they can be deleted when necessary.'},
        { No: '2', Name: 'Lecturers', id: 'pg2', Description: 'Step Two: Click on the Select a Lecturer button, from the list of available lecturers, select the lecturer to be assigned to a schedule. Each selected lecturer appear on the table where they can be deleted when necessary.'},
        { No: '3', Name: 'Classrooms', id: 'pg3', Description: 'Step Three: Click on the Select a Classroom button, from the list of available classrooms, select the classrooms to used. Each selected classroom appear on the table where they can be deleted when necessary.'},
        { No: '4', Name: 'Time Slots', id: 'pg4', Description: 'Step Four: Click on the Select a Timeslot button, from the list of available timeslots, select the timeslot to be scheduled for. Each selected timeslot appear on the table where they can be deleted when necessary.'},
        { No: '5', Name: 'Review & Generate', id: 'pg5', Description: 'Step Five: Click on the Generate button to apply the heuristic algorithm on the set constraints to create an optimized schedule.'}
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
                                    <div className="col-lg-4" key={detail.No}>
                                        <div className=" d-flex align-items-center justify-content-between" id={detail.id} >
                                            <div className="rounded-circle d-flex justify-content-center align-items-center text-center" style={{backgroundColor: visitedSteps.includes(detail.id) ? '#64a2ff' : 'grey', color: 'white', width: '40px', height: '40px'}}>
                                                {detail.No}
                                            </div>
                                            <div className="">
                                                <p className='fw-bold mt-3' style={{color: visitedSteps.includes(detail.id) ? '#64a2ff' : 'grey'}}>{detail.Name}</p>
                                            </div>
                                            <div className="mt-1" style={{width: '150px', height: '2px', backgroundColor: visitedSteps.includes(detail.id) ? '#64a2ff' : 'grey'}}></div>
                                        </div>
                                        <div className="">
                                            <p className='' style={{color: visitedSteps.includes(detail.id) ? '#64a2ff' : 'grey'}}>{detail.Description}</p>
                                        </div>
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
                            <h3 style={{color: '#2c72d9'}}>1. Courses</h3>
                            <Select
                                onMenuOpen={() => markVisited('pg1')}
                                openMenuOnFocus={() => markVisited('pg1')}
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
                                                    onClick={() =>
                                                        removeCourse(course.id)
                                                    }
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
                            <h3 style={{color: '#2c72d9'}}>2. Lecturers</h3>
                            <Select
                                onMenuOpen={() => markVisited('pg2')}
                                openMenuOnFocus={() => markVisited('pg2')}
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
                                                    onClick={() => removeLecturer(lecturer.id)}
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

                    <div className="col-lg-6 mt-5">
                        <div className="d-flex justify-content-between align-items-center">
                            <h3 style={{color: '#2c72d9'}}>3. Classrooms</h3>
                            <Select
                                onMenuOpen={() => markVisited('pg3')}
                                openMenuOnFocus={() => markVisited('pg3')}
                                options={optionsClassrooms}
                                placeholder="Search and Select a Classroom"
                                onChange={handleClassroomSelect}
                            >
                            </Select>
                        </div>
                        <table className="table table-hover align-middle mt-2 ">
                            <thead>
                                <tr>
                                    <th className='text-muted'>Room Name</th>
                                    <th className='text-muted'>Type</th>
                                    <th className='text-muted'>Capacity</th>
                                    <th className='text-muted'>Location</th>
                                    <th className='text-muted'>Available</th>
                                    <th className='text-muted'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedClassrooms.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="text-center text-muted py-4"
                                        >
                                            No classrooms selected
                                        </td>
                                    </tr>
                                ) : (
                                    selectedClassrooms.map(classroom => (
                                        <tr key={classroom.id}>
                                            <td>{classroom.Name}</td>
                                            <td>{classroom.Type}</td>
                                            <td>{String(classroom.Capacity)}</td>
                                            <td>{classroom.Location}</td>
                                            <td>{String(classroom.Available) ? <i className="bi bi-check-circle-fill text-success"></i> : <i className="bi bi-x-circle-fill text-danger"></i>}</td>
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => removeClassrooms(classroom.id)}
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


                    <div className="col-lg-6 mt-5">
                        <div className="d-flex justify-content-between align-items-center">
                            <h3 style={{color: '#2c72d9'}}>4. Timeslots</h3>
                            <Select
                                onMenuOpen={() => markVisited('pg4')}
                                openMenuOnFocus={() => markVisited('pg4')}
                                options={optionsTimeslots}
                                placeholder="Search and Select a Classroom"
                                onChange={handleTimeslotSelect}
                            >
                            </Select>
                        </div>
                        <table className="table table-hover align-middle mt-2 ">
                            <thead>
                                <tr>
                                    <th className='text-muted'>Day</th>
                                    <th className='text-muted'>Start</th>
                                    <th className='text-muted'>End</th>
                                    <th className='text-muted'>Duration</th>
                                    <th className='text-muted'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedTimeslots.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="text-center text-muted py-4"
                                        >
                                            No timeslot selected
                                        </td>
                                    </tr>
                                ) : (
                                    selectedTimeslots.map(timeslot => (
                                        <tr key={timeslot.id}>
                                            <td>{timeslot.Day}</td>
                                            <td>{timeslot.Start_time}</td>
                                            <td>{String(timeslot.End_time)}</td>
                                            <td>{timeslot.Duration[1]} hr{'(s)'}</td>
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => removeTimeslots(timeslot.id)}
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


                    <div className="p-3 d-flex mt-3 form-control justify-content-center">
                        <button 
                        className='btn btn-primary fw-bold'
                        onClick={() => markVisited('pg5')}>Generate Schedule</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Schedule;