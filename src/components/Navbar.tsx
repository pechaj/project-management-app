import { Link } from "react-router-dom";
import logo from '../assets/logo.svg';

function Navbar() {
    return (
        <nav className="navbar navbar-dark bg-dark">
            <Link className="navbar-brand" to="/projects"><img src={logo} style={{ width: '50px', height: '50px' }} alt="Logo" /></Link>
            <p className="navbar-text"><b>Project Management App</b></p>
            <Link className="btn btn-primary navbar-toggler" to="/projects/new">New Project</Link>
        </nav>
    )
}

export default Navbar;