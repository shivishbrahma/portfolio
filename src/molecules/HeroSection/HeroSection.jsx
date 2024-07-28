import React from "react";
// import PropTypes from 'prop-types';
import "./HeroSection.scss";
import Typewriter from "../../atoms/Typewriter/Typewriter";
import Animate from "../../atoms/Animate/Animate";

function HeroSection({ ...otherProps }) {
    return (
        <div className="HeroSection" {...otherProps}>
            <div className="HeroSection__image"></div>
            <div className="HeroSection__content">
                <div className="HeroSection__title">
                    Hi! <Animate type="headShake">✋</Animate> <h5>I am,</h5> <Animate element={"h2"} type="pulse" iteration={5}>Purbayan Chowdhury</Animate>
                </div>
                <Typewriter
                    text={["A Web Developer", "A Data Science Enthusiast", "A Coding Geek", "A Number Cruncher"]}
                    displayTextRenderer={(text) => <h4>{text}</h4>}
                    cursorRenderer={(cursor) => <h4>|</h4>}
                />
            </div>
        </div>
    );
}

HeroSection.propTypes = {};

HeroSection.defaultProps = {};

export default HeroSection;
