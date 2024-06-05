export const getHttpData = async (url) => {
	const response = await fetch(url, {
		// mode: 'no-cors',
		headers: {
			'content-Type': 'application/json',
		},
	});
	// console.log('response:', response);
	if (!response.ok) {
		return await response.json();
	}
	const data = await response.json();
	//setIsLoading(false);
	// console.log('data:', data);
	if (data.Error) {
		return { Error: data.Error[0].detail };
	}
	return data;
};
