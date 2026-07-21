
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';


function Courses(){
    const location = useLocation()
    const [allCourses, setAllCourses] = useState([])

    useEffect(()=>{
        const fetchCourses = async ()=>{
            try{
                const response = await axios.get('http://localhost:8000/api/courses/')
                setAllCourses(response.data.courses)
            }catch(error){
                console.log(error)
            }
        };
        fetchCourses();
    }, [location.pathname])

    function noOfStudents() {
        let n = 0;
        allCourses.forEach(course => {
            n += Number(course.Student);
        });
        console.log(n);
        return n;
    }

    return (
        <>
            <div className="lec-shell">
                <Navbar expand="lg" className="lec-navbar bg-body-tertiary">
                    <Container fluid>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className="me-auto my-2 my-lg-0 w-100 d-flex justify-content-between"
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                            >
                                <Form className="lec-search-form d-flex position-relative">
                                    <i className="bi bi-search position-absolute" style={{ left: '14px', top: '50%', transform: 'translateY(-50%)' }}></i>
                                    <Form.Control
                                    type="search"
                                    placeholder="Search Courses..."
                                    className="lec-search-input me-2 border-0"
                                    aria-label="Search"
                                    />
                                    <Button variant="outline-primary" className="lec-search-btn">Search</Button>
                                </Form>

                                <Link to='./add' variant="outline-primary" className='lec-add-btn text-decoration-none btn btn-secondary'>
                                    <i className='bi-journal-bookmark-fill'></i>
                                    Add Course
                                </Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <div className='p-3'>
                    <p className='text-muted fw-bold'>ACADEMIC PORTFOLIO</p>
                    <h1 className='fw-bold'>Courses</h1>
                    
                    <div className="row mt-5 gap-2">
                        <div className="col-lg-5 bg-white p-4 rounded-4" style={{border: '1px solid rgba(11, 28, 48, 0.25)'}}>
                            <p className='text-muted fw-bold'>TOTAL COURSES</p>
                            <p className='fs-1'>{allCourses.length}</p>
                        </div>
                        <div className="col-lg-5 bg-white p-4 rounded-4" style={{border: '1px solid rgba(11, 28, 48, 0.25)'}}>
                            <p className='text-muted fw-bold'>TOTAL ENROLLMENT</p>
                            <p className='fs-1'>{noOfStudents()}</p>
                        </div>
                    </div>

                    {/* the courses */}
                    {allCourses.map((course)=>{
                        return (
                            <div className="p-4 rounded-3 bg-white mt-3 shadow" style={{color: '#0b1c30', border: '1px solid rgba(11, 28, 48, 0.25)'}} key={course.id}>
                                <div className="d-flex justify-content-between border-bottom p-2">
                                    <div className="">
                                        <p className='p-2 rounded-2 text-white fw-bold' style={{backgroundColor: '#0b1c30', width: 'fit-content'}}>{course.Course_code}</p>
                                        <h2 className='fw-bold'>{course.Course_title}</h2>
                                    </div>
                                    <div className="">
                                        <p className='p-2 rounded-5 fw-bold' style={{backgroundColor: '#ffb873', width: 'fit-content', color: '#6a3b00'}}>{course.level_Name} Level</p>
                                    </div>
                                </div>
                                <div className="mt-2 d-flex justify-content-between">
                                    <p className='fs-4 text-muted'>
                                        <i className='bi bi-person-fill fs-3 me-2'></i>
                                        {course.lecturer_Name}
                                    </p>
                                    <p className='fs-4 text-muted'>
                                        <i className='bi bi-people-fill fs-3 me-2'></i>
                                        {course.Student} students
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Courses