const Utils = {
	ResolveServerPath: function() {
		let isLocal = window.location.origin.includes('localhost');
		if (isLocal) {
			return 'http://localhost:3000/';
		}
		return 'https://doodinform.herokuapp.com/';
	},
	GetCookie: function(name) {
		let cookie = document.cookie.split('; ').find((row) => row.startsWith(name));
		if (cookie) return cookie.split('=')[1];
	}
};
export default Utils;
