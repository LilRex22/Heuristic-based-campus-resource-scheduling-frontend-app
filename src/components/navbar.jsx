import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';




function NavigationBar() {
    return (
    <Navbar expand="lg" className="bg-body-white p-3" style={{boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', fontFamily: 'Sans-serif', backgroundColor: 'white'}}>
        <Container fluid>
            <Navbar.Brand href="#" className='fw-bold' style={{ color: '#213145'}}><span style={{color: '#0059ba'}}>Smart</span>Slot</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
            <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
            >
                <Nav.Link href="#action1" style={{ color: '#213145'}}>Dashboard</Nav.Link>
                <Nav.Link href="#action2" style={{ color: '#213145'}}>Schedule</Nav.Link>
                <Nav.Link href="#" style={{ color: '#213145'}}>Resources</Nav.Link>
                <Nav.Link href="#" style={{ color: '#213145'}}>Timetable</Nav.Link>
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