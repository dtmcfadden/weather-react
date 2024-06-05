import Script from 'next/script';
import { getWeatherUrl } from '@/lib/weatherService';
import { getHttpData } from '@/lib/httpService';

const sourceOptions = {
	combinedweather: 'Combined Weather',
	openweather: 'Open Weather',
	weatherapi: 'Weather API',
};

const locationOptions = {
	location: 'Location',
	latlong: 'Latitude Longitude',
};

const baseUrl = 'https://weather.dtmcportfolio.info/api/v1/';
const sourceType = {
	combinedweather: {
		api: 'CombinedWeather',
		location: 'combinedlocation',
		latlong: 'combinedlatlong',
	},
	openweather: {
		api: 'OpenWeather',
		location: 'geodirect',
		latlong: 'directlatlong',
	},
	weatherapi: {
		api: 'WeatherAPI',
		location: 'weatherlocation',
		latlong: 'weatherlatlong',
	},
};

export default async function WeatherDataForm() {
	// const formUrl = (formData) => {
	// 	'use server';
	// 	const source = sourceType[formData.get('source')];
	// 	if (!formData.get('source') || !source) return null;

	// 	let params = null;

	// 	if (formData.get('locationType') == 'location') {
	// 		params = `${source.location}?location=${formData.get('location')}`;
	// 	}
	// 	if (formData.get('locationType') == 'latlong') {
	// 		params = `${source.latlong}?lat=${formData.get('latitude')}&lon=${formData.get('longitude')}`;
	// 	}

	// 	if (params === null) return null;

	// 	return `${baseUrl}${source.api}/${params}`;
	// };

	const handleSubmit = async (formData) => {
		'use server';

		var params = {
			source: formData.get('source'),
			location: formData.get('location'),
			latitude: formData.get('latitude'),
			longitude: formData.get('longitude'),
		};
		var url = getWeatherUrl(params);
		if (!url) {
			return { Error: 'Failed to generate url.' };
		}

		var returnData = await getHttpData(url);

		// e.preventDefault();
		// console.log('formData:', formData);
		// console.log('sourceType:', sourceType);

		// const source = sourceType[formData.get('source')];
		// // console.log('source:', source);
		// if (!formData.get('source') || !source) return null;

		// let params = null;

		// if (formData.get('locationType') == 'location') {
		// 	params = `${source.location}?location=${formData.get('location')}`;
		// }
		// if (formData.get('locationType') == 'latlong') {
		// 	params = `${source.latlong}?lat=${formData.get('latitude')}&lon=${formData.get('longitude')}`;
		// }
		// // console.log('params:', params);
		// if (params === null) return null;

		// // console.log(`${baseUrl}${source.api}/${params}`);

		// // const formData = new FormData(event.target)
		// const response = await fetch(`${baseUrl}${source.api}/${params}`, {
		// 	// mode: 'no-cors',
		// 	headers: {
		// 		'content-Type': 'application/json',
		// 	},
		// });
		// // console.log('response:', response);
		// const data = await response.json();
		// console.log('data:', data);
	};

	return (
		<div className="container">
			<form action={handleSubmit}>
				<div className="d-flex flex-wrap">
					<div className="m-2">
						<label htmlFor="formSelectSource" className="form-label">
							Select Source
						</label>
						<select id="formSelectSource" name="source" className="form-select">
							{Object.keys(sourceOptions).map((key) => (
								<option key={key} value={key}>
									{sourceOptions[key]}
								</option>
							))}
						</select>
					</div>
					<div className="m-2">
						<label htmlFor="formLocationType" className="form-label">
							Select Location Type
						</label>
						<select id="formLocationType" name="locationType" className="form-select">
							{Object.keys(locationOptions).map((key) => (
								<option key={key} value={key}>
									{locationOptions[key]}
								</option>
							))}
						</select>
					</div>

					<div className="m-2" id="locationForm">
						<label htmlFor="formLocation" className="form-label">
							Select Location Type
						</label>
						<input type="text" name="location" className="form-control" placeholder="Enter Location" />
					</div>

					<div className="d-flex flex-wrap" id="latlongForm" style={{ display: 'none !important' }}>
						<div className="m-2">
							<label htmlFor="formLatitude" className="form-label">
								Latitude
							</label>
							<input type="number" name="latitude" className="form-control" placeholder="Enter Latitude" />
						</div>
						<div className="m-2">
							<label htmlFor="formLongitude" className="form-label">
								Longitude
							</label>
							<input type="number" name="longitude" className="form-control" placeholder="Enter Longitude" />
						</div>
					</div>

					<div className="m-2">
						<button type="submit" className="btn btn-primary">
							Submit
						</button>
					</div>
				</div>
			</form>
			<Script src={'/scripts/weatherscript.js'} />
		</div>
	);
}
