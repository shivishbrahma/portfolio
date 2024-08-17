import React from "react";
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";

import Calendar from "./ActivityCalendar";
// import { Skeleton as CalendarSkeleton } from "./ActivityCalendar"
import { getContributionData } from "@/services/fetchService";
import Loader from "@/atoms/Loader/Loader";

import "./GithubCalendar.scss";

const DEFAULT_THEME = {
    level4: "#216e39",
    level3: "#30a14e",
    level2: "#40c463",
    level1: "#9be9a8",
    level0: "#ebedf0"
};

function GithubCalendar({ username, year = "last", theme = DEFAULT_THEME, showTooltip = true, ...calendarProps }) {
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const fetchData = React.useCallback(() => {
        setLoading(true);
        setError(null);

        getContributionData(username)
            .then((data) => setData(data))
            .catch(setError)
            .finally(() => setLoading(false));
    }, [username]);

    React.useEffect(fetchData, [fetchData]); // on username change

    if (error) {
        return <p>Error :(</p>;
    }

    if (loading || !data) {
        return <Loader loading />;
    }

    const labels = {
        totalCount: `{{count}} contributions in ${year === "last" ? "the last year" : "{{year}}"}`
    };

    return (
        <div className="GithubCalendar">
            <Calendar data={data} theme={theme} labels={labels} {...calendarProps} showWeekdayLabels>
                {showTooltip ? <ReactTooltip html /> : null}
            </Calendar>
        </div>
    );
}

GithubCalendar.propTypes = {
    username: PropTypes.string.isRequired,
    year: PropTypes.string,
    theme: PropTypes.object,
    showTooltip: PropTypes.bool
};

export default GithubCalendar;
