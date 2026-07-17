import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../components/Lecturers.css';


function Lecturers(){
    const randColors = ['#d3e4fe', '#894e00', '#5c5f61', '#0b1c30', '#213145', '#0059ba'];
    const [randColor] = useState(() => {
        const randIndex =  Math.floor( Math.random() * randColors.length);
        return  randColors[randIndex];
    })

    const location = useLocation()
    const [allLecturers, setAllLecturers] = useState([])
    console.log(allLecturers)

    // the function for getting the lecturer initials
        function getInitials(fullName) {
            const names = fullName
                .trim()
                .split(/\s+/)
                .filter(word => !word.endsWith('.'));
    
            if (names.length === 1) {
                return names[0][0].toUpperCase();
            }
    
            return (
                names[0][0] +
                names[names.length - 1][0]
            ).toUpperCase();
        }

    useEffect(()=>{
        const fetchLecturers = async ()=>{
            try{
                const response = await axios.get('http://localhost:8000/api/lecturers/')
                setAllLecturers(response.data.all_lecturers)
            }catch(error){
                console.log('Error fetching lecturers:', error)
            }
        };
        fetchLecturers()
    }, [location.pathname])

    return (
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
                                placeholder="Search Lecturers..."
                                className="lec-search-input me-2 border-0"
                                aria-label="Search"
                                />
                                <Button variant="outline-primary" className="lec-search-btn">Search</Button>
                            </Form>

                            <Link to='./add' variant="outline-primary" className='lec-add-btn text-decoration-none btn btn-secondary'>
                                <i className='bi bi-person-fill'></i>
                                Add Lecturer
                            </Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div className='lec-header'>
                <h1>Lecturers</h1>
                <div className="lec-office-tag">REGISTRAR OFFICE</div>
            </div>

            <div className="lec-body">
                <p className='lec-count'>{allLecturers.length} TOTAL LECTURERS</p>

                <Link className='lec-list-link'>
                    {allLecturers.map((lecturer)=>{
                        const isAvailable = String(lecturer.Available) == 'true';
                        return(
                            <div className="lec-card" key={lecturer.id}>
                                <div className="lec-card-main">
                                    <div className="lec-avatar" style={{backgroundColor: randColor}}>
                                        <h4>{getInitials(lecturer.Name)}</h4>
                                    </div>
                                    <div className="lec-info">
                                        <h3>{lecturer.Name}</h3>
                                        <p>{lecturer.department_Name}</p>
                                    </div>
                                </div>
                                <div className="lec-card-meta">
                                    <div className="lec-status">
                                        <div className={"lec-status-chip " + (isAvailable ? "is-available" : "is-unavailable")}>
                                            {isAvailable ? <i className="bi bi-check-circle-fill"></i> : <i className="bi bi-x-circle-fill"></i>}
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
    )
}

export default Lecturers;
