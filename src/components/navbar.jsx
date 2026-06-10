import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation } from 'react-router-dom';




function NavigationBar() {

    const navigation = [
        // {Name: '', Path: '/dashboard'},
        // {Name: 'Schedule', Path: '/schedule'},
        // {Name: 'Resources', Path: '/resources'},
        // {Name: 'Timetable', Path: '/timetable'}
    ]
    const location = useLocation();

    return (
    <Navbar expand="lg" className="bg-body-white p-3" style={{boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', fontFamily: 'Sans-serif', backgroundColor: 'white'}}>
        <Container fluid>
            <Navbar.Brand href="/" className='fw-bold d-flex align-items-center' style={{ color: '#213145'}}>
                <img width="35" height="35" src="https://img.icons8.com/glyph-neue/64/graduation-cap.png" alt="graduation-cap"/>
                <span style={{color: '#0059ba'}}>Smart</span>Slot</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
            <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
            >

                {navigation.map((link) => {
                    return (
                        <Nav.Link as={Link}
                            to={link.Path}
                            key={link.Path}
                            style={location.pathname === link.Path ? {borderBottom: '3px solid #0059ba'} : {color: '#213145'}}>{link.Name}
                        </Nav.Link>
                    )
                })}
            </Nav>
            <Form className="d-flex position-relative">
                <i className="bi bi-search position-absolute" style={{ left: '10px', top: '50%', transform: 'translateY(-50%)' }}></i>
                <Form.Control
                type="search"
                placeholder="Search Faculties..."
                className=" me-2 border-0"
                aria-label="Search"
                style={{backgroundColor: '#EDF0FF',borderRadius: '20px', width: '300px', paddingLeft: '35px'}}
                />
                <Button variant="outline-primary" style={{borderRadius: '20px', backgroundColor: '#4F8EF7', border: '0px', color: 'white'}}>Search</Button>
            </Form>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    )

}

export default NavigationBar;