import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';


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
        <>  
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0 w-100 d-flex justify-content-between"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Form className="d-flex position-relative">
                                <i className="bi bi-search position-absolute" style={{ left: '10px', top: '50%', transform: 'translateY(-50%)' }}></i>
                                <Form.Control
                                type="search"
                                placeholder="Search Lecturers..."
                                className=" me-2 border-0"
                                aria-label="Search"
                                style={{backgroundColor: '#EDF0FF',borderRadius: '20px', width: '300px', paddingLeft: '35px'}}
                                />
                                <Button variant="outline-primary" style={{borderRadius: '20px', backgroundColor: '#4F8EF7', border: '0px', color: 'white'}}>Search</Button>
                            </Form>

                            <Link to='./add' variant="outline-primary" className='text-decoration-none btn btn-secondary' style={{borderRadius: '20px', backgroundColor: '#0b1c30', border: '0px', color: 'white', marginLeft: '10px'}}>+ 
                                <i className='bi bi-person-fill me-2 ms-1'></i>
                                Add Lecturer
                            </Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className='d-flex justify-content-between align-items-center p-3'>
                <h1 className='fw-bold'>Lecturers</h1>
                <div className="text-muted fw-bold p-2 rounded-2" style={{backgroundColor: '#d3e4fe'}}>REGISTRAR OFFICE</div>
            </div>
            <div className="p-3">
                <p className='text-muted fw-bold'>{allLecturers.length} TOTAL LECTURERS</p>

                <Link className='text-decoration-none' style={{color: '#0b1c30'}}>
                    {allLecturers.map((lecturer)=>{
                        return(
                            <div className="mt-5 border shadow rounded-3 d-flex justify-content-between align-items-center bg-white p-4" style={{border: '1px solid rgba(11, 28, 48, 0.25)'}} key={lecturer.id}>
                                <div className="d-flex align-items-center">
                                    <div className="p-4 rounded-4 text-white text-center" style={{backgroundColor: randColor, minWidth: '100px'}}>
                                        <h4 className='fw-bold fs-1'>{getInitials(lecturer.Name)}</h4>
                                    </div>
                                    <div className="ms-4 d-flex flex-column">
                                        <h3 className='fw-bold mb-2'>{lecturer.Name}</h3>
                                        <p className='text-muted fw-bold'>{lecturer.department_Name}</p>
                                    </div>
                                </div>
                                <div className="">
                                    <div className="d-flex align-items-center">
                                        <div className="text-center d-flex align-items-center gap-3">
                                            <div className="p-2 border rounded-2 h-50" style={{backgroundColor: String(lecturer.Available)=='true' ? 'rgb(127, 221, 127)' : '#ff7878'}}>
                                                {String(lecturer.Available)=='true' ? <i className="bi bi-check-circle-fill text-success"></i> : <i className="bi bi-x-circle-fill text-danger"></i>}
                                            </div>
                                            <i className='bi bi-journal fs-1'></i>
                                        </div>  
                                        <i className='bi bi-arrow-right fs-2 ms-5'></i>
                                    </div>
                                </div>
                            </div>
                        )
                        
                    })}
                </Link>
            </div>
        </>
    )
}

export default Lecturers