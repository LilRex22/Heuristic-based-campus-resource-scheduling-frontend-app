import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import "../components/Dashboard.css";

function Dashboard() {
    const [lecturers, setLecturers] = useState([]);
    const [classrooms, setClassrooms] = useState([]);
    const [courses, setCourses] = useState([]);
    const [availableSlots, setAvailableSlots] = useState([]);

    const details = [
        { Name: 'TOTAL LECTURERS', Icon: 'bi bi-person-fill', value: Object.keys(lecturers).length },
        { Name: 'TOTAL CLASSROOMS', Icon: 'bi bi-geo-alt-fill', value: Object.keys(classrooms).length },
        { Name: 'TOTAL COURSES', Icon: 'bi-journal-bookmark-fill', value: courses },
        { Name: 'AVAILABLE CLASSROOMS', Icon: 'bi bi-clock-fill', value: Object.keys(availableSlots).length },
        { Name: 'AVAILABLE LECTURERS', Icon: 'bi bi-clock-fill', value: Object.keys(availableSlots).length },
    ];

    const workflow = [
        { 
            img: 'https://img.icons8.com/color/48/square-border.png', 
            step: 'STEP 1', 
            title: 'Input Aggregation', 
            text: 'Parsing constraints from lecturers, course loads, and room capacities.', 
            bg: '#acc7ff' 
        },
        { 
            img: 'https://img.icons8.com/doodle/50/apple-settings.png', 
            step: 'STEP 2', 
            title: 'Conflict Search', 
            text: 'Identifying overlaps and resource competition within the proposed slots.', 
            bg: '#1b2340' 
        },
        { 
            img: 'https://img.icons8.com/badges/48/ai-chip.png', 
            step: 'STEP 3', 
            title: 'Heuristic Engine', 
            text: 'Processing rules using Genetic algorithm to find the optimal global state.', 
            bg: '#1b2340' 
        },
        { 
            img: 'https://img.icons8.com/ios-filled/50/verified-account.png', 
            step: 'STEP 4', 
            title: 'Final Output', 
            text: 'Ready-to-use timetable exportable in PDF, iCal, or Excel formats.', 
            bg: '#7fdd7f' 
        }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const lecturersResponse = await axios.get('http://localhost:8000/api/lecturers/');
                setLecturers(lecturersResponse.data.all_lecturers);

                const classroomsResponse = await axios.get('http://localhost:8000/api/classrooms/');
                setClassrooms(classroomsResponse.data.all_rooms);

                const coursesResponse = await axios.get('http://localhost:8000/api/courses/');
                setCourses(coursesResponse.data.count);

                setAvailableSlots(classroomsResponse.data.available_rooms);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="dashboard-shell">
            {/* Welcome Header */}
            <div className="dashboard-welcome">
                <h1>Welcome back, Rex</h1>
                <p>Here's what's happening with your campus schedule</p>
            </div>

            {/* Hero Section */}
            <div className="dashboard-hero">
                <div className="dashboard-hero-content">
                    <div className="dashboard-hero-badge">
                        <i className="bi bi-battery-charging me-2"></i>
                        ACADEMIC SESSION 2025/2026
                    </div>
                    <h1>Automated Campus <br /> Scheduling</h1>
                    <p>
                        Generate conflict-free timetables using heuristic optimization
                        and intelligent resource allocation. Optimize classroom utility and
                        lecturer availability and other campus resources in seconds.
                    </p>
                    <Link to="" className="dashboard-hero-btn">
                        Generate Schedule
                        <i className="bi bi-arrow-right"></i>
                    </Link>
                </div>

                {/* Decorative grid */}
                <div className="dashboard-hero-grid">
                    {[...Array(21)].map((_, i) => (
                        <div 
                            key={i} 
                            className={`cell ${i % 3 === 0 ? 'cell-active' : ''}`}
                        />
                    ))}
                </div>
            </div>

            {/* Stats Cards */}
            <div className="dashboard-stats">
                {details.map(detail => (
                    <div key={detail.Name} className="dashboard-stat-card">
                        <div className="dashboard-stat-icon">
                            <i className={detail.Icon}></i>
                        </div>
                        <p className="dashboard-stat-label">{detail.Name}</p>
                        <p className="dashboard-stat-value">{detail.value || 0}</p>
                    </div>
                ))}
            </div>

            {/* Workflow Section */}
            <div className="dashboard-workflow">
                <div className="dashboard-workflow-header">
                    <div>
                        <h2>Heuristic Engine Workflow</h2>
                        <p>The logical processing sequence for automated generation</p>
                    </div>
                    <div className="dashboard-workflow-badge">
                        V2.4 Optimizer
                    </div>
                </div>

                <div className="dashboard-workflow-grid">
                    {workflow.map((flow) => (
                        <div 
                            key={flow.step} 
                            className="dashboard-workflow-item"
                        >
                            <div 
                                className="dashboard-workflow-icon"
                                style={{ background: flow.bg }}
                            >
                                <img src={flow.img} alt={flow.title} />
                            </div>
                            <p className="dashboard-workflow-step">{flow.step}</p>
                            <h3 className="dashboard-workflow-title">{flow.title}</h3>
                            <p className="dashboard-workflow-text">{flow.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;