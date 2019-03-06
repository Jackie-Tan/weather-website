const request = require('request')

const forecast = (lat, long, callback) => {
	const url = 'https://api.data.gov.sg/v1/environment/air-temperature'
	request({url, json: true}, (error, {body}) => {
		if (error) {
			callback('Unable to connect to weather services', undefined)
		} /*else if (body.features.length === 0) {
			callback('Unable to find location, try another search', undefined)
		}*/ else {
			let result = null
			let reading = {}
			body.items[0].readings.forEach((station) => reading[station.station_id] = station.value)
			for (station of body.metadata.stations) {
				if (lat === station.location.latitude && long === station.location.longitude) {
					//console.log(lat, long)
					result = {
						station: station,
						reading: reading[station.id]
					}
					break
				}
			}
			if (result) {
				callback(undefined, result)
			} else {
				callback('Cannot retrieve temperature of the location.', undefined)
			}
		}
	})
}
module.exports = forecast