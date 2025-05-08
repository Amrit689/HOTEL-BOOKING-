const Hotel = require('../models/hotel.model');

// Get all hotels
const  getAllHotels = async (req, res) => {
    try {
        let hotel = await Hotel.find().populate("hotelOwner")
        console.log(hotel)
        let modHotel = hotel.map( hotels => (
            {
                ...hotels.toObject(),
                hotelPictures:process.env.IMAGE_URL+hotels.hotelPictures
            }
        ))
        res.status(200).send(modHotel)
    } catch (error) {
        res.status(400).send({"message": error.message})
    }
}

// Get hotel by ID
async function getHotelById(req, res) {
    try {
        const { id } = req.params;
        const hotel = await Hotel.findById(id).populate('hotelOwner', 'name email mobile');
        if (!hotel) return res.status(404).send({ message: 'Hotel not found' });
        res.status(200).send(hotel);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}


// Add a new hotel
const addHotel = async (req, res) => {
    try {
      let hotel = req.body;
  
      if (!req.file || !req.file.filename) {
        return res.status(400).send({ message: 'Hotel image is required!' });
      }
  
      hotel.hotelPictures = req.file.filename;
  
      hotel = await Hotel.create(hotel);
      res.status(201).send(hotel);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }


// Update hotel by ID
async function updateHotel(req, res) {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        // Prevent image updates via this route
        if (updateData.hotelPictures) {
            delete updateData.hotelPictures;
        }

        const hotel = await Hotel.findByIdAndUpdate(id, updateData, { new: true });

        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }

        res.status(200).json(hotel);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


// Delete hotel by ID
async function deleteHotel(req, res) {
    try {
        const { id } = req.params;
        const hotel = await Hotel.findByIdAndDelete(id);
        if (!hotel) return res.status(404).send({ message: 'Hotel not found' });
        res.status(200).send({ message: 'Hotel deleted successfully' });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

// Search hotels by location or name (basic search example)
async function searchHotels(req, res) {
    try {
        const { query } = req.query;
        const hotels = await Hotel.find({
            $or: [
                { hotelName: { $regex: query, $options: 'i' } },
                { hotelLocation: { $regex: query, $options: 'i' } }
            ]
        });
        res.status(200).send(hotels);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

// Update only hotel image (if you're using a file upload route)
const updateHotelImage = async (req, res) => {
    try {
        let { id } = req.params
        let fileName = req.file.filename
        let hotel = await Hotel.findById(id);
        if (!hotel) return res.status(404).send({ message: 'Hotel not found' });
        hotel = await Hotel.findOneAndUpdate({_id: id}, {"hotelPictures": fileName}, {new: true})
        res.status(200).send(hotel)
    } catch (error) {
        res.status(400).send({"message": error.message})
    }
}
module.exports = {
    getAllHotels,
    getHotelById,
    addHotel,
    updateHotel,
    deleteHotel,
    searchHotels,
    updateHotelImage
};
