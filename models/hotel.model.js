// server/models/hotel.model.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  price: { type: Number, required: true },
  currency: { type: String, required: true },
  image: { type: String }, // Stocker l'URL ou le chemin de l'image
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
