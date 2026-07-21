
import { useState } from 'react';
import axios from 'axios';
import MessageBox from "../components/messageBox";
import '../components/AddClassrooms.css';


function AddTimeslots() {
    const [error, setError] = useState({});
    const [message, setMessage] = useState(null);
    const [submitting, setSubmitting] = useState(false);


    const [formData, setFormData] = useState({
        Day: "",
        Start_time: "",
        End_time: "",
        Duration: ""
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

        if (formData.Day === '') {
            setError({
                Day:["Day is required."],
            });
            return;
        }
        if (formData.Start_time === '') {
            setError({
                Start_time:["Start time is required."],
            });
            return;
        }
        if (formData.End_time === '') {
            setError({
                End_time:["End time is required."],
            });
            return;
        }
        
        setSubmitting(true);
        try{
            console.log(formData)
            const token = localStorage.getItem("access");
            const response = await axios.post(
                "http://localhost:8000/api/timeslots/add/",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response)
            setMessage({
                text: "Timeslot added successfully!",
                type: "success"
            });

            // clear the form
            setFormData({
                Day: "",
                Start_time: "",
                End_time: "",
            })

        }catch (err){
            setError(err.response.data)
            setMessage({
                text: "An error occurred while adding the timeslot.",
                type: "error"
            });
        }finally{
            setSubmitting(false);
        }
        
    };

    return (
        <>
            <div className="ac-shell">
                <h2 className='ac-page-heading'>Add a Timeslot</h2>

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
                    <p className="ac-brand-sub">Register a new timeslot for scheduling</p>

                    <form className="ac-card" onSubmit={handleSubmit}>
                        <div className="ac-field-group">
                            <label htmlFor="Day" className="ac-label">Day</label>
                            <div className={"ac-input-wrap" + (error.Day ? " ac-input-error" : "")}>
                                <i className="bi bi-calendar"></i>
                                <input type="text"
                                id="Day"
                                name="Day"
                                value={formData.Day}
                                onChange={handleChange}
                                placeholder="e.g. Monday" />
                            </div>
                            {error.Day && <p className="ac-error-text">{error.Day[0]}</p>}

                            <label htmlFor="Start_time" className="ac-label">Start Time</label>
                            <div className={"ac-input-wrap" + (error.Start_time ? " ac-input-error" : "")}>
                                <i className="bi bi-clock-history"></i>
                                <input type="time"
                                id="Start_time"
                                name="Start_time"
                                value={formData.Start_time}
                                onChange={handleChange}/>
                            </div>
                            {error.Start_time && <p className="ac-error-text">{error.Start_time[0]}</p>}

                            <label htmlFor="End_time" className="ac-label">End Time</label>
                            <div className={"ac-input-wrap" + (error.End_time ? " ac-input-error" : "")}>
                                <i className="bi bi-clock-history"></i>
                                <input type="time"
                                id="End_time"
                                name="End_time"
                                value={formData.End_time}
                                onChange={handleChange}/>
                            </div>
                            {error.End_time && <p className="ac-error-text">{error.End_time[0]}</p>}
                        </div>

                        <button type="submit" className="ac-submit" disabled={submitting}>
                            {submitting ? "Adding Timeslot…" : "Add Timeslot"}
                            <i className="bi bi-arrow-right"></i>
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddTimeslots;
