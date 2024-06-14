import React from "react";
import PropTypes from "prop-types";
import tinycolor from "tinycolor2";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import getYear from "date-fns/getYear";
import parseISO from "date-fns/parseISO";

import styles from "./styles.module.css";

import {
    generateEmptyData,
    getClassName,
    getMonthLabels,
    getTheme,
    groupByWeeks,
    MIN_DISTANCE_MONTH_LABELS,
    NAMESPACE,
    DEFAULT_WEEKDAY_LABELS,
    DEFAULT_LABELS
} from "./util.js";

function ActivityCalendar({
    data,
    blockMargin,
    blockRadius,
    blockSize,
    children,
    color,
    dateFormat,
    eventHandlers,
    fontSize,
    hideColorLegend,
    hideMonthLabels,
    hideTotalCount,
    labels: labelsProp,
    loading,
    showWeekdayLabels,
    style,
    theme: themeProp,
    weekStart
}) {
    if (loading) data = generateEmptyData();

    if (data.length === 0) return null;

    const weeks = groupByWeeks(data, weekStart);
    const totalCount = data.reduce((sum, day) => sum + day.count, 0);
    const year = getYear(parseISO(data[0].date));

    const theme = getTheme(themeProp, color);
    const labels = Object.assign({}, DEFAULT_LABELS, labelsProp);
    const textHeight = hideMonthLabels ? 0 : fontSize + 2 * blockMargin;

    function getDimensions() {
        return {
            width: weeks.length * (blockSize + blockMargin) - blockMargin,
            height: textHeight + (blockSize + blockMargin) * 7 - blockMargin
        };
    }

    function getTooltipMessage(contribution) {
        const date = format(parseISO(contribution.date), dateFormat);
        return `<strong>${contribution.count} contributions</strong> on ${date}`;
    }

    function getEventHandlers(data) {
        return Object.keys(eventHandlers).reduce(
            (handlers, key) => ({
                ...handlers,
                [key]: (event) => eventHandlers[key].event(data)
            }),
            {}
        );
    }

    function renderLabels() {
        const style = {
            fontSize
        };

        if (!showWeekdayLabels && hideMonthLabels) {
            return null;
        }

        return (
            <>
                {showWeekdayLabels && (
                    <g className={getClassName("legend-weekday")} style={style}>
                        {weeks[1].map((day, y) => {
                            if (!day || y % 2 === 0) {
                                return null;
                            }

                            const dayIndex = getDay(parseISO(day.date));

                            return (
                                <text
                                    x={-2 * blockMargin}
                                    y={textHeight + (fontSize / 2 + blockMargin) + (blockSize + blockMargin) * y}
                                    textAnchor="end"
                                    key={day.date}
                                >
                                    {labels.weekdays ? labels.weekdays[dayIndex] : DEFAULT_WEEKDAY_LABELS[dayIndex]}
                                </text>
                            );
                        })}
                    </g>
                )}
                {!hideMonthLabels && (
                    <g className={getClassName("legend-month")} style={style}>
                        {getMonthLabels(weeks, labels.months).map(({ text, x }, index, labels) => {
                            // Skip the first month label if there's not enough space to the next one
                            if (index === 0 && labels[1] && labels[1].x - x <= MIN_DISTANCE_MONTH_LABELS) {
                                return null;
                            }

                            return (
                                <text x={(blockSize + blockMargin) * x} alignmentBaseline="hanging" key={x}>
                                    {text}
                                </text>
                            );
                        })}
                    </g>
                )}
            </>
        );
    }

    function renderBlocks() {
        return weeks
            .map((week, weekIndex) =>
                week.map((day, dayIndex) => {
                    if (!day) {
                        return null;
                    }

                    const style = loading
                        ? {
                              animation: `${styles.loadingAnimation} 1.5s ease-in-out infinite`,
                              animationDelay: `${weekIndex * 20 + dayIndex * 20}ms`
                          }
                        : undefined;

                    return (
                        <rect
                            {...getEventHandlers(day)}
                            x={0}
                            y={textHeight + (blockSize + blockMargin) * dayIndex}
                            width={blockSize}
                            height={blockSize}
                            fill={theme[`level${day.level}`]}
                            rx={blockRadius}
                            ry={blockRadius}
                            className={styles.block}
                            data-date={day.date}
                            data-tip={children ? getTooltipMessage(day) : undefined}
                            key={day.date}
                            style={style}
                        />
                    );
                })
            )
            .map((week, x) => (
                <g key={x} transform={`translate(${(blockSize + blockMargin) * x}, 0)`}>
                    {week}
                </g>
            ));
    }

    function renderFooter() {
        if (hideTotalCount && hideColorLegend) {
            return null;
        }

        return (
            <footer className={getClassName("footer", styles.footer)} style={{ marginTop: 2 * blockMargin, fontSize }}>
                {/* Placeholder */}
                {loading && <div>&nbsp;</div>}

                {!loading && !hideTotalCount && (
                    <div className={getClassName("count")}>
                        {labels.totalCount
                            ? labels.totalCount
                                  .replace("{{count}}", String(totalCount))
                                  .replace("{{year}}", String(year))
                            : `${totalCount} contributions in ${year}`}
                    </div>
                )}

                {!loading && !hideColorLegend && (
                    <div className={getClassName("legend-colors", styles.legendColors)}>
                        <span style={{ marginRight: "0.4em" }}>{labels.legend.less ?? "Less"}</span>
                        {Array(5)
                            .fill(undefined)
                            .map((_, index) => (
                                <svg width={blockSize} height={blockSize} key={index}>
                                    <rect
                                        width={blockSize}
                                        height={blockSize}
                                        fill={theme[`level${index}`]}
                                        rx={blockRadius}
                                        ry={blockRadius}
                                    />
                                </svg>
                            ))}
                        <span style={{ marginLeft: "0.4em" }}>{labels.legend.more ?? "More"}</span>
                    </div>
                )}
            </footer>
        );
    }

    const { width, height } = getDimensions();
    const additionalStyles = {
        maxWidth: width,
        // Required for correct colors in CSS loading animation
        [`--${NAMESPACE}-loading`]: theme.level0,
        [`--${NAMESPACE}-loading-active`]: tinycolor(theme.level0).darken(8).toString()
    };

    return (
        <article className={NAMESPACE} style={{ ...style, ...additionalStyles }}>
            <svg
                width={width}
                height={height}
                viewBox={`0 0 ${width} ${height}`}
                className={getClassName("calendar", styles.calendar)}
            >
                {!loading && renderLabels()}
                {renderBlocks()}
            </svg>
            {renderFooter()}
            {children}
        </article>
    );
}

ActivityCalendar.propTypes = {
    blockMargin: PropTypes.number,
    blockRadius: PropTypes.number,
    blockSize: PropTypes.number,
    children: PropTypes.node,
    dateFormat: PropTypes.string,
    fontSize: PropTypes.number,
    hideColorLegend: PropTypes.bool,
    hideMonthLabels: PropTypes.bool,
    hideTotalCount: PropTypes.bool,
    labels: PropTypes.shape({
        legend: PropTypes.shape({
            less: PropTypes.string,
            more: PropTypes.string
        }),
        totalCount: PropTypes.string
    }),
    loading: PropTypes.bool,
    theme: PropTypes.shape({
        level0: PropTypes.string,
        level1: PropTypes.string,
        level2: PropTypes.string,
        level3: PropTypes.string,
        level4: PropTypes.string,
        level5: PropTypes.string
    })
};

ActivityCalendar.defaultProps = {
    blockMargin: 4,
    blockRadius: 2,
    blockSize: 12,
    color: undefined,
    dateFormat: "MMM do, yyyy",
    eventHandlers: {},
    fontSize: 14,
    hideColorLegend: false,
    hideMonthLabels: false,
    hideTotalCount: false,
    loading: false,
    showWeekdayLabels: false,
    style: {},
    weekStart: 0
};

export const Skeleton = (props) => <ActivityCalendar data={[]} {...props} />;

export default ActivityCalendar;
