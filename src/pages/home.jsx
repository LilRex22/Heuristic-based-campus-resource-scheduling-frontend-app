
function Home(){
    const imgs=['src/assets/me.png', 'src/assets/me2.png', 'src/assets/bijin.jpg', 'src/assets/10062.jpg'];
    return (
        <>
            <div className="container-fluid hero d-flex align-items-center" style={{height: '100vh'}}>
                <div className="row justify-content-between px-4">
                    <div className="col-6">
                        <div className="rounded-5 px-3 fw-bold" style={{width: 'fit-content', padding: '5px', backgroundColor: '#EDF0FF', color: '#0059ba'}}>
                            <i className="bi bi-battery-charging me-2"></i>
                            Next-Generation Academic Logic</div>
                        <h1 className="display-5 fw-bold" style={{color: '#213145'}}>Intelligent Campus <br />
                        <span className="display-4 fw-bold" style={{color: '#0059ba'}}>Resource Scheduling</span></h1>
                        <p style={{color: '#213145'}}>
                            Optimize classrooms, lecturers, laboratories, and campus facilities using heuristic-based scheduling. Eliminate conflicts and
                            maximize facility utilization with a single click.
                        </p>
                        <div className="container ps-0">
                            <a href="#" className="btn btn-primary" style={{backgroundColor: '#0059ba', color: 'white'}}>Get Started</a>
                            <a href="#" className="btn btn-primary ms-2 fw-bold" style={{backgroundColor: 'white', borderColor: '#D7E2FF', color: '#0059ba'}}>View Dashboard</a>
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
                                <p>Trusted by over <span className="fw-bold" style={{color: '#0059ba'}}>2,000 +</span> users.</p>
                            </div>
                        </div>
                    </div>


                    <div className="col-5 rounded-4 shadow p-4" style={{color: '#213145'}}>
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
                            <div className=""></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container d-flex justify-content-evenly mt-2 rounded shadow" style={{color: '#213145'}}>
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
        </>
    )
}

export default Home;