import { useState, useEffect, useCallback } from 'react';
import { Alert, Container, Row } from 'react-bootstrap';
import LoadingSpinner from '../loadingSpinner';
import WeatherDisplayData from './weatherDisplayData';
import WeatherDisplayRaw from './weatherDisplayRaw';

// const baseUrl = 'https://weather.dtmcportfolio.info/api/v1/';
// const sourceType = {
// 	combinedweather: {
// 		api: 'CombinedWeather',
// 		location: 'combinedlocation',
// 		latlong: 'combinedlatlong',
// 	},
// 	openweather: {
// 		api: 'OpenWeather',
// 		location: 'geodirect',
// 		latlong: 'directlatlong',
// 	},
// 	weatherapi: {
// 		api: 'WeatherAPI',
// 		location: 'weatherlocation',
// 		latlong: 'weatherlatlong',
// 	},
// };

export default function WeatherDisplay({ weatherFormData }) {
	const [isLoading, setIsLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState(null);
	const [weatherData, setWeatherData] = useState(null);

	// const formUrl = (formData) => {
	// 	const source = sourceType[formData.source];
	// 	if (!formData.source || !source) return null;

	// 	let params = null;

	// 	if (formData.locationType == 'location') {
	// 		params = `${source.location}?location=${formData.location}`;
	// 	}
	// 	if (formData.locationType == 'latlong') {
	// 		params = `${source.latlong}?lat=${formData.latitude}&lon=${formData.longitude}`;
	// 	}

	// 	if (params === null) return null;

	// 	return `${baseUrl}${source.api}/${params}`;
	// };

	const apiUrl = (formData) => {
		let params = null;

		if (formData.locationType == 'location') {
			params = `${formData.location}`;
		}
		if (formData.locationType == 'latlong') {
			params = `${formData.latitude}/${formData.longitude}`;
		}
		if (!params) return null;

		return `/api/weather/${formData.source}/${formData.locationType}/${params}`;
	};

	const fetchWeatherData = useCallback(async (weatherFormData) => {
		setErrorMsg(null);
		setWeatherData(null);
		if (Object.keys(weatherFormData).length > 0) {
			// console.log('weatherFormData:', weatherFormData);
			var url = apiUrl(weatherFormData);
			// console.log('url:', url);
			if (url === null) {
				setErrorMsg('URL creation failed.');
			} else {
				const response = await fetch(url, {
					// mode: 'no-cors',
					headers: {
						'content-Type': 'application/json',
					},
				});
				// console.log('response:', response);
				if (!response.ok) {
					setErrorMsg('Response Error');
				}
				const data = await response.json();
				// setIsLoading(false);
				// console.log('data:', data);
				if (data.Error) {
					if (typeof data.Error == 'string') {
						setErrorMsg(data.Error);
					} else if (typeof data.Error == 'object' && data.Error[0]?.detail !== null) {
						setErrorMsg(data.Error[0]?.detail);
					} else {
						setErrorMsg(JSON.stringify(data.Error, null, 2));
					}
					return;
				}
				setWeatherData(data);

				// setWeatherData({
				// 	apisource: 'OpenWeather',
				// 	temperature: {
				// 		kelvin: 295.33,
				// 		feels_like_kelvin: 295.59,
				// 		pressure_millibar: 1016,
				// 		humidity: 76,
				// 	},
				// 	coord: {
				// 		lat: 43.0538,
				// 		lon: 22.461,
				// 	},
				// 	condition: {
				// 		description: 'few clouds',
				// 		icon: '02d',
				// 		visibility: 10000,
				// 		wind_speed: 0.98,
				// 		wind_degree: 92,
				// 		wind_gust: 0.99,
				// 		precip_mm: null,
				// 		clouds: 17,
				// 	},
				// 	location: {
				// 		name: 'Babušnica',
				// 		country: 'RS',
				// 		localtime: 1717348472,
				// 	},
				// });

				// setWeatherData({});
			}
		}
	}, []);

	useEffect(() => {
		(async function () {
			setIsLoading(true);
			await fetchWeatherData(weatherFormData);
			setIsLoading(false);
		})();
	}, [weatherFormData, fetchWeatherData]);

	return (
		<>
			{errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
			<Container>
				{isLoading && <LoadingSpinner />}
				{weatherData && (
					<div className="flex-wrap">
						<Row>
							<WeatherDisplayData data={weatherData} depth={0} />
						</Row>
					</div>
				)}
				{weatherData && <WeatherDisplayRaw data={weatherData} />}
			</Container>
		</>
	);
}
