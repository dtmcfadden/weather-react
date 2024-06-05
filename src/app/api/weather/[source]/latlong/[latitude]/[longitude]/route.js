import { getWeatherUrl } from '@/lib/weatherService';
import { getHttpData } from '@/lib/httpService';

export async function GET(req, { params }) {
	var url = getWeatherUrl(params);
	if (!url) {
		return Response.json({ Error: 'Failed to generate url.' });
	}

	var returnData = await getHttpData(url);

	return Response.json(returnData);
}
