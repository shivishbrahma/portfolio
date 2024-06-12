import React from "react";

import { FaBars, FaHome, FaTimes, FaTools, FaBlog } from "react-icons/fa";
import { IoIosDocument } from "react-icons/io";
import logo from "./logo.png";
import logo_text from "./logo_text.svg";
import Navlink from "../../atoms/Navlink/Navlink";
import "./Navbar.scss";

function Navbar(props) {
    const [isNavbarOpen, setIsNavbarOpen] = React.useState(false);

    const [isFixed, setIsFixed] = React.useState(false);

    const handleScroll = () => {
        const scrollTop = window.scrollY;
        if (scrollTop > 50) {
            // Adjust the value based on when you want the header to become fixed
            setIsFixed(true);
        } else {
            setIsFixed(false);
        }
    };

    React.useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav
            className={
                "Navbar" +
                (isFixed && window.innerWidth > 428 ? " Navbar-float" : "") +
                (isFixed && window.innerWidth <= 428 ? " Navbar-fixed" : "") +
                (isNavbarOpen ? " active" : "")
            }
        >
            <div
                role="button"
                className="Navbar-toggler"
                onClick={() => {
                    setIsNavbarOpen(!isNavbarOpen);
                }}
            >
                {isNavbarOpen ? <FaTimes /> : <FaBars />}
            </div>
            <ul
                className="Navbar-list"
                onClick={() => {
                    setIsNavbarOpen(false);
                }}
            >
                <li className="Navbar-item">
                    {/* <a href="#home">Home</a> */}
                    <Navlink to="/">
                        <FaHome className="Navbar-item-icon" title="Home" />
                        <span className="Navbar-item-name">Home</span>
                    </Navlink>
                </li>
                <li className="Navbar-item">
                    <Navlink to="/resume">
                        <IoIosDocument className="Navbar-item-icon" title="Resume" />
                        <span className="Navbar-item-name">Resume</span>
                    </Navlink>
                </li>
                <li className="Navbar-item">
                    <Navlink to="/tools">
                        <FaTools className="Navbar-item-icon" title="Tools" />
                        <span className="Navbar-item-name">Tools</span>
                    </Navlink>
                </li>
                {/* <li className="Navbar-item">
					<Navlink to="/projects">Projects</Navlink>
				</li> */}
                <li className="Navbar-item">
                    <Navlink to="/blogs">
                        <FaBlog className="Navbar-item-icon" title="Blogs" />
                        <span className="Navbar-item-name">Blogs</span>
                    </Navlink>
                </li>
            </ul>
            <div className="Navbar-brand">
                <img src={logo} alt="Brand Icon" className="Navbar-brand-logo" />
                {/* <span className="Navbar-brand-text">Shivishbrahma</span> */}
                <img src={logo_text} alt="Brand Text" className="Navbar-brand-text" />
            </div>
        </nav>
    );
}

Navbar.propTypes = {};

Navbar.defaultProps = {};

export default Navbar;
