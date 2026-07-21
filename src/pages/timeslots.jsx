import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';


function Timeslots(){
    const location = useLocation()
    const [allTimeslots, setAllTimeslots] = useState([])

    useEffect(()=>{
        const fetchCourses = async ()=>{
            try{
                const response = await axios.get('http://localhost:8000/api/timeslots/')
                setAllTimeslots(response.data)
            }catch(error){
                console.log(error)
            }
        };
        fetchCourses();
    }, [location.pathname])
    console.log(allTimeslots)
    
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
                                    placeholder="Search Timeslots..."
                                    className="lec-search-input me-2 border-0"
                                    aria-label="Search"
                                    />
                                    <Button variant="outline-primary" className="lec-search-btn">Search</Button>
                                </Form>

                                <Link to='./add' variant="outline-primary" className='lec-add-btn text-decoration-none btn btn-secondary'>
                                    <i className='bi bi-clock-history'></i>
                                    Add Timeslot
                                </Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <div className="lec-header">
                    <h1>Timeslots</h1>
                </div>
                <div className="lec-body">
                    <p className='lec-count'>{allTimeslots.length} TOTAL TIMESLOTS</p>

                    <Link className='lec-list-link'>
                        {allTimeslots.map((timeslot)=>{
                            const isAvailable = String(timeslot.Available) == 'true';
                            return(
                                <div className="lec-card" key={timeslot.id}>
                                    <div className="lec-card-main">
                                        <div className="lec-avatar text-dark" style={{backgroundColor: '#e8a33d'}}>
                                            <h4>{timeslot.Day.slice(0, 3)}</h4>
                                        </div>
                                        <div className="lec-info">
                                            <h3>{timeslot.Start_time} - {timeslot.End_time}</h3>
                                            <p>{timeslot.Duration} hr(s)</p>
                                        </div>
                                    </div>
                                    <div className="lec-card-meta">
                                        <div className="lec-status">
                                            <div className={"lec-status-chip " + (isAvailable ? "is-available" : "is-available")}>
                                                <i className='bi bi-clock-fill text-success'></i>
                                            </div>
                                            <i className='bi bi-journal lec-journal-icon'></i>
                                        </div>
                                        <i className='bi bi-arrow-right lec-arrow'></i>
                                    </div>
                                </div>
                            )
                            
                        })}
                    </Link>
                </div>
            </div>
        </>
    )



}

export default Timeslots;
