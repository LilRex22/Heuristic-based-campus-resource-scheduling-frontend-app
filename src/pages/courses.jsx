
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';


function Courses(){
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0 d-flex justify-content-between w-100"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Form className="d-flex position-relative">
                                <i className="bi bi-search position-absolute" style={{ left: '10px', top: '50%', transform: 'translateY(-50%)' }}></i>
                                <Form.Control
                                type="search"
                                placeholder="Search Classrooms..."
                                className=" me-2 border-0"
                                aria-label="Search"
                                style={{backgroundColor: '#EDF0FF',borderRadius: '20px', width: '300px', paddingLeft: '35px'}}
                                />
                                <Button variant="outline-primary" style={{borderRadius: '20px', backgroundColor: '#4F8EF7', border: '0px', color: 'white'}}>Search</Button>
                            </Form>

                            <Link variant="outline-primary" className='text-decoration-none btn btn-secondary' style={{borderRadius: '20px', backgroundColor: '#0b1c30', border: '0px', color: 'white', marginLeft: '10px'}}>+ 
                                <i className='bi bi-book-fill me-2 ms-1'></i>
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
                        <p className='fs-1'>0</p>
                    </div>
                    <div className="col-lg-5 bg-white p-4 rounded-4" style={{border: '1px solid rgba(11, 28, 48, 0.25)'}}>
                        <p className='text-muted fw-bold'>TOTAL ENROLLMENT</p>
                        <p className='fs-1'>0</p>
                    </div>
                </div>

                {/* the courses */}
                <div className="p-4 rounded-3 bg-white mt-5 shadow" style={{color: '#0b1c30', border: '1px solid rgba(11, 28, 48, 0.25)'}}>
                    <div className="d-flex justify-content-between border-bottom p-2">
                        <div className="">
                            <p className='p-2 rounded-2 text-white fw-bold' style={{backgroundColor: '#0b1c30', width: 'fit-content'}}>CSC401</p>
                            <h2 className='fw-bold'>Data Structures</h2>
                        </div>
                        <div className="">
                            <p className='p-2 rounded-5 fw-bold' style={{backgroundColor: '#ffb873', width: 'fit-content', color: '#6a3b00'}}>400 Level</p>
                        </div>
                    </div>
                    <div className="mt-2 d-flex justify-content-between">
                        <p className='fs-4 text-muted'>
                            <i className='bi bi-person-fill fs-3 me-2'></i>
                            Dr. Alan Turing
                        </p>
                        <p className='fs-4 text-muted'>
                            <i className='bi bi-people-fill fs-3 me-2'></i>
                            180 Students
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Courses