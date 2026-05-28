import NavigationBar from "./navbar";
import {Outlet} from 'react-router-dom';


function Layout(){
    return(
        <>
            <div className="d-flex flex-column min-vh-100">
                <NavigationBar />
                <div className="flex-grow-1">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default Layout;