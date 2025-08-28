import { Link } from "react-router-dom";
import logo from '../logo.svg';

function Navbar() {
    return (
        <nav className="navbar navbar-dark bg-dark">
            <Link className="navbar-brand" to="/projects"><img src={logo} style={{ width: '50px', height: '50px' }} alt="Logo" /></Link>
            <p className="navbar-text"><b>Project Management App</b></p>
            <button className="btn btn-primary navbar-toggler">New Project</button>
        </nav>
    )
}

export default Navbar;