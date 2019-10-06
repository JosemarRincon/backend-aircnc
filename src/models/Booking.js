const mongoose = require('mongoose');

const BookingSpotSchema = new mongoose.Schema({
  date: String,
  approved: Boolean,
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  spot:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Spot'
  }
});

module.exports = mongoose.model('BookingSpot',BookingSpotSchema);