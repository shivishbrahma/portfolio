import React from "react";
import PropTypes from "prop-types";

import "./Button.scss";

function Button({
    className,
    children,
    floating = false,
    floatingLocation = "bottom_right",
    theme = "default",
    type = "button",
    ...otherProps
}) {
    const buttonThemeClass = " Button__" + (theme ? theme : "primary"),
        floatingLocationClass = " Button__floating__" + (floatingLocation ? floatingLocation : "left");
    if (type === "link") {
        return (
            <a
                href="#btn"
                {...otherProps}
                className={
                    className +
                    " Button" +
                    buttonThemeClass +
                    floatingLocationClass +
                    (floating ? " Button__floating" : "")
                }
            >
                {children}
            </a>
        );
    }
    return (
        <button
            type={type}
            {...otherProps}
            className={
                className + " Button" + buttonThemeClass + floatingLocationClass + (floating ? " Button__floating" : "")
            }
        >
            {children}
        </button>
    );
}

Button.propTypes = {
    type: PropTypes.string,
    floating: PropTypes.bool,
    children: PropTypes.node.isRequired,
    theme: PropTypes.oneOf([
        "default",
        "primary",
        "secondary",
        "success",
        "error",
        "warning",
        "info",
        "tertiary",
        "light",
        "dark"
    ]),
    floatingLocation: PropTypes.string
};

export default Button;
