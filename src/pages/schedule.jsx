
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';


function Schedule() {
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

            </div>
        </>
    )
}

export default Schedule;