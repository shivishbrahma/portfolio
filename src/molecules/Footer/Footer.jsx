import React from 'react';
import PropTypes from 'prop-types';
import './Footer.scss';
import { FaCoffee, FaHeart } from 'react-icons/fa';
// import Button from '../../atoms/Button/Button';
import DarkModeToggler from "../../atoms/DarkModeToggler/DarkModeToggler";

function Footer({ darkModeToggler, isDark, ...otherProps }) {
	return (
		<section className="Footer">
			<div className="Footer__buttons">
                <DarkModeToggler
                    darkModeToggler={darkModeToggler}
                    isDark={isDark}
                />
			</div>
			<div className="Copyright">
				Made with <FaHeart className="red-heart" /> and <FaCoffee className="green-tea" /> by Purbayan Chowdhury
			</div>
		</section>
	);
}

Footer.propTypes = {
	darkModeToggler: PropTypes.func.isRequired,
};

Footer.defaultProps = {
	isDark: false,
};

export default Footer;
