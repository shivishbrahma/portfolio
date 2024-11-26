import React from "react";
import { useReactToPrint } from "react-to-print";
import { FaPrint } from "react-icons/fa";

import Button from "@/atoms/Button/Button";
import ResumeContent from "./ResumeContent";


function Resume(props) {
    const printableComponentRef = React.useRef(null);
    const handlePrint = useReactToPrint({
        content: () => printableComponentRef.current
    });

    return (
        <section className="Resume" {...props}>
            <div className="Resume-container">
                <ResumeContent ref={printableComponentRef} />
            </div>

            <Button floating={true} theme="primary" onClick={handlePrint}>
                <FaPrint /> Print Resume
            </Button>
        </section>
    );
}

Resume.propTypes = {};

export default Resume;
