import "./App.css"

function Navbar({ image }) {
    return (
        <nav className="App-header">
            <img src={image} style={{ width: '50px', height: '50px' }} alt="Logo" />
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