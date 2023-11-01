import { useState, useEffect } from "react";
import axios from 'axios' 
import CountryDetail from './components/CountryDetail'
import CountryWeather from './components/CountryWeather'

const App = () => {
    const [countryList, setCountryList] = useState([])
    const [countryName, setCountryName] = useState('')
    const [countrySelected, setCountrySelected] = useState(null)
    const [countryWeather, setCountryWeather] = useState(null)
    const Weather_API_Key = import.meta.env.VITE_WEATHER_KEY

    useEffect(() => {
        axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
            setCountryList(response.data)
        }).catch(error => console.log(error))
    }, [])

    useEffect(() => {
        if (countrySelected) {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${countrySelected.capital[0]},${countrySelected.cca2}&APPID=${Weather_API_Key}&units=metric`;
            axios.get(url)
            .then(response => {
                setCountryWeather(response.data)
            }).catch(error => console.log(error))
        }
    }, [countrySelected])

    /*** Event Handlers ***/
    const onChangeCountry = (event) => {
        setCountryName(event.target.value)
    }

    const onClickButton = (country) => {
        setCountrySelected(country)
        setCountryName(country.name.common)
    }

    /*** List of countries ***/
    const filteredListCountries = countryList.filter(country => 
        country.name.common.toLowerCase().includes(countryName.toLowerCase()))
        
    filteredListCountries.sort((a, b) => {
        const aValue = a.name.common.toLowerCase()
        const bValue = b.name.common.toLowerCase()
        return aValue.localeCompare(bValue)})

    useEffect(() => {
        if (filteredListCountries.length === 1 )
            setCountrySelected(filteredListCountries[0]);
    }, [filteredListCountries]);

    return (
        <div>
            Find countries <input value={countryName} onChange={onChangeCountry} />
            {countrySelected && countryWeather && filteredListCountries.length == 1 ? (
                <div>
                    <CountryDetail country={countrySelected} />

                    <CountryWeather countryWeather={countryWeather} countrySelected={countrySelected}/>
                </div>
            )
            : (filteredListCountries.length <= 10 ? 
                (filteredListCountries.map(country => (
                    <div key={country.name.common}>
                        {country.name.common}
                        <button onClick={() => onClickButton(country)}>show</button>
                    </div>
                )))
            : <div>Too many matches, specify another filter</div>)
            }
        </div>
    )
}

export default App