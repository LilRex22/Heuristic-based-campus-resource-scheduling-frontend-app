import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Select from "react-select";

function AddLecturers() {
    const [departments, setDepartments] = useState([]);

    const [formData, setFormData] = useState({
        Name: "",
        Department: ""
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const token = localStorage.getItem("access");
            const response = await axios.post(
                "http://localhost:8000/api/lecturers/add/",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response)
            alert("Lecturer added successfullly");

            // clear the form
            setFormData({
                Name: '',
                Department: ''
            })

        }catch (err){
            console.log("Error:" + err.response?.data)
        }
        
    };

    useEffect(() => {
            const getDepartments = async () => {
                try {
                    const response = await axios.get(
                        "http://localhost:8000/api/departments/"
                    );
                    setDepartments(response.data);
                } catch(error) {
                    console.log(error);
                }
            };
            getDepartments();
    }, []);

    const departmentOptions = departments.map((department)=>({
        value: department.id,
        label: department.Name
    }));

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

                            <Link variant="outline-primary" className='text-decoration-none btn btn-secondary' style={{borderRadius: '20px', backgroundColor: '#0b1c30', border: '0px', color: 'white', marginLeft: '10px'}}>+ 
                                <i className='bi bi-person-fill me-2 ms-1'></i>
                                Add Lecturer
                            </Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div className="p-3">
                <h2 className='fw-bold'>Add a Lecturer</h2>

                    <div className="d-flex flex-column align-items-center">
                    <img width="64" height="64" src="https://img.icons8.com/glyph-neue/64/graduation-cap.png" alt="graduation-cap"/>
                    <h1 className="fw-bold"><span style={{color: '#0059ba'}}>Smart</span> Slot</h1>

                    <form className="form-control p-4" onSubmit={handleSubmit} style={{width: '600px', borderRadius: '10px', backgroundColor: '#f8f9fa'}}>
                        <div className="">
                            <div className="input-group-custom">
                                <label htmlFor="Name" className="mt-4 fw-bold text-black-50">Full Name:</label>
                                <i className="bi bi-person-fill"></i>
                                <input type="text" 
                                name="Name"
                                onChange={handleChange} 
                                className="form-control mt-2 text-black-50 fw-bold" 
                                placeholder="Fullname e.g Dr. John Adams" 
                                style={{backgroundColor: '#d3e4fe'}}/>
                            </div>

                            <div className="mt-3">
                                <Select
                                    options={departmentOptions}
                                    placeholder="Search Department..."
                                    onChange={(selectedOption)=>{

                                        setFormData({
                                            ...formData,
                                            Department: selectedOption.value
                                        });

                                    }}
                                />
                            </div>

                            <div className="input-group-custom position-relative">
                                <button type='Submit' className="btn btn-primary mt-4 fw-bold form-control" style={{backgroundColor: '#0059ba'}}>Add Lecturer</button>
                                <i className="bi bi-arrow-right text-white position-absolute" style={{left: '66%', top: '68%'}}></i>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddLecturers;