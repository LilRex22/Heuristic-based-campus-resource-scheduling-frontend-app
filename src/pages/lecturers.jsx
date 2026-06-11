import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function Lecturers(){
    return (
        <>  
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
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
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div>
                
            </div>
        </>
    )
}

export default Lecturers