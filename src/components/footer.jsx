function Footer(){
    return (
        <footer className="container-fluid shadow p-3 d-lg-flex d-column justify-content-lg-between justify-content-center" style={{marginTop: '100px', backgroundColor: 'white'}}>
            <div className="d-flex gap-4 justify-content-center">
                <h5><span style={{color: '#0059ba'}}>Smart</span>Slot</h5>
                <p className="text-black-50">&copy; 2026 Campus Resource Scheduler</p>
            </div>
            <div className="d-flex justify-content-center">
                <a href="#" className="text-black-50 me-3">Privacy Policy</a>
                <a href="#" className="text-black-50 me-3">Support</a>
                <a href="#" className="text-black-50 me-3">Contact</a>
            </div>
        </footer>
    )
}

export default Footer;