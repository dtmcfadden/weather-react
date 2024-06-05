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

export const getWeatherUrl = (params) => {
	const source = sourceType[params.source];
	if (!params.source || !source) return null;

	let urlParams = null;

	if (params.location) {
		urlParams = `${source.location}?location=${params.location}`;
	}
	if (params.latitude && params.longitude) {
		urlParams = `${source.latlong}?latitude=${params.latitude}&longitude=${params.longitude}`;
	}

	if (urlParams === null) return null;

	return `${baseUrl}${source.api}/${urlParams}`;
};
