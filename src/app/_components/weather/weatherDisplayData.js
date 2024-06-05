import { useState, useEffect, Fragment } from 'react';
import { Card, Row, Col } from 'react-bootstrap';

export default function WeatherDisplayData({ data, depth }) {
	const [isArray, setIsArray] = useState(Array.isArray(data).toString());
	const [typeofObj, setTypeofObj] = useState(data instanceof Object);

	if (!data) {
		return null;
	}

	if (isArray === 'true') {
		return (
			<>
				{data.map((key, idx) => (
					<Col key={depth + key + idx} className="border">
						{key}
					</Col>
				))}
			</>
		);
	}

	return (
		<>
			{Object.keys(data).map((key, idx) => (
				<Fragment key={idx + Math.random()}>
					{(typeof data[key] !== 'object' || data[key] === null) && (
						<Col key={depth + key + idx} className="border">
							<Row className="flex-nowrap">
								<Col key={0} className="fw-bold">{`${key}:`}</Col>
								<Col key={1} className="text-end">{`${data[key]?.toString() ?? ''}`}</Col>
							</Row>
						</Col>
					)}
					{typeof data[key] === 'object' && data[key] !== null && (
						<Col key={depth + key + idx}>
							<Card>
								<Card.Body>
									<Card.Title>{key}</Card.Title>
									<div className="d-flex flex-wrap">
										<Row>
											<WeatherDisplayData data={data[key]} depth={depth++} />
										</Row>
									</div>
								</Card.Body>
							</Card>
						</Col>
					)}
				</Fragment>
			))}
		</>
	);
}
