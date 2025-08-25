import { Link } from "react-router-dom";
import logo from '../logo.svg';

function Navbar() {
    return (
        <nav className="App-header">
            <Link to="/projects"><img src={logo} style={{ width: '50px', height: '50px' }} alt="Logo" /></Link>
            <p><b>Project Management App</b></p>
            <ul>
                <label htmlFor="activeProj">Show Active Projects</label>
                <input id="activeProj" type="checkbox" />
            </ul>
            <button className="NewBtn">New Project</button>
        </nav>
    )
}

export default Navbar;