const Workouts = require("../models/workoutModel");
const mongoose = require("mongoose");

// Get all workouts
const getAllWorkouts = async (req, res) => {
  const user_id = req.user._id;

  try {
    const workouts = await Workouts.find({ user_id });

    if (!workouts.length) {
      return res.status(404).json({ message: "No workouts found" });
    }

    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

// Create a new workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  // Validate required fields
  const emptyFields = [];
  if (!title) emptyFields.push("Title");
  if (!load) emptyFields.push("Load");
  if (!reps) emptyFields.push("Reps");

  if (emptyFields.length) {
    return res.status(400).json({ error: "Please fill in all the fields", emptyFields });
  }

  try {
    const user_id = req.user._id;
    const newWorkout = await Workouts.create({ title, load, reps, user_id });
    res.status(200).json(newWorkout);
  } catch (error) {
    res.status(500).json({ message: "Internal error", error: error.message });
  }
};

// Get a single workout by ID
const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Invalid ID" });
  }

  try {
    const workout = await Workouts.findById(id);

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Invalid ID" });
  }

  try {
    const updatedWorkout = await Workouts.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedWorkout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    res.status(200).json(updatedWorkout);
  } catch (error) {
    res.status(500).json({ message: "Internal error", error: error.message });
  }
};

// Delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Invalid ID" });
  }

  try {
    const deletedWorkout = await Workouts.findByIdAndDelete(id);

    if (!deletedWorkout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    res.status(200).json({ message: "Workout deleted successfully", deletedWorkout });
  } catch (error) {
    res.status(500).json({ message: "Error deleting workout", error: error.message });
  }
};

module.exports = {
  getAllWorkouts,
  createWorkout,
  getWorkout,
  updateWorkout,
  deleteWorkout,
};
