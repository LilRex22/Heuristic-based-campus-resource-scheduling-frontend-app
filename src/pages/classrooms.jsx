import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function Classrooms(){
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

                            <Button variant="outline-primary" style={{borderRadius: '20px', backgroundColor: '#0b1c30', border: '0px', color: 'white', marginLeft: '10px'}}>+ Add Classroom</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className='p-3 fw-bold' style={{color: '#0b1c30'}}>
                <h1 className='fw-bold'>Classrooms</h1>

                <div className="mt-5 border rounded-2 d-flex justify-content-evenly align-items-center bg-white p-4">
                    <div className="border rounded-2" style={{backgroundColor: '#d3e4fe', width: 'fit-content', padding: '5px'}}>
                        <img width="50" height="50" src="https://img.icons8.com/ios/50/auditorium.png" alt="auditorium"/>
                    </div>
                    <h2>Maths Hall</h2>
                    <div className="">
                        <p>
                            <i className='bi bi-geo-alt-fill'></i>
                            Science Village.
                        </p>
                        <i className='bi bi-person-fill'></i>200 seats
                    </div>
                </div>
            </div>
        </>
    )
}

export default Classrooms;