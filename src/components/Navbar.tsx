import { Link } from "react-router-dom";
import logo from "@assets/logo.svg";

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <Link className="navbar-brand" to="/projects">
        <span
          aria-label="Logo"
          className="logo"
          role="img"
          style={{
            display: "inline-block",
            width: "50px",
            height: "50px",
            backgroundImage: `url(${logo})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />
      </Link>
      <p className="navbar-text">
        <b>Project Management App</b>
      </p>
      <Link className="btn btn-primary navbar-toggler" to="/projects/new">
        New Project
      </Link>
    </nav>
  );
}

export default Navbar;
