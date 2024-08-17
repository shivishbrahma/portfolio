import React from "react";
import PropTypes from "prop-types";
import { IoMdSunny, IoIosMoon } from "react-icons/io";

import "./DarkModeToggler.scss";

function DarkModeToggler({ darkModeToggler, isDark = false, ...otherProps }) {
    const [toggleIcon, setToggleIcon] = React.useState(isDark ? <IoIosMoon /> : <IoMdSunny />);

    React.useEffect(() => {
        const toggleIconTimer = setTimeout(() => {
            setToggleIcon(isDark ? <IoIosMoon /> : <IoMdSunny />);
        }, 1250);

        return () => clearTimeout(toggleIconTimer);
    }, [isDark]);

    return (
        <div
            role="button"
            className={"Button__default DarkModeToggler" + (isDark ? " DarkModeToggler__dark" : "")}
            onClick={() => {
                darkModeToggler();
            }}
            title="Dark Mode Toggler"
            {...otherProps}
        >
            <span className="icon">{toggleIcon}</span>
        </div>
    );
}

DarkModeToggler.propTypes = {
    darkModeToggler: PropTypes.func.isRequired,
    isDark: PropTypes.bool
};

export default DarkModeToggler;
