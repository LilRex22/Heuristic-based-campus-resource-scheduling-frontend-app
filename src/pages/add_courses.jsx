import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Select from "react-select";
import MessageBox from "../components/messageBox";

function AddCourses() {
    const [room, setRoom] = useState([]);
    const [level, setLevel] = useState([]);
    const [lecturer, setLecturer] = useState([]);
    const [message, setMessage] = useState(null);


    const [error, setError] = useState({});

    const [formData, setFormData] = useState({
        Course_code: "",
        Course_title: "",
        Level: "",
        Credit: "",
        Student: "",
        Lecturer: "",
        Room: ""
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

        if (formData.Course_code === '') {
            setError({
                Course_code:["Course code is required."],
            });
            return;
        }
        if (formData.Course_title === '') {
            setError({
                Course_title:["Course title is required."],
            });
            return;
        }
        if (formData.Level === '') {
            setError({
                Level:["Level is required."],
            });
            return;
        }
        if (formData.Credit === '') {
            setError({
                Credit:["Credit is required."],
            });
            return;
        }
        if (formData.Student === '') {
            setError({
                Student:["No. of Students is required."],
            });
            return;
        }
        if (formData.Lecturer === '') {
            setError({
                Lecturer:["Lecturer is required."],
            });
            return;
        }
        if (formData.Room === '') {
            setError({
                Room:["Room is required."],
            });
            return;
        }

        try{
            console.log(formData)
            const token = localStorage.getItem("access");
            const response = await axios.post(
                "http://localhost:8000/api/courses/add/",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response)
            setMessage({
                text: "Course added successfully!",
                type: "success"
            });

            // clear the form
            setFormData({
                Course_code: '',
                Course_title: '',
                Level: '',
                Credit: '',
                Student: '',
                Lecturer: '',
                Room: ''
            })

        }catch (err){
            setError(err.response.data)
            {
                setMessage({
                    text: err.response.data.Name || "An error occurred while adding the course.",
                    type: "error"
                });
            }
        }

    };

    useEffect(() => {
            const getDepartments = async () => {
                try {
                    const response = await axios.get(
                        "http://localhost:8000/api/lecturers/"
                    );
                    const response2 = await axios.get(
                        "http://localhost:8000/api/classrooms/"
                    );
                    const response3 = await axios.get(
                        "http://localhost:8000/api/levels/"
                    );
                    setLevel(response3.data);
                    setLecturer(response.data.all_lecturers);
                    setRoom(response2.data.all_rooms);
                } catch(error) {
                    console.log(error);
                }
            };
            getDepartments();
    }, []);

    const lecturerOptions = lecturer.map((lecturer)=>({
        value: lecturer.id,
        label: lecturer.Name
    }));

    const roomOptions = room.map((room)=>({
        value: room.id,
        label: room.Name
    }));

    const levelOptions = level.map((level)=>({
        value: level.id,
        label: level.Name
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
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div className="p-3">
                <h2 className='fw-bold'>Add a Course</h2>
                    {message && (
                        <MessageBox
                            message={message.text}
                            type={message.type}
                            onClose={() => setMessage(null)}
                        />
                    )}
                    <div className="d-flex flex-column align-items-center">
                    <img width="64" height="64" src="https://img.icons8.com/glyph-neue/64/graduation-cap.png" alt="graduation-cap"/>
                    <h1 className="fw-bold"><span style={{color: '#0059ba'}}>Smart</span> Slot</h1>

                    <form className="form-control p-4" onSubmit={handleSubmit} style={{width: '600px', borderRadius: '10px', backgroundColor: '#f8f9fa'}}>
                        <div className="">
                            {/* // Course code */}
                            <div className="input-group-custom">
                                <label htmlFor="Course_code" className="mt-4 fw-bold text-black-50">Course Code:</label>
                                <i className="bi bi-person-fill"></i>
                                <input type="text" 
                                name="Course_code"
                                onChange={handleChange} 
                                className="form-control mt-2 text-black-50 fw-bold" 
                                placeholder="Course code e.g CSC 101" 
                                style={{backgroundColor: '#d3e4fe'}}/>
                            </div>
                            {error.Course_code && <p className="text-danger mt-1">{error.Course_code[0]}</p>}


                            {/* // Course title */}
                            <div className="input-group-custom">
                                <label htmlFor="Course_title" className="mt-4 fw-bold text-black-50">Course Title:</label>
                                <i className="bi bi-person-fill"></i>
                                <input type="text" 
                                name="Course_title"
                                onChange={handleChange} 
                                className="form-control mt-2 text-black-50 fw-bold" 
                                placeholder="Course Title e.g Introduction to Computer Science" 
                                style={{backgroundColor: '#d3e4fe'}}/>
                            </div>
                            {error.Course_title && <p className="text-danger mt-1">{error.Course_title[0]}</p>}

                            {/* // Level */}
                            <div className="mt-3">
                                <Select
                                    options={levelOptions}
                                    placeholder="Select Level..."
                                    onChange={(selectedOption)=>{
                                        console.log(selectedOption);
                                        setFormData({
                                            ...formData,
                                            Level: selectedOption.value
                                        });
                                    }}
                                />
                            </div>
                            {error.Level && <p className="text-danger mt-1">{error.Level[0]}</p>}

                            {/* // Credit */}
                            <div className="input-group-custom">
                                <label htmlFor="Credit" className="mt-4 fw-bold text-black-50">Course Credit:</label>
                                <i className="bi bi-person-fill"></i>
                                <input type="number"
                                min="1"
                                step="1" 
                                name="Credit"
                                onKeyDown={(e) => {
                                        if (["-", "+", "e", "E"].includes(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                onChange={handleChange} 
                                className="form-control mt-2 text-black-50 fw-bold" 
                                placeholder="Course Credit e.g 3" 
                                style={{backgroundColor: '#d3e4fe'}}/>
                            </div>
                            {error.Credit && <p className="text-danger mt-1">{error.Credit[0]}</p>}

                            {/* // Student */}  
                            <div className="input-group-custom">
                                <label htmlFor="Student" className="mt-4 fw-bold text-black-50">No. of Students:</label>
                                <i className="bi bi-person-fill"></i>
                                <input type="text" 
                                name="Student"
                                onChange={handleChange} 
                                className="form-control mt-2 text-black-50 fw-bold" 
                                placeholder="No. of Students e.g 300" 
                                style={{backgroundColor: '#d3e4fe'}}/>
                            </div>
                            {error.Student && <p className="text-danger mt-1">{error.Student[0]}</p>}


                            {/* // Lecturer */}
                            <div className="mt-3">
                                <Select
                                    options={lecturerOptions}
                                    placeholder="Select Lecturer(s)..."
                                    onChange={(selectedOption)=>{
                                        console.log(selectedOption);
                                        setFormData({
                                            ...formData,
                                            Lecturer: selectedOption.value
                                        });

                                    }}
                                />
                            </div>
                            {error.Lecturer && <p className="text-danger mt-1">{error.Lecturer[0]}</p>}

                            {/* // Room */}
                            <div className="mt-3">
                                <Select
                                    options={roomOptions}
                                    placeholder="Select Room..."
                                    onChange={(selectedOption)=>{
                                        console.log(selectedOption);
                                        setFormData({
                                            ...formData,
                                            Room: selectedOption.value
                                        });

                                    }}
                                />
                            </div>
                            {error.Room && <p className="text-danger mt-1">{error.Room[0]}</p>}

                            <div className="input-group-custom position-relative">
                                <button type='Submit' className="btn btn-primary mt-4 fw-bold form-control" style={{backgroundColor: '#0059ba'}}>Add Course</button>
                                <i className="bi bi-arrow-right text-white position-absolute" style={{left: '66%', top: '68%'}}></i>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddCourses;