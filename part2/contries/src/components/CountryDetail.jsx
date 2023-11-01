const CountryDetail = ({country}) =>{

    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>Capital: {country.capital}</div>
            <div>Area: {country.area}</div>
            
            <h2>Languages:</h2>
            <ul>
                {Object.keys(country.languages).map(languageCode => (
                    <li key={languageCode}>{country.languages[languageCode]}</li>
                ))}
            </ul>

            <img src={country.flags.png} alt={country.name.common} height="250" width="400" />
        </div>
    )
}

export default CountryDetail