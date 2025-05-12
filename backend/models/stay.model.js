// models/stay.model.js
import mongoose from 'mongoose';

const staySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  numberOfPersons: Number,
  image: String, // URL
  price: Number,
  includes: [String], // fx: ["morgenmad", "jacuzzi"]
});

const Stay = mongoose.model('Stay', staySchema);

export default Stay;
