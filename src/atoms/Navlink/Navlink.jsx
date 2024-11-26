import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './Navlink.scss';

const Navlink = React.forwardRef((props, ref) => {
	return (
		<NavLink
			{...props}
			ref={ref}
			className={({ isActive }) =>
				[props.className, 'Navlink', isActive ? 'Navbar__active' : ''].filter(Boolean).join(' ')
			}
		/>
	);
});

Navlink.propTypes = {
	to: PropTypes.string.isRequired,
	children: PropTypes.node,
};

export default Navlink;
