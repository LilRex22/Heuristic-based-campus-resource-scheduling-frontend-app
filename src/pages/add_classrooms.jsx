import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from 'react';
import axios from 'axios';
import MessageBox from "../components/messageBox";
import '../components/AddClassrooms.css';


function AddClassrooms() {
    // const [classrooms, setClassrooms] = useState([]);
    const [error, setError] = useState({});
    const [message, setMessage] = useState(null);

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
            setMessage({
                text: "Classroom added successfully!",
                type: "success"
            });

            // clear the form
            setFormData({
                Name: '',
                Type: '',
                Capacity: '',
                Location: ''
            })

        }catch (err){
            console.log(err.response.data)
            setError(err.response.data)
            setMessage({
                text: err.response.data.Name || "An error occurred while adding the classroom.",
                type: "error"
            });
        }
        
    };

    return (
        <div className="ac-shell">
            <Navbar expand="lg" className="ac-navbar bg-body-tertiary">
                <Container fluid>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0 w-100 d-flex justify-content-between"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Form className="ac-search-form d-flex position-relative">
                                <i className="bi bi-search position-absolute" style={{ left: '14px', top: '50%', transform: 'translateY(-50%)' }}></i>
                                <Form.Control
                                type="search"
                                placeholder="Search classrooms..."
                                className="ac-search-input me-2 border-0"
                                aria-label="Search"
                                />
                                <Button variant="outline-primary" className="ac-search-btn">Search</Button>
                            </Form>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>           

            <h2 className="ac-page-heading">Add a Classroom</h2>

            {message && (
                <MessageBox
                    message={message.text}
                    type={message.type}
                    onClose={() => setMessage(null)}
                />
            )}

            <div className="ac-body">
                <div className="ac-brand-mark">
                    <i className="bi bi-mortarboard-fill"></i>
                </div>
                <h1 className="ac-brand-name"><span className="ac-brand-accent">Smart</span> Slot</h1>
                <p className="ac-brand-sub">Register a new room for scheduling</p>

                <form className="ac-card" onSubmit={handleSubmit}>
                    <div className="ac-field-group">
                        <label htmlFor="Name" className="ac-label">Name</label>
                        <div className={"ac-input-wrap" + (error.Name ? " ac-input-error" : "")}>
                            <i className="bi bi-building-fill"></i>
                            <input
                                type="text"
                                id="Name"
                                name="Name"
                                value={formData.Name}
                                onChange={handleChange}
                                placeholder="e.g. Room 101"
                            />
                        </div>
                        {error.Name && <p className="ac-error-text">{error.Name[0]}</p>}
                    </div>

                    <div className="ac-field-group">
                        <label htmlFor="Type" className="ac-label">Type</label>
                        <div className={"ac-input-wrap" + (error.Type ? " ac-input-error" : "")}>
                            <i className="bi bi-door-open-fill"></i>
                            <input
                                type="text"
                                id="Type"
                                name="Type"
                                value={formData.Type}
                                onChange={handleChange}
                                placeholder="e.g. Lecture Hall"
                            />
                        </div>
                        {error.Type && <p className="ac-error-text">{error.Type[0]}</p>}
                    </div>

                    <div className="ac-field-group">
                        <label htmlFor="Capacity" className="ac-label">Capacity</label>
                        <div className={"ac-input-wrap" + (error.Capacity ? " ac-input-error" : "")}>
                            <i className="bi bi-person-fill"></i>
                            <input
                                type="number"
                                id="Capacity"
                                name="Capacity"
                                value={formData.Capacity}
                                onChange={handleChange}
                                placeholder="e.g. 200"
                            />
                        </div>
                        {error.Capacity && <p className="ac-error-text">{error.Capacity[0]}</p>}
                    </div>

                    <div className="ac-field-group">
                        <label htmlFor="Location" className="ac-label">Location</label>
                        <div className={"ac-input-wrap" + (error.Location ? " ac-input-error" : "")}>
                            <i className="bi bi-geo-alt-fill"></i>
                            <input
                                type="text"
                                id="Location"
                                name="Location"
                                value={formData.Location}
                                onChange={handleChange}
                                placeholder="e.g. Science Block"
                            />
                        </div>
                        {error.Location && <p className="ac-error-text">{error.Location[0]}</p>}
                    </div>

                    <button type="submit" className="ac-submit">
                        Add Classroom
                        <i className="bi bi-arrow-right"></i>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddClassrooms;
