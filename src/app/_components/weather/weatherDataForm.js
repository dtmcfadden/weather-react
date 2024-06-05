'use client';

import { Container, Form, Stack, Button } from 'react-bootstrap';
import { useState, useEffect, useCallback } from 'react';
import WeatherDisplay from './weatherDisplay';
import LoadingSpinner from '../loadingSpinner';

const sourceOptions = {
	combinedweather: 'Combined Weather',
	openweather: 'Open Weather',
	weatherapi: 'Weather API',
};

const locationOptions = {
	location: 'Location',
	latlong: 'Latitude Longitude',
};

export default function WeatherDataForm() {
	const [validated, setValidated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedLocation, setSelectedLocation] = useState('location');
	const [weatherFormData, setWeatherFormData] = useState({});
	const [locationValue, setLocationValue] = useState('');
	const [longitudeValue, setLongitudeValue] = useState('');
	const [latitudeValue, setLatitudeValue] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		setWeatherFormData(null);
		if (!isLoading) {
			setIsLoading(true);
			const form = e.currentTarget;
			// console.log('form:', form);
			if (form.checkValidity() === false) {
				setIsLoading(false);
				e.stopPropagation();
			}

			setValidated(true);
			setIsLoading(false);

			const formData = new FormData(form);
			// console.log('formData:', formData);
			const formProps = Object.fromEntries(formData);
			// console.log('formProps:', formProps);
			setWeatherFormData(formProps);
		}
	};

	return (
		<Container>
			<Form noValidate validated={validated} onSubmit={handleSubmit}>
				<Stack direction="horizontal" gap={3} className="d-flex flex-wrap">
					<div className="p-2">
						<Form.Group>
							<Form.Label>Select Source</Form.Label>
							<Form.Select name="source" size="sm" aria-label="Select Source">
								{Object.keys(sourceOptions).map((key) => (
									<option key={key} value={key}>
										{sourceOptions[key]}
									</option>
								))}
							</Form.Select>
						</Form.Group>
					</div>
					<div className="p-2">
						<Form.Group>
							<Form.Label>Select Location Type</Form.Label>
							<Form.Select
								name="locationType"
								size="sm"
								aria-label="Select Location"
								onChange={(e) => setSelectedLocation(e.target.value)}
							>
								{Object.keys(locationOptions).map((key) => (
									<option key={key} value={key}>
										{locationOptions[key]}
									</option>
								))}
							</Form.Select>
						</Form.Group>
					</div>
					<div className="p-2 d-flex flex-wrap">
						{selectedLocation === 'location' && (
							<Form.Group className="mx-1" controlId="formLocation">
								<Form.Label>Location</Form.Label>
								<Form.Control
									name="location"
									type="text"
									placeholder="Enter Location"
									required
									minLength={3}
									onChange={(e) => setLocationValue(e.target.value)}
									value={locationValue}
								/>
								<Form.Control.Feedback type="invalid">
									Enter valid location longer than 2 characters
								</Form.Control.Feedback>
							</Form.Group>
						)}
						{selectedLocation === 'latlong' && (
							<>
								<Form.Group className="mx-1" controlId="formLatitude">
									<Form.Label>Latitude</Form.Label>
									<Form.Control
										name="latitude"
										type="number"
										placeholder="Enter Latitude"
										style={{ minWidth: 180 }}
										onChange={(e) => setLatitudeValue(e.target.value)}
										value={latitudeValue}
										required
										min={-90}
										max={90}
									/>
									<Form.Control.Feedback type="invalid">Enter latitude between -90 and 90.</Form.Control.Feedback>
								</Form.Group>

								<Form.Group className="mx-1" controlId="formLongitude">
									<Form.Label>Longitude</Form.Label>
									<Form.Control
										name="longitude"
										type="number"
										placeholder="Enter Longitude"
										style={{ minWidth: 180 }}
										onChange={(e) => setLongitudeValue(e.target.value)}
										value={longitudeValue}
										required
										min={-120}
										max={120}
									/>
									<Form.Control.Feedback type="invalid">Enter longitude between -120 and 120.</Form.Control.Feedback>
								</Form.Group>
							</>
						)}
					</div>
					<div className="p-2">
						<Button variant="primary" type="submit">
							Submit
						</Button>
					</div>
				</Stack>
			</Form>
			{isLoading && <LoadingSpinner />}
			<WeatherDisplay weatherFormData={weatherFormData} />
		</Container>
	);
}
