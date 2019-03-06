const request = require('request')

const geocode = (address, callback) => {
	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +'.json?access_token=pk.eyJ1IjoiZmlucHVzYSIsImEiOiJjanN2YzJyaWowNWgwNDlvYmQ5NzUxNmNyIn0.Lgq6zEuMtZVC-Kpr3_DQdA&country=sg&limit=1'
	request({url, json: true}, (error, {body}) => {
		if (error) {
			callback('Unable to connect to location services', undefined)
		} else if (body.features.length === 0) {
			callback('Unable to find location, try another search', undefined)
		} else {
			callback(undefined, {
				long: body.features[0].center[0],
				lat: body.features[0].center[1],
				location: body.features[0].place_name
			})
		}
	})
}

module.exports = geocode