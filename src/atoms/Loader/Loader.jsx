import React from "react";
import PropTypes from "prop-types";

import "./Loader.scss";

function Loader({ loading, numberOfBalls, ...otherProps }) {
    if (loading) {
        return (
            <section className="Loader" {...otherProps}>
                <div className="Loader--container">
                    {[...Array(numberOfBalls)].map((_, i) => {
                        if (i === numberOfBalls - 1) {
                            return (
                                <div
                                    key={i}
                                    className="Loader--ball"
                                    style={{
                                        animationDelay: `${0.1 * i}s`,
                                        transform: "rotate(0deg) translateX(0px)",
                                        animation: "bounce-back 1s infinite linear"
                                    }}
                                ></div>
                            );
                        }
                        return <div key={i} className="Loader--ball" style={{ animationDelay: `${0.1 * i}s` }}></div>;
                    })}
                </div>
            </section>
        );
    }
    return <></>;
}

Loader.propTypes = {
    loading: PropTypes.bool.isRequired,
    numberOfBalls: PropTypes.number
};

Loader.defaultProps = {
    numberOfBalls: 5
};

export default Loader;
