import { useState, useEffect } from 'react'
import axios from 'axios'
import HotelCard from '../components/HotelCard'
import { API } from '../util/constants'
import './Home.css'

const Home = () => {
    const [hotels, setHotels] = useState([])

    const getHotels = async () => {
        try {
            const { data } = await axios.get(`${API}/hotel`)
            setHotels(data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getHotels()
    }, [])

    return (
        <div className="home-container">
            <h2 className="page-title">Available Hotels</h2>
            <div className="row g-4">
                {hotels.map(hotel => (
                    <div className="col-md-4" key={hotel._id}>
                        <HotelCard hotel={hotel} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home
