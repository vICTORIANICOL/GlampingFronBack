// handlers/review.handler.js
import Review from '../models/review.model.js';

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate('stay');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate('stay');
    if (!review) return res.status(404).json({ message: 'Anmeldelse ikke fundet' });
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createReview = async (req, res) => {
  try {
    const newReview = new Review(req.body);
    const saved = await newReview.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateReview = async (req, res) => {
  try {
    const updated = await Review.findByIdAndUpdate(req.body._id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: 'Anmeldelse slettet' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
