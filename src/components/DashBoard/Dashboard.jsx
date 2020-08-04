import React, { useState } from "react"
import CardWeather from "../CardWeather/CardWeather"
import CurrentWeather from "../CurrentWeather/CurrentWeather"

import "../DashBoard/Dashboard.scss"

 const Dashboard = () => {

    const [userCity, setUserCity] = useState("");
    const [userCountry, setUserCountry] = useState("");
    const [userSearch, setUserSearch] = useState([]);


    const handleSubmit = e => {
        e.preventDefault();
        setUserSearch(prevState => ([...prevState, {userCity,userCountry}]));
    }

    return (
        <>
        <div className="header">
            <h1>Dashboard Weather</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    onChange={e => {setUserCity(e.target.value)}}
                    placeholder="City,  ex: London"
                    required
                />
                <input 
                    type="text"
                    onChange={e => {setUserCountry(e.target.value)}}
                    placeholder="Country,  ex: UK"
                    required
                />
                <button className="btn" type="submit" >Get Weather</button>
            </form>
        </div>

            <CurrentWeather />
            <div className="containerWeather">
            {
                userSearch && userSearch.map(item => (
                    <CardWeather userCity={item.userCity} userCountry={item.userCountry} />
                ))
            }
            </div>
        </>
    )
}

export default Dashboard;