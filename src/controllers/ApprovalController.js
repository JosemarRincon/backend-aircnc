const Booking = require('../models/Booking');
module.exports = {
  async store(req, res) {
    const { booking_id } = req.params;
    
    const booking = await Booking.findById(booking_id).populate('spot');

    booking.approved = true;
    await booking.save();

    await booking.populate('spot').populate('user').execPopulate();

    const bookingUserSocket = req.connectedUsers[booking.user._id];
    console.log('aprovado')
    
    if(bookingUserSocket){
      req.io.to(bookingUserSocket).emit('booking_response', booking);
      //req.io.emit('booking_response', booking);

    }
    return res.json(booking);
  }
}