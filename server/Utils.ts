const Utils = {
	getRedirectURI: function getRedirectURI() {
		if (Deno.env.get('ENVIRONMENT') === 'PRODUCTION') {
			return 'https://doodinform.herokuapp.com/backfromauth';
		}
		const localPort = Deno.env.get('PORT') || 3000;
		console.log(`http://localhost:${localPort}/backfromauth`);
		return `http://localhost:${localPort}/backfromauth`;
	}
};
export default Utils;
