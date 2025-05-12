// handlers/activity.handler.js
import Activity from '../models/activity.model.js';

export const getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find();
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getActivityById = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) return res.status(404).json({ message: 'Aktivitet ikke fundet' });
    res.json(activity);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createActivity = async (req, res) => {
  try {
    const newActivity = new Activity(req.body);
    const savedActivity = await newActivity.save();
    res.status(201).json(savedActivity);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateActivity = async (req, res) => {
  try {
    const updated = await Activity.findByIdAndUpdate(req.body._id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteActivity = async (req, res) => {
  try {
    await Activity.findByIdAndDelete(req.params.id);
    res.json({ message: 'Aktivitet slettet' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
