import React from "react";
import GithubCalendar from "../../atoms/GithubCalendar/GithubCalendar";
import { createCalendarTheme } from "../../atoms/GithubCalendar/util";
import PageSection from "../../atoms/PageSection/PageSection";
// import { ThemeSelectorContext } from "../../organisms/App/theme";
// import PropTypes from 'prop-types'
import "./GithubSection.scss";

function GithubSection(props) {
    // const { theme } = React.useContext(ThemeSelectorContext);

    const calendarTheme = createCalendarTheme("#6f00ff", "#f2e5ff");

    return (
        <PageSection sectionTitle="Github">
            <GithubCalendar username="shivishbrahma" showTooltip theme={calendarTheme} />
        </PageSection>
    );
}

GithubSection.propTypes = {};

export default GithubSection;
