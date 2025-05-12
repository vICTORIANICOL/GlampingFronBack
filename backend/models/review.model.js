// models/review.model.js
import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  review: String,
  age: Number,
  name: String,
  image: String, // billede af anmelder (valgfrit)
  stay: String, // ophold (valgfrit)
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
