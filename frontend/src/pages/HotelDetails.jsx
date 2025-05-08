import { useEffect, useState } from 'react'
import axios from 'axios'
import Footer from '../components/Footer'
import { useParams, useNavigate } from 'react-router-dom'
import { API } from '../util/constants'
import './HotelDetails.css'

const HotelDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [hotel, setHotel] = useState({})

    const getHotelDetails = async () => {
        try {
            const { data } = await axios.get(`${API}/hotel/${id}`)
            setHotel(data)
        } catch (error) {
            console.error(error)
            navigate("/")
        }
    }

    useEffect(() => {
        getHotelDetails()
    }, [id])

    return (
        <div className="hotel-details container mt-5">
            <div className="row g-4">
                <div className="col-md-6">
                    <img src={`${API}/uploads/${hotel.hotelPictures}`} alt="Hotel" className="img-fluid rounded shadow" />
                </div>
                <div className="col-md-6">
                    <h2 className="mb-3">{hotel.hotelName} Hotel</h2>
                    <p><strong>Rating:</strong> {hotel.hotelRating} ⭐</p>
                    <p><strong>Location:</strong> {hotel.hotelLocation}</p>
                    <p><strong>Contact:</strong> {hotel.hotelContact}</p>
                    <p><strong>Amenities:</strong> {hotel.amenities}</p>

                    <p><strong>Availability:</strong> <span className={`badge ${hotel.availability === 'Available' ? 'bg-success' : 'bg-danger'}`}>{hotel.availability}</span></p>

                    {/* Nearby Facilities */}
                    <div>
                        <h5>Nearby Facilities:</h5>
                        <ul>
                            {hotel.nearbyFacilities && hotel.nearbyFacilities.length > 0 ? (
                                hotel.nearbyFacilities.map((facility, index) => (
                                    <li key={index}>{facility}</li>
                                ))
                            ) : (
                                <p>No nearby facilities available</p>
                            )}
                        </ul>
                    </div>

                    <div className="owner-card card mt-4">
                        <div className="card-body">
                            <h5>Owner Details</h5>
                            <p><strong>Name:</strong> {hotel?.hotelOwner?.name}</p>
                            <p><strong>Mobile:</strong> {hotel?.hotelOwner?.mobile}</p>
                            <p><strong>Email:</strong> {hotel?.hotelOwner?.email}</p>
                        </div>
                    </div>

                    <button className="btn btn-primary mt-3" onClick={() => navigate(`/confirm/${hotel._id}`)}>Book Now</button>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default HotelDetails
