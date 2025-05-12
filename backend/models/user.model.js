import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  image: { type: String },
  hashedPassword: { type: String, required: true },
  role: { type: String, required: true, default: "user" }
});

const User = mongoose.model('User', userSchema);
export default User;
