const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  hotelName: {
    type: String,
    required: true,
  },

  hotelRating: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: true
  },

  hotelReviews: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },

  hotelOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  hotelPictures: {
    type: String,
    required: true
  },

  hotelLocation: {
    type: String,
    required: true
  },

  hotelContact: {
    type: Number,
    required: true,
    unique: true,
  },

  amenities: {
    type: String,
    required: true,
    enum: ['Free Wi-Fi', 'Parking', 'Swimming Pool', 'Gym', 'Spa', 'Restaurant', 'Bar', 'Room Service']
  },

  availability: {
    type: String,
    required: true,
    enum: ['Available', 'Not Available']
  },

  nearbyFacilities: {
    type: [String],
    enum: ['Airport', 'Hospital', 'Bus Station', 'Shopping Mall', 'Train Station', 'Taxi Stand', 'Restaurant', 'Pharmacy'],
    required: false
  }
});

const Hotel = mongoose.model('Hotel', hotelSchema);
module.exports = Hotel;
