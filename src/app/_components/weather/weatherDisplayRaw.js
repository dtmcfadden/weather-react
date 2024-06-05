import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

export default function WeatherDisplayRaw({ data }) {
	return (
		<>
			<code>{data && JSON.stringify(data, null, 2)}</code>
		</>
	);
}
