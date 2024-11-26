import React from "react";
import PropTypes from "prop-types";
import "./Globe3D.scss";
import { FaPlay, FaPause } from "react-icons/fa";
import Button from "../Button/Button";

const Globe3DTag = React.forwardRef(
    (
        {
            text,
            id,
            weight,
            alpha,
            scale,
            left,
            top,
            useItemInlineStyles,
            useHTML,
            position,
            itemClassName,
            ...otherProps
        },
        tagRef
    ) => {
        return (
            <span
                className={"Globe3D__tag " + itemClassName}
                style={
                    useItemInlineStyles
                        ? {
                              willChange: "transform, opacity, filter",
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              zIndex: id + 1,
                              filter: `alpha(opacity=${100 * alpha})`,
                              opacity: alpha,
                              transformOrigin: "50% 50%",
                              transform: `translate3d(${left.endsWith("%") ? left : `${left}px`}, ${
                                  top.endsWith("%") ? top : `${top}px`
                              }, 0) scale(${scale})`
                          }
                        : {}
                }
                {...otherProps}
                ref={tagRef}
            >
                {text}
            </span>
        );
    }
);

Globe3DTag.propTypes = {
    text: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    weight: PropTypes.number.isRequired,
    useItemInlineStyles: PropTypes.bool,
    itemClassName: PropTypes.string,
    useHTML: PropTypes.bool,
    position: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number, z: PropTypes.number }),
    scale: PropTypes.string,
    alpha: PropTypes.string,
    left: PropTypes.string,
    top: PropTypes.string
};

Globe3DTag.defaultProps = {
    useItemInlineStyles: true,
    itemClassName: "",
    useHTML: false,
    position: { x: 0, y: 0, z: 0 },
    scale: "1",
    alpha: "1",
    left: "-50%",
    top: "-50%"
};

const Globe3D = ({
    tags,
    radius = 100,
    maximumSpeed = "normal",
    initialSpeed = "normal",
    direction = 90,
    keep = true,
    reverseDirection = false,
    useContainerInlineStyles = true,
    useItemInlineStyles = true,
    useHTML = false,
    containerClassName = "",
    itemClassName = "",
    ...otherProps
}) => {
    const globRef = React.useRef();
    const depth = React.useMemo(() => radius * 2, [radius]);
    const size = React.useMemo(() => radius * 1.5, [radius]);
    const initSpeed = React.useMemo(() => ({ slow: 16, normal: 32, fast: 80 }[initialSpeed] || 32), [initialSpeed]);
    const maxSpeed = React.useMemo(() => ({ slow: 0.5, normal: 1, fast: 2 }[maximumSpeed] || 1), [maximumSpeed]);
    const mouseX0 = React.useMemo(() => initSpeed * Math.sin((direction * Math.PI) / 180), [direction, initSpeed]);
    const mouseY0 = React.useMemo(() => initSpeed * Math.cos((direction * Math.PI) / 180), [direction, initSpeed]);
    const [paused, setPaused] = React.useState(false);
    const [active, setActive] = React.useState(false);
    const globTagsRef = React.useRef([]);
    const [interval, setInterval] = React.useState(null);
    const [mouseX, setMouseX] = React.useState(mouseX0);
    const [mouseY, setMouseY] = React.useState(mouseY0);
    const [globTags, setGlobTags] = React.useState([]);

    function getNextFrame() {
        if (
            paused ||
            globTagsRef.current.length === 0 ||
            globTagsRef.current.length !== tags.length ||
            globTags.length === 0 ||
            !globTags[0].position
        ) {
            return;
        }

        // If keep is disabled, pause rolling after moving mouse out area
        if (!keep && !active) {
            setMouseX(Math.abs(mouseX - mouseX0) < 1 ? mouseX0 : (mouseX + mouseX0) / 2);
            setMouseY(Math.abs(mouseY - mouseY0) < 1 ? mouseY0 : (mouseY + mouseY0) / 2);
        }

        let a = -(Math.min(Math.max(-mouseY, -size), size) / radius) * maxSpeed;
        let b = (Math.min(Math.max(-mouseX, -size), size) / radius) * maxSpeed;

        // If reverseDirection is enabled, reverse the direction
        if (reverseDirection) {
            a = -a;
            b = -b;
        }

        // If paused
        if (Math.abs(a) <= 0.01 && Math.abs(b) <= 0.01) {
            return;
        }

        // Calculate the offset
        const l = Math.PI / 180;
        const sc = [Math.sin(a * l), Math.cos(a * l), Math.sin(b * l), Math.cos(a * l)];

        const newGlobTags = globTags.map((tag, index) => {
            const rx1 = tag.position.x;
            const ry1 = tag.position.y * sc[1] - tag.position.z * sc[0];
            const rz1 = tag.position.y * sc[0] + tag.position.z * sc[1];

            const rx2 = rx1 * sc[3] + ry1 * sc[2];
            const ry2 = ry1;
            const rz2 = rz1 * sc[3] - rx1 * sc[2];

            const per = (2 * depth) / (2 * depth + rz2); // TODO

            let alpha = per * per - 0.25;
            alpha = (alpha > 1 ? 1 : alpha).toFixed(3);

            const left = (rx2 - globTagsRef.current[index].offsetWidth / 2).toFixed(2);
            const top = (ry2 - globTagsRef.current[index].offsetHeight / 2).toFixed(2);

            return {
                ...tag,
                position: {
                    x: rx2,
                    y: ry2,
                    z: rz2
                },
                scale: per.toFixed(3),
                alpha,
                left,
                top
            };
        });

        setGlobTags(newGlobTags);
    }

    function computePosition(index, random = false) {
        const tagsLength = tags.length;
        if (random) {
            index = Math.floor(Math.random() * (tagsLength + 1));
        }
        const phi = Math.acos(-1 + (2 * index) / tagsLength);
        const theta = Math.sqrt(tagsLength * Math.PI) * phi;
        return {
            x: (size * Math.cos(theta) * Math.sin(phi)) / 2,
            y: (size * Math.cos(theta) * Math.cos(phi)) / 2,
            z: (size * Math.sin(phi)) / 2
        };
    }

    function handlePause(evt) {
        evt.preventDefault();
        setPaused(!paused);
    }

    React.useEffect(() => {
        setGlobTags(tags.map((tag, index) => ({ ...tag, position: computePosition(index) })));

        const isTouchDevice = "ontouchstart" in window;
        if (!isTouchDevice && globRef.current) {
            globRef.current.addEventListener("mouseover", (e) => {
                setActive(true);
            });

            globRef.current.addEventListener("mouseout", (e) => {
                setActive(false);
            });

            // TODO: Use of keep
            globRef.current.addEventListener("mousemove", (e) => {
                const rect = globRef.current.getBoundingClientRect();
                setMouseX((e.clientX - (rect.left + rect.width / 2)) / 5);
                setMouseY((e.clientY - (rect.top + rect.height / 2)) / 5);
            });
        }

        // getNextFrame();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        setInterval(
            setTimeout(() => {
                getNextFrame();
            }, 10)
        );

        return () => {
            interval && clearTimeout(interval);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [globTags]);

    React.useEffect(() => {
        setGlobTags(tags.map((tag, index) => ({ ...tag, position: computePosition(index + 1) })));
    }, [tags]);

    return (
        <div className="Globe3D">
            <div
                className={"Globe3D__container " + containerClassName}
                style={
                    useContainerInlineStyles
                        ? {
                              position: "relative",
                              width: `${2 * radius}px`,
                              height: `${2 * radius}px`
                          }
                        : {}
                }
                ref={globRef}
            >
                {globTags.map((globTag, i) => {
                    return (
                        <Globe3DTag
                            key={i}
                            itemClassName={itemClassName}
                            useHTML={useHTML}
                            useItemInlineStyles={useItemInlineStyles}
                            {...globTag}
                            id={i + 1}
                            ref={(ref) => (globTagsRef.current[i] = ref)}
                        />
                    );
                })}
            </div>

            <div className="Globe3D__actions">
                <Button
                    className="Globe3D__action"
                    theme="secondary"
                    onClick={(evt) => handlePause(evt)}
                    title={paused ? "Resume" : "Pause"}
                >
                    {paused ? <FaPause size={12} /> : <FaPlay size={12} />}
                </Button>
            </div>
        </div>
    );
};

Globe3D.propTypes = {
    tags: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string,
            weight: PropTypes.number
        })
    ).isRequired,
    radius: PropTypes.number,
    maximumSpeed: PropTypes.oneOf(["normal", "slow", "fast"]),
    initialSpeed: PropTypes.oneOf(["normal", "slow", "fast"]),
    direction: PropTypes.number,
    keep: PropTypes.bool,
    reverseDirection: PropTypes.bool,
    useContainerInlineStyles: PropTypes.bool,
    useItemInlineStyles: PropTypes.bool,
    useHTML: PropTypes.bool,
    containerClassName: PropTypes.string,
    itemClassName: PropTypes.string
};
export default Globe3D;
