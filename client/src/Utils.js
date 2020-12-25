const Utils = {
	ResolveServerPath: function() {
		let isLocal = window.location.origin.includes('localhost');
		if (isLocal) {
			return 'http://localhost:3000/';
		}
		return 'https://doodetector/';
	}
};
export default Utils;
