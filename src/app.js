const path = require('path')
const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(path.dirname(__dirname), 'public')
const viewsPath = path.join(path.join(path.dirname(__dirname), 'templates'), 'views')
const partialsPath = path.join(path.join(path.dirname(__dirname), 'templates'), 'partials')
const apiKeysPath = path.join(path.join(__dirname, 'utils'), 'apikeys.json')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Howdy Cloudy'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Howdy Cloudy'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Please enter a location name"
        })
    }
    let apiKeys = {}
    try {
        const rawdata = fs.readFileSync(apiKeysPath);
        apiKeys = JSON.parse(rawdata);
    } catch (e) {
        return res.send({
            error: "Cannot read apikeys.json"
        })
    }
    

    if (!(apiKeys.darksky_access_token && apiKeys.mapbox_access_token)) {
        return res.send({
            error: "API keys not configured"
        })
    }

    geocode(req.query.address, apiKeys.mapbox_access_token, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        } 
        forecast(latitude, longitude, apiKeys.darksky_access_token, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "search term not provided"
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Listening on port ' + port)
})
