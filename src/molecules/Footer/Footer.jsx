import React from "react";
import PropTypes from "prop-types";

import { FaCoffee, FaHeart } from "react-icons/fa";
// import Button from '@/atoms/Button/Button';
import DarkModeToggler from "@/atoms/DarkModeToggler/DarkModeToggler";

import "./Footer.scss";

function Footer({ darkModeToggler, isDark = false, ...otherProps }) {
    return (
        <section className="Footer">
            <div className="Footer__buttons">
                <DarkModeToggler darkModeToggler={darkModeToggler} isDark={isDark} />
            </div>
            <div className="Copyright">
                Made with <FaHeart className="red-heart" /> and <FaCoffee className="green-tea" /> by Purbayan Chowdhury
            </div>
        </section>
    );
}

Footer.propTypes = {
    darkModeToggler: PropTypes.func.isRequired,
    isDark: PropTypes.bool
};

export default Footer;
