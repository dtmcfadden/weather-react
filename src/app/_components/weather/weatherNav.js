'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Tabs, Tab } from 'react-bootstrap';
import { useState, useEffect } from 'react';

export default function WeatherNav() {
	const [links, _] = useState({
		combinedweather: {
			link: '/weather/combinedweather',
			display: 'Combined Weather',
		},
		openweather: {
			link: '/weather/openweather',
			display: 'Open Weather',
		},
		weatherapi: {
			link: '/weather/weatherapi',
			display: 'Weather API',
		},
	});
	const pathname = usePathname();

	return (
		<Tabs className="mb-3">
			{Object.keys(links).map((key) => (
				<Tab
					key={key}
					className={`link ${pathname === links[key].link ? 'active' : ''}`}
					eventKey={key}
					title={links[key].display}
				>
					<Link href={links[key].link}>{links[key].display}</Link>
				</Tab>
			))}
		</Tabs>
	);
}
