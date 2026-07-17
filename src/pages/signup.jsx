import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MessageBox from "../components/messageBox";
import "../components/SignUp.css";

const ROLES = [
    { value: "student", label: "Student", icon: "bi-mortarboard-fill" },
    { value: "lecturer", label: "Lecturer", icon: "bi-easel-fill" },
    { value: "admin", label: "Admin", icon: "bi-shield-lock-fill" },
];

// Grid used purely for the decorative schedule motif on the branding panel.
const SLOT_COLUMNS = 7;
const SLOT_ROWS = 4;
const HIGHLIGHTED_SLOT = 9;

function SignUp() {
    const navigate = useNavigate();
    const [message, setMessage] = useState(null);
    const [formData, setFormData] = useState({
        role: "student",
        username: "",
        department: "",
        password: "",
        confirm_password: "",
    });

    const [error, setError] = useState({});
    const [submitting, setSubmitting] = useState(false);

    // update the form data when the user types in the input fields
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRoleSelect = (role) => {
        setFormData({ ...formData, role });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError({}); // Clear previous errors

        if (formData.password !== formData.confirm_password) {
            setError({
                confirm_password: ["Passwords do not match."],
            });
            return;
        }

        if (formData.password === "") {
            setError({
                password: ["Password is required."],
            });
            return;
        }

        if (formData.password.length < 8) {
            setError({
                password: ["Password must be at least 8 characters long."],
            });
            return;
        }

        if (formData.username === "") {
            setError({
                username: ["Username is required."],
            });
            return;
        }

        if (formData.department === "") {
            setError({
                department: ["Department is required."],
            });
            return;
        }

        setSubmitting(true);
        try {
            await axios.post("http://localhost:8000/api/register/", formData);
            setMessage({
                text: "Registration successful! Please log in.",
                type: "success",
            });
            navigate("/login");
        } catch (error) {
            if (error.response?.data) {
                setError(error.response.data);
            }
            console.error("Error registering:", error.response?.data);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            {message && (
                <MessageBox
                    message={message.text}
                    type={message.type}
                    onClose={() => setMessage(null)}
                />
            )}

            <div className="ss-shell">
                {/* Branding / schedule-motif panel */}
                <aside className="ss-panel" aria-hidden="true">
                    <div className="ss-panel-content">
                        <div className="ss-brand">
                            <span className="ss-brand-mark">
                                <i className="bi-mortarboard-fill fs-4"></i>
                            </span>
                            <span className="ss-brand-name" style={{color: '#0059ba'}}>Smart <span className="text-white"> Slot</span></span>
                        </div>

                        <h1 className="ss-headline">
                            Every room, every hour,
                            <br />
                            one schedule.
                        </h1>
                        <p className="ss-subline">
                            Smart Slot gives students, lecturers, and admins a single
                            place to find and reserve the resources they need &mdash;
                            no double-bookings, no guesswork.
                        </p>

                        <div className="ss-grid" role="presentation">
                            {Array.from({ length: SLOT_COLUMNS * SLOT_ROWS }).map(
                                (_, i) => (
                                    <span
                                        key={i}
                                        className={
                                            "ss-cell" +
                                            (i === HIGHLIGHTED_SLOT ? " ss-cell-active" : " ")
                                        }
                                    />
                                )
                            )}
                        </div>
                        <p className="ss-grid-caption">
                            <span className="ss-dot"></span>
                            Your next available slot
                        </p>
                    </div>
                </aside>

                {/* Form panel */}
                <main className="ss-form-panel">
                    <form className="ss-form" onSubmit={handleSubmit} noValidate>
                        <div className="ss-form-header">
                            <h2>Create your account</h2>
                            <p>Set up access to Smart Slot in a couple of minutes.</p>
                        </div>

                        <div className="ss-field-group">
                            <label className="ss-label">Sign up as</label>
                            <div className="ss-role-picker" role="radiogroup" aria-label="Account role">
                                {ROLES.map((r) => (
                                    <button
                                        type="button"
                                        key={r.value}
                                        role="radio"
                                        aria-checked={formData.role === r.value}
                                        className={
                                            "ss-role-option" +
                                            (formData.role === r.value ? " ss-role-option-active" : "")
                                        }
                                        onClick={() => handleRoleSelect(r.value)}
                                    >
                                        <i className={`bi ${r.icon}`}></i>
                                        {r.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="ss-field-group">
                            <label htmlFor="username" className="ss-label">
                                Username
                            </label>
                            <div className={"ss-input-wrap" + (error.username ? " ss-input-error" : "")}>
                                <i className="bi bi-person-fill"></i>
                                <input
                                    id="username"
                                    type="text"
                                    name="username"
                                    onChange={handleChange}
                                    placeholder="e.g. ada_lovelace"
                                    autoComplete="username"
                                />
                            </div>
                            {error.username && (
                                <p className="ss-error-text">{error.username[0]}</p>
                            )}
                        </div>

                        <div className="ss-field-group">
                            <label htmlFor="department" className="ss-label">
                                Department
                            </label>
                            <div className={"ss-input-wrap" + (error.department ? " ss-input-error" : "")}>
                                <i className="bi bi-building-fill"></i>
                                <input
                                    id="department"
                                    type="text"
                                    name="department"
                                    onChange={handleChange}
                                    placeholder="e.g. Computer Science"
                                    autoComplete="organization"
                                />
                            </div>
                            {error.department && (
                                <p className="ss-error-text">{error.department[0]}</p>
                            )}
                        </div>

                        <div className="ss-field-group">
                            <div className="ss-field-group">
                                <label htmlFor="password" className="ss-label">
                                    Password
                                </label>
                                <div className={"ss-input-wrap" + (error.password ? " ss-input-error" : "")}>
                                    <i className="bi bi-lock-fill"></i>
                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        onChange={handleChange}
                                        placeholder="At least 8 characters"
                                        autoComplete="new-password"
                                    />
                                </div>
                                {error.password && (
                                    <p className="ss-error-text">{error.password[0]}</p>
                                )}
                            </div>

                            <div className="ss-field-group">
                                <label htmlFor="confirm_password" className="ss-label">
                                    Confirm password
                                </label>
                                <div
                                    className={
                                        "ss-input-wrap" +
                                        (error.confirm_password ? " ss-input-error" : "")
                                    }
                                >
                                    <i className="bi bi-lock-fill"></i>
                                    <input
                                        id="confirm_password"
                                        type="password"
                                        name="confirm_password"
                                        onChange={handleChange}
                                        placeholder="Re-enter password"
                                        autoComplete="new-password"
                                    />
                                </div>
                                {error.confirm_password && (
                                    <p className="ss-error-text">
                                        {error.confirm_password[0]}
                                    </p>
                                )}
                            </div>
                        </div>

                        <button type="submit" className="ss-submit" disabled={submitting}>
                            {submitting ? "Creating account…" : "Sign up"}
                            <i className="bi bi-arrow-right"></i>
                        </button>

                        <p className="ss-footer-text">
                            Already have an account?{" "}
                            <Link to="/login" className="ss-link">
                                Log in
                            </Link>
                        </p>
                    </form>
                </main>
            </div>
        </>
    );
}

export default SignUp;
