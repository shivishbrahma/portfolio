import React from "react";
import PropTypes from "prop-types";

function Cursor({ cursor = "|", cursorRenderer = null, cursorClassName = "", ...otherProps }) {
    return (
        <React.Fragment>
            <span className={cursorClassName + " Typewriter__cursor"} {...otherProps}>
                {cursorRenderer ? cursorRenderer(cursor) : cursor}
            </span>
        </React.Fragment>
    );
}

Cursor.propTypes = {
    cursor: PropTypes.string,
    cursorClassName: PropTypes.string,
    cursorRenderer: PropTypes.func
};

export default Cursor;
