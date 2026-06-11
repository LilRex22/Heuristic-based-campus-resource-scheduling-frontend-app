import { Link } from "react-router-dom";

function Dashboard() {
    const details = [
        { Name: 'TOTAL LECTURERS', Icon: 'bi bi-person-fill' },
        { Name: 'CLASSROOMS', Icon: 'bi bi-geo-alt-fill'},
        { Name: 'COURSES', Icon: 'bi-journal-bookmark-fill'},
        { Name: 'DEPARTMENTS', Icon: 'bi bi-building-fill'},
        { Name: 'AVAILABLE SLOTS', Icon: 'bi bi-clock-fill'},
        { Name: 'SUCCESS RATE', Icon: 'bi bi-patch-check-fill'}
    ]

    const workflow = [
        { img: 'https://img.icons8.com/color/48/square-border.png', step: 'STEP 1', title: 'Input Aggregation', text: ' Parsing constraints from lecturers, course loads, and room capacities.', bg: '#d3e4fe' },
        { img: 'https://img.icons8.com/doodle/50/apple-settings.png', step: 'STEP 2', title: 'Conflict Search', text: 'Identifying overlaps and resource competition within the proposed slots.', bg: '#0b1c30' },
        { img: 'https://img.icons8.com/badges/48/ai-chip.png', step: 'STEP 3', title: 'Heuristic Engine', text: 'Processing rules using Genetic algorithm to find the optimal global state.', bg: '#0b1c30' },
        { img: 'https://img.icons8.com/ios-filled/50/verified-account.png', step: 'STEP 4', title: 'Final Output', text: 'Ready-to-use timetable exportable in PDF, iCal, or Excel formats.', bg: 'rgb(127, 221, 127)' }
    ]

    return (
        <>  
            <div className="p-3">
                <h1 className="text-dark fw-bold mt-4">Welcome back, Rex</h1>
                <div className="text-white p-4 border rounded-4" style={{backgroundColor: '#0b1c30'}}>
                    <div className="w-75">
                        <div className="rounded-5 px-3 fw-bold mb-3" style={{width: 'fit-content', padding: '5px', backgroundColor: '#EDF0FF', color: '#0059ba'}}>
                            <i className="bi bi-battery-charging me-2"></i>
                            ACADEMIC SESSION 2025/2026
                        </div>
                        <h1 className="display-4 fw-bold mb-4">Automated Campus <br /> Scheduling</h1>
                        <p>Generate conflict-free timetables using heuristic optimization
                            and intelligent resource allocation. Optimize classroom utility and 
                            lecturer availability and other campus resources in seconds.
                        </p>
                        <div className="">
                            <Link to="" className="btn btn-primary mt-4">Generate Schedule</Link>
                            {/* <Link to="" className=""></Link> */}
                        </div>
                    </div>
                </div>

                <div className="row mt-5">
                    { details.map(detail => {
                        return (
                            <div className="col-lg-2 border rounded-2 bg-white">
                                <div className="p-2 my-2 border rounded-2" style={{backgroundColor: '#d3e4fe', width: 'fit-content'}}>
                                    <i className={detail.Icon}></i>
                                </div>
                                <p className="fw-bold text-muted mt-3">{detail.Name}</p>
                                <p className="fs-1">0</p>
                            </div>
                        )
                    })}
                    
                </div>

                <div className="border rounded-3 bg-white mt-5 p-4">
                    <div className="d-lg-flex justify-content-between align-items-center">
                        <div className="">
                            <h2>Heuristic Engine Workflow</h2>
                            <p>The logical processing sequence for automated generation</p>
                        </div>
                        <div className="">
                            <strong className='p-2 border rounded-2' style={{backgroundColor: '#d3e4fe'}}>V2.4 Optimizer</strong>
                        </div>
                    </div>

                    <div className="row mt-5">
                        {workflow.map(flow => {
                            return (
                                <div className="col-lg-3 text-center p-3" style={{borderRight: '1px solid rgb(215, 218, 236)'}}>
                                    <div className="p-2 rounded-circle shadow mb-4" style={{backgroundColor: flow.bg, width: 'fit-content', margin: '0 auto'}}>
                                        <img src={flow.img} alt="icon" />
                                    </div>
                                    <text className="mb-3 fw-bold">{flow.step}</text>
                                    <h3 className="mb-3">{flow.title}</h3>
                                    <p>{flow.text}</p>
                                </div>
                            )
                        })}
                        
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-lg-6">
                        <div className="d-flex justify-content-between align-items-center bg-white p-1">
                            <h3>
                                <i className="bi bi-award-fill me-1"></i>
                                Featured Lecturers</h3>
                            <Link>View All</Link>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="d-flex justify-content-between align-items-center bg-white p-1">
                            <h3>
                                <i className="bi bi-exclamation-circle me-1"></i>
                                Priority Rooms</h3>
                            <Link>View All</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Dashboard;