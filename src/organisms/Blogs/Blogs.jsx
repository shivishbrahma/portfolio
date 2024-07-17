import { parseISO } from 'date-fns';
import React from 'react';

import Loader from "../../atoms/Loader/Loader";
import Card from '../../atoms/Card/Card';
import { loadMockup } from '../../services/fetchService';
import './Blogs.scss';

export default function Blogs() {
	const [blogWebs, setBlogWebs] = React.useState([]);
	const [blogs, setBlogs] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

	React.useEffect(() => {
        setLoading(true);
		loadMockup('blogs').then(function (data) {
			setBlogWebs(data.blog_websites);
		});
		loadMockup('blogs').then(function (data) {
            setLoading(false);
			const sortedBlogs = data.blogs.sort((a, b) => {
				return parseISO(b.date) - parseISO(a.date);
			});
			if (sortedBlogs.length > 12) {
				setBlogs(sortedBlogs.slice(0, 12));
			} else setBlogs(sortedBlogs);
		});
	}, []);

    if (loading) return <Loader loading />;

	return (
		<section className="Blogs">
			<h1 className="Blogs__title">Blogs</h1>
			<div className="Card-list">
				{blogWebs.length > 0
					? blogWebs.map((blogWeb, index) => {
							return (
								<Card key={index} cardImg={<img src={blogWeb.icon} alt={blogWeb.title + ' Cover'} />}>
									<h5 className="BlogWeb__title">
										<a href={blogWeb.url} target="_blank" rel="noreferrer">
											{blogWeb.title}
										</a>
									</h5>
									{/* <p className="Tool__description">{tool.description}</p> */}
								</Card>
							);
					  })
					: 'There are currently no tools to show'}
			</div>
			<h2 className="Blogs_title">Recent Posts</h2>
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
		</section>
	);
}
