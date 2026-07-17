// ...existing code...
import Nav from 'react-bootstrap/Nav';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
    const location = useLocation();

    // these links are nested links under Dashboard, they shouldn't start with '/' because that would make them absolute paths and they won't be nested under the dashboard route; 
    const links = [
    { label: 'Home', path: '/', icon: 'bi-house-fill' },
    { label: 'Dashboard', path: '/dashboard', icon: 'bi-bar-chart-line-fill' },
    { label: 'Lecturers', path: '/dashboard/lecturers', icon: 'bi-person-badge-fill' },
    { label: 'Classrooms', path: '/dashboard/classrooms', icon: 'bi-building' },
    { label: 'Courses', path: '/dashboard/courses', icon: 'bi-journal-bookmark-fill' },
    { label: 'Schedule', path: '/dashboard/schedule', icon: 'bi-calendar-event' },
    { label: 'Resources', path: '/dashboard/resources', icon: 'bi-box-seam' },
    { label: 'Timetable', path: '/dashboard/timetable', icon: 'bi-clock' }
    ];

    return (
    // only visible on large screens: hidden on xs-md, shows as flex on lg+
    <aside className="d-none d-lg-flex flex-column sidebar" style={{ borderRadius: '0' }}>
        <div className="sidebar-brand pb-3 py-2">
            <div className="px-2 p-1 rounded-2" style={{backgroundColor: '#e8a33d'}}>
                <i className="bi-mortarboard-fill fs-4"></i>
            </div>
            
            <span className="fw-bold" style={{ color: '#0059ba' }}>Smart<span style={{ color: '#213145' }}>Slot</span></span>
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