const got = require('got');
const { describe, demandOption } = require('yargs');
const yargs = require('yargs');
const { kelvinToCelsius } = require('./functions');





module.exports = {
    getWeather: getWeather
}