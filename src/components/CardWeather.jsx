import React from "react"

const CardWeather = ({userCity, userCountry}) => {
    return (
        <div className="cardContainer">
            <div className="cardWeather">
                <h2>{userCity}</h2>
                <h2>{userCountry}</h2>
            </div>
        </div>
    )
}

export default CardWeather;