const form = document.querySelector('form');
const forecast = document.querySelector('.forecast');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = e.target.search.value.trim();
    if(city){
        fetch(`http://localhost:3000/weather?address=${city}`).then(res => {
            res.json().then(data => {
                if(data.error){
                    console.log(data.error);
                } else {
                    const html = `
                        <p>Location: <strong>${data.location}</strong></p>
                        <p>Situation: ${data.condition}</p>
                        <p>Temperature: ${data.temperature} C</p>
                        <p>Feels Like: ${data.feelsLike} C</p>
                        <p>Max Temp: ${data.maxTemp} C</p>
                        <p>Min Temp: ${data.minTemp} C</p>
                        <p>Humidity: ${data.humidity}</p>
                        <p>Wind Speed: ${data.windSpeed} km/h</p>
                    `;

                    forecast.innerHTML = html;
                }
            });
        });
        e.target.search.value = '';
    }

    else {
        forecast.innerHTML = `<p>Please enter `
    }
})