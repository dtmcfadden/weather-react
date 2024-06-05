console.log('Load Script');

const handleLocationChange = (e) => {
	console.log('e:', e.target.value);
	const locationForm = document.getElementById('locationForm');
	const latlongForm = document.getElementById('latlongForm');
	const hideCss = 'display: none !important';
	switch (e.target.value) {
		case 'latlong':
			locationForm.style.cssText = hideCss;
			latlongForm.style.display = '';
			break;
		default:
			locationForm.style.display = '';
			latlongForm.style.cssText = hideCss;
			break;
	}
};

document.getElementById('formLocationType').onchange = handleLocationChange;
