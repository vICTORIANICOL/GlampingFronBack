// handlers/stay.handler.js
import Stay from '../models/stay.model.js';

// GET alle ophold
export const getAllStays = async (req, res) => {
  try {
    const stays = await Stay.find();
    res.json(stays);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET et enkelt ophold
export const getStayById = async (req, res) => {
  try {
    const stay = await Stay.findById(req.params.id);
    if (!stay) return res.status(404).json({ message: 'Ophold ikke fundet' });
    res.json(stay);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST nyt ophold
export const createStay = async (req, res) => {
  try {
    const newStay = new Stay(req.body);
    const savedStay = await newStay.save();
    res.status(201).json(savedStay);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT opdater ophold
export const updateStay = async (req, res) => {
  try {
    const updatedStay = await Stay.findByIdAndUpdate(req.body._id, req.body, {
      new: true,
    });
    res.json(updatedStay);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE ophold
export const deleteStay = async (req, res) => {
  try {
    await Stay.findByIdAndDelete(req.params.id);
    res.json({ message: 'Ophold slettet' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
