
import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";
import Footer from "./footer";

function DashboardLayout() {
    return (
    <>
        <div className="d-flex flex-column min-vh-100">
        <Sidebar />
        
        {/* main content shifted by the sidebar; content-with-sidebar CSS applies only here */}
        <div className="flex-grow-1 content-with-sidebar">
            <Outlet />
        </div>
        <Footer />
        </div>
    </>
    );
}

export default DashboardLayout;