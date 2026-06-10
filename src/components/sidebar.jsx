// ...existing code...
import Nav from 'react-bootstrap/Nav';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
    const location = useLocation();

    const links = [
    { label: 'Dashboard', path: '/dashboard', icon: 'bi-house-fill' },
    { label: 'Lecturers', path: '/lecturers', icon: 'bi-person-badge-fill' },
    { label: 'Classrooms', path: '/classrooms', icon: 'bi-building' },
    { label: 'Courses', path: '/courses', icon: 'bi-journal-bookmark-fill' },
    { label: 'Schedule', path: '/schedule', icon: 'bi-calendar-event' },
    { label: 'Resources', path: '/resources', icon: 'bi-box-seam' },
    { label: 'Timetable', path: '/timetable', icon: 'bi-clock' }
    ];

    return (
    // only visible on large screens: hidden on xs-md, shows as flex on lg+
    <aside className="d-none d-lg-flex flex-column sidebar" style={{ borderRadius: '0' }}>
        <div className="sidebar-brand pb-3 py-2">
            <img src="https://img.icons8.com/glyph-neue/64/graduation-cap.png" alt="logo" width="28" height="28" />
            <span className="ms-2 fw-bold" style={{ color: '#0059ba' }}>Smart<span style={{ color: '#213145' }}>Slot</span></span>
        </div>

        <Nav className="flex-column px-2 mt-3">
            {links.map(link => (
            <Nav.Link
                as={Link}
                to={link.path}
                key={link.path}
                className={location.pathname === link.path ? 'active' : 'inactive'}
            >
                <i className={`bi ${link.icon} me-2`}></i>
                {link.label}
            </Nav.Link>
            ))}
        </Nav>
    </aside>
    );
}

export default Sidebar;
// ...existing code...