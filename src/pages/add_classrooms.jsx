import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from 'react';
import axios from 'axios';


function AddClassrooms() {
    // const [classrooms, setClassrooms] = useState([]);
    const [error, setError] = useState({});

    const [formData, setFormData] = useState({
        Name: "",
        Type: "",
        Capacity: "",
        Location: ""
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError({}); // Clear previous errors

        if (formData.Name === '') {
            setError({
                Name:["Name is required."],
            });
            return;
        }
        if (formData.Type === '') {
            setError({
                Type:["Type is required."],
            });
            return;
        }
        if (formData.Capacity === '') {
            setError({
                Capacity:["Capacity is required."],
            });
            return;
        }
        if (formData.Location === '') {
            setError({
                Location:["Location is required."],
            });
            return;
        }

        try{
            console.log(formData)
            const token = localStorage.getItem("access");
            const response = await axios.post(
                "http://localhost:8000/api/classrooms/add/",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response)
            alert("Classroom added successfully");

            // clear the form
            setFormData({
                Name: '',
                Type: '',
                Capacity: '',
                Location: ''
            })

        }catch (err){
            setError(err.response.data)
        }
        
    };

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
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div className="p-3">
                <h2 className='fw-bold'>Add a Classroom</h2>

                    <div className="d-flex flex-column align-items-center">
                    <img width="64" height="64" src="https://img.icons8.com/glyph-neue/64/graduation-cap.png" alt="graduation-cap"/>
                    <h1 className="fw-bold"><span style={{color: '#0059ba'}}>Smart</span> Slot</h1>

                    <form className="form-control p-4" onSubmit={handleSubmit} style={{width: '600px', borderRadius: '10px', backgroundColor: '#f8f9fa'}}>
                        <div className="">
                            <div className="input-group-custom">
                                <label htmlFor="Name" className="mt-4 fw-bold text-black-50">Name:</label>
                                <i className="bi bi-building-fill"></i>
                                <input type="text" 
                                name="Name"
                                onChange={handleChange} 
                                className="form-control mt-2 text-black-50 fw-bold" 
                                placeholder="e.g. Room 101" 
                                style={{backgroundColor: '#d3e4fe'}}/>
                            </div>
                            {error.Name && <p className="text-danger mt-1">{error.Name[0]}</p>}

                            <div className="input-group-custom">
                                <label htmlFor="Name" className="mt-4 fw-bold text-black-50">Type:</label>
                                <i className="bi bi-door-open-fill"></i>
                                <input type="text" 
                                name="Type"
                                onChange={handleChange} 
                                className="form-control mt-2 text-black-50 fw-bold" 
                                placeholder="e.g. Lecture Hall" 
                                style={{backgroundColor: '#d3e4fe'}}/>
                            </div>
                            {error.Type && <p className="text-danger mt-1">{error.Type[0]}</p>}
                            
                            <div className="input-group-custom">
                                <label htmlFor="Name" className="mt-4 fw-bold text-black-50">Capacity:</label>
                                <i className="bi bi-person-fill"></i>
                                <input type="number" 
                                name="Capacity"
                                onChange={handleChange} 
                                className="form-control mt-2 text-black-50 fw-bold" 
                                placeholder="e.g. 200" 
                                style={{backgroundColor: '#d3e4fe'}}/>
                            </div>
                            {error.Capacity && <p className="text-danger mt-1">{error.Capacity[0]}</p>}

                            <div className="input-group-custom">
                                <label htmlFor="Name" className="mt-4 fw-bold text-black-50">Location:</label>
                                <i className="bi bi-geo-alt-fill"></i>
                                <input type="text" 
                                name="Location"
                                onChange={handleChange} 
                                className="form-control mt-2 text-black-50 fw-bold" 
                                placeholder="e.g. Science Block" 
                                style={{backgroundColor: '#d3e4fe'}}/>
                            </div>
                            {error.Location && <p className="text-danger mt-1">{error.Location[0]}</p>}

                            <div className="input-group-custom position-relative">
                                <button type='Submit' className="btn btn-primary mt-4 fw-bold form-control" style={{backgroundColor: '#0059ba'}}>Add Classroom</button>
                                <i className="bi bi-arrow-right text-white position-absolute" style={{left: '66%', top: '68%'}}></i>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddClassrooms;