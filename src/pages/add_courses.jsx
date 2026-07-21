
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Select from "react-select";
import MessageBox from "../components/messageBox";
import '../components/AddClassrooms.css';

// styling passed straight to react-select's `styles` prop so the dropdowns
// match the brand (react-select can't be themed with plain CSS alone).
// Purely presentational — none of the onChange logic changes.
const selectStyles = {
    control: (base, state) => ({
        ...base,
        borderColor: state.isFocused ? '#1b2340' : '#e7e2d6',
        backgroundColor: '#faf8f3',
        borderRadius: 10,
        minHeight: 48,
        boxShadow: 'none',
        fontSize: '0.9rem',
    }),
    placeholder: (base) => ({ ...base, color: '#6b7280' }),
    menu: (base) => ({
        ...base,
        borderRadius: 10,
        overflow: 'hidden',
        border: '1px solid #e7e2d6',
        boxShadow: '0 8px 24px rgba(27,35,64,0.1)',
    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected
            ? '#e8a33d'
            : state.isFocused
            ? '#fdf3e2'
            : '#fff',
        color: '#1b2340',
    }),
};

function AddCourses() {
    const [room, setRoom] = useState([]);
    const [level, setLevel] = useState([]);
    const [lecturer, setLecturer] = useState([]);
    const [message, setMessage] = useState(null);
    const [submitting, setSubmitting] = useState(false);

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
        setSubmitting(true);
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
            <div className="ac-shell">
                <h2 className='ac-page-heading'>Add a Course</h2>

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
                    <p className="ac-brand-sub">Register a new course for scheduling</p>

                    <form className="ac-card" onSubmit={handleSubmit}>
                        {/* // Course code */}
                        <div className="ac-field-group">
                            <label htmlFor="Course_code" className="ac-label">Course Code</label>
                            <div className={"ac-input-wrap" + (error.Course_code ? " ac-input-error" : "")}>
                                <i className="bi bi-hash"></i>
                                <input type="text"
                                id="Course_code"
                                name="Course_code"
                                value={formData.Course_code}
                                onChange={handleChange}
                                placeholder="e.g. CSC 101" />
                            </div>
                            {error.Course_code && <p className="ac-error-text">{error.Course_code[0]}</p>}
                        </div>

                        {/* // Course title */}
                        <div className="ac-field-group">
                            <label htmlFor="Course_title" className="ac-label">Course Title</label>
                            <div className={"ac-input-wrap" + (error.Course_title ? " ac-input-error" : "")}>
                                <i className="bi bi-journal-text"></i>
                                <input type="text"
                                id="Course_title"
                                name="Course_title"
                                value={formData.Course_title}
                                onChange={handleChange}
                                placeholder="e.g. Introduction to Computer Science" />
                            </div>
                            {error.Course_title && <p className="ac-error-text">{error.Course_title[0]}</p>}
                        </div>

                        {/* // Level */}
                        <div className="ac-field-group ac-select-wrap">
                            <label className="ac-label">Level</label>
                            <Select
                                classNamePrefix="ac-select"
                                styles={selectStyles}
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
                            {error.Level && <p className="ac-error-text">{error.Level[0]}</p>}
                        </div>

                        {/* // Credit */}
                        <div className="ac-field-group">
                            <label htmlFor="Credit" className="ac-label">Course Credit</label>
                            <div className={"ac-input-wrap" + (error.Credit ? " ac-input-error" : "")}>
                                <i className="bi bi-award-fill"></i>
                                <input type="number"
                                min="1"
                                step="1"
                                id="Credit"
                                name="Credit"
                                value={formData.Credit}
                                onKeyDown={(e) => {
                                        if (["-", "+", "e", "E"].includes(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                onChange={handleChange}
                                placeholder="e.g. 3" />
                            </div>
                            {error.Credit && <p className="ac-error-text">{error.Credit[0]}</p>}
                        </div>

                        {/* // Student */}
                        <div className="ac-field-group">
                            <label htmlFor="Student" className="ac-label">No. of Students</label>
                            <div className={"ac-input-wrap" + (error.Student ? " ac-input-error" : "")}>
                                <i className="bi bi-people-fill"></i>
                                <input type="text"
                                id="Student"
                                name="Student"
                                value={formData.Student}
                                onChange={handleChange}
                                placeholder="e.g. 300" />
                            </div>
                            {error.Student && <p className="ac-error-text">{error.Student[0]}</p>}
                        </div>

                        {/* // Lecturer */}
                        <div className="ac-field-group ac-select-wrap">
                            <label className="ac-label">Lecturer</label>
                            <Select
                                classNamePrefix="ac-select"
                                styles={selectStyles}
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
                            {error.Lecturer && <p className="ac-error-text">{error.Lecturer[0]}</p>}
                        </div>

                        {/* // Room */}
                        <div className="ac-field-group ac-select-wrap">
                            <label className="ac-label">Room</label>
                            <Select
                                classNamePrefix="ac-select"
                                styles={selectStyles}
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
                            {error.Room && <p className="ac-error-text">{error.Room[0]}</p>}
                        </div>

                        <button type="submit" className="ac-submit">
                            {submitting ? "Adding Course…" : "Add Course"}
                            <i className="bi bi-arrow-right"></i>
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddCourses;
