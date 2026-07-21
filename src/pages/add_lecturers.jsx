
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Select from "react-select";
import MessageBox from "../components/messageBox";
import '../components/AddClassrooms.css';

// styling passed straight to react-select's `styles` prop so the dropdown
// matches the brand (react-select can't be themed with plain CSS alone).
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

function AddLecturers() {
    const [departments, setDepartments] = useState([]);
    const [error, setError] = useState({});
    const [message, setMessage] = useState(null);
    const [submitting, setSubmitting] = useState(false);


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
        setError({}); // Clear previous errors

        if (formData.Name === '') {
            setError({
                Name:["Name is required."],
            });
            return;
        }
        if (formData.Department === '') {
            setError({
                Department:["Department is required."],
            });
            return;
        }
        setSubmitting(true);
        try{
            console.log(formData)
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
            setMessage({
                text: "Lecturer added successfully!",
                type: "success"
            });

            // clear the form
            setFormData({
                Name: '',
                Department: ''
            })

        }catch (err){
            setError(err.response.data)
            setMessage({
                text: err.response.data.Name || "An error occurred while adding the lecturer.",
                type: "error"
            });
        }finally{
            setSubmitting(false);
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
            <div className="ac-shell">
                <h2 className='ac-page-heading'>Add a Lecturer</h2>

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
                    <p className="ac-brand-sub">Register a new lecturer for scheduling</p>

                    <form className="ac-card" onSubmit={handleSubmit}>
                        <div className="ac-field-group">
                            <label htmlFor="Name" className="ac-label">Full Name</label>
                            <div className={"ac-input-wrap" + (error.Name ? " ac-input-error" : "")}>
                                <i className="bi bi-person-fill"></i>
                                <input type="text"
                                id="Name"
                                name="Name"
                                value={formData.Name}
                                onChange={handleChange}
                                placeholder="e.g. Dr. John Adams" />
                            </div>
                            {error.Name && <p className="ac-error-text">{error.Name[0]}</p>}
                        </div>

                        <div className="ac-field-group ac-select-wrap">
                            <label className="ac-label">Department</label>
                            <Select
                                classNamePrefix="ac-select"
                                styles={selectStyles}
                                options={departmentOptions}
                                placeholder="Search Department..."
                                onChange={(selectedOption)=>{
                                    console.log(selectedOption);
                                    setFormData({
                                        ...formData,
                                        Department: selectedOption.value
                                    });

                                }}
                            />
                            {error.Department && <p className="ac-error-text">{error.Department[0]}</p>}
                        </div>

                        <button type="submit" className="ac-submit" disabled={submitting}>
                            {submitting ? "Adding Lecturer…" : "Add Lecturer"}
                            <i className="bi bi-arrow-right"></i>
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddLecturers;
