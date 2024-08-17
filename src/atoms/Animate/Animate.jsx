import React from "react";
import PropTypes from "prop-types";
import "animate.css";
import "./Animate.scss";

const animationNames = [
    "bounce",
    "flash",
    "pulse",
    "rubberBand",
    "shakeX",
    "shakeY",
    "headShake",
    "swing",
    "tada",
    "wobble",
    "jello",
    "heartBeat",
    "backInDown",
    "backInLeft",
    "backInRight",
    "backInUp",
    "backOutDown",
    "backOutLeft",
    "backOutRight",
    "backOutUp",
    "bounceIn",
    "bounceInDown",
    "bounceInLeft",
    "bounceInRight",
    "bounceInUp",
    "bounceOut",
    "bounceOutDown",
    "bounceOutLeft",
    "bounceOutRight",
    "bounceOutUp",
    "fadeIn",
    "fadeInDown",
    "fadeInDownBig",
    "fadeInLeft",
    "fadeInLeftBig",
    "fadeInRight",
    "fadeInRightBig",
    "fadeInUp",
    "fadeInUpBig",
    "fadeInTopLeft",
    "fadeInTopRight",
    "fadeInBottomLeft",
    "fadeInBottomRight",
    "fadeOut",
    "fadeOutDown",
    "fadeOutDownBig",
    "fadeOutLeft",
    "fadeOutLeftBig",
    "fadeOutRight",
    "fadeOutRightBig",
    "fadeOutUp",
    "fadeOutUpBig",
    "fadeOutTopLeft",
    "fadeOutTopRight",
    "fadeOutBottomRight",
    "fadeOutBottomLeft",
    "flip",
    "flipInX",
    "flipInY",
    "flipOutX",
    "flipOutY",
    "lightSpeedInRight",
    "lightSpeedInLeft",
    "lightSpeedOutRight",
    "lightSpeedOutLeft",
    "rotateIn",
    "rotateInDownLeft",
    "rotateInDownRight",
    "rotateInUpLeft",
    "rotateInUpRight",
    "rotateOut",
    "rotateOutDownLeft",
    "rotateOutDownRight",
    "rotateOutUpLeft",
    "rotateOutUpRight",
    "hinge",
    "jackInTheBox",
    "rollIn",
    "rollOut",
    "zoomIn",
    "zoomInDown",
    "zoomInLeft",
    "zoomInRight",
    "zoomInUp",
    "zoomOut",
    "zoomOutDown",
    "zoomOutLeft",
    "zoomOutRight",
    "zoomOutUp",
    "slideInDown",
    "slideInLeft",
    "slideInRight",
    "slideInUp",
    "slideOutDown",
    "slideOutLeft",
    "slideOutRight",
    "slideOutUp"
];

const animationIterations = ["infinite", ...Array.from({ length: 10 }).map((_, i) => i + 1)];
function Animate({ children, element = "div", type = "bounce", iteration = "infinite", ...otherProps }) {
    // Added animation_names as css
    React.useEffect(() => {
        let styles = "";

        // Add animation names
        for (const animateName of animationNames) {
            styles += `.Animate__${animateName} { animation-name: ${animateName}; }`;
        }

        // Add animation durations
        for (const animateIteration of animationIterations) {
            styles += `.Animate__iteration__${animateIteration} { animation-iteration-count: ${animateIteration}; }`;
        }

        const styleSheet = document.createElement("style", { type: "text/css" });
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    });

    return React.createElement(
        element,
        { className: `Animate Animate__${type} Animate__iteration__${iteration}`, ...otherProps },
        children
    );
}

Animate.propTypes = {
    type: PropTypes.oneOf(animationNames).isRequired,
    iteration: PropTypes.oneOf(animationIterations)
};

export default Animate;
