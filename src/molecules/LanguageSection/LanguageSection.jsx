import React from "react";
// import Globe3D from "../../atoms/Globe3D/Globe3D";
import PageSection from "../../atoms/PageSection/PageSection";
// import PropTypes from "prop-types";
import { TagCloud } from "@frank-mayer/react-tag-cloud";

function LanguageSection({ ...otherProps }) {
    const elems = [
        { text: "Javascript", weight: 1 },
        { text: "Python", weight: 1 },
        { text: "Java", weight: 1 },
        { text: "SCSS", weight: 1 },
        { text: "HTML", weight: 1 },
        { text: "PHP", weight: 1 },
        { text: "MySQL", weight: 1 }
    ];

    return (
        <PageSection sectionTitle="Programming Languages" {...otherProps}>
            {/* <Globe3D tags={elems} radius={150} /> */}
            <TagCloud
                options={(w) => ({
                    radius: Math.min(500, w.innerWidth, w.innerHeight) / 2,
                    maxSpeed: "fast"
                })}
                onClick={(tag, evt) => alert(tag)}
                onClickOptions={{ passive: true }}
            >
                {elems.map((elem) => elem.text)}
            </TagCloud>
        </PageSection>
    );
}

LanguageSection.propTypes = {};

export default LanguageSection;
