const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const partialsPath = path.join(__dirname, '../templates/partials')
// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Jackie'
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About',
		name: 'Jackie'
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		text: 'I need help here!',
		name: 'Jackie'
	})
})

app.get('/weather', (req, res) => {
	if(!req.query.address) {
		return res.send({
			error: "You must provide an address term"
		})
	}
	
	geocode(req.query.address, (error, {lat, long, location} = {}) => {
		if (error) {
			return res.send({error})
		}
		forecast(lat, long, (error, forecastData) => {
			if (error) {
				return res.send({error: lat + " " + long + " "+ location + " " + error})
			}
			res.send({
				address: req.query.address,
				location: location,
				forecast: forecastData
			})
		})
	})
})

app.get('/products', (req, res) => {
	if(!req.query.search) {
		return res.send({
			error: "You must provide a search term"
		})
	}

	res.send({
		products: []
	})
})

app.get('/help/*', (req, res) => {
	res.render('error', {
		title: 'Error',
		errorText: 'Help article not found',
		name: 'Jackie'
	})
})

app.get('*', (req, res) => {
	res.render('error', {
		title: 'Error',
		errorText: 'Page not found',
		name: 'Jackie'
	})
})

app.listen(port, () => {
	console.log('Server is up on port ' + port)
})