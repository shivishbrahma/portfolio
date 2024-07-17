import React from 'react';

import { loadMockup } from '../../services/fetchService';
import Card from '../../atoms/Card/Card';
import Loader from "../../atoms/Loader/Loader";
import Netstats from '../../tools/Netstats/Netstats';
import './Tools.scss';

export default function Tools(props) {
	const [currentTool, setCurrentTool] = React.useState('');
	const [tools, setTools] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

	React.useEffect(() => {
        setLoading(true);
		loadMockup('tools').then(function (data) {
			const sortedTools = data.tools.sort((a, b) => {
				return a.name.localeCompare(b.name);
			});
			setTools(sortedTools);
            setLoading(false);
		});
		setCurrentTool(window.location.hash.split('/').pop());
	}, []);

	if (currentTool === 'netstats') {
		return <Netstats />;
	}

	const { ...otherProps } = props;

    if (loading || !tools) return <Loader loading />;

	return (
		<section className="Tools" {...otherProps}>
			<h1 className="Tools__title">Tools</h1>
			<div className="Card-list">
				{tools.length > 0
					? tools.map((tool, index) => {
							return (
								<Card key={index} cardImg={<img src={tool.img_url} alt={tool.name + ' Cover'} />}>
									<h5 className="Tool__title">
										<a href={tool.url} target="_blank" rel="noreferrer">
											{tool.name}
										</a>
									</h5>
									<p className="Tool__description">{tool.description}</p>
								</Card>
							);
					  })
					: 'There are currently no tools to show'}
			</div>
		</section>
	);
}
