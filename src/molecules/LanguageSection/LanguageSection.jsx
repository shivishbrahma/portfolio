import React from "react";
import Globe3D from "../../atoms/Globe3D/Globe3D";
import PageSection from "../../atoms/PageSection/PageSection";
// import PropTypes from "prop-types";

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
            <Globe3D tags={elems} radius={150} />
        </PageSection>
    );
}

LanguageSection.propTypes = {};

export default LanguageSection;
