// models/activity.model.js
import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  weekday: String, // fx "Tirsdage"
  image: String,   // URL
  time: String     // fx "14:00"
});

const Activity = mongoose.model('Activity', activitySchema);

export default Activity;
