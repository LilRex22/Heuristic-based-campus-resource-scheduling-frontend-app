import { useState } from "react";
import { Link } from "react-router-dom";




function SignUp(){
    const [formData, setFormData] = useState({
        role: 'student',
        username: '',
        department: '',
        password: '',
        confirm_password: ''
    });

    // update the form data when the user types in the input fields
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
    };


    return (
        <>
            <div className="d-flex flex-column align-items-center">
                <img width="64" height="64" src="https://img.icons8.com/glyph-neue/64/graduation-cap.png" alt="graduation-cap"/>
                <h1 className="fw-bold"><span style={{color: '#0059ba'}}>Smart</span> Slot</h1>
                <p>Resource Scheduler SignUp</p>

                <form className="form-control p-4" onSubmit={handleSubmit} style={{width: '600px', borderRadius: '10px', backgroundColor: '#f8f9fa'}}>
                    <div className="">
                        <p className="fs-5 fw-bold">SignUp AS</p>
                        <div className="">
                            <select name="role" value={formData.role} onChange={handleChange} className="form-select">
                                <option value="student">Student</option>
                                <option value="admin">Admin</option>
                                <option value="lecturer">Lecturer</option>
                            </select>
                        </div>

                        <div className="input-group-custom">
                            <label htmlFor="username" className="mt-4 fw-bold text-black-50">Your Username:</label>
                            
                            <i className="bi bi-person-fill"></i>
                            <input type="text" 
                            name="username" 
                            onChange={handleChange} 
                            className="form-control mt-2 text-black-50 fw-bold" 
                            placeholder="Username" 
                            style={{backgroundColor: '#d3e4fe'}}/>
                        </div>

                        <div className="input-group-custom">
                            <label htmlFor="department" className="mt-4 fw-bold text-black-50">Department:</label>

                            <i className="bi bi-book-fill"></i>
                            <input type="text" 
                            name="department" 
                            onChange={handleChange} 
                            className="form-control mt-2 text-black-50 fw-bold" 
                            placeholder="Department" 
                            style={{backgroundColor: '#d3e4fe'}} />
                        </div>

                        <div className="input-group-custom">
                            <label htmlFor="password" className="mt-4 fw-bold text-black-50">Your Password:</label>

                            <i className="bi bi-lock-fill"></i>
                            <input type="password" 
                            name="password" 
                            onChange={handleChange} 
                            className="form-control mt-2 text-black-50 fw-bold" 
                            placeholder="Password" 
                            style={{backgroundColor: '#d3e4fe'}} />
                            {/* <img width="50" height="50" src="https://img.icons8.com/material-outlined/50/lock.png" alt="lock"/> */}
                        </div>

                        <div className="input-group-custom">
                            <label htmlFor="confirm_password" className="mt-4 fw-bold text-black-50">Confirm Password:</label>

                            <i className="bi bi-lock-fill"></i>
                            <input type="password" 
                            name="confirm_password" 
                            onChange={handleChange} 
                            className="form-control mt-2 text-black-50 fw-bold" 
                            placeholder="Confirm Password" 
                            style={{backgroundColor: '#d3e4fe'}} />
                        </div>

                        <div className="input-group-custom position-relative">
                            <button onSubmit={handleSubmit} className="btn btn-primary mt-4 fw-bold form-control" style={{backgroundColor: '#0059ba'}}>Sign Up</button>
                            <i className="bi bi-arrow-right text-white position-absolute" style={{left: '66%', top: '68%'}}></i>
                        </div>
                        <p className="text-center mt-3 ">Already have an account? <Link to='/login' className="text-decoration-none" style={{color: '#0059ba'}}>Login</Link></p>

                    </div>
                </form>
            </div>
        </>
    )
}

export default SignUp;