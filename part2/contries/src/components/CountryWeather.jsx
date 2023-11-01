const CountryWeather = ({countryWeather, countrySelected}) =>{
    const weatherIconUrl = countryWeather ? 
    `https://openweathermap.org/img/wn/${countryWeather.weather[0].icon}@2x.png`:
    'https://openweathermap.org/img/wn/10d@2x.png'

    return (
        <div>
            <h1>Weather in {countrySelected.capital[0]}</h1>
            <div>Temperature {countryWeather.main.temp} Celsius</div>
            <img src={weatherIconUrl} alt="Weather Image" />
            <div>Wind {countryWeather.wind.speed} m/s</div>
        </div>
    )
}

export default CountryWeather