import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../components/Lecturers.css'


function Classrooms(){
    const location = useLocation()
    const [allClassrooms, setAllClassrooms] = useState([])

    useEffect(()=>{
        const fetchClassrooms = async ()=>{
            try{
                const response = await axios.get('http://localhost:8000/api/classrooms/')
                setAllClassrooms(response.data.all_rooms)
            }catch(error){
                console.log('Error fetching classrooms:', error)
            }
        };
        fetchClassrooms()
    }, [location.pathname])
    
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
                                    placeholder="Search Classrooms..."
                                    className="lec-search-input me-2 border-0"
                                    aria-label="Search"
                                    />
                                    <Button variant="outline-primary" className="lec-search-btn">Search</Button>
                                </Form>

                                <Link to='./add' variant="outline-primary" className='lec-add-btn text-decoration-none btn btn-secondary'>
                                    <i className='bi bi-person-fill'></i>
                                    Add Classroom
                                </Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <div className='lec-header' style={{color: '#0b1c30'}}>
                    <h1 className='fw-bold'>Classrooms</h1>

                    <p className='lec-count'>{allClassrooms.length} TOTAL CLASSROOMS</p>
                    {/* the classrooms */}
                    <Link className='lec-list-link'>
                        {allClassrooms.map((cl)=>{
                            return (
                                <div className="lec-card" key={cl.id}>
                                    <div className="lec-card-main">
                                        <div className="lec-avatar" style={{backgroundColor: '#d3e4fe', width: 'fit-content'}}>
                                            <img width="50" height="50" src="https://img.icons8.com/ios/50/auditorium.png" alt="auditorium"/>
                                        </div>
                                        <h2 className='ms-4 p-3 lec-info' style={{borderLeft: '2px solid rgba(11, 28, 48, 0.25)'}}>{cl.Name}</h2>
                                    </div>
                                    <div className="lec-info">
                                        <p>
                                            <i className='bi bi-geo-alt-fill me-2'></i>
                                            {cl.Location}
                                        </p>
                                        <i className='bi bi-person-fill me-2'></i>{cl.Capacity} seats
                                    </div>
                                    <div className="p-2 border rounded-2 lec-info" style={{backgroundColor: String(cl.Available)=='true' ? 'rgb(157, 255, 157)' : '#ff7575'}}>
                                        {String(cl.Available)=='true' ? <i className="bi bi-check-circle-fill text-success"></i> : <i className="bi bi-x-circle-fill text-danger"></i>}
                                    </div>
                                    <i className='bi bi-arrow-right fs-2'></i>
                                </div>
                            )
                        })}
                    </Link>

                    <div className="" style={{marginTop: '200px'}}>
                        <h5 className='text-muted mt-2'>SPACE UTILIZATION INSIGHTS</h5>
                        <div className="row">
                            <div className="col-lg-6 bg-white p-4 border rounded-4 mt-3" >
                                <h3 className='display-5 fw-bold mt-3'>82%</h3>
                                <p className='text-muted'>Average Weekly Occupancy</p>
                            </div>
                            
                            <div className="col-lg-6 bg-white p-4 border rounded-4 mt-3" >
                                <h3 className='display-5 fw-bold mt-3'>12</h3>
                                <p className='text-muted'>Free for Large Groups ({'>'}150)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Classrooms;