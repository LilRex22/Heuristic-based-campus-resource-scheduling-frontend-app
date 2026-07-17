import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MessageBox from "../components/messageBox";
import "../components/SignUp.css";

// Reuses the same decorative grid used on the SignUp panel, but with more
// cells "filled" — implying a day already in motion rather than one open slot.
const SLOT_COLUMNS = 7;
const SLOT_ROWS = 4;
const ACTIVE_SLOTS = [2, 9, 13, 18, 24];

function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState({});
    const [message, setMessage] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        role: "student",
        username: "",
        password: "",
    });

    // update the form data when the user types in the input fields
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // the login logic
    const logUserIn = async (e) => {
        e.preventDefault();
        setError({});
        setSubmitting(true);
        try {
            const response = await axios.post("http://localhost:8000/api/token/", {
                username: formData.username,
                password: formData.password,
            });
            console.log(response.data);
            localStorage.setItem("access", response.data.access);
            localStorage.setItem("refresh", response.data.refresh);
            setMessage({
                text: "Logged in successfully!",
                type: "success",
            });
            navigate("/dashboard");
        } catch (error) {
            if (error.response?.data) {
                setError(error.response.data);
            }
            console.error("login failed:", error.response?.data?.detail);
            setMessage({
                text:
                    error.response?.data?.detail ||
                    "An error occurred while adding the classroom.",
                type: "error",
            });
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
                            <span className="ss-brand-name">Smart Slot</span>
                        </div>

                        <h1 className="ss-headline">
                            Welcome back to
                            <br />
                            your schedule.
                        </h1>
                        <p className="ss-subline">
                            Sign in to check your bookings, reserve a room, or manage
                            the resources your department depends on.
                        </p>

                        <div className="ss-grid" role="presentation">
                            {Array.from({ length: SLOT_COLUMNS * SLOT_ROWS }).map(
                                (_, i) => (
                                    <span
                                        key={i}
                                        className={
                                            "ss-cell" +
                                            (ACTIVE_SLOTS.includes(i) ? " ss-cell-active" : "")
                                        }
                                    />
                                )
                            )}
                        </div>
                        <p className="ss-grid-caption">
                            <span className="ss-dot"></span>
                            Today&rsquo;s bookings across campus
                        </p>
                    </div>
                </aside>

                {/* Form panel */}
                <main className="ss-form-panel">
                    <form className="ss-form" onSubmit={logUserIn} noValidate>
                        <div className="ss-form-header">
                            <h2>Log in</h2>
                            <p>Enter your details to access your dashboard.</p>
                        </div>

                        {error.detail && (
                            <p className="ss-error-text ss-error-banner">
                                {error.detail}
                            </p>
                        )}

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
                                    placeholder="Your password"
                                    autoComplete="current-password"
                                />
                            </div>
                            {error.password && (
                                <p className="ss-error-text">{error.password[0]}</p>
                            )}
                        </div>

                        <button type="submit" className="ss-submit" disabled={submitting}>
                            {submitting ? "Signing in…" : "Sign in to dashboard"}
                            <i className="bi bi-arrow-right"></i>
                        </button>

                        <p className="ss-footer-text">
                            New to the campus platform?{" "}
                            <Link to="/signup" className="ss-link">
                                Sign up
                            </Link>
                        </p>
                    </form>
                </main>
            </div>
        </>
    );
}

export default Login;
