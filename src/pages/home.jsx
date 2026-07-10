import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../components/auth";




function Home(){
    const navigate = useNavigate();
    const imgs=['src/assets/me.png', 'src/assets/me2.png', 'src/assets/bijin.jpg', 'src/assets/10062.jpg'];
    
    const handleGetStarted = () => {
        if (isAuthenticated()) {
            navigate("/dashboard");
        } else {
            navigate("/login");
        }
    };

    return (
        <>
            <div className="container-fluid hero d-flex align-items-center" style={{height: '100vh'}}>
                <div className="row justify-content-between px-4">
                    <div className="col-lg-6">
                        <div className="rounded-5 px-3 fw-bold" style={{width: 'fit-content', padding: '5px', backgroundColor: '#EDF0FF', color: '#0059ba'}}>
                            <i className="bi bi-battery-charging me-2"></i>
                            Next-Generation Academic Logic</div>
                        <h1 className="display-5 fw-bold text-white">Intelligent Campus <br />
                        <span className="display-4 fw-bold" style={{color: '#0059ba'}}>Resource Scheduling</span></h1>
                        <p className="text-white">
                            Optimize classrooms, lecturers, laboratories, and campus facilities using heuristic-based scheduling. Eliminate conflicts and
                            maximize facility utilization with a single click.
                        </p>
                        <div className="container ps-0 mt-4">
                            <button onClick={handleGetStarted} className="btn btn-primary border-0" style={{backgroundColor: '#0059ba', color: 'white'}}>Get Started</button>
                            <a href="#" className="btn btn-primary ms-2 fw-bold border-0" style={{backgroundColor: 'white', color: '#0059ba'}}>User Guide</a>
                        </div>
                        <div className="mt-5">
                            <div className="mt-3 d-flex  " style={{width: 'fit-content'}}>
                                {imgs.map((img, index) => (
                                    <div key={index} className="p-1" style={{height: '50px', width: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                        <img src={img} alt="profiles"  height={"100%"} width={"100%"} style={{objectFit: 'cover', borderRadius: '100%',transform: `translateX(${index * -15}px)`}}/>
                                    </div>
                                ))}
                            </div>
                            <div className="">
                                <p className="text-white">Trusted by over <span className="fw-bold" style={{color: '#ac6300'}}>2,000 +</span> users.</p>
                            </div>
                        </div>
                    </div>


                    <div className="col-lg-5 rounded-4 shadow p-4" style={{color: '#213145', backgroundColor: 'white'}}>
                        <div className="d-flex justify-content-between align-items-center">
                            <h5 style={{color: '#213145'}}>Weekly Time Grid</h5>
                            <div className="d-flex gap-1">
                                <div className="" style={{borderRadius: '50%', backgroundColor: '#ba1a1a', height: '10px', width: '10px'}}></div>
                                <div className="" style={{borderRadius: '50%', backgroundColor: 'orange', height: '10px', width: '10px'}}></div>
                                <div className="" style={{borderRadius: '50%', backgroundColor: 'green', height: '10px', width: '10px'}}></div>
                            </div>
                        </div>
                        <div className="">
                            <div className="rounded-4 p-4 mt-4" style={{backgroundColor: '#D3E4FE'}}>
                                <div style={{backgroundColor: '#0059ba', width: 'fit-content', padding: '5px 10px', borderRadius: '20px'}}>
                                    <img height={30} width={30} src="src\assets\icons8-meeting-room-ios-17-outlined-32.png" alt="meeting-room"/>
                                </div>
                                <h3>Math Hall</h3>
                                <p>Statistical Methods . <span className="fw-bold">10:00 AM</span></p>
                            </div>
                            <div className="rounded-4 p-4 mt-2" style={{backgroundColor: '#f8f9ff'}}>
                                <div className="text-center" style={{backgroundColor: '#ac6300', width: '50px', padding: '5px 10px', borderRadius: '20px'}}>
                                    <i className="bi bi-map text-white fs-5"></i>
                                </div>
                                <h3>Campus Map</h3>
                                <p>Live occupancy tracking</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container d-flex justify-content-evenly mt-5 rounded shadow" style={{color: '#213145', backgroundColor: 'white'}}>
                <div className="text-center p-2" style={{width: '33.3%'}}>
                    <h5 className="display-4 fw-bold rounded-5" style={{color: '#0059ba'}}>95%</h5>
                    <p>Efficiency Gain</p>
                </div>
                <div className="text-center p-2" style={{ width: '33.3%'}}>  
                    <h5 className="display-4 fw-bold rounded-5" style={{color: '#0059ba'}}>200+</h5>
                    <p>Classes Scheduled</p>
                </div>
                <div className="text-center p-2" style={{width: '33.3%'}}>
                    <h5 className="display-4 fw-bold rounded-5" style={{color: '#0059ba'}}>1.2M</h5>
                    <p>Students Served</p>
                </div>
                <div className="text-center p-2" style={{width: '33.3%'}}>
                    <h5 className="display-4 fw-bold rounded-5" style={{color: '#0059ba'}}>12K</h5>
                    <p>Daily Bookings</p>
                </div>
            </div>
            <div className="mx-5" style={{color: '#213145', width: '45%', marginTop: '150px'}}>
                <h2 className="fw-bold">Designed for the Modern Academic Life</h2>
                <p>We've removed the stress and friction of campus scheduling.
                    No more overlapping bookings or missing classrooms. Optimizeed for real-time
                    management of campus resources, providing scalable solution for campuses.
                </p>
            </div>
            <div className="mx-5" style={{marginTop: '100px'}}>
                <div className="row mx-1 gap-4 justify-content-center">
                    <div className="col-lg-8  rounded-4 p-4" style={{ backgroundColor: '#d3e4fe'}}>
                        <div className="w-75" >
                            <i className="bi bi-calendar fs-3" style={{color: '#0059ba'}}></i>
                            <h3 className="fw-bold mt-4">Intelligent Personal Schedule</h3>
                            <p className="mt-4">Our heuristic-based algorithm tailor resource scheduling to its
                                finest. From optimization and proper scheduling of campus resources
                                to multiple resource evaluation and positioning to ensure that life is made
                                easier for both lecturers and students.
                            </p>
                        </div>
                        <div className="">
                            <img src="src\assets\workspace.jpg" alt="workspace" className="img-fluid " style={{objectFit: 'cover', borderRadius: '15px'}}/>
                        </div>
                    </div>
                    <div className="col-lg-3 rounded-4 p-4 text-white d-flex flex-column justify-content-lg-between" style={{backgroundColor: '#0059ba'}}>
                        <div className="">
                            <i className="bi bi-battery-charging me-2 fs-1"></i>
                            <h3 className="fw-bold mt-1">Real-time Updates</h3>
                            <p className="mt-4">Instant notification for room changes or lecturer availability.
                                Stay ahead of every change.
                            </p>
                        </div>
                        <div className="">
                            <a href="" className="nav-link">Learn about Heuristics
                                <i className="bi bi-arrow-right ms-2"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mx-5" style={{marginTop: '100px'}}>
                <div className="row justify-content-center p-3 gap-2">
                    <div className="col-lg-3 rounded-3 shadow p-4 mt-3 mt-lg-0" style={{backgroundColor: '#f8f9ff'}}>
                        <div className="">
                            <i className="bi bi-building fs-2 text-center text-white" style={{backgroundColor: '#ac6300', width: '50px', padding: '5px 10px', borderRadius: '20px'}}></i>
                        </div>
                        <h3 className="mt-3">Resource Booking</h3>
                        <p>Reserve study rooms, laboratories, lecturers with just a click.</p>
                    </div>
                    <div className="col-lg-3 rounded-3 shadow p-4 mt-3 mt-lg-0" style={{backgroundColor: '#f8f9ff'}}>
                        <div className="">
                            <i className="bi bi-exclamation-triangle-fill fs-2 text-center " style={{backgroundColor: '#d3e4fe', width: '50px', padding: '5px 10px', borderRadius: '20px'}}></i>
                        </div>
                        <h3 className="mt-3">Conflict Detection</h3>
                        <p>Prevent overlapping classes, lecturer clashes and duplicate
                            room allocations automatically.
                        </p>
                    </div>
                    <div className="col-lg-3 rounded-3 shadow p-4 mt-3 mt-lg-0" style={{backgroundColor: '#f8f9ff'}}>
                        <div className="">
                            <i className="bi bi-graph-up-arrow fs-2 text-center text-white " style={{backgroundColor: '#0059ba', width: '50px', padding: '5px 10px', borderRadius: '20px'}}></i>
                        </div>
                        <h3 className="mt-3">Optimized Resoure Usage</h3>
                        <p>Reduce resource wastage and improve institutional productivity
                            through balanced scheduling.
                        </p>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <div className="rounded-4 text-center p-5" style={{marginTop: '100px', backgroundColor: '#0b1c30', width: 'fit-content'}}>
                    <h3 className="fw-bold text-white">Ready to optimize your campus life?</h3>
                    <p className="text-white-50 mt-4">
                        Join thousands of students and faculty <br />members who have already 
                        simplified their schedules.
                    </p>
                    <div className="ps-0 mt-5">
                        <button onClick={() => (isAuthenticated()) ? navigate('/schedule') : navigate('/login')} className="btn btn-primary border-0" style={{backgroundColor: '#0059ba', color: 'white'}}>Start Scheduling</button>
                        {/* <a href="#" className="btn btn-primary ms-2 fw-bold" style={{border: 'none', backgroundColor: 'white', color: '#0059ba'}}>View Dashboard</a> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;