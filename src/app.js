const path = require('path');
const express = require('express');
const hbs = require('hbs');
const got = require('got');
const { kelvinToCelsius } = require('./util/functions');
const app = express();

// Setting up express directory config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../template/views');
const partialsPath = path.join(__dirname, '../template/partials')

// Handlebars (hbs) config
app.set('view engine', 'hbs')
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Serving static assets
app.use(express.static(publicDirPath));

// app.com
// app.com/help
// app.com/about

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app homepage',
        author: 'Shakil Shareef'
    });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About US'});
});

app.get('/help', (req, res) => {
    res.render('help', { message: 'Hey, how can we help you?'});
});

app.get('/weather', (req, res) => {
    
    if(!req.query.address){
        return res.send({error: 'You must provide address'})
    }

    const getWeather = async (city) => {
        try {
            const key = 'ca0b304b730393cd2cf44032b25936c4';
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
            const response = await got(url);
            const weather = JSON.parse(response.body);
            return weather;
        } catch (error) {
            console.log(error.response.body);
        }
    };

    getWeather(req.query.address).then(data => {
        const forecast = {
            location: data.name + ', ' + data.sys.country,
            condition: data.weather[0].description,
            temperature: kelvinToCelsius(data.main.temp),
            feelsLike: kelvinToCelsius(data.main.feels_like),
            minTemp: kelvinToCelsius(data.main.temp_min),
            maxTemp: kelvinToCelsius(data.main.temp_max),
            humidity: data.main.humidity,
            windSpeed: data.wind.speed
            
        }
        res.send(forecast);
    }).catch(err => ({error: 'error fetching data', err}));
    
    
});

app.get('/help/*', (req, res) => {
    res.render('404page', { thing: 'Article'});
});

app.get('*', (req, res) => {
    res.render('404page', { thing: 'Page'});
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});