import React, { useState, useEffect } from "react"
import CardWeather from "./CardWeather"



 const Dashboard = () => {

    const [coords, setCoords] = useState(null);
    const [userCity, setUserCity] = useState("");
    const [userCountry, setUserCountry] = useState("");
    const [userSearch, setUserSearch] = useState([]);

    const handleSubmit = e => {
        e.preventDefault();
        setUserSearch(prevState => ([...prevState, {userCity,userCountry}]));
    }

    useEffect(() => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                let newCoords = {
                    Latitude:position.coords.latitude,
                    Longitude:position.coords.longitude
                }

                setCoords(newCoords)
            })
        } else {
            console.log("not supported")
        }
    }, [])
      
    return (
        <>
            <h2>Dashboard Weather</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    onChange={e => {setUserCity(e.target.value)}}
                />
                <input 
                    type="text"
                    onChange={e => {setUserCountry(e.target.value)}}
                />
                <button className="btn" type="submit" >Submit</button>
            </form>
            {
                userSearch && userSearch.map(item => (
                    <CardWeather userCity={item.userCity} userCountry={item.userCountry} />
                ))
            }
        </>
    )
}



export default Dashboard;