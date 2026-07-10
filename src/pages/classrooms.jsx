import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';


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

                            <Link to='./add' variant="outline-primary" className='text-decoration-none btn btn-secondary' style={{borderRadius: '20px', backgroundColor: '#0b1c30', border: '0px', color: 'white', marginLeft: '10px'}}>+ 
                                <i className='bi bi-house-fill me-2 ms-1'></i>
                                Add Classroom
                            </Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className='p-3' style={{color: '#0b1c30'}}>
                <h1 className='fw-bold'>Classrooms</h1>

                <p className='mt-5 fw-bold text-muted'>{allClassrooms.length} TOTAL CLASSROOMS</p>
                {/* the classrooms */}
                <Link className='text-decoration-none' style={{color: '#0b1c30'}}>
                    {allClassrooms.map((cl)=>{
                        return (
                            <div className="mt-5 border shadow rounded-3 d-flex justify-content-between align-items-center bg-white p-4" style={{border: '1px solid rgba(11, 28, 48, 0.25)'}} key={cl.id}>
                                <div className="d-flex align-items-center">
                                    <div className="border rounded-4 p-4" style={{backgroundColor: '#d3e4fe', width: 'fit-content'}}>
                                        <img width="50" height="50" src="https://img.icons8.com/ios/50/auditorium.png" alt="auditorium"/>
                                    </div>
                                    <h2 className='ms-4 p-3' style={{borderLeft: '2px solid rgba(11, 28, 48, 0.25)'}}>{cl.Name}</h2>
                                </div>
                                <div className="">
                                    <p>
                                        <i className='bi bi-geo-alt-fill me-2'></i>
                                        {cl.Location}
                                    </p>
                                    <i className='bi bi-person-fill me-2'></i>{cl.Capacity} seats
                                </div>
                                <div className="p-2 border rounded-2" style={{backgroundColor: String(cl.Available)=='true' ? 'rgb(157, 255, 157)' : '#ff7575'}}>
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
        </>
    )
}

export default Classrooms;