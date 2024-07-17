import React from "react";
// import PropTypes from 'prop-types';
import { marked } from "marked";

import Loader from "../../atoms/Loader/Loader";
import { loadMockup } from "../../services/fetchService";
import "./Resume.scss";

const ResumeContent = React.forwardRef((props, ref) => {
    const dateFormatter = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short"
    });
    const [resume, setResume] = React.useState({});
    const [loading, setLoading] = React.useState(true);

    const formatHighlights = (highlights) => {
        if (Array.isArray(highlights)) {
            return (
                <ul>
                    {highlights.map((ele, i) => (
                        <li key={i} dangerouslySetInnerHTML={{ __html: marked.parseInline(ele) }} />
                    ))}
                </ul>
            );
        } else if (typeof highlights === "string") {
            return <React.Fragment>{highlights}</React.Fragment>;
        }
    };

    React.useEffect(() => {
        setLoading(true);
        loadMockup("resume").then(function (data) {
            setResume(data);
            setLoading(false);
        });
    }, []);

    if (loading || !resume) return <Loader loading />;

    return (
        <React.Fragment>
            {!loading ? (
                <div className="Resume-content" ref={ref}>
                    <header>
                        <h1 className="Resume-title">
                            {resume.basics.name.split(" ").map((e, i) => {
                                return (
                                    <span className={"shade-" + ((i % 2) + 1)} key={i}>
                                        {e}
                                    </span>
                                );
                            })}
                        </h1>
                        <div className="Resume-title-content">
                            <div>
                                <span>
                                    <a href={resume.basics.website}>{resume.basics.website}</a>
                                </span>
                            </div>
                            <div>
                                <span>
                                    <a href={"tel:" + resume.basics.phone}>{resume.basics.phone}</a>
                                </span>
                                <span>
                                    <a href={"mailto:" + resume.basics.email}>{resume.basics.email}</a>
                                </span>
                            </div>
                        </div>
                    </header>
                    <main>
                        {/* Sidebar */}
                        <aside>
                            {/* My Education */}
                            {resume.education ? (
                                <section className="Resume-section">
                                    <h2 className="Resume-section-title">Education</h2>
                                    <ul className="Resume-section-list">
                                        {resume.education.map((item, index) => (
                                            <li key={index}>
                                                <h3 className="Resume-section-subtitle">
                                                    <a href={item.url ? item.url : "#"}>{item.institution}</a>
                                                </h3>
                                                {item.studyType || item.area ? (
                                                    <h4 className="Resume-section-description">
                                                        {item.studyType} in {item.area}
                                                    </h4>
                                                ) : (
                                                    <></>
                                                )}
                                                <div className="Resume-section-location">
                                                    <span>
                                                        {dateFormatter.format(new Date(item.startDate))} -{" "}
                                                        {item.isCurrentRole
                                                            ? "PRESENT"
                                                            : dateFormatter.format(new Date(item.endDate))}
                                                    </span>{" "}
                                                    | {item.location}
                                                </div>
                                                <p className="Resume-section-content">
                                                    {item.score ? (
                                                        <p>
                                                            {item.score < 10
                                                                ? "GPA: " + item.score + "/10"
                                                                : "Percentage: " + item.score + "%"}
                                                        </p>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            ) : (
                                <></>
                            )}
                            {/* My Links */}
                            {resume.basics.profiles ? (
                                <section className="Resume-section links">
                                    <h2 className="Resume-section-title">Links</h2>
                                    <div className="Resume-section-list">
                                        {resume.basics.profiles.map((item, index) => (
                                            <p key={index}>
                                                <h3 className="Resume-section-subtitle">{item.network}</h3>
                                                <p className="Resume-section-description">
                                                    <a href={item.url} className={item.network.toLowerCase()}>
                                                        {item.username}
                                                    </a>
                                                </p>
                                            </p>
                                        ))}
                                    </div>
                                </section>
                            ) : (
                                <></>
                            )}
                            {/* My Skills  */}
                            {resume.skills ? (
                                <section className="Resume-section skills">
                                    <h2 className="Resume-section-title">Skills</h2>
                                    <ul className="Resume-section-list">
                                        {resume.skills.map((item, index) => (
                                            <React.Fragment key={index}>
                                                <h3 className="Resume-section-subtitle">{item.name}</h3>
                                                {item.keywords.map((ele, index) => (
                                                    <span className="Resume-section-skill" key={index}>
                                                        {ele}
                                                    </span>
                                                ))}
                                            </React.Fragment>
                                        ))}
                                    </ul>
                                </section>
                            ) : (
                                <></>
                            )}
                            {/* My Languages */}
                            {resume.languages ? (
                                <section className="Resume-section languages">
                                    <h2 className="Resume-section-title">Languages</h2>
                                    <div className="Resume-section-list">
                                        {resume.languages.map((language, index) => (
                                            <p>
                                                <span className="Resume-section-subtitle">{language.language}</span> -
                                                <span className=""> {language.fluency}</span>
                                            </p>
                                        ))}
                                    </div>
                                </section>
                            ) : (
                                <></>
                            )}
                        </aside>

                        {/* Main */}
                        <article>
                            {/* My Experience */}
                            {resume.work ? (
                                <section className="Resume-section experience">
                                    <h2 className="Resume-section-title">Experience</h2>
                                    <ul className="Resume-section-list">
                                        {resume.work.map((item, index) => (
                                            <li key={index}>
                                                <h3 className="Resume-section-subtitle">
                                                    <a href={item.url ?? "#"}>{item.company}</a>
                                                </h3>
                                                <h4 className="Resume-section-description">{item.position}</h4>
                                                <div className="Resume-section-location">
                                                    <span>
                                                        {dateFormatter.format(new Date(item.startDate))} -{" "}
                                                        {item.isCurrentRole
                                                            ? "PRESENT"
                                                            : dateFormatter.format(new Date(item.endDate))}
                                                    </span>{" "}
                                                    | {item.location}
                                                </div>
                                                <p className="Resume-section-content">
                                                    {item.highlights ? (
                                                        <>{formatHighlights(item.highlights)}</>
                                                    ) : (
                                                        <>{item.summary}</>
                                                    )}
                                                </p>
                                                {item.keywords ? (
                                                    <div className="Resume-section-keywords">
                                                        <strong>Keywords: </strong>
                                                        <span>{item.keywords.join(", ")}</span>
                                                    </div>
                                                ) : (
                                                    <></>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            ) : (
                                <></>
                            )}
                            {/* My Projects */}
                            {resume.projects ? (
                                <section className="Resume-section projects">
                                    <h2 className="Resume-section-title">Projects</h2>
                                    <ul className="Resume-section-list">
                                        {resume.projects.map((item, index) => (
                                            <li key={index}>
                                                <h3 className="Resume-section-subtitle">{item.name}</h3>
                                                <h4 className="Resume-section-description">{item.summary}</h4>
                                                <div className="Resume-section-location">
                                                    {item.startDate && item.endDate ? (
                                                        <>
                                                            <span>
                                                                {dateFormatter.format(new Date(item.startDate))} -{" "}
                                                                {dateFormatter.format(new Date(item.endDate))}
                                                            </span>{" "}
                                                            |
                                                        </>
                                                    ) : (
                                                        " "
                                                    )}
                                                    {item.primaryLanguage}
                                                </div>
                                                <p className="Resume-section-content">
                                                    <a href={item.repositoryUrl ? item.repositoryUrl : "#"}>
                                                        {item.repositoryUrl}
                                                    </a>
                                                    <p>
                                                        {item.highlights ? (
                                                            <>{formatHighlights(item.highlights)}</>
                                                        ) : (
                                                            <>{item.summary}</>
                                                        )}
                                                    </p>
                                                </p>
                                                {item.keywords ? (
                                                    <div className="Resume-section-keywords">
                                                        <strong>Keywords: </strong>
                                                        <span>{item.keywords.join(", ")}</span>
                                                    </div>
                                                ) : (
                                                    <></>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            ) : (
                                <></>
                            )}
                            {/* My Certificates */}
                            {resume.certificates ? (
                                <section className="Resume-section certificates">
                                    <h2 className="Resume-section-title">Certificates</h2>
                                    <ul className="Resume-section-list">
                                        {resume.certificates.map((certificate, index) => (
                                            <li key={index}>
                                                <h3 className="Resume-section-subtitle">
                                                    <a href={certificate.url ?? "#"}>{certificate.name}</a>
                                                </h3>
                                                <h4 className="Resume-section-description">
                                                    {certificate.issuer} | Credential ID: {certificate.id}
                                                </h4>
                                                <div className="Resume-section-location">
                                                    Issued: {dateFormatter.format(new Date(certificate.date))} |{" "}
                                                    {certificate.expiryDate
                                                        ? dateFormatter.format(new Date(certificate.expiryDate))
                                                        : "Never expires"}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            ) : (
                                <></>
                            )}
                            {/* My Awards */}
                            {resume.awards ? <></> : <></>}
                            {/* My Publications */}
                            {resume.publications ? <></> : <></>}
                        </article>
                    </main>
                </div>
            ) : (
                "Loading the resume..."
            )}
        </React.Fragment>
    );
});

ResumeContent.propTypes = {};

export default ResumeContent;
