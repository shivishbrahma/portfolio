import React from 'react';
import Card from '../../atoms/Card/Card';
import PageSection from '../../atoms/PageSection/PageSection';
import { loadMockup } from '../../services/fetchService';
import { parseISO } from 'date-fns';

import './BlogSection.scss';

export default function BlogSection({ ...otherProps }) {
	const [blogs, setBlogs] = React.useState([]);

	React.useEffect(() => {
		loadMockup('blogs').then(function (data) {
            const sortedBlogs = data.blogs.sort((a, b) => {
                return parseISO(b.date) - parseISO(a.date);
            });
			if (sortedBlogs.length > 12) {
				setBlogs(sortedBlogs.slice(0, 12));
			} else setBlogs(sortedBlogs);
		});
	}, []);

	return (
		<PageSection sectionTitle="Featured Blogs" {...otherProps}>
			<div className="Card-list">
				{blogs
					? blogs.map((blog, index) => {
							return (
								<Card key={index} cardImg={<img src={blog.img_url} alt={blog.title + ' Cover'} />}>
									<h5 className="Blog__title">
										<a href={blog.url} target="_blank" rel="noreferrer">
											{blog.title}
										</a>
									</h5>
									<p className="Blog__description">{blog.description}</p>
								</Card>
							);
					  })
					: 'There are currently no blogs to show'}
			</div>
		</PageSection>
	);
}
