import React, { useState, useEffect } from "react"
import Axios from "axios"
import moment from "moment-timezone"


import "../CardWeather/CardWeather.scss"
import 'weather-icons/css/weather-icons.css'

const CardWeather = ({userCity, userCountry}) => {

    const [weather, setWeather] = useState(null);
    const [timer, setTimer] = useState(null);
    const [iconClass, setIconClass] = useState(null)
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {

        let API_key = process.env.REACT_APP_WEATHER_API_KEY;
      

            if(userCity&&userCountry) {

            Axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${userCity},${userCountry}&units=metric&appid=${API_key}`)
            
            .then(resp => {

                let weatherData = {
                    location_city: resp.data.name,
                    location_country: resp.data.sys.country,
                    temperature:(resp.data.main.temp).toFixed(0),
                    temp_Max:(resp.data.main.temp_max).toFixed(0),
                    temp_Min:(resp.data.main.temp_min).toFixed(0),
                    feels_like:(resp.data.main.feels_like).toFixed(0),
                    description:(resp.data.weather[0].description.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ')),
                    sunrise:resp.data.sys.sunrise,
                    sunset:resp.data.sys.sunset,
                    id:resp.data.weather[0].id
                }
                setWeather(weatherData)

                let icon_id = resp.data.weather[0].id;          

                switch(true) {
                    case (icon_id >=200 && icon_id<=232):
                        setIconClass("wi-thunderstorm")
                        break;
                    case (icon_id >=300 && icon_id<=321):
                        setIconClass("wi-sleet")
                        break;
                    case (icon_id >=500 && icon_id<=531):
                        setIconClass("wi-storm-showers")
                        break;
                    case (icon_id >=600 && icon_id<=622):
                        setIconClass("wi-snow")
                        break;
                    case (icon_id >=701 && icon_id<=781):
                        setIconClass("wi-fog")
                        break;
                    case (icon_id === 800) :
                        setIconClass("wi-day-sunny")
                        break;
                    case (icon_id >=801 && icon_id<=804):
                        setIconClass("wi-day-fog")
                        break;
                    default:
                        setIconClass("wi-day-fog");
                }

            })
            
            .catch( error => {
                setErrorMessage(error.message)
            } )
        }
    },[userCity,userCountry])

    useEffect(() => {

        let API2_key1 = process.env.REACT_APP_TIMEZONE_API_KEY;


        if(userCity&&userCountry) {

            Axios.get(`https://api.weatherbit.io/v2.0/current?city=${userCity},${userCountry}&key=${API2_key1}`)

            .then(resp => {

                if(resp.data){
                    let timeZoneData = resp.data.data[0].timezone

                    setInterval(() => {

                        let timer = moment.utc(new Date()).tz(timeZoneData).format('LTS')
                        setTimer(timer)

                    },1000)
                }

            })

            .catch( error => {
                setErrorMessage(error.message);
            })

            
        } 
    }, [userCity,userCountry])

    console.log(errorMessage)

    if(errorMessage){
        return(
            <>
                <div>{errorMessage}</div>
            </>
            
        )
    } else {
        return (
            <>
                <div className="cardContainer">
                    <div className="currentWeather_card">
                        <div className="localTime_card">
                            <h1>{timer && timer}</h1>
                            <h2>{weather && weather.location_city}{", "}{weather && weather.location_country}</h2>
                        </div>
                        <div className="iconWeather_card">
                            <i className={`wi ${iconClass && iconClass}`}></i>
                            <h2>{weather && weather.description}</h2>
                        </div>
                        <div className="tempWeather_card">
                            <h1>{weather && weather.temperature}°</h1>
                            <div className="minmaxWeather_card">
                            <h2><span>min: </span>{weather && weather.temp_Min}°</h2>
                            <h2><span>max: </span>{weather && weather.temp_Max}°</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default CardWeather;