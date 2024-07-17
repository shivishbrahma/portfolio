import React from 'react';
import { useReactToPrint } from 'react-to-print';
// import PropTypes from 'prop-types';

import Button from '../../atoms/Button/Button';
import ResumeContent from './ResumeContent';
import { FaPrint } from 'react-icons/fa';

function Resume(props) {
	const printableComponentRef = React.useRef(null);
	const handlePrint = useReactToPrint({
		content: () => printableComponentRef.current,
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

Resume.defaultProps = {};

export default Resume;
